require("dotenv").config();
const express = require('express');
const { Event } = require("../models/event");
const { Gallery } = require("../models/gallery");
const { Team } = require("../models/teams");
const router = express.Router();

/**
 * @swagger
 * /admin/teams:
 *   get:
 *     summary: Get all Fest Events
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Fetched all Teams sucessfully
 *       500:
 *         description: Internal Server Error
 */


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
        await Event.updateOne({_id: req.body._id}, {...req.body})
        res.status(200).send({message: "Update Successfully"})
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
}).get("/teams", async(req, res) => {
    try{
        const teams = await Team.find({});
        res.status(200).send({ teams: teams, success: true });
    }catch(error){
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
}).post("/teams", async(req, res) => {
    try{
        const team = await new Team({
            ...req.body
        }).save()
        res.status(200).send({ message: "Added Member" });
    }catch(error){
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
}).put("/teams", async (req, res) => {
    try{
        await Team.updateOne({_id: req.body._id}, {...req.body})
        res.status(200).send({message: "Update Successfully"})
    }catch(error) {
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
}).delete("/teams/:id", async (req, res) => {
    try{
        await Team.deleteOne({ _id: req.params.id })
        res.status(200).send({ message: "Deleted Team Member" })
    }catch(error){
        res.status(500).send({ message: `Internal Server Error: ${error}` })
    }
})

module.exports = router
