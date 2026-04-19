"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocHeading } from "@/lib/mdx";

interface TableOfContentsProps {
	headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>("");
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (headings.length === 0) return;

		const ids = headings.map((h) => h.id);

		observerRef.current = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "-80px 0% -70% 0%", threshold: 0 },
		);

		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observerRef.current.observe(el);
		}

		return () => observerRef.current?.disconnect();
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<aside className="sticky top-24 w-56 shrink-0 hidden xl:block self-start">
			<p className="font-mono text-[11px] tracking-[0.08em] uppercase text-fg-faint mb-4">
				On this page
			</p>
			<nav>
				<ul className="space-y-1">
					{headings.map((h) => (
						<li key={h.id}>
							<a
								href={`#${h.id}`}
								className={cn(
									"block text-sm leading-snug transition-colors duration-150",
									h.depth === 3 && "pl-3",
									activeId === h.id
										? "text-accent font-medium"
										: "text-fg-faint hover:text-fg-muted",
								)}
							>
								{h.text}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
