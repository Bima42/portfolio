import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogArchiveListProps {
	posts: BlogPostMeta[];
	locale: string;
}

export function BlogArchiveList({ posts, locale }: BlogArchiveListProps) {
	if (posts.length === 0) return null;

	return (
		<div>
			{posts.map((post) => {
				const { slug, frontmatter } = post;
				const { title, description, date, readingTime } = frontmatter;

				return (
					<Link
						key={slug}
						href={`/${locale}/blog/${slug}`}
						className="group grid gap-5 py-5 border-t border-dashed border-border text-inherit no-underline transition-[padding] duration-[240ms] ease-[cubic-bezier(.22,1,.36,1)] hover:pl-2"
						style={{ gridTemplateColumns: "72px 1fr auto", alignItems: "baseline" }}
					>
						<div className="font-mono text-[11px] text-fg-subtle tracking-[0.04em]">
							{formatDate(date, locale)}
						</div>

						<div>
							<div className="text-[17px] font-medium tracking-tight mb-1 group-hover:text-accent transition-colors duration-150">
								{title}
							</div>
							{description && (
								<div className="text-[13px] text-fg-muted leading-[1.5]">
									{description}
								</div>
							)}
						</div>

						<div className="font-mono text-[11px] text-fg-faint whitespace-nowrap">
							{readingTime ? `${readingTime} min` : ""}
						</div>
					</Link>
				);
			})}
		</div>
	);
}
