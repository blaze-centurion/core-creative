import Link from "next/link";

const Banner = () => {
	return (
		<>
			<div className="banner_box">
				<div
					className="grid"
					style={{
						gridTemplateColumns: "0.9fr 1fr",
						alignItems: "center",
					}}
				>
					<div>
						<h1
							style={{
								fontWeight: "500",
								marginBottom: "1rem",
								fontSize: "45px",
							}}
						>
							Fight of the Century
						</h1>
						<ul className="info_list" style={{fontSize:"19px"}}>
							<li>
								On 23
								<sup>rd</sup> October, 2023
							</li>
							<li>At Vasant Kunj, New Delhi</li>
							<li>An After Show Autograph Event</li>
						</ul>
						<Link href="/ticket" role="button">
							<small>Buy the ticket</small>
						</Link>
					</div>
					<div>
						<img
							src="boxingring-removebg-preview.png"
							alt=""
							style={{ width: "-webkit-fill-available",transform:"scale(1.2)" }}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Banner;
