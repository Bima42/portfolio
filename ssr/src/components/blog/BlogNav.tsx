import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/blog/ThemeToggle";

interface BlogNavProps {
	locale: string;
}

export function BlogNav({ locale }: BlogNavProps) {
	return (
		<nav
			className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
			style={{
				background: "color-mix(in oklch, var(--bg) 80%, transparent)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				borderBottom: "1px solid var(--border-subtle)",
			}}
		>
			<Link
				href={`/${locale}`}
				className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
			>
				<Image
					src="/assets/logo/logo-primary.svg"
					alt="Logo"
					width={28}
					height={28}
				/>
				<span className="font-semibold text-sm tracking-tight">Tanguy Pauvret</span>
				<span className="text-fg-faint mx-1">/</span>
				<span className="font-mono text-xs text-fg-muted tracking-wide">writing</span>
			</Link>

			<ThemeToggle />
		</nav>
	);
}
