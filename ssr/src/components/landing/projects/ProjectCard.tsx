"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectThumb } from "./ProjectThumb";
import { TagBadge } from "./TagBadge";

export function ProjectCard({
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
					<h3 className="text-base font-medium tracking-tight text-fg">{p.title}</h3>
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
