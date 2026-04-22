import type { ComponentPropsWithoutRef } from "react";
import { MdxPre } from "@/components/blog/mdx/MdxPre";
import { MermaidBlock } from "@/components/blog/mdx/MermaidBlock";

function MdxBlockquote({ children }: ComponentPropsWithoutRef<"blockquote">) {
	return (
		<blockquote className="my-8 pl-6 border-l-[3px] border-accent font-sans text-xl leading-[1.5] tracking-tight text-fg">
			{children}
		</blockquote>
	);
}

function MdxTable({ children }: ComponentPropsWithoutRef<"table">) {
	return (
		<div className="my-7 overflow-x-auto rounded-xl border border-border">
			<table className="w-full border-collapse text-sm">{children}</table>
		</div>
	);
}

export const mdxComponents = {
	pre: MdxPre,
	blockquote: MdxBlockquote,
	table: MdxTable,
	MermaidBlock,
};
