import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui-kit/ThemeToggle";

interface BlogNavProps {
	locale: string;
}

export function BlogNav({ locale }: BlogNavProps) {
	return (
		<nav
			className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3"
			style={{
				background: "color-mix(in oklch, var(--bg) 80%, transparent)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				borderBottom: "1px solid var(--border-subtle)",
			}}
		>
			<Link
				href={`/${locale}`}
				className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0"
			>
				<Image
					src="/assets/logo/logo-primary.svg"
					alt="Logo"
					width={28}
					height={28}
					className="shrink-0"
				/>
				<span className="font-semibold text-sm tracking-tight truncate hidden xs:block">
					Tanguy Pauvret
				</span>
				<span className="text-fg-faint mx-1 hidden xs:block">/</span>
				<span className="font-mono text-xs text-fg-muted tracking-wide shrink-0">
					writing
				</span>
			</Link>

			<ThemeToggle />
		</nav>
	);
}
