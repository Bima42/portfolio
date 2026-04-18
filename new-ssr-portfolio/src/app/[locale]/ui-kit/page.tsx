import {
	ArrowRight,
	ExternalLink,
	Mail,
	Moon,
	Search,
	Sun,
} from "lucide-react";
import { GravityGrid } from "@/components/ui-kit/GravityGrid";
import { MeshBg } from "@/components/ui-kit/MeshBg";
import { ThemeToggle } from "@/components/ui-kit/ThemeToggle";

// ── Helpers ──────────────────────────────────────────────────────────────────

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="py-10 border-b border-border">
			<h2 className="text-xs font-mono uppercase tracking-caps text-fg-faint mb-6">
				{title}
			</h2>
			{children}
		</section>
	);
}

function Label({ children }: { children: React.ReactNode }) {
	return (
		<p className="text-xs font-mono text-fg-faint mt-2 text-center">
			{children}
		</p>
	);
}

// ── Color swatches ────────────────────────────────────────────────────────────

const PRIMITIVE_PALETTES = [
	{
		name: "Purple (signature)",
		shades: [
			{ label: "50", cls: "bg-purple-50" },
			{ label: "100", cls: "bg-purple-100" },
			{ label: "200", cls: "bg-purple-200" },
			{ label: "300", cls: "bg-purple-300" },
			{ label: "400", cls: "bg-purple-400" },
			{ label: "500", cls: "bg-purple-500" },
			{ label: "600", cls: "bg-purple-600" },
			{ label: "700", cls: "bg-purple-700" },
			{ label: "800", cls: "bg-purple-800" },
			{ label: "900", cls: "bg-purple-900" },
			{ label: "950", cls: "bg-purple-950" },
		],
	},
	{
		name: "Ink (lavender-tinted neutrals)",
		shades: [
			{ label: "50", cls: "bg-ink-50" },
			{ label: "100", cls: "bg-ink-100" },
			{ label: "200", cls: "bg-ink-200" },
			{ label: "300", cls: "bg-ink-300" },
			{ label: "400", cls: "bg-ink-400" },
			{ label: "500", cls: "bg-ink-500" },
			{ label: "600", cls: "bg-ink-600" },
			{ label: "700", cls: "bg-ink-700" },
			{ label: "800", cls: "bg-ink-800" },
			{ label: "900", cls: "bg-ink-900" },
			{ label: "950", cls: "bg-ink-950" },
		],
	},
	{
		name: "Pastels",
		shades: [
			{ label: "rose-200", cls: "bg-rose-200" },
			{ label: "rose-400", cls: "bg-rose-400" },
			{ label: "peach-200", cls: "bg-peach-200" },
			{ label: "peach-400", cls: "bg-peach-400" },
			{ label: "mint-200", cls: "bg-mint-200" },
			{ label: "mint-400", cls: "bg-mint-400" },
			{ label: "sky-200", cls: "bg-sky-200" },
			{ label: "sky-400", cls: "bg-sky-400" },
			{ label: "periwinkle-200", cls: "bg-periwinkle-200" },
			{ label: "periwinkle-400", cls: "bg-periwinkle-400" },
			{ label: "butter-200", cls: "bg-butter-200" },
			{ label: "butter-400", cls: "bg-butter-400" },
		],
	},
] as const;

const SEMANTIC_TOKENS: { label: string; cls: string; border?: boolean }[] = [
	{ label: "bg", cls: "bg-bg", border: true },
	{ label: "bg-elevated", cls: "bg-bg-elevated", border: true },
	{ label: "bg-sunken", cls: "bg-bg-sunken", border: true },
	{ label: "accent", cls: "bg-accent" },
	{ label: "accent-soft", cls: "bg-accent-soft", border: true },
	{ label: "success", cls: "bg-success-bg", border: true },
	{ label: "warning", cls: "bg-warning-bg", border: true },
	{ label: "danger", cls: "bg-danger-bg", border: true },
	{ label: "info", cls: "bg-info-bg", border: true },
	{ label: "mesh-1", cls: "bg-mesh-1" },
	{ label: "mesh-2", cls: "bg-mesh-2" },
	{ label: "mesh-3", cls: "bg-mesh-3" },
	{ label: "mesh-4", cls: "bg-mesh-4" },
	{ label: "mesh-5", cls: "bg-mesh-5" },
];

