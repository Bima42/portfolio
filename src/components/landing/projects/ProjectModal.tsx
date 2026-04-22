"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/components/landing/projects/projects-data";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { MarkdownContent } from "./MarkdownContent";
import { ProjectThumb } from "./ProjectThumb";
import { TagBadge } from "./TagBadge";

export function ProjectModal({
	project,
	onClose,
}: {
	project: Project | null;
	onClose: () => void;
}) {
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
