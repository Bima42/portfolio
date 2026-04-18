"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
	}
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
				className="h-28 relative overflow-hidden border-b border-border"
				style={{
					padding: 18,
					background: `linear-gradient(135deg, oklch(0.96 0.03 ${p.accent}), oklch(0.99 0.01 ${p.accent}))`,
				}}
			>
				<ProjectThumb kind={p.thumb} accent={p.accent} />
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
					{p.blurb}
				</p>

				{/* Tags */}
				<div className="flex flex-wrap gap-1 mb-3">
					{p.tags.map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onTagClick(tag);
							}}
							className="cursor-pointer"
						>
							<Badge
								variant="secondary"
								className="font-mono text-[10px] hover:bg-accent-soft hover:text-accent-soft-fg transition-colors"
							>
								#{tag}
							</Badge>
						</button>
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

	return (
		<Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className="max-w-2xl p-0 overflow-hidden rounded-2xl border-border"
				style={{ background: "var(--bg-elevated)" }}
			>
				{project && (
					<>
						{/* Thumb header */}
						<div
							className="h-48 relative"
							style={{
								padding: 32,
								background: `linear-gradient(135deg, oklch(0.92 0.06 ${project.accent}), oklch(0.98 0.02 ${project.accent}))`,
							}}
						>
							<div className="absolute inset-8">
								<ProjectThumb kind={project.thumb} accent={project.accent} />
							</div>
						</div>

						{/* Content */}
						<div className="p-8">
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
								{project.blurb}
							</DialogDescription>

							{/* Tags */}
							<div className="flex flex-wrap gap-1.5 mb-6">
								{project.tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="font-mono text-xs"
									>
										#{tag}
									</Badge>
								))}
							</div>

							{/* Content placeholder */}
							<div className="p-4 border border-dashed border-border rounded-xl mb-6 text-sm text-fg-faint">
								<span className="font-mono text-[10px] uppercase tracking-wide">
									[ placeholder ]
								</span>
								<p className="mt-1.5">
									Full write-up lives in the blog — coming soon.
								</p>
							</div>

							{/* Actions */}
							<div className="flex gap-2.5">
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
			p.blurb.toLowerCase().includes(q);
		return matchTags && matchQuery;
	});

	// Lock body scroll when modal is open
	useEffect(() => {
		if (openProject) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [openProject]);

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
						return (
							<Button
								key={tag}
								onClick={() => toggleTag(tag)}
								variant={on ? "default" : "outline"}
								size="sm"
								className="font-mono text-[11px] tracking-wide whitespace-nowrap"
							>
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