// ── Typography specimens ──────────────────────────────────────────────────────

const TYPE_SCALE = [
	{ label: "text-5xl / 88px", cls: "text-5xl", sample: "Architect" },
	{ label: "text-4xl / 64px", cls: "text-4xl", sample: "Architect" },
	{ label: "text-3xl / 48px", cls: "text-3xl", sample: "Architect" },
	{ label: "text-2xl / 36px", cls: "text-2xl", sample: "Software Engineer" },
	{ label: "text-xl / 28px", cls: "text-xl", sample: "Software Engineer" },
	{
		label: "text-lg / 22px",
		cls: "text-lg",
		sample: "Building systems that last.",
	},
	{
		label: "text-md / 18px",
		cls: "text-md",
		sample: "Building systems that last.",
	},
	{
		label: "text-base / 16px",
		cls: "text-base",
		sample: "Building systems that last.",
	},
	{
		label: "text-sm / 14px",
		cls: "text-sm",
		sample: "Building systems that last.",
	},
	{
		label: "text-xs / 12px",
		cls: "text-xs",
		sample: "MONO LABEL — UPPERCASE",
	},
] as const;

// ── Radii ─────────────────────────────────────────────────────────────────────

const RADII = [
	{ label: "radius-xs / 3px", cls: "rounded-xs" },
	{ label: "radius-sm / 4px", cls: "rounded-sm" },
	{ label: "radius-md / 6px", cls: "rounded-md" },
	{ label: "radius-lg / 8px", cls: "rounded-lg" },
	{ label: "radius-xl / 10px", cls: "rounded-xl" },
	{ label: "radius-2xl / 14px", cls: "rounded-2xl" },
	{ label: "radius-3xl / 24px", cls: "rounded-3xl" },
	{ label: "radius-pill / 999px", cls: "rounded-pill" },
] as const;

// ── Shadows ───────────────────────────────────────────────────────────────────

