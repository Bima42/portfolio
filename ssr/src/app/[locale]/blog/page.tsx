import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { BlogNav } from "@/components/blog/BlogNav";
import { BlogIndexCard } from "@/components/blog/BlogIndexCard";
import { BlogArchiveList } from "@/components/blog/BlogArchiveList";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const isFr = locale === "fr";

	return {
		title: isFr
			? "Écriture — Tanguy Pauvret"
			: "Writing — Tanguy Pauvret",
		description: isFr
			? "Notes d'ingénierie sur les systèmes, l'architecture et les décisions techniques qui comptent."
			: "Engineering notes on systems, architecture, and the technical decisions that matter.",
		openGraph: {
			title: isFr ? "Écriture — Tanguy Pauvret" : "Writing — Tanguy Pauvret",
			description: isFr
				? "Notes d'ingénierie sur les systèmes, l'architecture et les décisions techniques."
				: "Engineering notes on systems, architecture, and technical decisions.",
			type: "website",
		},
		alternates: {
			canonical: `/${locale}/blog`,
			languages: {
				en: "/en/blog",
				fr: "/fr/blog",
			},
		},
	};
}

export default async function BlogIndexPage({ params }: Props) {
	const { locale } = await params;
	const posts = getBlogPosts(locale);
	const [featured, ...archive] = posts;

	const isFr = locale === "fr";

	return (
		<>
			<BlogNav locale={locale} />

			<main className="max-w-[720px] mx-auto px-6 pb-[120px] pt-20">
				{/* Header */}
				<header className="mb-14">
					<p className="font-mono text-[11px] text-fg-faint tracking-[0.08em] uppercase mb-3">
						{isFr
							? `Écriture · ${posts.length} articles`
							: `Writing · ${posts.length} articles`}
					</p>
					<h1 className="text-[3rem] font-semibold tracking-tighter leading-tight mb-4">
						{isFr
							? "Notes d'un ingénieur qui travaille."
							: "Notes from a working engineer."}
					</h1>
					<p className="text-lg text-fg-muted leading-relaxed max-w-[560px]">
						{isFr
							? "Essais sur les systèmes, l'architecture, et les décisions lentes et ennuyeuses qui déterminent si une équipe livre en mars ou en juillet."
							: "Essays on systems, architecture, and the boring slow decisions that decide whether a team ships in March or July."}
					</p>
				</header>

				{/* Featured */}
				{featured && (
					<section className="mb-12">
						<p className="font-mono text-[11px] text-fg-faint tracking-[0.08em] uppercase mb-5">
							{isFr ? "À la une" : "Featured"}
						</p>
						<BlogIndexCard post={featured} locale={locale} />
					</section>
				)}

				{/* Archive */}
				{archive.length > 0 && (
					<section>
						<p className="font-mono text-[11px] text-fg-faint tracking-[0.08em] uppercase mb-4">
							{isFr ? "Archive" : "Archive"}
						</p>
						<BlogArchiveList posts={archive} locale={locale} />
					</section>
				)}
			</main>
		</>
	);
}
