export type ThumbKind = "panel" | "graph" | "quill" | "xml" | "db" | "chart" | "term" | "stack";

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
}

export const PROJECTS: Project[] = [
	{
		title: "LLM Panel",
		kind: "Desktop App",
		year: "2025",
		blurb:
			"Standalone daily-driver for LLM interaction. Zed-inspired text threads, Lexical editor, JSON plugin system, native FS access.",
		tags: ["electron", "react", "typescript", "lexical"],
		repo: "github.com/Bima42/llm-panel",
		live: null,
		accent: 260,
		thumb: "panel",
	},
	{
		title: "MCPMEM",
		kind: "Open Source",
		year: "2024",
		award: "Smithery Prize",
		blurb:
			"Temporal knowledge graph for LLMs. Relationship-based memory that's portable across applications and evolves over time.",
		tags: ["python", "fastapi", "neo4j", "graphiti"],
		repo: "github.com/Bima42/mcp-mem",
		live: null,
		accent: 290,
		thumb: "graph",
	},
	{
		title: "Voltaire",
		kind: "Paid Product",
		year: "2024",
		blurb:
			"AI writing assistant with an agentic architecture. 2w POC → 2mo MVP → hundreds of paying users. Continuous feedback loop through WhatsApp + Posthog.",
		tags: ["next.js", "fastapi", "postgres", "docker", "devops"],
		repo: null,
		live: "voltaire.chat",
		accent: 320,
		thumb: "quill",
	},
	{
		title: "Prompt Pilot",
		kind: "Tool",
		year: "2024",
		blurb:
			"XML prompt generator for LLMs. Turns vague asks into structured, reusable prompts. Retrieval grounded with FAISS.",
		tags: ["python", "react", "faiss", "docker"],
		repo: null,
		live: "prompt-pilot.app",
		accent: 200,
		thumb: "xml",
	},
	{
		title: "ResilioDatabase",
		kind: "At Work",
		year: "2024",
		blurb:
			"Custom dynamic API for environmental data, feeding the LCA platform. Architected the data model and the query layer from scratch.",
		tags: ["django", "postgres", "celery", "python"],
		repo: null,
		live: null,
		accent: 160,
		thumb: "db",
	},
	{
		title: "Observability Migration",
		kind: "At Work",
		year: "2023",
		blurb:
			"Rolled out the LGTM stack (Loki, Grafana, Tempo, Mimir) at Resilio. Cut dashboard p95 from 15s to under 600ms through ORM + Celery tuning.",
		tags: ["grafana", "loki", "celery", "django", "devops"],
		repo: null,
		live: null,
		accent: 40,
		thumb: "chart",
	},
	{
		title: "minishell",
		kind: "School Project",
		year: "2022",
		blurb:
			"Bash fundamentals implemented in C at École 42. Parser, executor, heredocs, signals — everything short of a shell history.",
		tags: ["c", "systems", "42"],
		repo: null,
		live: null,
		accent: 110,
		thumb: "term",
	},
	{
		title: "containers",
		kind: "School Project",
		year: "2022",
		blurb:
			"Reimplementation of the STL — vector, map, stack — in C++98. Allocators, iterators, red-black tree.",
		tags: ["c++", "systems", "42"],
		repo: null,
		live: null,
		accent: 90,
		thumb: "stack",
	},
];

export const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();
