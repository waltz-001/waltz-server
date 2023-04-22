require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db_connection");
const registerRoute = require('./routes/registerRoute');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/register", registerRoute);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
