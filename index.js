require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db_connection");
const registerRoute = require('./routes/registerRoute');
const resetPasswordRoute = require('./routes/resetPasswordRoute');
const loginRoute = require('./routes/loginRoute');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const passport = require('passport');
const eventRoute = require('./routes/eventRoutes');

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Waltz 2023 API",
			version: "1.0.0",
			description: "Waltz 2023 server API",
		},
		servers: [
			{
				url: process.env.SERVER_URL,
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

require('./passport')

// routes
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/register", registerRoute);

app.use("/reset-password", resetPasswordRoute);

app.use("/login", loginRoute);

app.use("/events", eventRoute)

app.get("/protected", passport.authenticate('jwt', {session : false}), (req, res) => {
	return res.status(200).send({
		success: true,
		user: req.user
	})
})

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
