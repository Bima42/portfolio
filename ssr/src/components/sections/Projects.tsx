"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	ALL_TAGS,
	PROJECTS,
	type Project,
	type ThumbKind,
} from "@/data/projects";

// ── Tag logos ─────────────────────────────────────────────────────────────────

const TAG_LOGOS: Record<string, string> = {
	react: "/assets/brand-logos/logo-react.svg",
	"react-native": "/assets/brand-logos/logo-react.svg",
	typescript: "/assets/brand-logos/logo-ts.svg",
	python: "/assets/brand-logos/logo-python.svg",
	fastapi: "/assets/brand-logos/logo-fastapi.svg",
	"next.js": "/assets/brand-logos/logo-nextjs.svg",
	docker: "/assets/brand-logos/logo-docker.svg",
	postgres: "/assets/brand-logos/logo-postgresql.svg",
	mongodb: "/assets/brand-logos/logo-mongodb.svg",
	redis: "/assets/brand-logos/logo-redis.svg",
	tailwind: "/assets/brand-logos/logo-tailwind.svg",
	"node.js": "/assets/brand-logos/logo-nodejs.svg",
	django: "/assets/brand-logos/logo-django.svg",
	42: "/assets/brand-logos/logo-42.svg",
	vllm: "/assets/brand-logos/logo-vllm.svg",
	drizzle: "/assets/brand-logos/logo-drizzle.svg",
};

function TagBadge({ tag }: { tag: string }) {
	const logo = TAG_LOGOS[tag];
	return (
		<Badge
			variant="secondary"
			className="font-mono text-[10px] hover:bg-accent-soft hover:text-accent-soft-fg transition-colors gap-1"
		>
			{logo && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={logo}
					alt=""
					aria-hidden
					width={12}
					height={12}
					className="object-contain shrink-0"
				/>
			)}
			#{tag}
		</Badge>
	);
}

// ── SVG thumbnails ────────────────────────────────────────────────────────────

