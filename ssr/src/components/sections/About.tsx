"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
	TIMELINE_ITEMS,
	type TimelineItem,
	type TimelineType,
} from "@/data/timeline";

// ── Scroll hooks ──────────────────────────────────────────────────────────────

function useActiveIndex(itemRefs: React.RefObject<(HTMLDivElement | null)[]>) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		let raf = 0;
		const onScroll = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				const mid = window.innerHeight * 0.42;
				let best = 0;
				let bestDist = Infinity;
				itemRefs.current.forEach((el, i) => {
					if (!el) return;
					const r = el.getBoundingClientRect();
					const center = r.top + r.height / 2;
					const dist = Math.abs(center - mid);
					if (dist < bestDist) {
						bestDist = dist;
						best = i;
					}
				});
				setActive(best);
			});
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, [itemRefs]);

	return active;
}

// ── TypeBadge ─────────────────────────────────────────────────────────────────

const TYPE_MAP: Record<TimelineType, { label: string; color: string }> = {
	now: { label: "Present", color: "oklch(0.72 0.18 145)" },
	experience: { label: "Experience", color: "var(--accent)" },
	education: { label: "Education", color: "oklch(0.66 0.15 200)" },
	project: { label: "Project", color: "oklch(0.72 0.18 320)" },
	pivot: { label: "Pivot", color: "oklch(0.74 0.16 40)" },
};

function TypeBadge({ type }: { type: TimelineType }) {
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
					animation: type === "now" ? "status-pulse 2s ease-in-out infinite" : undefined,
					boxShadow: type === "now" ? `0 0 0 3px ${m.color.replace(")", " / 0.25)")}` : undefined,
				}}
			/>
			{m.label}
		</Badge>
	);
}

// ── Theme hook ────────────────────────────────────────────────────────────────

function useIsDark() {
	const [dark, setDark] = useState(false);
	useEffect(() => {
		const el = document.documentElement;
		const check = () => setDark(el.getAttribute("data-theme") === "dark");
		check();
		const obs = new MutationObserver(check);
		obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
		return () => obs.disconnect();
	}, []);
	return dark;
}

// ── WaypointCard ──────────────────────────────────────────────────────────────

interface WaypointCardProps {
	item: TimelineItem;
	title: string;
	role: string;
	where: string;
	summary: string;
	isActive: boolean;
}

