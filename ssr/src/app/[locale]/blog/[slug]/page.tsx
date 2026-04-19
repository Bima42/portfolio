import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogNav } from "@/components/blog/BlogNav";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { mdxOptions, rehypeExtractHeadings, type TocHeading } from "@/lib/mdx";

type Props = {
	params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
	return getAllBlogSlugs().map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const post = getBlogPost(slug, locale);
	if (!post) return {};

	const { title, description, date, tags } = post.frontmatter;
	const author = post.frontmatter.author ?? "Tanguy Pauvret";

	return {
		title: `${title} — Tanguy Pauvret`,
		description,
		keywords: tags,
		authors: [{ name: author }],
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime: date,
			authors: [author],
			tags,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
		alternates: {
			canonical: `/${locale}/blog/${slug}`,
			languages: {
				en: `/en/blog/${slug}`,
				fr: `/fr/blog/${slug}`,
			},
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { locale, slug } = await params;
	const post = getBlogPost(slug, locale);
	if (!post) notFound();

	const headings: TocHeading[] = [];

	const options = {
		...mdxOptions,
		rehypePlugins: [
			...mdxOptions.rehypePlugins,
			rehypeExtractHeadings(headings),
		] as never[],
	};

	// Compile first so rehype plugins run and headings[] is populated
	const { content } = await compileMDX({
		source: post.content,
		components: mdxComponents,
		options: { mdxOptions: options },
	});

	return (
		<>
			<ReadingProgress />
			<BlogNav locale={locale} />
			<BlogHeader frontmatter={post.frontmatter} locale={locale} />

			<div className="max-w-[960px] mx-auto px-6 pb-[120px] pt-10">
				<div className="flex gap-16 items-start">
					<article className="min-w-0 flex-1 blog-prose">{content}</article>
					<TableOfContents headings={headings} />
				</div>
			</div>
		</>
	);
}
