# 07 · Database schema (`backend/models/User.js`)

The system has **one collection: `users`**. Everything (a patient's images, a
patient's chat sessions) is **embedded** in that user's document. This is a
deliberate design choice for read-heavy workloads — every dashboard render is
a single Mongo query.

---

## 1. Top-level `User` schema

```js
{
  name:               { String, required, trim },
  email:              { String, required, unique, lowercase, trim, regex },
  password:           { String, required },          // bcrypt hash
  role:               { enum: ['patient','medicalStaff','admin'], required },
  patientId:          { String, required: role==='patient', trim },
  gender:             { String, optional },
  dateOfBirth:        { Date,   optional },
  dateOfRegistration: { Date,   default: Date.now },
  referredDoctor:     { String, optional },
  organizationName:   { String, optional, trim },
  imageData:          [ ImageSubSchema ],
  chatHistory:        [ ChatHistorySubSchema ],
}
```

Plus `timestamps: true` adds `createdAt` and `updatedAt` automatically.

### Conditional `patientId` requirement

```js
patientId: { type: String, required: function() { return this.role === 'patient'; } }
```

This is a **schema-level** rule that fires on `.save()`. The `/api/signup`
route also enforces it ahead of time so we can return a friendlier 400.

### Partial unique index

```js
userSchema.index(
  { patientId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: 'patient',
      patientId: { $exists: true, $ne: null }
    }
  }
);
```

Why a *partial* index? If `patientId` were globally unique, no two
non-patient users could exist (they'd all share `null`). Restricting the
unique constraint to documents that actually have `role: 'patient'` and a
non-null `patientId` is the standard MongoDB idiom for "unique within a
subset".

---

## 2. `imageSubSchema` — one MRI per element

```js
{
  _id:              ObjectId,        // auto-added by Mongoose
  organizationName: String,
  imageName:        String,          // human-friendly original filename
  imagePath:        { String, required, trim },   // "uploads/<random>-<file>.jpg"
  uploadDate:       { Date, default: Date.now },
  prediction:       String,          // optional — set after Flask call
}
```

The `_id` of each image is what URLs like `/api/patients/:patientId/images/:imageId/predict`
target.

---

## 3. `chatMessageSubSchema` — one chat turn

```js
{
  _id:        ObjectId,
  role:       { enum: ['user','model'], required },
  content:    { String, required, trim },
  timestamp:  { Date, default: Date.now },
  sentBy:     ObjectId(ref:'User'),  // optional — which user typed it
}
```

`role` matches Gemini's wire format exactly so we can `.map(...)` the array
into the SDK without renaming.

---

## 4. `chatHistorySubSchema` — one session per image

```js
{
  _id:               ObjectId,
  imageId:           { ObjectId, required },   // → imageSubSchema._id
  imagePath:         { String, required },     // denormalised
  imageName:         String,                   // denormalised
  initialPrediction: String,                   // prediction at session start
  messages:          [ chatMessageSubSchema ],
  lastUpdated:       { Date, default: Date.now },
}
```

We **denormalise** `imagePath`, `imageName`, and `initialPrediction` into the
chat session. That means the chat record carries enough context to render
even if the image is later deleted or re-pathed. It costs a few bytes per
session and saves us a join on every chat fetch.

---

## 5. Worked example document

A medicalStaff user uploads two MRIs for patient `P-007`, predicts both, and
the patient chats once about the second image. The patient's user document
ends up looking like:

```jsonc
{
  "_id": ObjectId("..."),
  "name": "Anita Roy",
  "email": "anita@example.com",
  "password": "$2a$10$...",
  "role": "patient",
  "patientId": "P-007",
  "gender": "F",
  "dateOfBirth": "1991-04-22T00:00:00Z",
  "dateOfRegistration": "2024-12-01T10:14:11Z",
  "referredDoctor": "Dr. Singh",
  "organizationName": "City Medical",
  "imageData": [
    {
      "_id":        ObjectId("a1..."),
      "imageName":  "scan-1.jpg",
      "imagePath":  "uploads/1714...-scan-1.jpg",
      "uploadDate": "2025-04-30T10:01:00Z",
      "prediction": "Meningioma T1"
    },
    {
      "_id":        ObjectId("a2..."),
      "imageName":  "scan-2.jpg",
      "imagePath":  "uploads/1714...-scan-2.jpg",
      "uploadDate": "2025-04-30T10:09:42Z",
      "prediction": "Glioblastoma T1"
    }
  ],
  "chatHistory": [
    {
      "_id":         ObjectId("c1..."),
      "imageId":     ObjectId("a2..."),
      "imagePath":   "uploads/1714...-scan-2.jpg",
      "imageName":   "scan-2.jpg",
      "initialPrediction": "Glioblastoma T1",
      "messages": [
        { "role": "user",  "content": "Is this serious?",            "timestamp": "..." },
        { "role": "model", "content": "I'm not a doctor, but ...",    "timestamp": "..." }
      ],
      "lastUpdated": "..."
    }
  ],
  "createdAt": "...",
  "updatedAt": "..."
}
```

A single `User.findById(userId)` returns *all* of that — no joins, no
follow-up queries.

---

## 6. Trade-offs of the embedded model

| Pro | Con |
| --- | --- |
| One query returns everything for a user. | Documents grow over time; MongoDB caps a single document at 16 MB (thousands of images / messages). |
| No application-side joins or aggregation pipelines. | Harder to query "all chats across all users matching X". Needs `$unwind`. |
| Atomic update of related fields (e.g. mark all as deleted). | Concurrent writers to the same user's `imageData` need positional operators or array filters. |

For the data sizes we expect (per-patient: tens of images, hundreds of
messages), embedding is the right call. If you grow into thousands of
images per user, consider promoting `imageData` and `chatHistory` to their
own collections with `userId` foreign keys.

Continue to [`08-setup-and-run.md`](08-setup-and-run.md).
