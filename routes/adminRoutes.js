require("dotenv").config();
const express = require('express');
const { Event } = require("../models/event");
const { Gallery } = require("../models/gallery");
const router = express.Router();

router.get("/events", async (req, res) => {
    try{
        const events = await Event.find({});
        res.status(200).send({ events: events, success: true })
    }catch(error){
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
}).delete("/events/:id", async (req, res) => {
    try{
        await Event.deleteOne({_id: req.params.id})
        res.status(200).send({ message: "Deleted Event" })
    }catch(error){
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
}).put("/events/", async (req, res) => {
    try{
        console.log(req.body)
        await Event.updateOne({_id: req.body._id}, {...req.body})
        res.status(200).send({message: "Update Successfull"})
    }catch(error) {
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
}).get("/gallery", async (req, res) => {
    try{
        const gallery = await Gallery.find({});
        res.status(200).send({ gallery: gallery, success: true })
    }catch(error) {
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
}).delete("/gallery/:id", async (req, res) => {
    try{
        await Gallery.deleteOne({ _id: req.params.id })
        res.status(200).send({ message: "Deleted Gallery" })
    }catch(error){
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
})

module.exports = router
