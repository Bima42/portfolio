"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TIMELINE_ITEMS } from "@/components/landing/about/timeline";
import { useActiveIndex, useIsDark } from "./hooks";
import { WaypointCard } from "./WaypointCard";

export function About() {
	const t = useTranslations("about");
	const timelineRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const mobilePathRef = useRef<SVGPathElement>(null);
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
				const progress = Math.max(
					0,
					Math.min(1, (vh * 0.5 - r.top) / r.height),
				);
				const len = path.getTotalLength();
				path.style.strokeDasharray = String(len);
				path.style.strokeDashoffset = String(len * (1 - progress));
				const mobilePath = mobilePathRef.current;
				if (mobilePath) {
					const mLen = mobilePath.getTotalLength();
					mobilePath.style.strokeDasharray = String(mLen);
					mobilePath.style.strokeDashoffset = String(mLen * (1 - progress));
				}
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
			className="relative bg-bg pt-[140px] px-[6vw] pb-[100px]"
		>
			<div className="max-w-5xl mx-auto">
				{/* Section header */}
				<div className="flex items-end justify-between flex-wrap gap-6 mb-20">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-caps text-fg-faint mb-3.5">
							{t("eyebrow")}
						</p>
						<h2 className="font-semibold leading-tight tracking-tighter text-fg text-[clamp(40px,6vw,72px)]">
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
						className={cn(
							"absolute inset-0 w-full h-full pointer-events-none z-0",
							// Mobile: narrow strip pinned to the left
							"max-[820px]:w-[60px] max-[820px]:inset-auto",
							"max-[820px]:left-0 max-[820px]:top-0 max-[820px]:bottom-0",
						)}
					>
						<defs>
							<linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="var(--accent)" />
								<stop offset="50%" stopColor="var(--periwinkle-400)" />
								<stop offset="100%" stopColor="var(--rose-400)" />
							</linearGradient>
							<linearGradient
								id="timeline-grad-mobile"
								x1="100"
								y1="0"
								x2="100"
								y2="1400"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="0%" stopColor="var(--accent)" />
								<stop offset="50%" stopColor="var(--periwinkle-400)" />
								<stop offset="100%" stopColor="var(--rose-400)" />
							</linearGradient>
						</defs>

						{/* Desktop paths */}
						<path
							className="hidden min-[821px]:block"
							d="M 100 0 C 40 150, 160 300, 100 450 S 30 750, 100 900 S 170 1200, 100 1400"
							stroke="var(--border)"
							strokeWidth="1.5"
							fill="none"
							strokeDasharray="2 5"
						/>
						<path
							ref={pathRef}
							className="hidden min-[821px]:block"
							d="M 100 0 C 40 150, 160 300, 100 450 S 30 750, 100 900 S 170 1200, 100 1400"
							stroke="url(#timeline-grad)"
							strokeWidth="2.4"
							fill="none"
							strokeDasharray={pathLen}
							strokeDashoffset={pathLen}
							strokeLinecap="round"
						/>

						{/* Mobile paths */}
						<path
							className="min-[821px]:hidden"
							d="M 100 0 L 100 1400"
							stroke="var(--border)"
							strokeWidth="3"
							fill="none"
							strokeDasharray="2 5"
						/>
						<path
							ref={mobilePathRef}
							className="min-[821px]:hidden"
							d="M 100 0 L 100 1400"
							stroke="url(#timeline-grad-mobile)"
							strokeWidth="4"
							fill="none"
							strokeLinecap="round"
						/>
					</svg>

					<div className="relative z-[1]">
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
									className={cn(
										"grid items-center",
										// Mobile: [marker | card], Desktop: [card | marker | card]
										"grid-cols-[60px_1fr] min-[821px]:grid-cols-[1fr_140px_1fr]",
										"py-6 min-[821px]:py-0 min-[821px]:min-h-[70vh]",
									)}
								>
									{/*
									 * Desktop left slot — hidden on mobile.
									 * Renders the card only when side=left.
									 * Empty div still needed so the 3-col grid stays consistent.
									 */}
									<div className="hidden min-[821px]:block col-start-1 text-right px-8">
										{side === "left" && (
											<WaypointCard
												item={item}
												isActive={isActive}
												{...itemT}
											/>
										)}
									</div>

									{/* Center marker — col 1 mobile / col 2 desktop */}
									<div className="col-start-1 min-[821px]:col-start-2 grid place-items-center relative">
										{/* Glow blob — size driven by isActive, oklch hue from item.accent → must stay inline */}
										<div
											className="absolute rounded-full transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
											style={{
												width: isActive ? 80 : 40,
												height: isActive ? 80 : 40,
												background: `radial-gradient(circle, oklch(0.72 0.16 ${item.accent} / 0.35) 0%, transparent 70%)`,
												filter: "blur(8px)",
											}}
										/>
										{/* Icon circle — oklch border/color/shadow must stay inline */}
										<div
											className="relative grid place-items-center font-semibold rounded-full transition-all duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)]"
											style={{
												width: isActive ? 56 : 44,
												height: isActive ? 56 : 44,
												background: "var(--bg-elevated)",
												border: `1.5px solid ${isActive ? `oklch(0.66 0.18 ${item.accent})` : "var(--border)"}`,
												fontSize: isActive ? 20 : 16,
												color: isActive
													? `oklch(0.55 0.18 ${item.accent})`
													: "var(--fg-muted)",
												boxShadow: isActive
													? `0 10px 30px oklch(0.55 0.18 ${item.accent} / 0.25)`
													: "var(--shadow-sm)",
											}}
										>
											{item.logo ? (
												<Image
													src={
														isDark && item.logoDark
															? item.logoDark
															: item.logo
													}
													alt={item.key}
													width={isActive ? 30 : 22}
													height={isActive ? 30 : 22}
													className="object-contain h-auto"
												/>
											) : (
												item.mark
											)}
										</div>
										<span
											className={cn(
												"absolute font-mono text-[10px] tracking-wide text-fg-faint",
												"top-1/2 translate-y-[calc(100%+14px)]",
												"transition-opacity duration-500",
												isActive ? "opacity-100" : "opacity-60",
											)}
										>
											{item.year}
										</span>
									</div>

									<div
										className={cn(
											"col-start-2 min-[821px]:col-start-3",
											"pl-5 min-[821px]:pl-8 min-[821px]:pr-8",
											side === "left" && "min-[821px]:hidden",
										)}
									>
										<WaypointCard
											item={item}
											isActive={isActive}
											{...itemT}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
