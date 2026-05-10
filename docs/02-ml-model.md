# 02 · The ML model — DenseNet201, transfer learning, and the 40 classes

This page explains *why* DenseNet201, *how* it's adapted for our 40 brain-MRI
classes, and *what every preprocessing step does*. By the end you should be
able to read `backend/app.py` and explain each line.

---

## 1. What problem are we solving?

**Multi-class image classification.** Given a single 2-D MRI slice, output one
of **40 labels**: `Astrocitoma T1`, `Carcinoma T2`, `_NORMAL T1`, etc.

Each label is a `(tumor type, MRI sequence)` pair:

| Tumor type (12) | Sequence suffix (3) |
| --------------- | ------------------- |
| Astrocitoma, Carcinoma, Ependimoma, Ganglioglioma, Germinoma, Glioblastoma, Granuloma, Meduloblastoma, Meningioma, Neurocitoma, Oligodendroglioma, Papiloma, Schwannoma, Tuberculoma, _NORMAL | `T1`, `T1C+` (T1 with contrast), `T2` |

> 12 × 3 = 36, plus a few extras and `_NORMAL T1` / `_NORMAL T2`. The actual
> in-code list (`class_names` in `app.py`) is **40 items long**. The order
> matters — the model emits an integer index that we look up positionally.

Why predict the sequence too? Because the visual features that distinguish
tumor types differ between T1, T1-with-contrast, and T2 imaging. Treating
`(type, sequence)` as the prediction target lets the model learn
sequence-conditional features in one head.

---

## 2. Why DenseNet201?

A **convolutional neural network (CNN)** is the standard tool for image
classification. We picked **DenseNet201** specifically because:

* **Dense connectivity.** In a DenseNet, each layer receives feature maps from
  *every preceding layer* in its block. Each layer therefore reuses features
  computed by earlier layers instead of re-learning them. This makes DenseNets
  very parameter-efficient (~20 M parameters versus ~25 M for ResNet50) and
  gives them strong performance on small datasets — which is exactly the
  regime medical imaging is in.
* **Feature reuse helps gradient flow.** The shortcut paths from later to
  earlier layers act like ResNet-style skip connections: gradients propagate
  through them during training, mitigating vanishing-gradient pain in deep
  networks.
* **Pretrained on ImageNet.** torchvision ships a `densenet201` model with
  weights from ImageNet. We *initialise* with those weights (transfer
  learning) and fine-tune on MRI scans — far cheaper than training from
  scratch and works better when only thousands of labeled scans are
  available.

### DenseNet201 in one paragraph

DenseNet201 has 4 dense blocks separated by transition layers. Within a block,
the output of layer *L* is the concatenation `[x_0, x_1, ..., x_{L-1}]`,
where `x_i` is the feature map produced by layer *i*. After every block, a
transition layer (1×1 conv + 2×2 average pool) halves the spatial size and
the number of channels, keeping memory in check. The whole stack ends with a
global average pool and a 1000-way classifier (for ImageNet). We replace that
classifier with a linear layer that outputs **40 logits** — one per class.

---

## 3. The "transfer learning" surgery in `app.py`

```python
model = models.densenet201(weights=None)         # 1. build the architecture
num_ftrs = model.classifier.in_features          # 2. remember its 1920-dim feature size
model.classifier = nn.Linear(num_ftrs, 40)       # 3. swap head: 1920 → 40 classes
model.load_state_dict(torch.load(MODEL_PATH))    # 4. load fine-tuned weights
model.eval()                                     # 5. inference mode
```

What each line does:

1. **`weights=None`** — build the *graph* (the layers) but do not download
   ImageNet weights. We're going to overwrite all of them with our own
   checkpoint anyway. (The original code used the deprecated `pretrained=False`.)
2. **`num_ftrs = model.classifier.in_features`** — DenseNet201's penultimate
   feature vector is 1920-dimensional. We grab that number so the new linear
   layer has the right input shape.
3. **`model.classifier = nn.Linear(num_ftrs, 40)`** — replace the 1000-way
   ImageNet head with a 40-way head matching our class list.
4. **`load_state_dict(torch.load(MODEL_PATH))`** — load the trained weights
   produced by the team's training notebook. `map_location=device` makes the
   load work on a CPU-only machine even if the file was saved on a GPU.
5. **`model.eval()`** — switches dropout layers off and freezes BatchNorm
   running statistics so inference is deterministic.

> If `model.eval()` is missed, predictions become non-deterministic and BN
> layers update their running stats with every request — a classic bug.

---

## 4. The preprocessing pipeline (the math)

```python
transforms.Compose([
    transforms.Resize((224, 224)),                      # 1. shape
    transforms.ToTensor(),                              # 2. range
    transforms.Normalize(mean=[0.485, 0.456, 0.406],    # 3. distribution
                         std=[0.229, 0.224, 0.225]),
])
```

| Step | What it does | Why |
| ---- | ------------ | --- |
| `Resize((224, 224))` | Bilinearly resamples the input to 224×224 pixels | DenseNet201 expects 224×224 inputs (fixed by the global avg-pool layout). |
| `ToTensor()` | Converts PIL → `torch.FloatTensor` of shape `(C, H, W)` and divides by 255 so values are in `[0, 1]`. | PyTorch convolutions consume `[0, 1]` floats, not `[0, 255]` ints. |
| `Normalize(mean, std)` | Subtracts the per-channel mean and divides by the per-channel std for the **ImageNet** statistics. | The pretrained backbone "expects" zero-mean, unit-std inputs in that exact distribution. Skipping this step shifts every activation in the network. |
| `image.convert("RGB")` (in `preprocess_image`) | Forces 3 channels even if the MRI is grayscale | DenseNet201's first conv is 3-channel; a grayscale image is duplicated into the R/G/B planes. |
| `.unsqueeze(0)` | Adds a batch dimension `(1, 3, 224, 224)` | PyTorch always operates on batches, even of size 1. |

After these steps the tensor is ready to feed into `model(image_tensor)`.

---

## 5. Inference math: from logits to a class string

```python
with torch.no_grad():
    outputs = model(image_tensor)                # shape (1, 40) — raw logits
    _, predicted_index = torch.max(outputs, 1)   # argmax along the class axis
return class_names[predicted_index.item()]
```

* **`torch.no_grad()`** turns off the autograd graph. We're not training, so
  storing intermediate activations would just waste memory and time.
* **logits** are unnormalised scores. We don't apply softmax because *argmax*
  of softmax = argmax of logits, and we only want the top class.
* If you wanted a **confidence score** (e.g. for a UI like "82% Glioblastoma")
  you would do:

  ```python
  probs = torch.softmax(outputs, dim=1)          # shape (1, 40)
  conf, idx = torch.max(probs, dim=1)
  return class_names[idx.item()], conf.item()
  ```

  This is a good 5-line extension if you want to expose confidence in the UI.

---

## 6. Where do the weights come from?

`Models/densenet_201_brain_tumor.pth` was produced by the team's training
notebook (`test.ipynb` shows the dependency install). The training pipeline
is **not** part of this repo — only the **trained checkpoint** ships with it.
If you retrain, you only need to make sure two things stay in sync:

1. `class_names` in `app.py` matches the index → label mapping used at
   training time **exactly**.
2. The model architecture surgery in `app.py` matches what was used at
   training time (same `densenet201` + `nn.Linear(1920, 40)` head).

If those two invariants drift, predictions look wrong even though no error
is raised.

Continue to [`03-flask-service.md`](03-flask-service.md) to see how this model
is wrapped in HTTP.