const SHADOWS = [
	{ label: "shadow-xs", cls: "shadow-xs" },
	{ label: "shadow-sm", cls: "shadow-sm" },
	{ label: "shadow-md", cls: "shadow-md" },
	{ label: "shadow-lg", cls: "shadow-lg" },
	{ label: "shadow-xl", cls: "shadow-xl" },
	{ label: "shadow-glow", cls: "shadow-glow" },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UiKitPage() {
	return (
		<div className="min-h-screen bg-bg text-fg font-sans">
			{/* Header */}
			<div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
				<div>
					<h1 className="text-base font-semibold text-fg">
						Tanguy Design System
					</h1>
					<p className="text-xs font-mono text-fg-faint">
						UI Kit — all primitives
					</p>
				</div>
				<ThemeToggle />
			</div>

			<div className="max-w-5xl mx-auto px-8 pb-20">
				{/* ── Colors: Primitives */}
				<Section title="Colors — Primitive scales">
					{PRIMITIVE_PALETTES.map((palette) => (
						<div key={palette.name} className="mb-8">
							<p className="text-xs font-mono text-fg-subtle mb-3">
								{palette.name}
							</p>
							<div className="flex flex-wrap gap-2">
								{palette.shades.map((shade) => (
									<div key={shade.label} className="flex flex-col items-center">
										<div
											className={`w-10 h-10 rounded-lg ${shade.cls} border border-border-subtle`}
										/>
										<Label>{shade.label}</Label>
									</div>
								))}
							</div>
						</div>
					))}
				</Section>

				{/* ── Colors: Semantic */}
				<Section title="Colors — Semantic tokens">
					<div className="flex flex-wrap gap-4">
						{SEMANTIC_TOKENS.map((token) => (
							<div key={token.label} className="flex flex-col items-center">
								<div
									className={`w-16 h-16 rounded-2xl ${token.cls} ${token.border ? "border border-border" : ""}`}
								/>
								<Label>{token.label}</Label>
							</div>
						))}
					</div>
					<div className="mt-6 flex flex-wrap gap-3">
						<span className="text-success text-sm font-mono">success text</span>
						<span className="text-warning text-sm font-mono">warning text</span>
						<span className="text-danger text-sm font-mono">danger text</span>
						<span className="text-info text-sm font-mono">info text</span>
						<span className="text-fg-muted text-sm font-mono">muted text</span>
						<span className="text-fg-subtle text-sm font-mono">
							subtle text
						</span>
						<span className="text-fg-faint text-sm font-mono">faint text</span>
						<span className="text-accent text-sm font-mono">accent text</span>
					</div>
				</Section>

				{/* ── Typography */}
				<Section title="Typography — Type scale (Geist)">
					<div className="space-y-4">
						{TYPE_SCALE.map((t) => (
							<div key={t.label} className="flex items-baseline gap-6">
								<span className="w-36 shrink-0 text-xs font-mono text-fg-faint">
									{t.label}
								</span>
								<span
									className={`${t.cls} font-semibold text-fg leading-tight`}
								>
									{t.sample}
								</span>
							</div>
						))}
					</div>

					<div className="mt-8 space-y-2">
						<p className="text-xs font-mono text-fg-faint mb-3">Font weights</p>
						<p className="text-lg font-regular text-fg">
							Regular 400 — Building systems that last.
						</p>
						<p className="text-lg font-medium text-fg">
							Medium 500 — Building systems that last.
						</p>
						<p className="text-lg font-semibold text-fg">
							Semibold 600 — Building systems that last.
						</p>
						<p className="text-lg font-bold text-fg">
							Bold 700 — Building systems that last.
						</p>
					</div>

					<div className="mt-8">
						<p className="text-xs font-mono text-fg-faint mb-3">
							Mono specimens
						</p>
						<p className="text-base font-mono text-fg-muted tracking-tight">
							const architect = () =&gt; buildSystemsThatLast();
						</p>
						<p className="text-xs font-mono text-fg-subtle tracking-caps uppercase mt-2">
							§ 01 — Eyebrow label
						</p>
					</div>
				</Section>

				{/* ── Spacing */}
				<Section title="Spacing — 4pt grid">
					<div className="flex flex-wrap items-end gap-3">
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
							const heights = [
								"h-1",
								"h-2",
								"h-3",
								"h-4",
								"h-5",
								"h-6",
								"h-7",
								"h-8",
								"h-9",
								"h-10",
							];
							const rems = [
								"0.25rem",
								"0.5rem",
								"0.75rem",
								"1rem",
								"1.5rem",
								"2rem",
								"3rem",
								"4rem",
								"6rem",
								"8rem",
							];
							return (
								<div key={n} className="flex flex-col items-center gap-1">
									<div
										className={`w-8 ${heights[n - 1]} bg-accent rounded-xs`}
									/>
									<span className="text-xs font-mono text-fg-faint">{n}</span>
									<span className="text-xs font-mono text-fg-faint">
										{rems[n - 1]}
									</span>
								</div>
							);
						})}
					</div>
				</Section>

				{/* ── Radii */}
				<Section title="Border radii">
					<div className="flex flex-wrap gap-4">
						{RADII.map((r) => (
							<div key={r.label} className="flex flex-col items-center">
								<div
									className={`w-16 h-16 bg-accent-soft border border-accent ${r.cls}`}
								/>
								<Label>{r.label}</Label>
							</div>
						))}
					</div>
				</Section>

				{/* ── Shadows */}
				<Section title="Shadows">
					<div className="flex flex-wrap gap-6">
						{SHADOWS.map((s) => (
							<div key={s.label} className="flex flex-col items-center">
								<div
									className={`w-24 h-24 bg-bg-elevated rounded-2xl ${s.cls} flex items-center justify-center`}
								>
									<span className="text-xs font-mono text-fg-subtle text-center">
										{s.label}
									</span>
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* ── Buttons */}
				<Section title="Buttons — variants × sizes">
					<div className="space-y-4">
						{(["sm", "md", "lg"] as const).map((size) => {
							const padding =
								size === "sm"
									? "px-3 py-1.5 text-sm"
									: size === "lg"
										? "px-6 py-3 text-md"
										: "px-4 py-2 text-base";
							return (
								<div key={size} className="flex flex-wrap items-center gap-3">
									<span className="w-8 text-xs font-mono text-fg-faint">
										{size}
									</span>
									{/* Primary */}
									<button
										className={`${padding} rounded-xl bg-accent text-fg-on-accent font-medium transition-all hover:bg-accent-hover active:bg-accent-pressed focus-visible:outline-none focus-visible:shadow-glow`}
									>
										Primary
									</button>
									{/* Secondary */}
									<button
										className={`${padding} rounded-xl bg-accent-soft text-accent-soft-fg font-medium transition-all hover:bg-accent/20 focus-visible:outline-none focus-visible:shadow-glow`}
									>
										Secondary
									</button>
									{/* Outline */}
									<button
										className={`${padding} rounded-xl border border-border bg-transparent text-fg font-medium transition-all hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:shadow-glow`}
									>
										Outline
									</button>
									{/* Ghost */}
									<button
										className={`${padding} rounded-xl bg-transparent text-fg-muted font-medium transition-all hover:bg-bg-sunken hover:text-fg focus-visible:outline-none focus-visible:shadow-glow`}
									>
										Ghost
									</button>
									{/* With icon */}
									<button
										className={`${padding} rounded-xl bg-accent text-fg-on-accent font-medium flex items-center gap-2 transition-all hover:bg-accent-hover focus-visible:outline-none focus-visible:shadow-glow`}
									>
										With icon <ArrowRight size={size === "sm" ? 14 : 16} />
									</button>
								</div>
							);
						})}
					</div>
				</Section>

				{/* ── Badges */}
				<Section title="Badges & Pills">
					<div className="flex flex-wrap gap-3">
						{[
							{
								label: "Default",
								cls: "bg-bg-sunken text-fg-muted border-border",
							},
							{
								label: "Accent",
								cls: "bg-accent-soft text-accent-soft-fg border-transparent",
							},
							{
								label: "Success",
								cls: "bg-success-bg text-success border-transparent",
							},
							{
								label: "Warning",
								cls: "bg-warning-bg text-warning border-transparent",
							},
							{
								label: "Danger",
								cls: "bg-danger-bg text-danger border-transparent",
							},
							{
								label: "Info",
								cls: "bg-info-bg text-info border-transparent",
							},
						].map((badge) => (
							<span
								key={badge.label}
								className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-xs font-mono border ${badge.cls}`}
							>
								<span className="w-1.5 h-1.5 rounded-pill bg-current opacity-70" />
								{badge.label}
							</span>
						))}
					</div>
				</Section>

				{/* ── Eyebrow */}
				<Section title="Eyebrow label">
					<p className="text-xs font-mono uppercase tracking-caps text-fg-faint">
						§ 01 — Section label
					</p>
					<p className="text-xs font-mono uppercase tracking-caps text-accent mt-2">
						§ 02 — Accent eyebrow
					</p>
				</Section>

				{/* ── Cards */}
				<Section title="Cards">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{[
							{
								title: "Default card",
								body: "Uses bg-elevated and shadow-sm. Lifts to shadow-lg on hover.",
								shadow: "shadow-sm hover:shadow-lg",
							},
							{
								title: "Glow card",
								body: "Active state uses shadow-glow. Great for selected / focused cards.",
								shadow: "shadow-glow",
							},
							{
								title: "Sunken card",
								body: "bg-sunken for inset feel. No shadow by default.",
								shadow: "",
							},
						].map((card) => (
							<div
								key={card.title}
								className={`rounded-2xl border border-border bg-bg-elevated p-6 transition-all duration-240 ${card.shadow}`}
							>
								<h3 className="text-base font-semibold text-fg mb-2">
									{card.title}
								</h3>
								<p className="text-sm text-fg-muted leading-relaxed">
									{card.body}
								</p>
							</div>
						))}
					</div>
				</Section>

				{/* ── Logo */}
				<Section title="Logo variants">
					<div className="flex flex-wrap gap-8 items-center">
						<div className="flex flex-col items-center gap-2">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/assets/logo/logo-primary.svg"
								alt="Logo primary"
								className="h-10"
							/>
							<Label>logo-primary</Label>
						</div>
						<div className="flex flex-col items-center gap-2">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/assets/logo/logo-mono.svg"
								alt="Logo mono"
								className="h-10"
							/>
							<Label>logo-mono</Label>
						</div>
						<div className="flex flex-col items-center gap-2 p-4 bg-ink-900 rounded-xl">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/assets/logo/logo-white.svg"
								alt="Logo white"
								className="h-10"
							/>
							<Label>logo-white</Label>
						</div>
						<div className="flex flex-col items-center gap-2 p-4 bg-ink-900 rounded-xl">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/assets/logo/logo-glow.svg"
								alt="Logo glow"
								className="h-10"
							/>
							<Label>logo-glow</Label>
						</div>
						<div className="flex flex-col items-center gap-2">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/assets/logo/logo-mark.svg"
								alt="Logo mark"
								className="h-10"
							/>
							<Label>logo-mark</Label>
						</div>
					</div>
				</Section>

				{/* ── Icons */}
				<Section title="Icons — Lucide (1.75px stroke, 24px grid)">
					<div className="flex flex-wrap gap-6">
						{[
							{
								name: "Sun",
								el: <Sun size={24} strokeWidth={1.75} />,
							},
							{
								name: "Moon",
								el: <Moon size={24} strokeWidth={1.75} />,
							},
							{
								name: "Search",
								el: <Search size={24} strokeWidth={1.75} />,
							},
							{
								name: "Mail",
								el: <Mail size={24} strokeWidth={1.75} />,
							},
							{
								name: "ExternalLink",
								el: <ExternalLink size={24} strokeWidth={1.75} />,
							},
							{
								name: "ArrowRight",
								el: <ArrowRight size={24} strokeWidth={1.75} />,
							},
						].map((icon) => (
							<div key={icon.name} className="flex flex-col items-center gap-2">
								<div className="w-10 h-10 flex items-center justify-center rounded-lg bg-bg-sunken text-fg">
									{icon.el}
								</div>
								<Label>{icon.name}</Label>
							</div>
						))}
					</div>
				</Section>

				{/* ── Animations */}
				<Section title="Animations — drift keyframe">
					<div className="flex flex-wrap gap-6 items-center">
						<div className="flex flex-col items-center gap-2">
							<div
								className="w-16 h-16 rounded-3xl bg-accent opacity-60"
								style={{
									animation:
										"tp-drift 22s cubic-bezier(0.22,1,0.36,1) infinite alternate",
								}}
							/>
							<Label>animate-drift</Label>
						</div>
						<div className="text-sm text-fg-muted max-w-xs leading-relaxed">
							Cinematic ease-out-soft. 22s loop. Used for mesh gradient blobs
							and ambient background elements.
						</div>
					</div>
				</Section>

				{/* ── MeshBg */}
				<Section title="Background — MeshBg (animated gradient)">
					<MeshBg className="h-48 rounded-3xl" />
				</Section>

				{/* ── GravityGrid */}
				<Section title="Background — GravityGrid (canvas, hover to interact)">
					<div className="h-48 rounded-3xl overflow-hidden bg-bg-sunken border border-border">
						<GravityGrid />
					</div>
				</Section>

				{/* ── Easing reference */}
				<Section title="Easing curves">
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
						{[
							{
								name: "ease-out-soft",
								val: "cubic-bezier(0.22, 1, 0.36, 1)",
								note: "Default",
							},
							{
								name: "ease-out-quart",
								val: "cubic-bezier(0.25, 1, 0.5, 1)",
								note: "Fast exit",
							},
							{
								name: "ease-in-out",
								val: "cubic-bezier(0.65, 0, 0.35, 1)",
								note: "Crossfade",
							},
							{
								name: "ease-spring",
								val: "cubic-bezier(0.34, 1.56, 0.64, 1)",
								note: "Playful",
							},
						].map((e) => (
							<div
								key={e.name}
								className="rounded-xl border border-border bg-bg-elevated p-4"
							>
								<p className="text-xs font-mono text-accent font-medium">
									{e.name}
								</p>
								<p className="text-xs font-mono text-fg-faint mt-1 break-all">
									{e.val}
								</p>
								<p className="text-xs text-fg-subtle mt-2">{e.note}</p>
							</div>
						))}
					</div>
				</Section>

				{/* ── Duration reference */}
				<Section title="Duration tokens">
					<div className="flex flex-wrap gap-3">
						{[
							{ label: "fast", val: "160ms" },
							{ label: "base", val: "240ms" },
							{ label: "slow", val: "420ms" },
							{ label: "slower", val: "720ms" },
							{ label: "cinematic", val: "1200ms" },
						].map((d) => (
							<div
								key={d.label}
								className="px-3 py-2 rounded-lg bg-bg-sunken border border-border"
							>
								<p className="text-xs font-mono text-accent">{d.label}</p>
								<p className="text-xs font-mono text-fg-muted">{d.val}</p>
							</div>
						))}
					</div>
				</Section>
			</div>
		</div>
	);
}
