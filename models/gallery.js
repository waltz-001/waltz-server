const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
	title: { type: String, required: true },
	imageUrl: { type: String, required: true },
    type: { type: String, required: true},
});

const Gallery = mongoose.model("gallery", gallerySchema);

module.exports = { Gallery };
