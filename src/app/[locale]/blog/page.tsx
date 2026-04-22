import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlogArchiveList } from "@/components/blog/BlogArchiveList";
import { BlogIndexCard } from "@/components/blog/BlogIndexCard";
import { BlogNav } from "@/components/blog/BlogNav";
import { getBlogPosts } from "@/lib/blog";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "blog" });

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		openGraph: {
			title: t("metaTitle"),
			description: t("ogDescription"),
			type: "website",
		},
		alternates: {
			canonical: `/${locale}/blog`,
			languages: {
				en: "/en/blog",
				fr: "/fr/blog",
				"x-default": "/en/blog",
			},
		},
	};
}

export default async function BlogIndexPage({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "blog" });
	const posts = getBlogPosts(locale);
	const [featured, ...archive] = posts;

	return (
		<>
			<BlogNav locale={locale} />

			<main className="max-w-[720px] mx-auto px-6 pb-[120px] pt-20">
				<header className="mb-14">
					<p className="font-mono text-[11px] text-fg-faint tracking-[0.08em] uppercase mb-3">
						{t("eyebrow", { count: posts.length })}
					</p>
					<h1 className="text-[3rem] font-semibold tracking-tighter leading-tight mb-4">
						{t("heading")}
					</h1>
					<p className="text-lg text-fg-muted leading-relaxed max-w-[560px]">
						{t("subheading")}
					</p>
				</header>

				{featured && (
					<section className="mb-12">
						<p className="font-mono text-[11px] text-fg-faint tracking-[0.08em] uppercase mb-5">
							{t("featured")}
						</p>
						<BlogIndexCard post={featured} locale={locale} />
					</section>
				)}

				{archive.length > 0 && (
					<section>
						<p className="font-mono text-[11px] text-fg-faint tracking-[0.08em] uppercase mb-4">
							{t("archive")}
						</p>
						<BlogArchiveList posts={archive} locale={locale} />
					</section>
				)}
			</main>
		</>
	);
}
