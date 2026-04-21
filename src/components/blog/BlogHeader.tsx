import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogFrontmatter } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogHeaderProps {
	frontmatter: BlogFrontmatter;
	locale: string;
}

export function BlogHeader({ frontmatter, locale }: BlogHeaderProps) {
	const { title, description, date, tags, readingTime } = frontmatter;
	const primaryTag = tags?.[0] ?? "Article";

	return (
		<header className="relative overflow-hidden px-6 pt-16 pb-14">
			{/* Mesh background */}
			<div
				className="absolute inset-0 pointer-events-none"
				aria-hidden="true"
				style={{
					background: `
						radial-gradient(ellipse 60% 50% at 20% 30%, var(--mesh-1) 0%, transparent 70%),
						radial-gradient(ellipse 50% 60% at 80% 20%, var(--mesh-2) 0%, transparent 70%),
						radial-gradient(ellipse 40% 50% at 50% 80%, var(--mesh-3) 0%, transparent 70%),
						radial-gradient(ellipse 55% 45% at 75% 70%, var(--mesh-4) 0%, transparent 70%)
					`,
					filter: "blur(48px)",
					opacity: 0.5,
				}}
			/>

			<div className="relative max-w-[720px] mx-auto">
				<Link
					href={`/${locale}/blog`}
					className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted hover:text-fg tracking-wide mb-8 transition-colors"
				>
					← back to index
				</Link>

				<div className="flex items-center gap-2.5 mb-5">
					<Badge variant="secondary">{primaryTag}</Badge>
					<span className="font-mono text-[11px] text-fg-subtle tracking-[0.04em]">
						{formatDate(date, locale)}
						{readingTime ? ` · ${readingTime} min read` : ""}
					</span>
				</div>

				<h1 className="font-sans text-[clamp(2rem,5vw,3rem)] font-semibold tracking-tighter leading-tight mb-5">
					{title}
				</h1>

				{description && (
					<p className="text-xl text-fg-muted leading-[1.55] max-w-[620px] font-normal">
						{description}
					</p>
				)}
			</div>
		</header>
	);
}
