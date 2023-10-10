const TicketCard = ({ children, price, type, setModalOpen, setTicketType }) => {
	return (
		<>
			<article>
				<h1 className="ticket_price">{price}</h1>
				<div className="card_type">
					<div className="line"></div>
					<h4 style={{ fontWeight: "400", margin: "0 5px",fontSize:"22px" }}>
						{type}
					</h4>
					<div className="line"></div>
				</div>
				<ul className="ticket_card_list" style={{fontSize:"19px"}}>{children}</ul>
				<div className="grid">
					<button
						className="outline"
						role="button"
						onClick={() => {
							setModalOpen(true);
							setTicketType(type);
						}}
					>
						<small>Buy Now</small>
					</button>
				</div>
			</article>
		</>
	);
};

export default TicketCard;
