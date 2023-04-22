const { User, validate } = require("../models/user");
const Token = require("../models/token");
const mongoose = require('mongoose');
require("dotenv").config();
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(208)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
        //const url = `${process.env.PORT}users/${user.id}/verify/${token.token}`;
        //await sendEmail(user.email, "Verify Email", url);
        res
            .status(201)
            .send({ message: "An Email sent to your account please verify" });
    }
    catch (err) {
        res.status(500).send({ message: `Internal Server Error: ${err}` })
    }
})


router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link1" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});

		if (!token) return res.status(400).send({ message: "Invalid link" });

		await Token.deleteOne({
			userId: user._id,
			token: req.params.token,
		});
        await User.updateOne({ _id: user._id, verified: true });
		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: `Internal Server Error${error}` });
	}
});

module.exports = router
