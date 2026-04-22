import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/components/landing/about/timeline";
import { Badge } from "@/components/ui/badge";
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
			className={cn(
				"inline-block max-w-[440px] p-6 rounded-[14px] text-left",
				"bg-[var(--bg-elevated)]",
				"transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
				isActive ? "-translate-y-1" : "translate-y-0",
			)}
			style={{
				border: `1px solid ${isActive ? `oklch(0.75 0.12 ${item.accent} / 0.5)` : "var(--border)"}`,
				boxShadow: isActive
					? `var(--shadow-md), 0 0 0 4px oklch(0.88 0.06 ${item.accent} / 0.3)`
					: "var(--shadow-sm)",
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
					<Badge
						key={tag}
						variant="secondary"
						className="font-mono text-[10px]"
					>
						{tag}
					</Badge>
				))}
			</div>
		</div>
	);
}
