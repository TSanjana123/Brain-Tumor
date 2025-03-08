app.get('/api/images/:patientId', async (req, res) => {
    const { patientId } = req.params;
    try {
        const image = await ImageModel.findOne({ patientId });
        if (!image) return res.status(404).json({ message: "Image not found" });
        res.json({ imageUrl: image.imageUrl }); // Assuming imageUrl is stored in the DB
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
