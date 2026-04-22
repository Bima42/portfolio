"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

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

	function toggle() {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
		document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
	}

	return (
		<button
			onClick={toggle}
			className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-elevated text-fg text-sm font-medium transition-all hover:border-accent hover:text-accent"
			aria-label="Toggle theme"
		>
			{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
			{theme === "light" ? "Switch to dark" : "Switch to light"}
		</button>
	);
}
