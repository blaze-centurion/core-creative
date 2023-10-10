const Container = ({ children, title, body_style }) => {
	return (
		<>
			<div className="container">
				<div className="container_header">
					<h2>{title}</h2>
				</div>
				<div className="container_body" style={body_style}>
					{children}
				</div>
			</div>
		</>
	);
};

export default Container;