function ProjectThumb({ kind, accent }: { kind: ThumbKind; accent: number }) {
	const stroke = `oklch(0.60 0.15 ${accent})`;
	const fill = `oklch(0.90 0.06 ${accent} / 0.5)`;
	const props = {
		width: "100%",
		height: "100%",
		viewBox: "0 0 120 80",
		fill: "none",
	} as const;

	switch (kind) {
		case "panel":
			return (
				<svg {...props}>
					<rect x="6" y="10" width="108" height="60" rx="4" stroke={stroke} />
					<line
						x1="36"
						y1="10"
						x2="36"
						y2="70"
						stroke={stroke}
						strokeWidth="0.6"
					/>
					<rect x="10" y="16" width="22" height="3" fill={fill} />
					<rect x="10" y="22" width="18" height="3" fill={fill} />
					<rect x="10" y="28" width="22" height="3" fill={fill} />
					<rect x="42" y="16" width="66" height="2.5" fill={fill} />
					<rect x="42" y="22" width="54" height="2.5" fill={fill} />
					<rect x="42" y="28" width="58" height="2.5" fill={fill} />
					<rect x="42" y="58" width="66" height="6" rx="3" stroke={stroke} />
				</svg>
			);
		case "graph":
			return (
				<svg {...props}>
					<circle cx="30" cy="40" r="10" stroke={stroke} fill={fill} />
					<circle cx="70" cy="22" r="7" stroke={stroke} fill={fill} />
					<circle cx="90" cy="55" r="8" stroke={stroke} fill={fill} />
					<circle cx="55" cy="60" r="5" stroke={stroke} />
					<line
						x1="30"
						y1="40"
						x2="70"
						y2="22"
						stroke={stroke}
						strokeWidth="0.8"
					/>
					<line
						x1="30"
						y1="40"
						x2="55"
						y2="60"
						stroke={stroke}
						strokeWidth="0.8"
					/>
					<line
						x1="70"
						y1="22"
						x2="90"
						y2="55"
						stroke={stroke}
						strokeWidth="0.8"
					/>
					<line
						x1="55"
						y1="60"
						x2="90"
						y2="55"
						stroke={stroke}
						strokeWidth="0.8"
					/>
				</svg>
			);
		case "quill":
			return (
				<svg {...props}>
					<path
						d="M20 60 C 30 30, 60 20, 100 15 C 95 35, 75 55, 40 65 Z"
						stroke={stroke}
						fill={fill}
					/>
					<line
						x1="20"
						y1="60"
						x2="12"
						y2="70"
						stroke={stroke}
						strokeLinecap="round"
					/>
					<line
						x1="30"
						y1="55"
						x2="80"
						y2="30"
						stroke={stroke}
						strokeWidth="0.5"
						strokeDasharray="1 2"
					/>
				</svg>
			);
		case "xml":
			return (
				<svg {...props}>
					<text
						x="18"
						y="48"
						fontFamily="monospace"
						fontSize="14"
						fill={stroke}
					>
						{"<prompt>"}
					</text>
					<text
						x="26"
						y="62"
						fontFamily="monospace"
						fontSize="10"
						fill={stroke}
						opacity="0.6"
					>
						{"<goal/>"}
					</text>
				</svg>
			);
		case "db":
			return (
				<svg {...props}>
					<ellipse cx="60" cy="22" rx="30" ry="8" stroke={stroke} fill={fill} />
					<path
						d="M30 22 V 42 C 30 46, 90 46, 90 42 V 22"
						stroke={stroke}
						fill="none"
					/>
					<path
						d="M30 42 V 58 C 30 62, 90 62, 90 58 V 42"
						stroke={stroke}
						fill="none"
					/>
					<ellipse cx="60" cy="42" rx="30" ry="4" stroke={stroke} />
				</svg>
			);
		case "chart":
			return (
				<svg {...props}>
					<line x1="10" y1="10" x2="10" y2="65" stroke={stroke} />
					<line x1="10" y1="65" x2="110" y2="65" stroke={stroke} />
					<polyline
						points="14,50 30,45 45,30 60,35 75,20 90,25 106,12"
						stroke={stroke}
						fill="none"
						strokeWidth="1.5"
					/>
					<polyline
						points="14,60 30,58 45,52 60,50 75,40 90,38 106,28"
						stroke={stroke}
						fill="none"
						strokeWidth="1.5"
						strokeDasharray="2 2"
						opacity="0.6"
					/>
				</svg>
			);
		case "term":
			return (
				<svg {...props}>
					<rect x="6" y="10" width="108" height="60" rx="4" stroke={stroke} />
					<circle cx="12" cy="16" r="1.2" fill={stroke} />
					<circle cx="17" cy="16" r="1.2" fill={stroke} />
					<circle cx="22" cy="16" r="1.2" fill={stroke} />
					<text x="12" y="34" fontFamily="monospace" fontSize="9" fill={stroke}>
						$ ./minishell
					</text>
					<text
						x="12"
						y="46"
						fontFamily="monospace"
						fontSize="9"
						fill={stroke}
						opacity="0.6"
					>
						{">"} pwd
					</text>
					<text
						x="12"
						y="58"
						fontFamily="monospace"
						fontSize="9"
						fill={stroke}
						opacity="0.8"
					>
						/home/tanguy
					</text>
				</svg>
			);
		case "stack":
			return (
				<svg {...props}>
					<rect
						x="24"
						y="50"
						width="72"
						height="12"
						rx="2"
						stroke={stroke}
						fill={fill}
					/>
					<rect
						x="30"
						y="35"
						width="60"
						height="12"
						rx="2"
						stroke={stroke}
						fill={fill}
					/>
					<rect
						x="36"
						y="20"
						width="48"
						height="12"
						rx="2"
						stroke={stroke}
						fill={fill}
					/>
					<text x="42" y="28" fontFamily="monospace" fontSize="7" fill={stroke}>
						vector
					</text>
					<text x="42" y="43" fontFamily="monospace" fontSize="7" fill={stroke}>
						map
					</text>
					<text x="42" y="58" fontFamily="monospace" fontSize="7" fill={stroke}>
						stack
					</text>
				</svg>
			);
		case "mobile":
			return (
				<svg {...props}>
					<rect
						x="40"
						y="8"
						width="40"
						height="64"
						rx="6"
						stroke={stroke}
						fill={fill}
					/>
					<rect
						x="46"
						y="14"
						width="28"
						height="40"
						rx="2"
						stroke={stroke}
						strokeWidth="0.6"
					/>
					<circle cx="60" cy="62" r="3" stroke={stroke} />
				</svg>
			);
	}
}

