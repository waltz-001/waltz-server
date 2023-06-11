const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
	userName: { type: String, required: true },
	initials: { type: String, required: true },
    facultyId: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true},
	password: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
});

const Faculty = mongoose.model("faculty", facultySchema);

module.exports = { Faculty };