import { Header } from "@/components/layout/Header";
import { About } from "@/components/landing/about/About";
import { Contact } from "@/components/landing/Contact";
import { Hero } from "@/components/landing/Hero";
import { Projects } from "@/components/landing/projects/Projects";

export default function HomePage() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<About />
				<Projects />
				<Contact />
			</main>
		</>
	);
}
