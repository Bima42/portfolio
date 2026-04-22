import type { Root as HastRoot } from "hast";
import type { Root as MdastRoot } from "mdast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

export interface TocHeading {
	id: string;
	text: string;
	depth: number;
}

// ── Remark: convert ```mermaid blocks → <MermaidBlock code="…"> ──────────────
// Must run BEFORE rehype-pretty-code so it never sees the mermaid fences.
function remarkMermaid() {
	return (tree: MdastRoot) => {
		visit(tree, "code", (node: any, index: any, parent: any) => {
			if (node.lang !== "mermaid" || index == null || !parent) return;

			parent.children[index] = {
				type: "mdxJsxFlowElement",
				name: "MermaidBlock",
				attributes: [
					{
						type: "mdxJsxAttribute",
						name: "code",
						value: node.value,
					},
				],
				children: [],
			};
		});
	};
}

// ── Rehype: extract headings for ToC ─────────────────────────────────────────
export function rehypeExtractHeadings(headings: TocHeading[]) {
	return () => (tree: HastRoot) => {
		visit(tree, "element", (node) => {
			if (
				node.type === "element" &&
				/^h[23]$/.test(node.tagName) &&
				node.properties?.id
			) {
				const id = node.properties.id as string;
				const depth = Number(node.tagName[1]);
				let text = "";
				visit(node, "text", (t: { type: string; value: string }) => {
					text += t.value;
				});
				headings.push({ id, text, depth });
			}
		});
	};
}

export const mdxOptions = {
	remarkPlugins: [remarkGfm, remarkMermaid],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: "wrap",
				properties: {
					className: ["anchor-link"],
					ariaLabel: "Link to section",
				},
			},
		],
		[
			rehypePrettyCode,
			{
				// Single theme → tokens get inline style="color:#xxx", no CSS-var injection needed.
				// Switch to "github-light" if you prefer a light theme.
				theme: "github-dark-dimmed",
				keepBackground: false,
				defaultLang: "plaintext",
				onVisitLine(node: { children: unknown[] }) {
					if (node.children.length === 0) {
						node.children = [{ type: "text", value: " " }];
					}
				},
			},
		],
	] as never[],
};
