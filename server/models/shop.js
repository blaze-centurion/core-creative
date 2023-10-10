const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
	pid: String,
	name: String,
	price: String,
	qty: Number,
	img: String,
});

const ShopModel = mongoose.model("Shop", ShopSchema);
module.exports = ShopModel;
