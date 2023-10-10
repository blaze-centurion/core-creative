const express = require("express");
const Router = express.Router();
const OrderModel = require("../models/orders");
const ShopModel = require("../models/shop");
const TicketModel = require("../models/tickets");
const nodemailer = require("nodemailer");
const CommentModel = require("../models/comment");
const { uuid } = require("uuidv4");
const PollModel = require("../models/poll");
const { google } = require("googleapis");

function generatePass() {
	let pass = "";
	let str =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz0123456789@#$";

	for (let i = 1; i <= 8; i++) {
		let char = Math.floor(Math.random() * str.length + 1);

		pass += str.charAt(char);
	}

	return pass;
}

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; //DONT EDIT THIS
const MY_EMAIL = "roshan.sharmaa12@gmail.com";

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const email = async (to, subject, html) => {
	const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
	const transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: MY_EMAIL,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN,
			accessToken: ACCESS_TOKEN,
		},
	});
	const from = MY_EMAIL;
	return new Promise((resolve, reject) => {
		transport.sendMail({ from, subject, to, html }, (err, info) => {
			if (err) reject(err);
			resolve(info);
		});
	});
};

Router.get("/send", async (req, res) => {
	res.send("Hello");
});

Router.post("/buyTicket", async (req, res) => {
	try {
		const price = { Basic: 50.0, Standard: 100.0, Premium: 300.0 };
		let infoList = "";
		for (var i = 1; i <= req.body.qty; i++) {
			const tid = uuid();
			const password = generatePass();
			infoList += `<li>
					<i>
						Ticket Id: ${tid} <br/>Ticket Password: ${password}
					</i>
				</li>`;
			const ticket = new TicketModel({
				...req.body,
				tid,
				password,
				pricePaid: price[req.body.type],
			});
			await ticket.save();
		}
		const info = await email(
			req.body.email,
			"Ticket Booked Successfully!!",
			`<h2>Your ticked has been booked successfully!!</h2>
			<br />
			Information regarding your ticket is given below:
			<ul>
				${infoList}
			</ul>
			`
		);
		return res.status(200).json({
			message: "Ticket Purchased successfully!",
			messageId: info.messageId,
		});
	} catch (err) {
		res.status(500).json({ message: "Something went wrong!" });
		console.log(err);
	}
});

Router.patch("/authTicket", async (req, res) => {
	try {
		const ticket = await TicketModel.findOne({
			tid: req.body.tid,
			password: req.body.password,
		});
		if (ticket) {
			return res.status(200).json({
				message: "Ticket Authenticated successfully!",
				data: ticket,
			});
		} else {
			return res.status(401).json({
				message: "Invalid Data!",
			});
		}
	} catch (err) {
		res.status(500).json({ message: "Something went wrong!" });
		console.log(err);
	}
});

Router.post("/addProduct", async (req, res) => {
	try {
		await new ShopModel({ ...req.body }).save();
		return res.json({ message: "Product created successfully!" });
	} catch (err) {
		console.log(err);
		return res.json({ message: "Something went wrong. Please try again!" });
	}
});

Router.get("/products", async (req, res) => {
	try {
		return res.json({
			message: "Product Found successfully!",
			data: await ShopModel.find({}),
		});
	} catch (err) {
		console.log(err);
		return res.json({ message: "Something went wrong. Please try again!" });
	}
});

Router.post("/orderProduct", async (req, res) => {
	try {
		await new OrderModel({ ...req.body }).save();
		const info = await email(
			req.body.email,
			"Product Ordered Successfully!!",
			`<h2>Your Order has been placed successfully!!</h2>
			<br />
			Your order will be shipped withing next 3 or 4 days at ${req.body.address}.
			`
		);
		return res.json({ message: "Product ordered successfully!" });
	} catch (err) {
		console.log(err);
		return res.json({ message: "Something went wrong. Please try again!" });
	}
});
Router.post("/addComment", async (req, res) => {
	try {
		await new CommentModel({ ...req.body }).save();
		return res.json({ message: "Comment Added successfully!" });
	} catch (err) {
		console.log(err);
		return res.json({ message: "Something went wrong. Please try again!" });
	}
});
Router.get("/getComments", async (req, res) => {
	try {
		return res.json({
			message: "Comments Found successfully!",
			data: await CommentModel.find({}),
		});
	} catch (err) {
		console.log(err);
		return res.json({ message: "Something went wrong. Please try again!" });
	}
});

Router.post("/addPoll", async (req, res) => {
	try {
		await PollModel.deleteOne({ tid: req.body.tid });
		await new PollModel({ ...req.body }).save();
		return res.json({ message: "Poll Added successfully!" });
	} catch (err) {
		console.log(err);
		return res.json({ message: "Something went wrong. Please try again!" });
	}
});
Router.get("/getPolls", async (req, res) => {
	try {
		return res.json({
			message: "Polls Found successfully!",
			data: await PollModel.find({}),
		});
	} catch (err) {
		console.log(err);
		return res.json({ message: "Something went wrong. Please try again!" });
	}
});

module.exports = Router;
