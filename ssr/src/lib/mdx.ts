import type { Root as HastRoot } from "hast";
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
	remarkPlugins: [remarkGfm],
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
				theme: {
					dark: "github-dark-dimmed",
					light: "github-light",
				},
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
