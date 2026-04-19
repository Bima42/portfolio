"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
	children: string;
	language?: string;
	"data-language"?: string;
}

interface MermaidBlockProps {
	code: string;
}

function MermaidBlock({ code }: MermaidBlockProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState<string>("");
	const [error, setError] = useState<string>("");

	useEffect(() => {
		let cancelled = false;

		async function render() {
			try {
				const mermaid = (await import("mermaid")).default;
				mermaid.initialize({
					startOnLoad: false,
					theme: document.documentElement.getAttribute("data-theme") === "dark"
						? "dark"
						: "neutral",
					fontFamily: "var(--font-mono)",
					fontSize: 13,
				});
				const id = `mermaid-${Math.random().toString(36).slice(2)}`;
				const { svg: rendered } = await mermaid.render(id, code.trim());
				if (!cancelled) setSvg(rendered);
			} catch (e) {
				if (!cancelled) setError(String(e));
			}
		}

		render();
		return () => { cancelled = true; };
	}, [code]);

	if (error) {
		return (
			<div className="rounded-xl border border-border bg-bg-sunken p-4 font-mono text-xs text-danger overflow-x-auto my-7">
				{error}
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="rounded-xl border border-border bg-bg-sunken p-4 my-7 flex items-center justify-center min-h-[120px]">
				<div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
			</div>
		);
	}

	return (
		<div
			ref={ref}
			className="rounded-xl border border-border bg-bg-sunken p-6 my-7 overflow-x-auto flex justify-center"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid-rendered SVG is safe
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const language = props["data-language"] ?? props.language ?? "";

	const code = typeof children === "string" ? children : "";

	if (language === "mermaid") {
		return <MermaidBlock code={code} />;
	}

	async function handleCopy() {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="group relative my-7">
			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-md font-mono text-[10px] text-fg-faint bg-bg-sunken border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:text-fg-muted"
				aria-label="Copy code"
			>
				{copied ? <Check size={11} /> : <Copy size={11} />}
				{copied ? "copied" : "copy"}
			</button>

			{/* rehype-pretty-code renders pre>code, we just wrap it */}
			<div className="rounded-xl overflow-hidden border border-border bg-bg-sunken text-sm leading-[1.55]">
				{children}
			</div>
		</div>
	);
}
