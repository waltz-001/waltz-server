const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
	title: { type: String, required: true },
	imagePublicId: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Number, required: true },
    hot: { type: Boolean, required: true},
	startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const Event = mongoose.model("event", eventSchema);

module.exports = { Event };
