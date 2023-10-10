const mongoose = require("mongoose");
const Pusher = require("pusher");

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log("Connection established");
	})
	.catch((err) => console.log(err));

const db = mongoose.connection;
const pusher = new Pusher({
	appId: "1684498",
	key: "ab3aefe8cf33aac695cf",
	secret: "abd12b0843b26925dcce",
	cluster: "ap2",
	useTLS: true,
});

db.once("open", () => {
	const commentsCollection = db.collection("comments");
	const commentsChangeStream = commentsCollection.watch();
	commentsChangeStream.on("change", (change) => {
		if (change.operationType === "insert") {
			const commentDetails = change.fullDocument;
			pusher.trigger("comment_channel", "new_comment", {
				_id: commentDetails._id,
				email: commentDetails.email,
				phone: commentDetails.phone,
				name: commentDetails.name,
				date: commentDetails.date,
				comment: commentDetails.comment,
				time: commentDetails.time,
				tid: commentDetails.tid,
			});
		}
	});
});
