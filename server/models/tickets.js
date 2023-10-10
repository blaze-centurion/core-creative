const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
	tid: String,
	email: String,
	name: String,
	phoneNo: Number,
	password: String,
	pricePaid: Number,
	type: String,
	upiid: String,
});

const TicketModel = mongoose.model("Ticket", TicketSchema);
module.exports = TicketModel;
