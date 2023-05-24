const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
	name: { type: String, required: true },
	imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: String, required: true },
    github: { type: String },
    linkedin: { type: String },
    team: { type: String, required: true},
});

const Team = mongoose.model("Team", teamSchema);

module.exports = { Team };
