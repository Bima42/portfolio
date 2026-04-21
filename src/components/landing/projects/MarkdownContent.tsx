"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const videoExtensions = [".mp4", ".webm", ".mov"];

const markdownComponents = {
	h1: ({ children }: { children?: React.ReactNode }) => (
		<h1 className="text-2xl font-semibold mb-4 mt-8 text-fg">{children}</h1>
	),
	h2: ({ children }: { children?: React.ReactNode }) => (
		<h2 className="text-xl font-semibold mb-3 mt-6 text-fg">{children}</h2>
	),
	h3: ({ children }: { children?: React.ReactNode }) => (
		<h3 className="text-base font-medium mb-2 mt-5 text-fg">{children}</h3>
	),
	p: ({ children }: { children?: React.ReactNode }) => (
		<p className="mb-3 text-fg-muted leading-relaxed text-sm">{children}</p>
	),
	ul: ({ children }: { children?: React.ReactNode }) => (
		<ul className="mb-3 ml-5 space-y-1">{children}</ul>
	),
	ol: ({ children }: { children?: React.ReactNode }) => (
		<ol className="mb-3 ml-5 space-y-1 list-decimal">{children}</ol>
	),
	li: ({ children }: { children?: React.ReactNode }) => (
		<li className="text-sm text-fg-muted list-disc">{children}</li>
	),
	blockquote: ({ children }: { children?: React.ReactNode }) => (
		<blockquote className="border-l-2 border-border pl-4 my-3 text-sm text-fg-faint italic">
			{children}
		</blockquote>
	),
	code: ({
		children,
		className,
	}: {
		children?: React.ReactNode;
		className?: string;
	}) => {
		const isBlock = className?.startsWith("language-");
		if (isBlock) {
			return (
				<pre className="bg-bg-sunken rounded-lg p-3 overflow-x-auto my-3 text-xs">
					<code className={`${className ?? ""} text-fg-muted`}>{children}</code>
				</pre>
			);
		}
		return (
			<code className="bg-bg-sunken px-1 py-0.5 rounded text-xs text-fg-muted font-mono">
				{children}
			</code>
		);
	},
	img: ({ src, alt }: { src?: string; alt?: string }) => {
		if (videoExtensions.some((ext) => src?.endsWith(ext))) {
			return (
				<video
					src={src}
					className="w-full rounded-lg my-4 max-h-[50vh] object-contain"
					autoPlay
					muted
					loop
					playsInline
				/>
			);
		}
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={src}
				alt={alt}
				loading="lazy"
				width={1200}
				height={630}
				style={{ height: "auto" }}
				className="w-full rounded-lg my-4 object-contain max-h-[50vh]"
			/>
		);
	},
	table: ({ children }: { children?: React.ReactNode }) => (
		<div className="overflow-x-auto my-4">
			<table className="w-full text-sm border-collapse">{children}</table>
		</div>
	),
	th: ({ children }: { children?: React.ReactNode }) => (
		<th className="border border-border px-3 py-1.5 text-left text-xs font-medium text-fg bg-bg-elevated">
			{children}
		</th>
	),
	td: ({ children }: { children?: React.ReactNode }) => (
		<td className="border border-border px-3 py-1.5 text-xs text-fg-muted">
			{children}
		</td>
	),
};

export function MarkdownContent({ slug }: { slug?: string }) {
	const locale = useLocale();
	const [md, setMd] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;
		setMd(null);
		fetch(`/content/${slug}/content-${locale}.md`)
			.then((r) => (r.ok ? r.text() : Promise.reject()))
			.catch(() =>
				fetch(`/content/${slug}/content-en.md`).then((r) =>
					r.ok ? r.text() : Promise.reject(),
				),
			)
			.then((text) => setMd(text))
			.catch(() => setMd(""));
	}, [slug, locale]);

	if (!slug) return null;
	if (md === null)
		return <p className="text-sm text-fg-faint py-4">Loading…</p>;
	if (md === "") return null;

	return (
		<div className="mt-6 pt-6 border-t border-border">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={
					markdownComponents as Parameters<
						typeof ReactMarkdown
					>[0]["components"]
				}
			>
				{md}
			</ReactMarkdown>
		</div>
	);
}
