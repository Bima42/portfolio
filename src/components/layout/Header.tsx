"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ href: "#about", key: "about" as const },
	{ href: "#work", key: "work" as const },
	{ href: "#contact", key: "contact" as const },
	{ href: "/blog", key: "writing" as const },
];

export function Header() {
	const t = useTranslations("nav");
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const hasCookie = document.cookie.split(";").some((c) =>
			c.trim().startsWith("theme="),
		);
		if (!hasCookie) {
			const preferred = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			document.documentElement.setAttribute("data-theme", preferred);
			document.cookie = `theme=${preferred}; path=/; max-age=31536000; SameSite=Lax`;
			setTheme(preferred);
		} else {
			setTheme(
				document.documentElement.getAttribute("data-theme") as "light" | "dark",
			);
		}
	}, []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	function toggleTheme() {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
		document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
	}

	function switchLocale() {
		router.replace(pathname, { locale: locale === "en" ? "fr" : "en" });
	}

	const navLinkClass = cn(
		buttonVariants({ variant: "ghost", size: "sm" }),
		"text-fg-muted hover:text-fg font-normal",
	);

	return (
		<header
			className="fixed top-0 left-0 right-0 z-50 transition-[box-shadow,border-color,background-color]"
			style={{
				backdropFilter: "blur(20px) saturate(180%)",
				WebkitBackdropFilter: "blur(20px) saturate(180%)",
				background: scrolled
					? "color-mix(in oklch, var(--bg) 82%, transparent)"
					: "color-mix(in oklch, var(--bg) 60%, transparent)",
				borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
				boxShadow: scrolled ? "var(--shadow-sm)" : "none",
			}}
		>
			<div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center gap-3">
				{/* Logo */}
				<a
					href="#top"
					className="flex items-center gap-2.5 font-medium shrink-0"
				>
					<Image
						src="/assets/logo/logo-primary.svg"
						alt="Logo"
						width={52}
						height={52}
					/>
				</a>

				{/* Desktop Nav */}
				<nav className="hidden sm:flex gap-0.5 ml-6">
					{NAV_ITEMS.map((item) =>
						item.href.startsWith("#") ? (
							<a key={item.href} href={item.href} className={navLinkClass}>
								{t(item.key)}
							</a>
						) : (
							<Link key={item.href} href={item.href} className={navLinkClass}>
								{t(item.key)}
							</Link>
						),
					)}
				</nav>

				{/* Controls */}
				<div className="ml-auto flex items-center gap-1">
					<a
						href="https://github.com/Bima42"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							buttonVariants({ variant: "ghost", size: "icon" }),
							"hidden sm:inline-flex text-fg-muted hover:text-fg",
						)}
						aria-label="GitHub"
					>
						<GitHubIcon size={16} />
					</a>
					<a
						href="https://linkedin.com/in/tanguy-pauvret"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							buttonVariants({ variant: "ghost", size: "icon" }),
							"hidden sm:inline-flex text-fg-muted hover:text-fg",
						)}
						aria-label="LinkedIn"
					>
						<LinkedInIcon size={16} />
					</a>

					<Button
						onClick={switchLocale}
						variant="ghost"
						size="icon"
						className="hidden sm:inline-flex font-mono uppercase tracking-wide text-fg-muted hover:text-fg"
						aria-label="Toggle language"
					>
						{locale}
					</Button>

					<Button
						onClick={toggleTheme}
						variant="ghost"
						size="icon"
						className="text-fg-muted hover:text-fg"
						aria-label="Toggle theme"
					>
						{theme === "light" ? <Moon /> : <Sun />}
					</Button>

					{/* Hamburger — mobile only */}
					<Button
						onClick={() => setMenuOpen((o) => !o)}
						variant="ghost"
						size="icon"
						className="sm:hidden text-fg-muted hover:text-fg"
						aria-label="Toggle menu"
					>
						{menuOpen ? <X /> : <Menu />}
					</Button>
				</div>
			</div>

			{/* Mobile dropdown */}
			{menuOpen && (
				<div
					className="sm:hidden border-t border-border px-6 py-4 flex flex-col gap-1"
					style={{
						background: "color-mix(in oklch, var(--bg) 96%, transparent)",
					}}
				>
					{NAV_ITEMS.map((item) =>
						item.href.startsWith("#") ? (
							<a
								key={item.href}
								href={item.href}
								className={cn(navLinkClass, "w-full justify-start")}
								onClick={() => setMenuOpen(false)}
							>
								{t(item.key)}
							</a>
						) : (
							<Link
								key={item.href}
								href={item.href}
								className={cn(navLinkClass, "w-full justify-start")}
								onClick={() => setMenuOpen(false)}
							>
								{t(item.key)}
							</Link>
						),
					)}
					<div className="flex items-center gap-2 pt-3 mt-2 border-t border-border">
						<a
							href="https://github.com/Bima42"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "ghost", size: "icon" }),
								"text-fg-muted hover:text-fg",
							)}
							aria-label="GitHub"
						>
							<GitHubIcon size={16} />
						</a>
						<a
							href="https://linkedin.com/in/tanguy-pauvret"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "ghost", size: "icon" }),
								"text-fg-muted hover:text-fg",
							)}
							aria-label="LinkedIn"
						>
							<LinkedInIcon size={16} />
						</a>
						<Button
							onClick={switchLocale}
							variant="ghost"
							size="icon"
							className="font-mono uppercase tracking-wide text-fg-muted hover:text-fg"
							aria-label="Toggle language"
						>
							{locale}
						</Button>
					</div>
				</div>
			)}
		</header>
	);
}
