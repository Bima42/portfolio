"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	ALL_TAGS,
	PROJECTS,
	type Project,
} from "@/components/landing/projects/projects-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { TAG_LOGOS } from "./tag-logos";

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
