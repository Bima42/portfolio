"use client";

import { useEffect, useRef } from "react";

export function GravityGrid({ className = "" }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const rafRef = useRef<number>(0);
	const mouseRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const cols = 30;
		const rows = 18;
		let W = 0;
		let H = 0;
		let dots: { ox: number; oy: number }[] = [];

		function resize() {
			if (!canvas) return;
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
			ctx.clearRect(0, 0, W, H);
			const mx = mouseRef.current.x;
			const my = mouseRef.current.y;
			const accentColor =
				getComputedStyle(canvas).getPropertyValue("--accent-hover").trim() ||
				"#895cd6";

			for (const dot of dots) {
				const dx = mx - dot.ox;
				const dy = my - dot.oy;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const pull = Math.max(0, 1 - dist / 150);
				const x = dot.ox + dx * pull * 0.35;
				const y = dot.oy + dy * pull * 0.35;
				const r = 1.5 + pull * 2.5;
				const alpha = 0.25 + pull * 0.6;

				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.fillStyle = accentColor;
				ctx.globalAlpha = alpha;
				ctx.fill();
			}
			ctx.globalAlpha = 1;
			rafRef.current = requestAnimationFrame(draw);
		}

		resize();
		window.addEventListener("resize", resize);

		function onMouseMove(e: MouseEvent) {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		}
		window.addEventListener("mousemove", onMouseMove);

		rafRef.current = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={`w-full h-full ${className}`}
			style={{ display: "block" }}
		/>
	);
}
