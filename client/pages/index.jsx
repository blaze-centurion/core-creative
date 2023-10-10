import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ShopCard from "@/components/ShopCard";
import ShopModal from "@/components/ShopModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Index = () => {
	const [products, setProducts] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [price, setPrice] = useState("");
	const [pid, setPid] = useState("");

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		try {
			const res = await fetch(`http://localhost:4000/api/v1/products`, {
				method: "GET",
			});
			const { data } = await res.json();
			setProducts(data.slice(0, 5));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Navbar />
			<Banner />
			<ShopModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				price={price}
				pid={pid}
			/>

			<div
				className="container"
				style={{ textAlign: "center", marginTop: "1.5rem" }}
			>
				<h2 className="container_heading">Shop</h2>
			</div>

			<div style={{ marginTop: "2rem" }}>
				<div
					className="grid"
					style={{
						padding: "1rem 3.5rem",
						paddingBottom: "0",
						gridTemplateColumns: "repeat(3,1fr)",
					}}
				>
					{products.map((product) => {
						return (
							<ShopCard
								pid={product.pid}
								name={product.name}
								price={product.price}
								qty={product.qty}
								img={product.img}
								setModalOpen={setModalOpen}
								setPid={setPid}
								setPrice={setPrice}
							/>
						);
					})}
				</div>
			</div>

			<div
				className="container"
				style={{ textAlign: "center", marginTop: "1.5rem" }}
			>
				<h2 className="container_heading">How it started?</h2>
			</div>
			<div
				className="container"
				style={{
					padding: "3rem 0rem",
					display: "grid",
					gridTemplateColumns: "1.2fr 2fr",
				}}
			>
				<div>
					<img
						src="collage.jpg"
						alt="Minimal landscape"
						style={{ borderRadius: 5 }}
					/>
				</div>
				<div style={{ marginLeft: "1rem", marginTop: "10px" }}>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ipsa dolor dolorem minus quo! Voluptate excepturi
						dolores eligendi aliquam nemo cum. Aliquid mollitia
						tempore adipisci? Pariatur, sapiente iure! Libero,
						deserunt quibusdam!Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Ipsa dolor dolorem minus
						quo! Voluptate excepturi dolores eligendi aliquam nemo
						cum. Aliquid mollitia tempore adipisci? Pariatur,
						sapiente iure! Libero, deserunt quibusdam!
					</p>

					<Link href="/ticket" className="outline" role="button">
						<small>See More</small>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Index;
