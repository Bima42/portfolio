"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

function EmailIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m3 7 9 6 9-6" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
			<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.25h4.56V23H.22zM8.03 8.25h4.37v2.02h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V23H8.03z" />
		</svg>
	);
}

function GitHubIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.96 3.22 9.17 7.69 10.65.56.1.77-.24.77-.54 0-.27-.01-1.15-.02-2.08-3.13.68-3.79-1.32-3.79-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.28.94.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.73 10.73 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.41.35.77 1.05.77 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.65.78.54A11.25 11.25 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5z" />
		</svg>
	);
}

interface ContactCardProps {
	kind: "email" | "linkedin" | "github";
	label: string;
	value: string;
	href: string;
	accent: number;
}

function ContactCard({ kind, label, value, href, accent }: ContactCardProps) {
	const t = useTranslations("contact");
	const [hover, setHover] = useState(false);
	const icon = kind === "email" ? <EmailIcon /> : kind === "linkedin" ? <LinkedInIcon /> : <GitHubIcon />;

	return (
		<a
			href={href}
			target={kind === "email" ? "_self" : "_blank"}
			rel="noopener noreferrer"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="block rounded-2xl focus-visible:outline-none"
			style={{
				padding: 24,
				background: "var(--bg-elevated)",
				border: `1px solid ${hover ? `oklch(0.70 0.12 ${accent} / 0.4)` : "var(--border)"}`,
				boxShadow: hover
					? `var(--shadow-md), 0 0 0 4px oklch(0.90 0.06 ${accent} / 0.3)`
					: "var(--shadow-sm)",
				transform: hover ? "translateY(-3px)" : "translateY(0)",
				transition: "all 0.3s cubic-bezier(.2,.8,.2,1)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Icon */}
			<div
				className="w-11 h-11 grid place-items-center rounded-xl mb-5"
				style={{
					background: `oklch(0.92 0.06 ${accent})`,
					color: `oklch(0.40 0.18 ${accent})`,
				}}
			>
				{icon}
			</div>

			<p className="font-mono text-[10.5px] uppercase tracking-caps text-fg-faint mb-1.5">{label}</p>
			<p className="text-xl font-semibold tracking-tight text-fg mb-3 leading-snug">{value}</p>

			{/* CTA */}
			<div className="flex items-center gap-1.5 text-xs text-fg-faint">
				<span>{t("openCta")}</span>
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					style={{
						transition: "transform 0.3s",
						transform: hover ? "translateX(3px)" : "translateX(0)",
					}}
				>
					<path d="M5 12h14M13 5l7 7-7 7" />
				</svg>
			</div>
		</a>
	);
}

export function Contact() {
	const t = useTranslations("contact");
	const year = new Date().getFullYear();

	const cards: ContactCardProps[] = [
		{
			kind: "email",
			label: t("emailLabel"),
			value: t("emailValue"),
			href: `mailto:${t("emailValue")}`,
			accent: 290,
		},
		{
			kind: "linkedin",
			label: t("linkedinLabel"),
			value: t("linkedinValue"),
			href: "https://linkedin.com/in/tanguy-pauvret",
			accent: 250,
		},
		{
			kind: "github",
			label: t("githubLabel"),
			value: t("githubValue"),
			href: "https://github.com/Bima42",
			accent: 320,
		},
	];

	return (
		<section id="contact" className="bg-bg" style={{ padding: "140px 6vw 60px" }}>
			<div className="max-w-5xl mx-auto">
				<p className="font-mono text-[11px] uppercase tracking-caps text-fg-faint mb-3.5">
					{t("eyebrow")}
				</p>
				<h2
					className="font-semibold leading-tight tracking-tighter text-fg mb-6"
					style={{ fontSize: "clamp(48px, 8vw, 104px)", maxWidth: 900 }}
				>
					{t("heading")}
					<br />
					<span className="italic text-accent">{t("headingAccent")}</span>
				</h2>
				<p className="max-w-lg text-base leading-relaxed text-fg-muted mb-12">
					{t("subheading")}
				</p>

				{/* Cards */}
				<div
					className="grid gap-4"
					style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
				>
					{cards.map((card) => (
						<ContactCard key={card.kind} {...card} />
					))}
				</div>

				{/* Footer */}
				<footer className="mt-24 pt-8 border-t border-border flex justify-between items-center flex-wrap gap-4">
					<p className="font-mono text-[11px] tracking-wide text-fg-faint">
						© {year} Tanguy Pauvret · {t("footerBuilt")}
					</p>
					<p className="font-mono text-[11px] tracking-wide text-fg-faint">
						{t("footerLocation")}
					</p>
				</footer>
			</div>
		</section>
	);
}
