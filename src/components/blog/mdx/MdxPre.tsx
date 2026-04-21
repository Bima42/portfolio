"use client";

import { Check, Copy } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function MdxPre({
	children,
	...props
}: ComponentPropsWithoutRef<"pre">) {
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
					"rounded-xl border border-border overflow-x-auto p-[18px] text-[13.5px] leading-[1.55] font-mono bg-bg-sunken",
					props.className,
				)}
			>
				{children}
			</pre>
		</div>
	);
}
