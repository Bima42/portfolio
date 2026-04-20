import { Badge } from "@/components/ui/badge";
import type { TimelineType } from "@/data/timeline";

export const TYPE_MAP: Record<TimelineType, { label: string; color: string }> = {
	now: { label: "Present", color: "oklch(0.72 0.18 145)" },
	experience: { label: "Experience", color: "var(--accent)" },
	education: { label: "Education", color: "oklch(0.66 0.15 200)" },
	project: { label: "Project", color: "oklch(0.72 0.18 320)" },
	pivot: { label: "Pivot", color: "oklch(0.74 0.16 40)" },
};

export function TypeBadge({ type }: { type: TimelineType }) {
	const m = TYPE_MAP[type] ?? TYPE_MAP.experience;
	return (
		<Badge
			variant="outline"
			className="gap-1.5 font-mono uppercase tracking-wide text-fg-muted border-border"
		>
			<span
				className="w-1.5 h-1.5 rounded-pill shrink-0"
				style={{
					background: m.color,
					animation:
						type === "now" ? "status-pulse 2s ease-in-out infinite" : undefined,
					boxShadow:
						type === "now"
							? `0 0 0 3px ${m.color.replace(")", " / 0.25)")}`
							: undefined,
				}}
			/>
			{m.label}
		</Badge>
	);
}
