require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db_connection");
const registerRoute = require('./routes/registerRoute');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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
				url: "http://localhost:8080",
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

// routes

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/register", registerRoute);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
