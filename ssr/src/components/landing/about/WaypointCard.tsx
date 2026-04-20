import { Badge } from "@/components/ui/badge";
import type { TimelineItem } from "@/data/timeline";
import { TypeBadge } from "./TypeBadge";

interface WaypointCardProps {
	item: TimelineItem;
	title: string;
	role: string;
	where: string;
	summary: string;
	isActive: boolean;
}

export function WaypointCard({
	item,
	title,
	role,
	where,
	summary,
	isActive,
}: WaypointCardProps) {
	return (
		<div
			style={{
				display: "inline-block",
				maxWidth: 440,
				padding: 24,
				background: "var(--bg-elevated)",
				border: `1px solid ${isActive ? `oklch(0.75 0.12 ${item.accent} / 0.5)` : "var(--border)"}`,
				borderRadius: 14,
				boxShadow: isActive
					? `var(--shadow-md), 0 0 0 4px oklch(0.88 0.06 ${item.accent} / 0.3)`
					: "var(--shadow-sm)",
				transform: isActive ? "translateY(-4px)" : "translateY(0)",
				transition: "all 0.5s cubic-bezier(.2,.8,.2,1)",
				textAlign: "left",
			}}
		>
			<div className="flex items-center gap-2.5 flex-wrap mb-2.5">
				<TypeBadge type={item.type} />
				<span className="font-mono text-[10.5px] tracking-wide text-fg-faint">
					{where}
				</span>
			</div>
			<h3 className="text-xl font-semibold tracking-tight text-fg mb-0.5 leading-snug">
				{title}
			</h3>
			<p className="text-sm text-fg-muted mb-3">{role}</p>
			<p className="text-sm leading-relaxed text-fg-muted">{summary}</p>
			<div className="flex flex-wrap gap-1.5 mt-3.5">
				{item.tags.map((tag) => (
					<Badge key={tag} variant="secondary" className="font-mono text-[10px]">
						{tag}
					</Badge>
				))}
			</div>
		</div>
	);
}