// ── Markdown content loader ───────────────────────────────────────────────────

const videoExtensions = [".mp4", ".webm", ".mov"];

const markdownComponents = {
	h1: ({ children }: { children?: React.ReactNode }) => (
		<h1 className="text-2xl font-semibold mb-4 mt-8 text-fg">{children}</h1>
	),
	h2: ({ children }: { children?: React.ReactNode }) => (
		<h2 className="text-xl font-semibold mb-3 mt-6 text-fg">{children}</h2>
	),
	h3: ({ children }: { children?: React.ReactNode }) => (
		<h3 className="text-base font-medium mb-2 mt-5 text-fg">{children}</h3>
	),
	p: ({ children }: { children?: React.ReactNode }) => (
		<p className="mb-3 text-fg-muted leading-relaxed text-sm">{children}</p>
	),
	ul: ({ children }: { children?: React.ReactNode }) => (
		<ul className="mb-3 ml-5 space-y-1">{children}</ul>
	),
	ol: ({ children }: { children?: React.ReactNode }) => (
		<ol className="mb-3 ml-5 space-y-1 list-decimal">{children}</ol>
	),
	li: ({ children }: { children?: React.ReactNode }) => (
		<li className="text-sm text-fg-muted list-disc">{children}</li>
	),
	blockquote: ({ children }: { children?: React.ReactNode }) => (
		<blockquote className="border-l-2 border-border pl-4 my-3 text-sm text-fg-faint italic">
			{children}
		</blockquote>
	),
	code: ({
		children,
		className,
	}: {
		children?: React.ReactNode;
		className?: string;
	}) => {
		const isBlock = className?.startsWith("language-");
		if (isBlock) {
			return (
				<pre className="bg-bg-sunken rounded-lg p-3 overflow-x-auto my-3 text-xs">
					<code className={`${className ?? ""} text-fg-muted`}>{children}</code>
				</pre>
			);
		}
		return (
			<code className="bg-bg-sunken px-1 py-0.5 rounded text-xs text-fg-muted font-mono">
				{children}
			</code>
		);
	},
	img: ({ src, alt }: { src?: string; alt?: string }) => {
		if (videoExtensions.some((ext) => src?.endsWith(ext))) {
			return (
				<video
					src={src}
					className="w-full rounded-lg my-4 max-h-[50vh] object-contain"
					autoPlay
					muted
					loop
					playsInline
				/>
			);
		}
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={src}
				alt={alt}
				loading="lazy"
				width={1200}
				height={630}
				style={{ height: "auto" }}
				className="w-full rounded-lg my-4 object-contain max-h-[50vh]"
			/>
		);
	},
	table: ({ children }: { children?: React.ReactNode }) => (
		<div className="overflow-x-auto my-4">
			<table className="w-full text-sm border-collapse">{children}</table>
		</div>
	),
	th: ({ children }: { children?: React.ReactNode }) => (
		<th className="border border-border px-3 py-1.5 text-left text-xs font-medium text-fg bg-bg-elevated">
			{children}
		</th>
	),
	td: ({ children }: { children?: React.ReactNode }) => (
		<td className="border border-border px-3 py-1.5 text-xs text-fg-muted">
			{children}
		</td>
	),
};

