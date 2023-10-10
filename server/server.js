require("dotenv/config");

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const compression = require("compression");

require("./db/conn");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(
	compression({
		level: 6,
	})
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", require("./routes/router"));

app.get("/", (req, res) => {
	res.send("Welcome to Server");
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
	console.log(`Api Server running at http://localhost:${PORT}/api/v1`);
});
