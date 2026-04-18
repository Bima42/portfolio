"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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
			{/* Ambient blobs */}
			<div
				aria-hidden
				className="absolute rounded-full pointer-events-none"
				style={{
					top: "-10%",
					right: "-10%",
					width: 520,
					height: 520,
					background: "radial-gradient(circle at 30% 30%, var(--accent), transparent 60%)",
					opacity: 0.3,
					filter: "blur(40px)",
					animation: "tp-drift 14s ease-in-out infinite alternate",
				}}
			/>
			<div
				aria-hidden
				className="absolute rounded-full pointer-events-none"
				style={{
					bottom: "-15%",
					left: "-5%",
					width: 460,
					height: 460,
					background:
						"radial-gradient(circle at 50% 50%, var(--periwinkle-400, #a8a4e8), transparent 60%)",
					opacity: 0.35,
					filter: "blur(50px)",
					animation: "tp-drift 17s ease-in-out infinite alternate-reverse",
				}}
			/>

			<div className="relative z-10 max-w-5xl mx-auto w-full">
				{/* Status pill */}
				<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-bg-elevated border border-border shadow-sm mb-8 text-xs text-fg-muted">
					<span
						className="w-2 h-2 rounded-pill"
						style={{
							background: "oklch(0.72 0.18 145)",
							boxShadow: "0 0 0 3px oklch(0.72 0.18 145 / 0.25)",
							animation: "status-pulse 2s ease-in-out infinite",
						}}
					/>
					<span className="font-mono uppercase tracking-wide text-[11px]">{t("statusLabel")}</span>
					<span className="w-px h-3 bg-border" />
					<span>{t("statusCompany")}</span>
				</div>

				{/* Heading */}
				<h1
					className="font-semibold leading-tight tracking-tighter text-fg"
					style={{ fontSize: "clamp(48px, 9vw, 112px)", margin: "0 0 8px" }}
				>
					Tanguy Pauvret,
					<br />
					<span className="gradient-text italic">{text}</span>
					<span
						className="inline-block w-0.5 h-[0.85em] bg-accent ml-1 align-middle"
						style={{ animation: "blink 1s step-end infinite" }}
					/>
				</h1>

				<style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>

				<p className="max-w-xl text-md leading-relaxed text-fg-muted mt-7">
					{t("subheading")}
				</p>

				{/* CTAs */}
				<div className="flex gap-3 mt-10 flex-wrap">
					<a
						href="#work"
						className="inline-flex items-center gap-2 px-5 py-3 rounded-pill bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity"
					>
						{t("ctaPrimary")}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M5 12h14M13 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="#contact"
						className="inline-flex items-center px-5 py-3 rounded-pill border border-border text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
					>
						{t("ctaSecondary")}
					</a>
				</div>

				{/* Meta strip */}
				<div
					className="mt-20 pt-6 border-t border-border grid gap-6"
					style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
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
