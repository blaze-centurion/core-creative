import Link from "next/link";

const Navbar = () => {
	return (
		<>
			<nav style={{ padding: "10px 2rem" }}>
				<ul>
					<li>
					<Link href="/" style={{color:"#bbc6ce", fontWeight:"500"}}>
						RealmWave
					</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link href="/">
							<small>Home</small>
						</Link>
					</li>
					{/* <li>
						<Link href="/about">
							<small>About</small>
						</Link>
					</li> */}
					<li>
						<Link href="/shop">
							<small>Shop</small>
						</Link>
					</li>
					<li>
						<Link href="/ticket">
							<small>Tickets</small>
						</Link>
					</li>
					<li>
						<Link href="/match" role="button">
							<small>Watch Match</small>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
