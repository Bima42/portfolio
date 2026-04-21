import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogIndexCardProps {
	post: BlogPostMeta;
	locale: string;
}

export function BlogIndexCard({ post, locale }: BlogIndexCardProps) {
	const { slug, frontmatter } = post;
	const { title, description, date, tags, readingTime } = frontmatter;
	const primaryTag = tags?.[0] ?? "Article";

	return (
		<Link href={`/${locale}/blog/${slug}`} className="group block">
			<article
				className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated p-8 shadow-sm cursor-pointer"
				style={{ transition: "all 420ms cubic-bezier(.22,1,.36,1)" }}
			>
				{/* Mesh background */}
				<div
					className="absolute inset-0 pointer-events-none opacity-45"
					aria-hidden="true"
					style={{
						background: `
							radial-gradient(ellipse 60% 50% at 20% 30%, var(--mesh-1) 0%, transparent 70%),
							radial-gradient(ellipse 50% 60% at 80% 20%, var(--mesh-2) 0%, transparent 70%),
							radial-gradient(ellipse 40% 50% at 50% 80%, var(--mesh-3) 0%, transparent 70%)
						`,
						filter: "blur(32px)",
					}}
				/>

				<div className="relative">
					<div className="flex items-center gap-2.5 mb-4">
						<Badge variant="secondary">{primaryTag}</Badge>
						<span className="font-mono text-[11px] text-fg-subtle tracking-[0.04em]">
							{formatDate(date, locale)}
							{readingTime ? ` · ${readingTime} min read` : ""}
						</span>
					</div>

					<h2 className="text-[1.875rem] font-semibold tracking-tight leading-snug mb-3 group-hover:text-accent-hover transition-colors duration-240">
						{title}
					</h2>

					{description && (
						<p className="text-base text-fg-muted leading-relaxed max-w-[520px]">
							{description}
						</p>
					)}
				</div>
			</article>
		</Link>
	);
}
