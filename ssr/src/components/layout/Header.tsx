"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const NAV_ITEMS = [
	{ href: "#about", key: "about" as const },
	{ href: "#work", key: "work" as const },
	{ href: "#writing", key: "writing" as const },
	{ href: "#contact", key: "contact" as const },
];

function GitHubIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.96 3.22 9.17 7.69 10.65.56.1.77-.24.77-.54 0-.27-.01-1.15-.02-2.08-3.13.68-3.79-1.32-3.79-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.28.94.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.73 10.73 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.41.35.77 1.05.77 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.65.78.54A11.25 11.25 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5z" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
			<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.25h4.56V23H.22zM8.03 8.25h4.37v2.02h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V23H8.03z" />
		</svg>
	);
}

function DownloadIcon() {
	return (
		<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
			<path d="M12 3v14M5 10l7 7 7-7M5 21h14" />
		</svg>
	);
}

export function Header() {
	const t = useTranslations("nav");
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const saved = document.documentElement.getAttribute("data-theme");
		if (saved === "dark") setTheme("dark");
	}, []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	function toggleTheme() {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
	}

	function switchLocale() {
		router.replace(pathname, { locale: locale === "en" ? "fr" : "en" });
	}

	const iconBtnCls =
		"w-8 h-8 rounded-pill bg-bg-sunken grid place-items-center text-fg-muted hover:text-fg transition-colors";

	return (
		<header
			className="glass fixed top-4 left-1/2 z-50 flex items-center gap-3 rounded-pill px-5 py-2.5 transition-shadow"
			style={{
				transform: "translateX(-50%)",
				width: "min(1180px, calc(100vw - 32px))",
				boxShadow: scrolled ? "var(--shadow-md)" : "none",
			}}
		>
			{/* Logo */}
			<a href="#top" className="flex items-center gap-2.5 font-medium shrink-0">
				<span
					className="w-7 h-7 rounded-lg grid place-items-center text-white text-lg font-semibold"
					style={{
						background: "linear-gradient(135deg, var(--accent), var(--periwinkle-400, #a8a4e8))",
						boxShadow: "0 2px 8px color-mix(in oklab, var(--accent) 40%, transparent)",
					}}
				>
					t
				</span>
				<span className="text-sm text-fg">
					tanguy<span className="text-fg-faint">.me</span>
				</span>
			</a>

			{/* Nav */}
			<nav className="hidden sm:flex gap-0.5 ml-6">
				{NAV_ITEMS.map((item) => (
					<a
						key={item.href}
						href={item.href}
						className="px-3 py-1.5 rounded-pill text-xs text-fg-muted hover:bg-bg-sunken hover:text-fg transition-all"
					>
						{t(item.key)}
					</a>
				))}
			</nav>

			{/* Controls */}
			<div className="ml-auto flex items-center gap-1.5">
				{/* Locale */}
				<button
					onClick={switchLocale}
					className="hidden sm:block px-2.5 py-1.5 rounded-pill text-xs font-mono uppercase tracking-wide text-fg-muted hover:text-fg hover:bg-bg-sunken transition-all"
					aria-label="Toggle language"
				>
					{locale}
				</button>

				{/* Theme */}
				<button onClick={toggleTheme} className={iconBtnCls} aria-label="Toggle theme">
					{theme === "light" ? (
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
							<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
						</svg>
					) : (
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
						</svg>
					)}
				</button>

				{/* Social */}
				<a
					href="https://github.com/Bima42"
					target="_blank"
					rel="noopener noreferrer"
					className={`${iconBtnCls} hidden sm:grid`}
					aria-label="GitHub"
				>
					<GitHubIcon />
				</a>
				<a
					href="https://linkedin.com/in/tanguy-pauvret"
					target="_blank"
					rel="noopener noreferrer"
					className={`${iconBtnCls} hidden sm:grid`}
					aria-label="LinkedIn"
				>
					<LinkedInIcon />
				</a>

				{/* CV */}
				<button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-fg text-bg text-xs font-medium hover:opacity-90 transition-opacity">
					<DownloadIcon />
					CV
				</button>
			</div>
		</header>
	);
}
