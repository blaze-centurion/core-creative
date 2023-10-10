import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Pusher from "pusher-js";
import Auth from "@/components/Auth";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const graphdata = [
	{
		name: "Poll",
		"Salman Khan": 0,
		"Kanye West": 0,
		amt: 2400,
	},
];

const Match = () => {
	const [showPicker, setShowPicker] = useState(false);
	const [input, setInput] = useState("");
	const [comments, setComments] = useState([]);
	const [isAuth, setAuth] = useState(false);
	const [sactive, setSActive] = useState(false);
	const [kactive, setKActive] = useState(false);
	const [pollData, setPollData] = useState([
		{
			name: "Poll",
			"Salman Khan": 4000,
			"Kanye West": 2400,
		},
	]);

	useEffect(() => {
		getComments();
	});

	useEffect(() => {
		const auth = localStorage.getItem("isAuth");
		const a = localStorage.getItem("poll");
		setAuth(() => {
			if (auth == "true") {
				return true;
			}
			return false;
		});
		if (a) {
			setSActive(false);
			setKActive(true);
		} else {
			setSActive(true);
			setKActive(false);
		}
		getPoll();

		var pusher = new Pusher("ab3aefe8cf33aac695cf", {
			cluster: "ap2",
		});

		var channel = pusher.subscribe("comment_channel");
		channel.bind("new_comment", function (data) {
			setComments((prev) => prev.concat([data]));
		});

		return () => {
			pusher.unbind_all();
			pusher.unsubscribe();
		};
	}, []);

	const onSelect = (emojiData) => {
		setInput((prev) => prev + emojiData.native);
	};

	const getComments = async () => {
		try {
			const res = await fetch(
				`http://localhost:4000/api/v1/getComments`,
				{
					method: "GET",
				}
			);
			const data = await res.json();
			setComments(data.data);
		} catch (err) {
			console.log(err);
		}
	};

	const addComment = async () => {
		const tid = localStorage.getItem("tid", data.tid);
		const name = localStorage.getItem("name", data.name);
		const email = localStorage.getItem("email", data.email);
		const phone = localStorage.getItem("phoneNo", data.phoneNo);
		const date = new Date();

		const res = await fetch(`http://localhost:4000/api/v1/addComment`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				phone: phone,
				name: name,
				date: date.toLocaleDateString(),
				comment: input,
				tid: tid,
				time: date.toLocaleTimeString(),
			}),
		});
		setInput("");
	};

	const vote = async (a) => {
		// a: 0 -> Kanye , 1 -> Salman
		const tid = localStorage.getItem("tid", data.tid);
		const res = await fetch(`http://localhost:4000/api/v1/addPoll`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: a ? "Kanye West" : "Salman Khan",
				time: new Date(),
				tid: tid,
			}),
		});
		localStorage.setItem("poll", a);
		if (a) {
			setSActive(false);
			setKActive(true);
		} else {
			setSActive(true);
			setKActive(false);
		}
	};

	const getPoll = async () => {
		const res = await fetch(`http://localhost:4000/api/v1/getPolls`, {
			method: "GET",
		});
		const { data } = await res.json();
		let spoll = 0;
		let kpoll = 0;
		data.forEach((poll, i) => {
			console.log("====================================");
			console.log(poll);
			console.log("====================================");
			if (poll.name === "Salman Khan") {
				spoll += 1;
			} else {
				kpoll += 1;
			}
		});
		setPollData([
			{ name: "Poll", "Salman Khan": spoll, "Kanye West": kpoll },
		]);
	};

	return (
		<>
			<Navbar />

			{!isAuth ? (
				<Auth setAuth={setAuth} />
			) : (
				<>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr",
							padding: "3rem 3rem",
						}}
					>
						<div
							style={{
								background: "yellow",
								width: "100%",
								height: "75vh",
							}}
						>
							as
						</div>
						<div
							style={{
								width: "100%",
								marginLeft: 10,
								display: "grid",
								gridTemplateRows: "7fr 1fr",
								background: "#28292a",
								height: "75vh",
							}}
						>
							<ul className="comment_box">
								{comments.map((val, ind) => {
									return (
										<li key={ind}>
											<div className="comment_box_profile_img">
												<img src="user.jpg" alt="" />
											</div>
											<span>{val.comment} </span>
											<small>10:24 AM</small>
										</li>
									);
								})}
							</ul>
							<div
								style={{
									padding: "10px",
									borderTop: "1px solid #eee",
									outline: "none",
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<input
									type="text"
									placeholder="Type..."
									style={{
										margin: 0,
										alignSelf: "stretch",
										width: "100%",
									}}
									value={input}
									onChange={(e) => setInput(e.target.value)}
								/>
								<span
									style={{
										width: "30px",
										margin: "0 10px",
										cursor: "pointer",
										position: "relative",
									}}
									className="emoji_btn"
								>
									{showPicker ? (
										<Picker
											data={data}
											onEmojiSelect={onSelect}
										/>
									) : null}
									<p
										onClick={() =>
											setShowPicker((prev) => !prev)
										}
										style={{ margin: "0" }}
									>
										😀
									</p>
								</span>
								<button
									style={{
										width: "fit-content",
										marginBottom: 0,
									}}
									onClick={() => addComment()}
								>
									<AiOutlineSend fill="#fff" />
								</button>
							</div>
						</div>
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr",
							padding: "3rem 3rem",
						}}
					>
						<div>
							<BarChart width={800} height={550} data={pollData}>
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="Salman Khan" fill="#8884d8" />
								<Bar dataKey="Kanye West" fill="#82ca9d" />
							</BarChart>
						</div>
						<div>
							<h2
								style={{
									marginBottom: "1.5rem",
									fontWeight: "500",
								}}
							>
								Who Do You Support?
							</h2>
							<button
								className={sactive ? "" : "outline"}
								onClick={() => vote(0)}
								role="button"
							>
								Salman Khan
							</button>
							<button
								className={kactive ? "" : "outline"}
								onClick={() => vote(1)}
								role="button"
							>
								Kanye West
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Match;
