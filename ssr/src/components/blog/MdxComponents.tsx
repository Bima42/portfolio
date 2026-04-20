"use client";

import { Check, Copy } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ── Pre / Code block ─────────────────────────────────────────── */

/**
 * Wraps rehype-pretty-code's <pre> output with a copy button.
 * Merges classNames via cn() so rehype-pretty-code's data-theme classes
 * are preserved — the globals.css dual-theme visibility selectors depend on them.
 * Background is intentionally left to CSS (pre[data-theme] sets bg-sunken).
 */
function MdxPre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
	const [copied, setCopied] = useState(false);
	const preRef = useRef<HTMLPreElement>(null);

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
				className={cn(
					"rounded-xl border border-border overflow-x-auto p-[18px] text-[13.5px] leading-[1.55] font-mono",
					props.className,
				)}
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
