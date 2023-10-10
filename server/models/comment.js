const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	email: String,
	phone: String,
	name: String,
	date: String,
	comment: String,
	tid: String,
	time: String,
});

const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;
