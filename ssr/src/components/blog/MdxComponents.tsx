"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";

/* ── Text extractor from React node tree ─────────────────────── */

function extractText(node: ReactNode): string {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(extractText).join("");
	if (React.isValidElement(node)) {
		return extractText(
			(node.props as { children?: ReactNode }).children,
		);
	}
	return "";
}

/* ── Mermaid ──────────────────────────────────────────────────── */

function MermaidBlock({ code }: { code: string }) {
	const [svg, setSvg] = useState<string>("");
	const [error, setError] = useState<string>("");

	useEffect(() => {
		let cancelled = false;

		async function render() {
			try {
				const mermaid = (await import("mermaid")).default;
				mermaid.initialize({
					startOnLoad: false,
					theme:
						document.documentElement.getAttribute("data-theme") === "dark"
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
		return () => {
			cancelled = true;
		};
	}, [code]);

	if (error) {
		return (
			<div className="my-7 rounded-xl border border-border bg-bg-sunken p-4 font-mono text-xs text-danger overflow-x-auto">
				{error}
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="my-7 rounded-xl border border-border bg-bg-sunken p-4 flex items-center justify-center min-h-[120px]">
				<span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin inline-block" />
			</div>
		);
	}

	return (
		<div
			className="my-7 rounded-xl border border-border bg-bg-sunken p-6 overflow-x-auto flex justify-center"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid-rendered SVG is safe
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

/* ── Pre / Code block ─────────────────────────────────────────── */

type PreProps = ComponentPropsWithoutRef<"pre"> & {
	"data-language"?: string;
};

function MdxPre({ children, ...props }: PreProps) {
	const [copied, setCopied] = useState(false);
	const preRef = useRef<HTMLPreElement>(null);
	const language = props["data-language"] ?? "";

	if (language === "mermaid") {
		const code = extractText(children);
		return <MermaidBlock code={code} />;
	}

	async function handleCopy() {
		const text = preRef.current?.textContent ?? "";
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="group relative my-7">
			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-md font-mono text-[10px] text-fg-faint bg-bg/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:text-fg-muted"
				aria-label="Copy code"
			>
				{copied ? <Check size={11} /> : <Copy size={11} />}
				{copied ? "copied" : "copy"}
			</button>

			<pre
				ref={preRef}
				{...props}
				className="rounded-xl border border-border bg-bg-sunken overflow-x-auto p-[18px] text-[13.5px] leading-[1.55] font-mono"
			>
				{children}
			</pre>
		</div>
	);
}

/* ── Blockquote ───────────────────────────────────────────────── */

function MdxBlockquote({ children }: ComponentPropsWithoutRef<"blockquote">) {
	return (
		<blockquote className="my-8 pl-6 border-l-[3px] border-accent font-sans text-xl leading-[1.5] tracking-tight text-fg">
			{children}
		</blockquote>
	);
}

/* ── Table ────────────────────────────────────────────────────── */

function MdxTable({ children }: ComponentPropsWithoutRef<"table">) {
	return (
		<div className="my-7 overflow-x-auto rounded-xl border border-border">
			<table className="w-full border-collapse text-sm">{children}</table>
		</div>
	);
}

/* ── Export ───────────────────────────────────────────────────── */

export const mdxComponents = {
	pre: MdxPre,
	blockquote: MdxBlockquote,
	table: MdxTable,
};