function WaypointCard({
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

// ── Main component ────────────────────────────────────────────────────────────

export function About() {
	const t = useTranslations("about");
	const timelineRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	const active = useActiveIndex(itemRefs);
	const isDark = useIsDark();

	const [pathLen, setPathLen] = useState(1);
	useEffect(() => {
		if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
	}, []);

	// Progress tracks viewport center within the timeline container
	useEffect(() => {
		const container = timelineRef.current;
		const path = pathRef.current;
		if (!container || !path) return;
		let raf = 0;
		const onScroll = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				const r = container.getBoundingClientRect();
				const vh = window.innerHeight;
				// Fill endpoint = viewport center mapped into the container
				const centerWithinContainer = vh * 0.5 - r.top;
				const progress = Math.max(
					0,
					Math.min(1, centerWithinContainer / r.height),
				);
				const len = path.getTotalLength();
				path.style.strokeDasharray = String(len);
				path.style.strokeDashoffset = String(len * (1 - progress));
			});
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		onScroll();
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return (
		<section
			id="about"
			className="relative bg-bg"
			style={{ padding: "140px 6vw 100px" }}
		>
			<div className="max-w-5xl mx-auto">
				{/* Section header */}
				<div className="flex items-end justify-between flex-wrap gap-6 mb-20">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-caps text-fg-faint mb-3.5">
							{t("eyebrow")}
						</p>
						<h2
							className="font-semibold leading-tight tracking-tighter text-fg"
							style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
						>
							{t("heading")}{" "}
							<span className="italic text-accent-hover">
								{t("headingAccent")}
							</span>
						</h2>
					</div>
					<p className="max-w-sm text-sm leading-relaxed text-fg-muted">
						{t("description")}
					</p>
				</div>

				{/* Timeline */}
				<div ref={timelineRef} className="relative">
					{/* SVG river path — absolute, behind cards */}
					<svg
						viewBox="0 0 200 1400"
						preserveAspectRatio="none"
						aria-hidden
						className="absolute inset-0 w-full h-full pointer-events-none"
						style={{ zIndex: 0 }}
					>
						<defs>
							<linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="var(--accent)" />
								<stop offset="50%" stopColor="var(--periwinkle-400, #a8a4e8)" />
								<stop offset="100%" stopColor="var(--rose-400, #f5a3c2)" />
							</linearGradient>
						</defs>
						{/* Ghost track */}
						<path
							d="M 100 0 C 40 150, 160 300, 100 450 S 30 750, 100 900 S 170 1200, 100 1400"
							stroke="var(--border)"
							strokeWidth="1.5"
							fill="none"
							strokeDasharray="2 5"
						/>
						{/* Animated fill */}
						<path
							ref={pathRef}
							d="M 100 0 C 40 150, 160 300, 100 450 S 30 750, 100 900 S 170 1200, 100 1400"
							stroke="url(#timeline-grad)"
							strokeWidth="2.4"
							fill="none"
							strokeDasharray={pathLen}
							strokeDashoffset={pathLen}
							strokeLinecap="round"
						/>
					</svg>

					{/* Items grid */}
					<div className="relative" style={{ zIndex: 1 }}>
						{TIMELINE_ITEMS.map((item, i) => {
							const side = i % 2 === 0 ? "right" : "left";
							const isActive = i === active;
							const itemT = t.raw(`timeline.${item.key}`) as {
								title: string;
								role: string;
								where: string;
								summary: string;
							};

							return (
								<div
									key={item.key}
									ref={(el) => {
										itemRefs.current[i] = el;
									}}
									className="timeline-row grid items-center"
									style={{
										gridTemplateColumns: "1fr 140px 1fr",
										minHeight: "70vh",
									}}
								>
									{/* Left slot */}
									<div
										style={{
											textAlign: "right",
											padding: "0 32px",
											opacity: side === "left" ? 1 : 0,
											gridColumn: 1,
										}}
									>
										{side === "left" && (
											<WaypointCard
												item={item}
												isActive={isActive}
												{...itemT}
											/>
										)}
									</div>

									{/* Center marker */}
									<div
										className="grid place-items-center relative"
										style={{ gridColumn: 2 }}
									>
										{/* Glow halo */}
										<div
											className="absolute rounded-full"
											style={{
												width: isActive ? 80 : 40,
												height: isActive ? 80 : 40,
												background: `radial-gradient(circle, oklch(0.72 0.16 ${item.accent} / 0.35) 0%, transparent 70%)`,
												filter: "blur(8px)",
												transition: "all 0.5s cubic-bezier(.2,.8,.2,1)",
											}}
										/>
										{/* Marker circle */}
										<div
											className="relative grid place-items-center font-semibold rounded-full"
											style={{
												width: isActive ? 56 : 44,
												height: isActive ? 56 : 44,
												background: "var(--bg-elevated)",
												border: `1.5px solid ${isActive ? `oklch(0.66 0.18 ${item.accent})` : "var(--border)"}`,
												fontSize: isActive ? 20 : 16,
												color: isActive
													? `oklch(0.55 0.18 ${item.accent})`
													: "var(--fg-muted)",
												transition: "all 0.4s cubic-bezier(.2,.8,.2,1)",
												boxShadow: isActive
													? `0 10px 30px oklch(0.55 0.18 ${item.accent} / 0.25)`
													: "var(--shadow-sm)",
											}}
										>
											{item.logo ? (
												<Image
													src={isDark && item.logoDark ? item.logoDark : item.logo}
													alt={item.key}
													width={isActive ? 30 : 22}
													height={isActive ? 30 : 22}
													className="object-contain"
													style={{ height: "auto" }}
												/>
											) : (
												item.mark
											)}
										</div>
										{/* Year label */}
										<span
											className="absolute font-mono text-[10px] tracking-wide text-fg-faint"
											style={{
												top: "50%",
												transform: "translateY(calc(100% + 14px))",
												opacity: isActive ? 1 : 0.6,
											}}
										>
											{item.year}
										</span>
									</div>

									{/* Right slot */}
									<div
										style={{
											padding: "0 32px",
											opacity: side === "right" ? 1 : 0,
											gridColumn: 3,
										}}
									>
										{side === "right" && (
											<WaypointCard
												item={item}
												isActive={isActive}
												{...itemT}
											/>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Responsive: mobile collapses to single column */}
			<style>{`
				@media (max-width: 820px) {
					.timeline-row {
						grid-template-columns: 60px 1fr !important;
					}
					.timeline-row > *:nth-child(1) { display: none; }
					.timeline-row > *:nth-child(2) { grid-column: 1 !important; }
					.timeline-row > *:nth-child(3) {
						grid-column: 2 !important;
						opacity: 1 !important;
						padding-left: 20px !important;
						padding-right: 0 !important;
					}
				}
			`}</style>
		</section>
	);
}
