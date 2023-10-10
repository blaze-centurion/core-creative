import React, { useState } from "react";

const ShopModal = ({ modalOpen, setModalOpen, price, pid }) => {
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [upi, setUpi] = useState("");
	const [qty, setQty] = useState(1);

	const buyProduct = async () => {
		const res = await fetch(`http://localhost:4000/api/v1/orderProduct`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				phone: Number(phone),
				name: name,
				products: [{ pid, qty, price }],
				upiid: upi,
				date: new Date().toLocaleDateString(),
				address: address,
			}),
		});
		// const data = await res.json();
		if (res.status !== 200) {
			alert("Something went wrong");
		} else {
			setModalOpen(false);
			alert("Product orders successfully!!");
		}
	};

	return (
		<>
			<dialog id="modal-example" open={modalOpen}>
				<article>
					<a
						href="#close"
						aria-label="Close"
						className="close"
						data-target="modal-example"
						onClick={() => setModalOpen(false)}
					></a>
					<h3 style={{ fontWeight: "500" }}>Purchase</h3>
					<form>
						<label htmlFor="name">
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
						<label htmlFor="email">
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
						<label htmlFor="phone">
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
						<label htmlFor="address">
							Address
							<textarea
								type="text"
								id="address"
								name="address"
								placeholder="Enter your address"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</label>
						<label htmlFor="noofproducts">
							No of products
							<input
								type="number"
								min="1"
								max="10"
								id="noofproducts"
								name="noofproducts"
								value={qty}
								onChange={(e) => setQty(e.target.value)}
							/>
						</label>
						<label htmlFor="upiid">
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
						Total Price: ${price}
					</h2>
					<footer style={{ marginTop: 0 }}>
						<a
							href="#cancel"
							role="button"
							className="secondary"
							data-target="modal-example"
							onClick={() => setModalOpen(false)}
						>
							Cancel
						</a>
						<a
							href="#confirm"
							role="button"
							data-target="modal-example"
							onClick={() => buyProduct()}
						>
							Buy
						</a>
					</footer>
				</article>
			</dialog>
		</>
	);
};

export default ShopModal;
