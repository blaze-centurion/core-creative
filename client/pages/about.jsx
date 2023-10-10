import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const About = () => {
	return (
		<>
			<Navbar />
			<div
				className="container"
				style={{ textAlign: "center", marginTop: "1.5rem" }}
			>
				<h2 className="container_heading">How it started?</h2>
			</div>
			<div
				style={{
					margin: "0.6rem 0",
					padding: "2rem",
					textAlign: "center",
				}}
			>
				<img
					src="collage.jpg"
					alt="Minimal landscape"
					style={{ borderRadius: 5, maxHeight: "700px" }}
				/>
			</div>
			<p
				style={{
					padding: "2rem 3rem",
					fontSize:"18px"
				}}
			>
				In july 2023, tensions escalated between unlikely stars... in one corner we have Kanye West, a rapper, record producer and fashion designer. In the other corner stands Salman Khan, an actor and film producer.
It all began when Salman Khan started dating Kanye West's ex wife, Kim Kardashian...
However, the feud ignited when Kanye, being Kanye, didn't just shrug it off, but boldly challenged Salman to a boxing match... and Salman accepted.

			</p>
			<Footer />
		</>
	);
};

export default About;
