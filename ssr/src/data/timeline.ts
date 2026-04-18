export type TimelineType = "now" | "experience" | "education" | "project" | "pivot";

export interface TimelineItem {
	key: string;
	year: string;
	type: TimelineType;
	mark: string;
	accent: number;
	tags: string[];
}

export const TIMELINE_ITEMS: TimelineItem[] = [
	{
		key: "resilioNow",
		year: "2026",
		type: "now",
		mark: "R",
		accent: 290,
		tags: ["Django", "React", "Celery", "Docker", "LGTM"],
	},
	{
		key: "voltaire",
		year: "2024",
		type: "project",
		mark: "V",
		accent: 320,
		tags: ["Next.js", "FastAPI", "Postgres"],
	},
	{
		key: "mcpmem",
		year: "2024",
		type: "project",
		mark: "◇",
		accent: 260,
		tags: ["Python", "Neo4j", "FastAPI"],
	},
	{
		key: "resilioJoined",
		year: "2023",
		type: "experience",
		mark: "→",
		accent: 290,
		tags: ["Onboarding", "Architecture"],
	},
	{
		key: "ecole42",
		year: "2022",
		type: "education",
		mark: "42",
		accent: 200,
		tags: ["C", "C++", "Systems"],
	},
	{
		key: "kitchens",
		year: "2017",
		type: "pivot",
		mark: "✦",
		accent: 40,
		tags: ["Discipline", "Team"],
	},
	{
		key: "neuroscience",
		year: "2016",
		type: "education",
		mark: "◎",
		accent: 160,
		tags: ["Science", "Research"],
	},
];
