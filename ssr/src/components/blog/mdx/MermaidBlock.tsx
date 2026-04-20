"use client";

import mermaid from "mermaid";
import { useEffect, useId, useState } from "react";

mermaid.initialize({
	startOnLoad: false,
	theme: "dark",
	securityLevel: "loose",
});

export function MermaidBlock({ code }: { code: string }) {
	const rawId = useId();
	const id = rawId.replace(/:/g, "mermaid-");
	const [svg, setSvg] = useState<string>("");
	const [error, setError] = useState(false);

	useEffect(() => {
		let cancelled = false;
		mermaid
			.render(id, code)
			.then(({ svg }) => {
				if (!cancelled) setSvg(svg);
			})
			.catch((err) => {
				console.error("Mermaid render error:", err);
				if (!cancelled) setError(true);
			});
		return () => {
			cancelled = true;
		};
	}, [code, id]);

	if (error) {
		return (
			<div className="my-7 rounded-xl border border-border p-6 text-sm text-danger font-mono">
				Failed to render diagram.
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="my-7 rounded-xl border border-border bg-bg-sunken animate-pulse h-32" />
		);
	}

	return (
		<div
			className="my-7 flex justify-center overflow-x-auto rounded-xl border border-border bg-bg-sunken p-8"
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}
