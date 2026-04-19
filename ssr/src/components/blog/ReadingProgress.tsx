"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		function onScroll() {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div
			className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
			aria-hidden="true"
		>
			<div
				className="h-full bg-accent transition-[width] duration-75"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
