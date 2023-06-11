require("dotenv").config();
const express = require('express');
const router = express.Router();
const { Course } = require("../models/course");

router.post("/", async(req, res) => {
    try{
        const faculty = await new Course({
            ...req.body
        }).save();
        return res.status(201).send({ success: true })
    }catch(error){
        return res.status(400).send({ error: error })
    }
}).get("/", async(req, res) => {
    try{
        const courses = await Course.find({});
        res.status(200).send({ courses: courses })
    }catch(err){
        return res.status(400).send({ error: err })
    }
})

module.exports = router