function MarkdownContent({ slug }: { slug?: string }) {
	const locale = useLocale();
	const [md, setMd] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;
		setMd(null);
		fetch(`/content/${slug}/content-${locale}.md`)
			.then((r) => (r.ok ? r.text() : Promise.reject()))
			.catch(() =>
				fetch(`/content/${slug}/content-en.md`).then((r) =>
					r.ok ? r.text() : Promise.reject(),
				),
			)
			.then((text) => setMd(text))
			.catch(() => setMd(""));
	}, [slug, locale]);

	if (!slug) return null;
	if (md === null)
		return <p className="text-sm text-fg-faint py-4">Loading…</p>;
	if (md === "") return null;

	return (
		<div className="mt-6 pt-6 border-t border-border">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={
					markdownComponents as Parameters<
						typeof ReactMarkdown
					>[0]["components"]
				}
			>
				{md}
			</ReactMarkdown>
		</div>
	);
}

// ── Project card ──────────────────────────────────────────────────────────────

function ProjectCard({
	project,
	onOpen,
	onTagClick,
}: {
	project: Project;
	onOpen: (p: Project) => void;
	onTagClick: (t: string) => void;
}) {
	const t = useTranslations("projects");
	const blurbs = useTranslations("projectBlurbs");
	const p = project;
	const [hover, setHover] = useState(false);

	return (
		<article
			onClick={() => onOpen(p)}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter") onOpen(p);
			}}
			className="flex flex-col overflow-hidden cursor-pointer rounded-2xl focus-visible:outline-none"
			style={{
				background: "var(--bg-elevated)",
				border: `1px solid ${hover ? `oklch(0.70 0.12 ${p.accent} / 0.4)` : "var(--border)"}`,
				transform: hover ? "translateY(-3px)" : "translateY(0)",
				boxShadow: hover
					? `var(--shadow-md), 0 0 0 4px oklch(0.90 0.06 ${p.accent} / 0.3)`
					: "var(--shadow-sm)",
				transition: "all 0.3s cubic-bezier(.2,.8,.2,1)",
			}}
		>
			{/* Thumbnail */}
			<div
				className="h-28 relative overflow-hidden border-b border-border flex items-center justify-center"
				style={{
					padding: 18,
					background: `linear-gradient(135deg, oklch(0.96 0.03 ${p.accent}), oklch(0.99 0.01 ${p.accent}))`,
				}}
			>
				{p.logo ? (
					<>
						{p.logo.dark && (
							<Image
								src={p.logo.dark}
								alt={p.title}
								width={160}
								height={64}
								className="hidden dark:block max-h-16 w-auto object-contain"
								style={{ height: "auto", width: "auto" }}
							/>
						)}
						<Image
							src={p.logo.light}
							alt={p.title}
							width={160}
							height={64}
							className={`max-h-16 w-auto object-contain${p.logo.dark ? " dark:hidden" : ""}`}
							style={{ height: "auto", width: "auto" }}
						/>
					</>
				) : (
					<ProjectThumb kind={p.thumb} accent={p.accent} />
				)}
				<span
					className="absolute top-2.5 right-3 font-mono text-[10px] tracking-wide"
					style={{ color: `oklch(0.45 0.15 ${p.accent})` }}
				>
					{p.year}
				</span>
			</div>

			{/* Body */}
			<div className="flex flex-col flex-1 p-[18px]">
				<div className="flex justify-between items-start gap-2 mb-1.5">
					<h3 className="text-base font-medium tracking-tight text-fg">
						{p.title}
					</h3>
					{p.award && (
						<span
							className="font-mono text-[9.5px] px-1.5 py-0.5 rounded tracking-wide uppercase whitespace-nowrap"
							style={{
								background: `oklch(0.90 0.08 ${p.accent})`,
								color: `oklch(0.35 0.18 ${p.accent})`,
							}}
						>
							★ {p.award}
						</span>
					)}
				</div>
				<p className="font-mono text-[10.5px] uppercase tracking-wide text-fg-faint mb-2.5">
					{p.kind}
				</p>
				<p className="text-sm leading-relaxed text-fg-muted flex-1 mb-3.5">
					{blurbs(p.key)}
				</p>

				{/* Tags */}
				<div className="flex flex-wrap gap-1 mb-3">
					{p.tags.map((tag) => (
						<TagBadge tag={tag} key={tag} />
					))}
				</div>

				{/* Links */}
				<div className="flex gap-3 pt-3 border-t border-border font-mono text-[11px] text-fg-faint">
					{p.repo && <span>↗ {p.repo.replace("github.com/", "")}</span>}
					{p.live && <span>→ {p.live}</span>}
					{!p.repo && !p.live && (
						<span className="opacity-60">{t("internal")}</span>
					)}
				</div>
			</div>
		</article>
	);
}

