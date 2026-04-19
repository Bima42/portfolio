"use client";

import { useEffect, useRef } from "react";

export interface GravityGridProps {
	/** Extra CSS classes applied to the <canvas> element. */
	className?: string;

	/** Number of dot columns across the canvas width. @default 30 */
	cols?: number;

	/** Number of dot rows across the canvas height. @default 18 */
	rows?: number;

	/**
	 * Radius (px) around the cursor where dots start reacting.
	 * Beyond this distance pull = 0 and dots stay at their origin.
	 * @default 150
	 */
	influenceRadius?: number;

	/**
	 * How far a dot moves toward the cursor as a fraction of the distance.
	 * 0 = dots never move, 1 = dots reach the cursor.
	 * @default 0.4
	 */
	pullStrength?: number;

	/**
	 * Dot radius (px) when the cursor is far away.
	 * @default 1.5
	 */
	baseRadius?: number;

	/**
	 * Extra radius (px) added on top of baseRadius when pull = 1 (cursor is on the dot).
	 * Rendered radius = baseRadius + maxExtraRadius * pull
	 * @default 2.5
	 */
	maxExtraRadius?: number;

	/**
	 * Dot opacity when the cursor is far away. Range 0–1.
	 * @default 0.25
	 */
	baseAlpha?: number;

	/**
	 * Extra opacity added on top of baseAlpha when pull = 1.
	 * Rendered alpha = baseAlpha + maxExtraAlpha * pull
	 * @default 0.6
	 */
	maxExtraAlpha?: number;

	/**
	 * Dot color. Accepts any valid CSS color string (hex, rgb, hsl…).
	 * Falls back to the `--accent-hover` CSS custom property on the canvas,
	 * then to "#895cd6" if neither is set.
	 * @default undefined (reads --accent-hover)
	 */
	color?: string;
}

/**
 * GravityGrid
 *
 * A full-size <canvas> that renders a grid of dots.
 * Dots near the cursor are pulled toward it, growing larger and brighter.
 * All visual parameters are configurable via props.
 *
 * @example
 * // Sparse grid, wide influence, strong pull
 * <GravityGrid cols={15} rows={9} influenceRadius={250} pullStrength={0.6} color="#ff6b6b" />
 */
export function GravityGrid({
	className = "",
	cols = 30,
	rows = 18,
	influenceRadius = 150,
	pullStrength = 0.4,
	baseRadius = 1.5,
	maxExtraRadius = 2.5,
	baseAlpha = 0.25,
	maxExtraAlpha = 0.6,
	color,
}: GravityGridProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const rafRef = useRef<number>(0);
	const mouseRef = useRef({ x: 0, y: 0 });

	// Keep a ref to latest props so the animation loop always sees fresh values
	// without needing to restart the effect when they change.
	const configRef = useRef({
		cols,
		rows,
		influenceRadius,
		pullStrength,
		baseRadius,
		maxExtraRadius,
		baseAlpha,
		maxExtraAlpha,
		color,
	});

	useEffect(() => {
		configRef.current = {
			cols,
			rows,
			influenceRadius,
			pullStrength,
			baseRadius,
			maxExtraRadius,
			baseAlpha,
			maxExtraAlpha,
			color,
		};
	}, [
		cols,
		rows,
		influenceRadius,
		pullStrength,
		baseRadius,
		maxExtraRadius,
		baseAlpha,
		maxExtraAlpha,
		color,
	]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let W = 0;
		let H = 0;
		let dots: { ox: number; oy: number }[] = [];

		function resize() {
			if (!canvas) return;
			const { cols, rows } = configRef.current;
			W = canvas.offsetWidth;
			H = canvas.offsetHeight;
			canvas.width = W;
			canvas.height = H;
			dots = [];
			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					dots.push({
						ox: (c / (cols - 1)) * W,
						oy: (r / (rows - 1)) * H,
					});
				}
			}
		}

		function draw() {
			if (!ctx || !canvas) return;

			const {
				influenceRadius,
				pullStrength,
				baseRadius,
				maxExtraRadius,
				baseAlpha,
				maxExtraAlpha,
				color,
			} = configRef.current;

			// Resolve color once per frame, outside the dot loop.
			const resolvedColor =
				color ||
				getComputedStyle(canvas).getPropertyValue("--accent-hover").trim() ||
				"#895cd6";

			ctx.clearRect(0, 0, W, H);
			ctx.fillStyle = resolvedColor;

			const mx = mouseRef.current.x;
			const my = mouseRef.current.y;

			for (const dot of dots) {
				const dx = mx - dot.ox;
				const dy = my - dot.oy;
				const dist = Math.sqrt(dx * dx + dy * dy);

				// pull: 1 when cursor is on the dot origin, 0 at influenceRadius+
				const pull = Math.max(0, 1 - dist / influenceRadius);

				const x = dot.ox + dx * pull * pullStrength;
				const y = dot.oy + dy * pull * pullStrength;
				const r = baseRadius + pull * maxExtraRadius;
				const alpha = baseAlpha + pull * maxExtraAlpha;

				ctx.globalAlpha = alpha;
				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.fill();
			}

			ctx.globalAlpha = 1;
			rafRef.current = requestAnimationFrame(draw);
		}

		resize();

		const onResize = () => resize();
		window.addEventListener("resize", onResize);

		function onMouseMove(e: MouseEvent) {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		}
		window.addEventListener("mousemove", onMouseMove);

		rafRef.current = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("resize", onResize);
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, []); // effect runs once; props flow through configRef

	return (
		<canvas
			ref={canvasRef}
			className={`w-full h-full ${className}`}
			style={{ display: "block" }}
		/>
	);
}
