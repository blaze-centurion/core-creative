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
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
				deserunt voluptates harum ipsum aspernatur vitae ab fugit, optio
				maxime natus? Adipisci quae ex accusantium, explicabo ut esse
				iusto est placeat! Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Dolor deserunt voluptates harum ipsum
				aspernatur vitae ab fugit, optio maxime natus? Adipisci quae ex
				accusantium, explicabo ut esse iusto est placeat! Lorem ipsum
				dolor sit amet consectetur adipisicing elit. Dolor deserunt
				voluptates harum ipsum aspernatur vitae ab fugit, optio maxime
				natus? Adipisci quae ex accusantium, explicabo ut esse iusto est
				placeat! Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Dolor deserunt voluptates harum ipsum aspernatur vitae ab
				fugit, optio maxime natus? Adipisci quae ex accusantium,
				explicabo ut esse iusto est placeat! Lorem ipsum dolor sit amet
				consectetur adipisicing elit. Dolor deserunt voluptates harum
				ipsum aspernatur vitae ab fugit, optio maxime natus? Adipisci
				quae ex accusantium, explicabo ut esse iusto est placeat! Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Dolor
				deserunt voluptates harum ipsum aspernatur vitae ab fugit, optio
				maxime natus? Adipisci quae ex accusantium, explicabo ut esse
				iusto est placeat! Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Dolor deserunt voluptates harum ipsum
				aspernatur vitae ab fugit, optio maxime natus? Adipisci quae ex
				accusantium, explicabo ut esse iusto est placeat! Lorem ipsum
				dolor sit amet consectetur adipisicing elit. Dolor deserunt
				voluptates harum ipsum aspernatur vitae ab fugit, optio maxime
				natus? Adipisci quae ex accusantium, explicabo ut esse iusto est
				placeat! Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Dolor deserunt voluptates harum ipsum aspernatur vitae ab
				fugit, optio maxime natus? Adipisci quae ex accusantium,
				explicabo ut esse iusto est placeat! Lorem ipsum dolor sit amet
				consectetur adipisicing elit. Dolor deserunt voluptates harum
				ipsum aspernatur vitae ab fugit, optio maxime natus? Adipisci
				quae ex accusantium, explicabo ut esse iusto est placeat! Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Dolor
				deserunt voluptates harum ipsum aspernatur vitae ab fugit, optio
				maxime natus? Adipisci quae ex accusantium, explicabo ut esse
				iusto est placeat! Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Dolor deserunt voluptates harum ipsum
				aspernatur vitae ab fugit, optio maxime natus? Adipisci quae ex
				accusantium, explicabo ut esse iusto est placeat!
			</p>
			<Footer />
		</>
	);
};

export default About;
