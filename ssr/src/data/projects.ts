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
	kind: string;
	year: string;
	blurb: string;
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
		kind: "Desktop App",
		year: "2025",
		slug: "llm-panel",
		blurb:
			"Standalone daily-driver for LLM interaction. Zed-inspired text threads, Lexical editor, JSON plugin system, native FS access.",
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
		kind: "Hackathon · MCP Server",
		year: "2025",
		slug: "mcp-mem",
		award: "Smithery Prize",
		blurb:
			"Temporal knowledge graph for LLMs. Relationship-based memory that's portable across applications and evolves over time.",
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
		kind: "Hackathon · Memory Service",
		year: "2025",
		slug: "knower",
		award: "Mistral AI Hackathon",
		blurb:
			"Local portable memory service that decouples memory from the AI tool. One vault, every agent — context follows you across Claude, Cursor, Mistral, and any MCP client.",
		tags: ["python", "next.js", "fastapi", "mcp", "mistral", "typescript"],
		repo: "github.com/Birium/knower",
		live: null,
		accent: 140,
		thumb: "stack",
	},
	{
		title: "Voltaire",
		kind: "Paid Product",
		year: "2024",
		slug: "voltaire",
		blurb:
			"AI writing assistant with an agentic architecture. 2w POC → 2mo MVP → hundreds of paying users. Continuous feedback loop through WhatsApp + Posthog.",
		tags: ["next.js", "fastapi", "postgres", "docker", "devops"],
		repo: null,
		live: "voltaire.chat",
		accent: 320,
		thumb: "quill",
		logo: {
			light: "/content/voltaire/logo-voltaire-black.svg",
			dark: "/content/voltaire/logo-voltaire-white.svg",
		},
	},
	{
		title: "Prompt Pilot",
		kind: "Tool",
		year: "2024",
		slug: "prompt-pilot",
		blurb:
			"XML prompt generator for LLMs. Turns vague asks into structured, reusable prompts. Retrieval grounded with FAISS.",
		tags: ["python", "react", "faiss", "docker"],
		repo: null,
		live: "prompt-pilot.app",
		accent: 200,
		thumb: "xml",
		logo: {
			light: "/content/prompt-pilot/logo-prompt-pilot-black.svg",
			dark: "/content/prompt-pilot/logo-prompt-pilot-white.svg",
		},
	},
	{
		title: "Docstral",
		kind: "Side Project",
		year: "2024",
		slug: "docstral",
		blurb:
			"AI-powered sandbox chat for Mistral models and documentation. RAG over official Mistral docs — sourced answers, streaming, code snippets.",
		tags: ["next.js", "fastapi", "mistral", "rag", "docker"],
		repo: null,
		live: "docstral.app",
		accent: 30,
		thumb: "db",
		logo: {
			light: "/content/docstral/logo-docstral.svg",
		},
	},
	{
		title: "Tidaka",
		kind: "Side Project",
		year: "2023",
		slug: "tidaka",
		blurb:
			"Mobile app connecting sports coaches with their clients for training management, session planning, and progress tracking.",
		tags: ["react-native", "expo", "nest.js", "postgres"],
		repo: null,
		live: null,
		accent: 170,
		thumb: "chart",
		logo: {
			light: "/content/tidaka/logo-tidaka.png",
		},
	},
	{
		title: "minishell",
		kind: "School Project",
		year: "2022",
		blurb:
			"Bash fundamentals implemented in C at École 42. Parser, executor, heredocs, signals — everything short of a shell history.",
		tags: ["c", "systems", "42"],
		repo: "github.com/Bima42/minishell",
		live: null,
		accent: 110,
		thumb: "term",
	},
	{
		title: "ft_containers",
		kind: "School Project",
		year: "2022",
		blurb:
			"Reimplementation of the STL — vector, map, stack — in C++98. Allocators, iterators, red-black tree.",
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
