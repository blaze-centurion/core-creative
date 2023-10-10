const express = require("express");
const Router = express.Router();
const OrderModel = require("../models/orders");
const ShopModel = require("../models/shop");
const TicketModel = require("../models/tickets");
const nodemailer = require("nodemailer");
const CommentModel = require("../models/comment");
const { uuid } = require("uuidv4");
const PollModel = require("../models/poll");

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

Router.get("/", (req, res) => {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "roshan.sharmaa12@gmail.com",
			pass: "StrongPassword1#",
		},
	});

	var mailOptions = {
		from: "roshan.sharmaa12@gmail.com",
		to: "sharmaa.roshan11@gmail.com",
		subject: "Sending Email using Node.js",
		text: "That was easy!",
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("error: " + error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});

	res.send("Hello");
});

Router.post("/buyTicket", async (req, res) => {
	try {
		const price = { Basic: 50.0, Standard: 100.0, Premium: 300.0 };
		for (var i = 1; i <= req.body.qty; i++) {
			const tid = uuid();
			const password = generatePass();
			const ticket = new TicketModel({
				...req.body,
				tid,
				password,
				pricePaid: price[req.body.type],
			});
			await ticket.save();
		}
		return res.status(200).json({
			message: "Ticket Purchased successfully!",
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
