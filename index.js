require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser  = require('body-parser');
const connection = require("./db_connection");
const adminRoute = require("./routes/adminRoutes");
const studentRoute = require("./routes/studentRoute");
const facultyRoute = require("./routes/facultyRoute");
const courseRoute = require("./routes/courseRoute");
const enrollRoute = require("./routes/enrollRoutes")

// database connection
connection();

// middlewares

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes

app.use("/admin", adminRoute )
app.use("/student", studentRoute )
app.use("/faculty", facultyRoute )
app.use("/course", courseRoute )
app.use("/enroll", enrollRoute )

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
