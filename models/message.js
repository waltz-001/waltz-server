const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	message: { type: String, required: true },
});

const Message = mongoose.model("message", messageSchema);

module.exports = { Message };
