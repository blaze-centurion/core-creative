import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShopCard from "@/components/ShopCard";
import ShopModal from "@/components/ShopModal";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [filterProducts, setFilterProducts] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	// const [buyingProducts, setBuyingProducts] = useState([]);
	const [price, setPrice] = useState("");
	const [pid, setPid] = useState("");
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		try {
			const res = await fetch(`http://localhost:4000/api/v1/products`, {
				method: "GET",
			});
			const { data } = await res.json();
			setProducts(data);
			setFilterProducts(data);
		} catch (err) {
			console.log(err);
		}
	};

	const search = () => {
		setFilterProducts((prev) => {
			if (!searchInput) {
				return prev;
			}
			return products.filter((product) =>
				product.name.toLowerCase().includes(searchInput.toLowerCase())
			);
		});
	};

	return (
		<>
			<Navbar />
			<div
				className="container"
				style={{ textAlign: "center", marginTop: "1.5rem" }}
			>
				<h2 className="container_heading">Shop</h2>
			</div>
			<ShopModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				price={price}
				pid={pid}
			/>

			<form
				style={{
					maxWidth: "60%",
					margin: "3rem auto",
					display: "flex",
				}}
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					type="search"
					placeholder="Product name..."
					style={{ borderRadius: "10px" }}
					value={searchInput}
					onChange={(e) => {
						setSearchInput(e.target.value);
						search();
					}}
				/>
				<button style={{ width: "fit-content", marginLeft: "10px" }}>
					<AiOutlineShoppingCart fontSize="25px" />
				</button>
			</form>

			<div
				className="grid"
				style={{
					padding: "1rem 3.5rem",
					paddingBottom: "0",
					gridTemplateColumns: "repeat(3,1fr)",
				}}
			>
				{filterProducts.map((product, i) => {
					return (
						<ShopCard
							key={i}
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

			<Footer />
		</>
	);
};

export default Shop;
