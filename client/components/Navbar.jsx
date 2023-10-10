import Link from "next/link";

const Navbar = () => {
	return (
		<>
			<nav style={{ padding: "10px 2rem" }}>
				<ul>
					<li>
						<strong>RealmWave</strong>
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
