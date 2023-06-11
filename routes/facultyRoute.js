require("dotenv").config();
const express = require('express');
const router = express.Router();
const { Faculty } = require("../models/faculty");

router.post("/", async(req, res) => {
    try{
        const faculty = await new Faculty({
            ...req.body
        }).save();
        return res.status(201).send({ success: true })
    }catch(error){
        return res.status(400).send({ error: error })
    }
}).post("/login", async(req, res) => {
    try{
        console.log(req.body)
        const faculty = await Faculty.findOne({userName: req.body.userName, password: req.body.password});
        if(!faculty)
        return res.status(200).send({ success: false })
        if(faculty.password===req.body.password)
        return res.status(200).send({ success: true, userType: "Faculty", id: faculty._id})

        return res.status(200).send({ success: false })
    }catch(err){
        return res.status(400).send({ error: err })
    }
}).get("/", async(req, res) => {
    const faculty = await Faculty.find({});
    res.status(200).send({ faculty: faculty })
})

module.exports = router
