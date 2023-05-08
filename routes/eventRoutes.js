const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Event } = require('../models/event');
const passport = require('passport');

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - imagePublicId
 *         - description
 *         - date
 *         - hot
 *         - startTime
 *         - endTime
 *       properties:
 *         title:
 *           type: string
 *           description: Event Title
 *         imagePublicId:
 *           type: string
 *           description: Event Image publicId
 *         description:
 *           type: string
 *           description: Event Description
 *         date:
 *           type: number
 *           description: Event date 25/26/27
 *         hot:
 *           type: boolean
 *           description: True if its a hot event
 *         startTime:
 *           type: string
 *           description: Event Start time
 *         endTime:
 *           type: string
 *           description: Event End Time
 *       example:
 *         title: DJ Night
 *         imagePublicId: uvibkvbwsfv
 *         description: Music
 *         date: 26
 *         hot: true
 *         startTime: "20:00"
 *         endTime: "22:00"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all Fest Events
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: An Email sent to your account please verify
 *       208:
 *         description: User with given email already Exist!
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.get("/", passport.authenticate('jwt', {session : false}), async (req, res) => {
    try{
        const events = await Event.find({});
        return res.status(200).send({ events: events})
    }catch(err) {
        return res.status(500).send({message: `Internal Server Error: ${err}`})
    }
})

router.post("/", async (req, res) => {
    try{
        const event = await new Event({...req.body}).save();
        return res.status(200).send({ message: "Event Added Successfully"})
    }
    catch(error){
        return res.status(500).send({ message: `Internal Server Error: ${error}`})
    }
})

module.exports = router