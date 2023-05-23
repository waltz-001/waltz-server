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
const galleryRoute = require('./routes/galleryRoutes');
const messageRoute = require('./routes/messageRoutes');
const message = require("./models/message");
const invitationRoute = require("./routes/invitationRoutes");
const { User } = require("./models/user");
const { flashMobReminder } = require("./emailTemplates");
const sendMail = require("./utilities/sendMail");
const adminRoutes = require("./routes/adminRoutes")

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

app.use("/gallery", galleryRoute)

app.use("/message", messageRoute)

app.use("/getuserfirstname", invitationRoute)

app.use("/admin", adminRoutes)

app.get("/", async (req, res) => {
	try {
		const users = await User.find({});
		// console.log(users)
		const body = flashMobReminder();
		users.forEach(async (user, index) => {
			setTimeout( async() => {
				if (user.verified) {
					console.log(user.email)
					await sendMail(user.email, `Reminder!! for Waltz 2k23 FlashMob at Burdwan Railway Station`, body)
				}
			}, 1000 * index);
		})
		res.status(200).send({ message: "Successful" })

	} catch (err) {
		console.log(err)
	}
})


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
