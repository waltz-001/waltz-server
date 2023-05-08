const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
	email: { type: String, required: true },
    userRole: { type: String, required: true },
    department: { type: String, required: false },
    year: { type: Number, required: false },
    batch: { type: String, required: false },
    rollNo: { type: String, required: false },
    companyName: { type: String, required: false },
	instituteName: { type: String, required: false },
    password: { type: String, required: true },
	verified: { type: Boolean, default: false },
});

// userSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
        gender: Joi.string().required().label("Gender"),
		email: Joi.string().email().required().label("Email"),
        contactNumber : Joi.string().length(10).required().label("Contact Number"),
        userRole: Joi.string().required().label("User Role"),
        department: Joi.string().allow(null, "").required().label("Department"),
        rollNo: Joi.string().allow(null, "").required().label("Department"),
        year: Joi.number().allow(null, "").required().label("Year"),
        batch: Joi.string().allow(null, "").required().label("Batch"),
        companyName: Joi.string().allow(null, "").required().label("Company Name"),
        instituteName: Joi.string().allow(null, "").required().label("Institute Name"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
