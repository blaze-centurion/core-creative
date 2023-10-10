const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	email: String,
	address: String,
	phone: String,
	name: String,
	date: String,
	products: [
		{
			pid: String,
			qty: Number,
			price: String,
		},
	],
	upiid: String,
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
