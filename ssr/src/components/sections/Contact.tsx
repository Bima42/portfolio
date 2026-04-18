"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";

function EmailIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
		>
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m3 7 9 6 9-6" />
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
	const icon =
		kind === "email" ? (
			<EmailIcon />
		) : kind === "linkedin" ? (
			<LinkedInIcon />
		) : (
			<GitHubIcon />
		);

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

			<p className="font-mono text-[10.5px] uppercase tracking-caps text-fg-faint mb-1.5">
				{label}
			</p>
			<p
				className="text-lg font-semibold tracking-tight text-fg mb-3 leading-snug truncate"
				title={value}
			>
				{value}
			</p>

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
		<section
			id="contact"
			className="bg-bg"
			style={{ padding: "140px 6vw 60px" }}
		>
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
					<span className="italic text-accent-hover">{t("headingAccent")}</span>
				</h2>
				<p className="max-w-lg text-base leading-relaxed text-fg-muted mb-12">
					{t("subheading")}
				</p>

				{/* Cards */}
				<div
					className="grid gap-4"
					style={{
						gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
					}}
				>
					{cards.map((card) => (
						<ContactCard key={card.kind} {...card} />
					))}
				</div>

				{/* Footer */}
				<footer className="mt-24 pt-8 border-t border-border flex justify-between items-center flex-wrap gap-4">
					<p className="font-mono text-[11px] tracking-wide text-fg-faint">
						© {year} Tanguy Pauvret
					</p>
					<p className="font-mono text-[11px] tracking-wide text-fg-faint">
						{t("footerLocation")}
					</p>
				</footer>
			</div>
		</section>
	);
}
