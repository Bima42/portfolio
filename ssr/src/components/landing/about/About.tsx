"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { TIMELINE_ITEMS } from "@/components/landing/about/timeline";
import { useActiveIndex, useIsDark } from "./hooks";
import { WaypointCard } from "./WaypointCard";

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
				</div>

				{/* Timeline */}
				<div ref={timelineRef} className="relative">
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
						<path
							d="M 100 0 C 40 150, 160 300, 100 450 S 30 750, 100 900 S 170 1200, 100 1400"
							stroke="var(--border)"
							strokeWidth="1.5"
							fill="none"
							strokeDasharray="2 5"
						/>
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
													src={
														isDark && item.logoDark ? item.logoDark : item.logo
													}
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
