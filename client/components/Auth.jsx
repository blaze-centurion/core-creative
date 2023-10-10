import { useState } from "react";

const Auth = ({ setAuth }) => {
	const [ticketId, setTicketId] = useState("");
	const [ticketPassword, setTicketPassword] = useState("");

	const authTicket = async () => {
		const res = await fetch(`http://localhost:4000/api/v1/authTicket`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				tid: ticketId,
				password: ticketPassword,
			}),
		});
		if (res.status === 200) {
			const { data } = await res.json();
			localStorage.setItem("isAuth", true);
			localStorage.setItem("tid", data.tid);
			localStorage.setItem("name", data.name);
			localStorage.setItem("email", data.email);
			localStorage.setItem("phoneNo", data.phoneNo);
			localStorage.setItem("type", data.type);
			setAuth(true);
		}
	};

	return (
		<>
			<form
				style={{
					maxWidth: "500px",
					background: "#22272E",
					margin: "3rem auto",
					padding: "2rem",
					borderRadius: "10px",
				}}
			>
				<label htmlFor="ticketid">
					Ticket ID
					<input
						type="text"
						id="ticketid"
						name="ticketid"
						placeholder="Enter your ticket id"
						required
						value={ticketId}
						onChange={(e) => setTicketId(e.target.value)}
					/>
				</label>
				<label htmlFor="ticketpwd">
					Ticket Password
					<input
						type="text"
						id="ticketpwd"
						name="ticketpwd"
						placeholder="Enter your ticket password"
						required
						value={ticketPassword}
						onChange={(e) => setTicketPassword(e.target.value)}
					/>
				</label>
				<a
					href="#login"
					role="button"
					style={{ marginTop: "1rem", display: "block" }}
					onClick={authTicket}
				>
					Login
				</a>
			</form>
		</>
	);
};

export default Auth;
