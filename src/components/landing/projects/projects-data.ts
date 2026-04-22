export type ThumbKind =
	| "panel"
	| "graph"
	| "quill"
	| "xml"
	| "db"
	| "chart"
	| "term"
	| "stack"
	| "mobile";

export interface Project {
	title: string;
	key: string;
	kind: string;
	year: string;
	tags: string[];
	repo: string | null;
	live: string | null;
	accent: number;
	thumb: ThumbKind;
	award?: string;
	slug?: string;
	logo?: {
		light: string;
		dark?: string;
	};
}

export const PROJECTS: Project[] = [
	{
		title: "LLM Panel",
		key: "llm-panel",
		kind: "Desktop App",
		year: "2025",
		slug: "llm-panel",
		tags: [
			"electron",
			"react",
			"typescript",
			"lexical",
			"openrouter",
			"zustand",
		],
		repo: "github.com/Bima42/llm-panel",
		live: null,
		accent: 260,
		thumb: "panel",
	},
	{
		title: "MCP Mem",
		key: "mcp-mem",
		kind: "Hackathon · MCP Server",
		year: "2025",
		slug: "mcp-mem",
		award: "Smithery Prize",
		tags: [
			"python",
			"fastapi",
			"neo4j",
			"graphiti",
			"next.js",
			"docker",
			"mcp",
		],
		repo: "github.com/Bima42/mcp-mem",
		live: null,
		accent: 290,
		thumb: "graph",
	},
	{
		title: "Knower",
		key: "knower",
		kind: "Hackathon · Memory Service",
		year: "2025",
		slug: "knower",
		tags: ["python", "next.js", "fastapi", "mcp", "mistral", "typescript"],
		repo: "github.com/Birium/knower",
		live: null,
		accent: 140,
		thumb: "stack",
	},
	{
		title: "Voltaire",
		key: "voltaire",
		kind: "Paid Product",
		year: "2024",
		slug: "voltaire",
		tags: ["next.js", "fastapi", "postgres", "docker", "devops"],
		repo: null,
		live: "voltaire.chat",
		accent: 320,
		thumb: "quill",
		logo: {
			light: "/content/voltaire/logo-voltaire-black.svg",
		},
	},
	{
		title: "Prompt Pilot",
		key: "prompt-pilot",
		kind: "Tool",
		year: "2024",
		slug: "prompt-pilot",
		tags: ["python", "react", "docker", "next.js", "typescript"],
		repo: null,
		live: "prompt-pilot.app",
		accent: 70,
		thumb: "xml",
		logo: {
			light: "/content/prompt-pilot/logo-prompt-pilot-black.svg",
		},
	},
	{
		title: "Docstral",
		key: "docstral",
		kind: "Side Project",
		year: "2024",
		slug: "docstral",
		tags: ["next.js", "fastapi", "mistral", "rag", "docker", "typescript"],
		repo: null,
		live: "docstral.tanguypauvret.me",
		accent: 30,
		thumb: "db",
		logo: {
			light: "/content/docstral/logo-docstral.svg",
		},
	},
	{
		title: "Tidaka",
		key: "tidaka",
		kind: "Side Project",
		year: "2023",
		slug: "tidaka",
		tags: ["react-native", "expo", "nestjs", "postgres"],
		repo: null,
		live: null,
		accent: 220,
		thumb: "chart",
		logo: {
			light: "/content/tidaka/logo-tidaka.png",
		},
	},
	{
		title: "minishell",
		key: "minishell",
		kind: "School Project",
		year: "2022",
		tags: ["c", "systems", "42"],
		repo: "github.com/Bima42/minishell",
		live: null,
		accent: 110,
		thumb: "term",
	},
	{
		title: "ft_containers",
		key: "ft-containers",
		kind: "School Project",
		year: "2022",
		tags: ["c++", "systems", "42"],
		repo: "github.com/Bima42/ft_containers",
		live: null,
		accent: 90,
		thumb: "stack",
	},
];

export const ALL_TAGS = Array.from(
	new Set(PROJECTS.flatMap((p) => p.tags)),
).sort();
