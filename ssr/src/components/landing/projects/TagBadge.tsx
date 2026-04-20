import { Badge } from "@/components/ui/badge";
import { TAG_LOGOS } from "./tag-logos";

export function TagBadge({ tag }: { tag: string }) {
	const logo = TAG_LOGOS[tag];
	return (
		<Badge
			variant="secondary"
			className="font-mono text-[10px] hover:bg-accent-soft hover:text-accent-soft-fg transition-colors gap-1"
		>
			{logo && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={logo}
					alt=""
					aria-hidden
					width={12}
					height={12}
					className="object-contain shrink-0"
				/>
			)}
			#{tag}
		</Badge>
	);
}
