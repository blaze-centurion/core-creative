const ShopCard = ({
	pid,
	name,
	price,
	qty,
	img,
	setModalOpen,
	setPid,
	setPrice,
}) => {
	const addToCart = () => {
		// localStorage.setItem("pid", pid);
		// localStorage.setItem("name", name);
		// localStorage.setItem("price", price);
		// localStorage.setItem("qty", qty);
		// localStorage.setItem("img", img);
		// alert("Product added to cart!!");
	};

	return (
		<>
			<article
				style={{
					padding: "7px 0.3rem 0rem 0.3rem",
					marginTop: "0",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
				key={pid}
			>
				<img src={img} className="card_img" alt="" />
				<small
					style={{ fontSize: "14px", padding: "0 20px" }}
					className="secondary"
				>
					{pid}
				</small>
				<div
					style={{
						padding: "5px 20PX",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<small style={{ fontSize: "15pxs" }}>{name}</small>
					<small style={{ fontSize: "15pxs" }}>${price}</small>
				</div>
				<small
					style={{ fontSize: "14px", padding: "0 20px" }}
					className="secondary"
				>
					{qty} Items Left
				</small>

				<div className="grid" style={{ padding: "10px 20px" }}>
					<button role="button" onClick={addToCart}>
						<small>Add to Cart</small>
					</button>
					<button
						className="outline"
						role="button"
						onClick={() => {
							setModalOpen(true);
							setPid(pid);
							setPrice(price);
						}}
					>
						<small>Buy Now</small>
					</button>
				</div>
			</article>
		</>
	);
};

export default ShopCard;
