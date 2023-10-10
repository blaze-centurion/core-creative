import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import TicketCard from "@/components/TicketCard";

const Ticket = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [ticketType, setTicketType] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [noOfTickets, setNoOfTickets] = useState(1);
	const [upi, setUpi] = useState("");
	const price = { Basic: 50.0, Standard: 100.0, Premium: 300.0 };

	const buyTicket = async () => {
		const res = await fetch(`http://localhost:4000/api/v1/buyTicket`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				phone: Number(phone),
				name: name,
				qty: Number(noOfTickets),
				upiid: upi,
				type: ticketType,
			}),
		});
		const data = await res.json();
		if (res.status !== 200) {
			alert("Something went wrong");
		} else {
			setModalOpen(false);
		}
	};

	return (
		<>
			<Navbar />

			<div
				className="container"
				style={{ textAlign: "center", marginTop: "1.5rem" }}
			>
				<h2 className="container_heading">Choose a ticket</h2>
			</div>
			<dialog id="modal-example" open={modalOpen}>
				<article>
					<a
						href="#close"
						aria-label="Close"
						class="close"
						data-target="modal-example"
						onClick={() => setModalOpen(false)}
					></a>
					<h3 style={{ fontWeight: "500" }}>
						Purchase a {ticketType} ticket
					</h3>
					<form>
						<label for="name">
							Name
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Enter your name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label for="email">
							Email
							<input
								type="text"
								id="email"
								name="email"
								placeholder="Enter your email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<label for="phone">
							Phone No.
							<input
								type="text"
								id="phone"
								name="phone"
								placeholder="Enter your phone no."
								required
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</label>
						<label for="nooftickets">
							No of tickets
							<input
								type="number"
								min="1"
								max="10"
								id="nooftickets"
								name="nooftickets"
								value={noOfTickets}
								onChange={(e) => setNoOfTickets(e.target.value)}
							/>
						</label>
						<label for="upiid">
							UPI
							<input
								type="text"
								id="upiid"
								name="upiid"
								placeholder="Enter your upi no."
								required
								value={upi}
								onChange={(e) => setUpi(e.target.value)}
							/>
						</label>
					</form>
					<h2
						style={{
							fontSize: "25px",
							fontWeight: "500",
							marginTop: "10px",
						}}
					>
						Total Price: ${price[ticketType] * noOfTickets}
					</h2>
					<footer style={{ marginTop: 0 }}>
						<a
							href="#cancel"
							role="button"
							class="secondary"
							data-target="modal-example"
							onClick={() => setModalOpen(false)}
						>
							Cancel
						</a>
						<a
							href="#confirm"
							role="button"
							data-target="modal-example"
							onClick={() => buyTicket()}
						>
							Confirm
						</a>
					</footer>
				</article>
			</dialog>

			<div className="grid" style={{ padding: "2rem 3.5rem" }}>
				<TicketCard
					setModalOpen={setModalOpen}
					setTicketType={setTicketType}
					type="Basic"
					price="$45.00"
				>
					<li>
						<small>Watch Stream Online</small>
						<BsCheck2Circle fill="green" />
					</li>
					<li>
						<small>Watch Stream at stadium</small>
						<MdOutlineCancel fill="red" />
					</li>
					<li>
						<small>
							Opportunity to meet and get an autograph of Salman
							and Kanye
						</small>
						<MdOutlineCancel fill="red" />
					</li>
				</TicketCard>
				<TicketCard
					setModalOpen={setModalOpen}
					setTicketType={setTicketType}
					type="Standard"
					price="$100.00"
				>
					<li>
						<small>Watch Stream Online</small>
						<BsCheck2Circle fill="green" />
					</li>
					<li>
						<small>Watch Stream at stadium</small>
						<BsCheck2Circle fill="green" />
					</li>
					<li>
						<small>
							Opportunity to meet and get an autograph of Salman
							and Kanye
						</small>
						<MdOutlineCancel fill="red" />
					</li>
				</TicketCard>
				<TicketCard
					setModalOpen={setModalOpen}
					setTicketType={setTicketType}
					type="Premium"
					price="$300.00"
				>
					<li>
						<small>Watch Stream Online</small>
						<BsCheck2Circle fill="green" />
					</li>
					<li>
						<small>Watch Stream at stadium</small>
						<BsCheck2Circle fill="green" />
					</li>
					<li>
						<small>
							Opportunity to meet and get an autograph of Salman
							and Kanye
						</small>
						<BsCheck2Circle fill="green" />
					</li>
				</TicketCard>
			</div>
		</>
	);
};

export default Ticket;
