const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
	time: String,
	tid: String,
	name: String,
});

const PollModel = mongoose.model("Poll", PollSchema);
module.exports = PollModel;
