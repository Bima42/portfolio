"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { GravityGrid } from "@/components/ui-kit/GravityGrid";
import { cn } from "@/lib/utils";

export function Hero() {
	const t = useTranslations("hero");
	const phrases = t.raw("typewriterPhrases") as string[];

	const [idx, setIdx] = useState(0);
	const [text, setText] = useState("");
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const full = phrases[idx];
		const speed = deleting ? 35 : 70;
		const timer = setTimeout(() => {
			if (!deleting) {
				if (text.length < full.length) {
					setText(full.slice(0, text.length + 1));
				} else {
					setTimeout(() => setDeleting(true), 1600);
				}
			} else {
				if (text.length > 0) {
					setText(full.slice(0, text.length - 1));
				} else {
					setDeleting(false);
					setIdx((idx + 1) % phrases.length);
				}
			}
		}, speed);
		return () => clearTimeout(timer);
	}, [text, deleting, idx, phrases]);

	const metaItems = [
		{ label: t("metaLocationLabel"), value: t("metaLocation") },
		{ label: t("metaStackLabel"), value: t("metaStack") },
		{ label: t("metaCurrentlyLabel"), value: t("metaCurrently") },
		{ label: t("metaReadingLabel"), value: t("metaReading") },
	];

	return (
		<section
			id="top"
			className="relative min-h-screen grid overflow-hidden"
			style={{ alignContent: "center", padding: "140px 6vw 100px" }}
		>
			{/* Interactive background grid */}
			<div aria-hidden className="absolute inset-0 z-0 opacity-40">
				<GravityGrid />
			</div>

			<div className="relative z-10 max-w-5xl mx-auto w-full">
				{/* Status pill — kept as pill, it's an indicator not a button */}
				<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-bg-elevated border border-border shadow-sm mb-8 text-xs text-fg-muted">
					<span
						className="w-2 h-2 rounded-pill shrink-0"
						style={{
							background: "oklch(0.72 0.18 145)",
							boxShadow: "0 0 0 3px oklch(0.72 0.18 145 / 0.25)",
							animation: "status-pulse 2s ease-in-out infinite",
						}}
					/>
					<span className="font-mono uppercase tracking-wide text-[11px]">
						ON GARDE
					</span>
					<span className="w-px h-3 bg-border shrink-0" />
					<span>OU PAS</span>
				</div>

				{/* Static heading — large, never wraps */}
				<h1
					className="font-semibold leading-tight tracking-tighter text-fg mb-2"
					style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
				>
					Tanguy Pauvret,
				</h1>

				{/* Typewriter — separate line, controlled size so it never wraps */}
				<div className="flex items-center gap-1 mb-4 h-8">
					<span className="text-2xl font-medium italic gradient-text leading-none">
						{text}
					</span>
					<span
						className="inline-block w-0.5 bg-accent self-stretch"
						style={{ animation: "blink 1s step-end infinite" }}
					/>
				</div>

				<style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>

				<p className="max-w-xl text-md leading-relaxed text-fg-muted">
					{t("subheading")}
				</p>

				{/* CTAs — use buttonVariants on <a> since they're links */}
				<div className="flex gap-3 mt-6 flex-wrap">
					<a
						href="#work"
						className={cn(
							buttonVariants({ variant: "default", size: "lg" }),
							"gap-2",
						)}
					>
						{t("ctaPrimary")}
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M5 12h14M13 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="#contact"
						className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
					>
						{t("ctaSecondary")}
					</a>
				</div>

				{/* Meta strip */}
				<div
					className="mt-20 pt-6 border-t border-border grid gap-6"
					style={{
						gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
					}}
				>
					{metaItems.map((item) => (
						<div key={item.label}>
							<p className="font-mono text-[11px] uppercase tracking-caps text-fg-faint mb-1.5">
								{item.label}
							</p>
							<p className="text-sm text-fg">{item.value}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
