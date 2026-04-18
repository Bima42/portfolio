export type TimelineType =
	| "now"
	| "experience"
	| "education"
	| "project"
	| "pivot";

export interface TimelineItem {
	key: string;
	year: string;
	type: TimelineType;
	mark: string;
	accent: number;
	tags: string[];
	logo?: string;
}

export const TIMELINE_ITEMS: TimelineItem[] = [
	{
		key: "labster",
		year: "2026",
		type: "now",
		mark: "L",
		accent: 80,
		tags: ["React", "TypeScript", "Node.js", "Python", "DevOps"],
		logo: "/assets/brand-logos/logo-le-labster.svg",
	},
	{
		key: "resilio",
		year: "2026",
		type: "experience",
		mark: "R",
		accent: 160,
		tags: ["Django", "React", "Celery", "Docker", "LGTM"],
		logo: "/assets/brand-logos/logo-resilio.svg",
	},
	{
		key: "voltaire",
		year: "2024",
		type: "project",
		mark: "V",
		accent: 320,
		tags: ["Next.js", "FastAPI", "Postgres"],
		logo: "/assets/brand-logos/logo-voltaire.svg",
	},
	{
		key: "resilioJoined",
		year: "2023",
		type: "experience",
		mark: "→",
		accent: 160,
		tags: ["Onboarding", "Architecture"],
		logo: "/assets/brand-logos/logo-resilio.svg",
	},
	{
		key: "ecole42",
		year: "2022",
		type: "education",
		mark: "42",
		accent: 200,
		tags: ["C", "C++", "Systems"],
		logo: "/assets/brand-logos/logo-42.svg",
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
		accent: 290,
		tags: ["Science", "Research"],
	},
];