// ── Project modal ─────────────────────────────────────────────────────────────

function ProjectModal({
	project,
	onClose,
}: {
	project: Project | null;
	onClose: () => void;
}) {
	const t = useTranslations("projects");
	const blurbs = useTranslations("projectBlurbs");

	return (
		<Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className="max-w-3xl w-[90vw] p-0 overflow-hidden rounded-2xl border-border"
				style={{ background: "var(--bg-elevated)" }}
			>
				{project && (
					<>
						{/* Thumb header */}
						<div
							className="h-40 relative flex-shrink-0 flex items-center justify-center"
							style={{
								padding: 32,
								background: `linear-gradient(135deg, oklch(0.92 0.06 ${project.accent}), oklch(0.98 0.02 ${project.accent}))`,
							}}
						>
							{project.logo ? (
								<>
									{project.logo.dark && (
										<Image
											src={project.logo.dark}
											alt={project.title}
											width={240}
											height={80}
											className="hidden dark:block max-h-20 w-auto max-w-[60%] object-contain"
											style={{ height: "auto", width: "auto" }}
										/>
									)}
									<Image
										src={project.logo.light}
										alt={project.title}
										width={240}
										height={80}
										className={`max-h-20 w-auto max-w-[60%] object-contain${project.logo.dark ? " dark:hidden" : ""}`}
										style={{ height: "auto", width: "auto" }}
									/>
								</>
							) : (
								<div className="absolute inset-8">
									<ProjectThumb kind={project.thumb} accent={project.accent} />
								</div>
							)}
						</div>

						{/* Scrollable content */}
						<div className="overflow-y-auto max-h-[65vh] p-8">
							<div className="flex items-center gap-2.5 mb-3">
								<span className="font-mono text-[10.5px] uppercase tracking-wide text-fg-faint">
									{project.kind} · {project.year}
								</span>
								{project.award && (
									<span
										className="font-mono text-[10.5px] px-2 py-0.5 rounded tracking-wide uppercase"
										style={{
											background: `oklch(0.90 0.08 ${project.accent})`,
											color: `oklch(0.35 0.18 ${project.accent})`,
										}}
									>
										★ {project.award}
									</span>
								)}
							</div>

							<DialogTitle className="text-3xl font-semibold tracking-tight text-fg mb-4">
								{project.title}
							</DialogTitle>
							<DialogDescription className="text-base leading-relaxed text-fg-muted mb-6">
								{blurbs(project.key)}
							</DialogDescription>

							{/* Tags */}
							<div className="flex flex-wrap gap-1.5 mb-6">
								{project.tags.map((tag) => (
									<TagBadge key={tag} tag={tag} />
								))}
							</div>

							{/* Actions */}
							<div className="flex gap-2.5 mb-2">
								{project.repo && (
									<a
										href={`https://${project.repo}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-pill bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity"
									>
										↗ Repo
									</a>
								)}
								{project.live && (
									<a
										href={`https://${project.live}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-pill border border-border text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
									>
										→ Live
									</a>
								)}
							</div>

							{/* Markdown content */}
							<MarkdownContent slug={project.slug} />
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}

// ── Main component ────────────────────────────────────────────────────────────

export function Projects() {
	const t = useTranslations("projects");
	const blurbs = useTranslations("projectBlurbs");
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const [query, setQuery] = useState("");
	const [openProject, setOpenProject] = useState<Project | null>(null);

	function toggleTag(tag: string) {
		setActiveTags((prev) =>
			prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag],
		);
	}

	const filtered = PROJECTS.filter((p) => {
		const matchTags =
			activeTags.length === 0 ||
			activeTags.every((tag) => p.tags.includes(tag));
		const q = query.trim().toLowerCase();
		const matchQuery =
			!q ||
			p.title.toLowerCase().includes(q) ||
			blurbs(p.key).toLowerCase().includes(q);
		return matchTags && matchQuery;
	});

	return (
		<section
			id="work"
			className="bg-bg-sunken"
			style={{ padding: "140px 6vw 100px" }}
		>
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="flex items-end justify-between flex-wrap gap-6 mb-12">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-caps text-fg-faint mb-3.5">
							{t("eyebrow")}
						</p>
						<h2
							className="font-semibold leading-tight tracking-tighter text-fg"
							style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
						>
							{t("heading")}{" "}
							<span className="italic text-accent-hover">
								{t("headingAccent")}
							</span>
						</h2>
					</div>
					<span className="font-mono text-xs text-fg-faint">
						{filtered.length} / {PROJECTS.length}
					</span>
				</div>

				{/* Search + clear */}
				<div className="flex gap-3 items-center flex-wrap mb-5">
					<div className="relative w-64">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							className="absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-faint pointer-events-none"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={t("searchPlaceholder")}
							className="h-7 pl-8 bg-bg-elevated border-border text-fg placeholder:text-fg-faint"
						/>
					</div>
					{activeTags.length > 0 && (
						<Button
							onClick={() => setActiveTags([])}
							variant="default"
							size="sm"
							className="font-mono tracking-wide gap-1.5"
						>
							{t("clearFilters")} {activeTags.length}
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
							>
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						</Button>
					)}
				</div>

				{/* Tag filters */}
				<div className="flex gap-1.5 flex-wrap mb-10 overflow-x-auto pb-1">
					{ALL_TAGS.map((tag) => {
						const on = activeTags.includes(tag);
						const logo = TAG_LOGOS[tag];
						return (
							<Button
								key={tag}
								onClick={() => toggleTag(tag)}
								variant={on ? "default" : "outline"}
								size="sm"
								className="font-mono text-[11px] tracking-wide whitespace-nowrap gap-1"
							>
								{logo && (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={logo}
										alt=""
										aria-hidden
										width={14}
										height={14}
										className="object-contain shrink-0"
									/>
								)}
								#{tag}
							</Button>
						);
					})}
				</div>

				{/* Grid */}
				<div
					className="grid gap-5"
					style={{
						gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
					}}
				>
					{filtered.map((p) => (
						<ProjectCard
							key={p.title}
							project={p}
							onOpen={setOpenProject}
							onTagClick={toggleTag}
						/>
					))}
					{filtered.length === 0 && (
						<div className="col-span-full py-16 text-center border border-dashed border-border rounded-2xl">
							<p className="text-xl font-semibold text-fg mb-1.5">
								{t("noResultsTitle")}
							</p>
							<p className="text-sm text-fg-muted">{t("noResultsBody")}</p>
						</div>
					)}
				</div>
			</div>

			<ProjectModal
				project={openProject}
				onClose={() => setOpenProject(null)}
			/>
		</section>
	);
}
