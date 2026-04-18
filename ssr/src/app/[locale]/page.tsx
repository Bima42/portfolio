import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

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
