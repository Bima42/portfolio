"use client";

export function MeshBg({ className = "" }: { className?: string }) {
	return (
		<div
			className={`relative overflow-hidden bg-bg-sunken ${className}`}
			aria-hidden="true"
		>
			<div
				className="absolute inset-0"
				style={{
					background: `
						radial-gradient(ellipse 60% 50% at 20% 30%, var(--mesh-1) 0%, transparent 70%),
						radial-gradient(ellipse 50% 60% at 80% 20%, var(--mesh-2) 0%, transparent 70%),
						radial-gradient(ellipse 40% 50% at 50% 80%, var(--mesh-3) 0%, transparent 70%),
						radial-gradient(ellipse 55% 45% at 75% 70%, var(--mesh-4) 0%, transparent 70%)
					`,
					filter: "blur(40px)",
					mixBlendMode: "multiply",
					opacity: 0.7,
				}}
			/>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-fg-subtle text-sm font-mono">MeshBg</span>
			</div>
		</div>
	);
}
