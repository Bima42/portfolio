import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "blog-content");

export interface BlogFrontmatter {
	title: string;
	description: string;
	date: string;
	tags: string[];
	series?: string;
	seriesPart?: number;
	author?: string;
	readingTime?: number;
	lang?: string;
}

export interface BlogPost {
	slug: string;
	locale: string;
	frontmatter: BlogFrontmatter;
	content: string;
}

export interface BlogPostMeta {
	slug: string;
	locale: string;
	frontmatter: BlogFrontmatter;
}

export function getBlogPosts(locale: string): BlogPostMeta[] {
	if (!fs.existsSync(BLOG_DIR)) return [];

	const slugDirs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	const posts: BlogPostMeta[] = [];

	for (const slug of slugDirs) {
		const filePath = path.join(BLOG_DIR, slug, `${slug}.${locale}.mdx`);
		if (!fs.existsSync(filePath)) continue;

		const raw = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(raw);

		posts.push({
			slug,
			locale,
			frontmatter: data as BlogFrontmatter,
		});
	}

	return posts.sort((a, b) => {
		const da = new Date(a.frontmatter.date).getTime();
		const db = new Date(b.frontmatter.date).getTime();
		return db - da;
	});
}

export function getBlogPost(slug: string, locale: string): BlogPost | null {
	const filePath = path.join(BLOG_DIR, slug, `${slug}.${locale}.mdx`);
	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(raw);

	return {
		slug,
		locale,
		frontmatter: data as BlogFrontmatter,
		content,
	};
}

export function getAllBlogSlugs(): { slug: string; locale: string }[] {
	if (!fs.existsSync(BLOG_DIR)) return [];

	const slugDirs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	const params: { slug: string; locale: string }[] = [];

	for (const slug of slugDirs) {
		for (const locale of ["en", "fr"]) {
			const filePath = path.join(BLOG_DIR, slug, `${slug}.${locale}.mdx`);
			if (fs.existsSync(filePath)) {
				params.push({ slug, locale });
			}
		}
	}

	return params;
}

export function formatDate(dateStr: string, locale: string): string {
	return new Date(dateStr).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
