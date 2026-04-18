"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const saved = document.documentElement.getAttribute("data-theme");
		if (saved === "dark") setTheme("dark");
	}, []);

	function toggle() {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
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
