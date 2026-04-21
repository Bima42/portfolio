import type { ThumbKind } from "@/components/landing/projects/projects-data";

export function ProjectThumb({
	kind,
	accent,
}: {
	kind: ThumbKind;
	accent: number;
}) {
	const stroke = `oklch(0.60 0.15 ${accent})`;
	const fill = `oklch(0.90 0.06 ${accent} / 0.5)`;
	const props = {
		width: "100%",
		height: "100%",
		viewBox: "0 0 120 80",
		fill: "none",
	} as const;

	switch (kind) {
		case "panel":
			return (
				<svg {...props}>
					<rect x="6" y="10" width="108" height="60" rx="4" stroke={stroke} />
					<line
						x1="36"
						y1="10"
						x2="36"
						y2="70"
						stroke={stroke}
						strokeWidth="0.6"
					/>
					<rect x="10" y="16" width="22" height="3" fill={fill} />
					<rect x="10" y="22" width="18" height="3" fill={fill} />
					<rect x="10" y="28" width="22" height="3" fill={fill} />
					<rect x="42" y="16" width="66" height="2.5" fill={fill} />
					<rect x="42" y="22" width="54" height="2.5" fill={fill} />
					<rect x="42" y="28" width="58" height="2.5" fill={fill} />
					<rect x="42" y="58" width="66" height="6" rx="3" stroke={stroke} />
				</svg>
			);
		case "graph":
			return (
				<svg {...props}>
					<circle cx="30" cy="40" r="10" stroke={stroke} fill={fill} />
					<circle cx="70" cy="22" r="7" stroke={stroke} fill={fill} />
					<circle cx="90" cy="55" r="8" stroke={stroke} fill={fill} />
					<circle cx="55" cy="60" r="5" stroke={stroke} />
					<line
						x1="30"
						y1="40"
						x2="70"
						y2="22"
						stroke={stroke}
						strokeWidth="0.8"
					/>
					<line
						x1="30"
						y1="40"
						x2="55"
						y2="60"
						stroke={stroke}
						strokeWidth="0.8"
					/>
					<line
						x1="70"
						y1="22"
						x2="90"
						y2="55"
						stroke={stroke}
						strokeWidth="0.8"
					/>
					<line
						x1="55"
						y1="60"
						x2="90"
						y2="55"
						stroke={stroke}
						strokeWidth="0.8"
					/>
				</svg>
			);
		case "quill":
			return (
				<svg {...props}>
					<path
						d="M20 60 C 30 30, 60 20, 100 15 C 95 35, 75 55, 40 65 Z"
						stroke={stroke}
						fill={fill}
					/>
					<line
						x1="20"
						y1="60"
						x2="12"
						y2="70"
						stroke={stroke}
						strokeLinecap="round"
					/>
					<line
						x1="30"
						y1="55"
						x2="80"
						y2="30"
						stroke={stroke}
						strokeWidth="0.5"
						strokeDasharray="1 2"
					/>
				</svg>
			);
		case "xml":
			return (
				<svg {...props}>
					<text
						x="18"
						y="48"
						fontFamily="monospace"
						fontSize="14"
						fill={stroke}
					>
						{"<prompt>"}
					</text>
					<text
						x="26"
						y="62"
						fontFamily="monospace"
						fontSize="10"
						fill={stroke}
						opacity="0.6"
					>
						{"<goal/>"}
					</text>
				</svg>
			);
		case "db":
			return (
				<svg {...props}>
					<ellipse cx="60" cy="22" rx="30" ry="8" stroke={stroke} fill={fill} />
					<path
						d="M30 22 V 42 C 30 46, 90 46, 90 42 V 22"
						stroke={stroke}
						fill="none"
					/>
					<path
						d="M30 42 V 58 C 30 62, 90 62, 90 58 V 42"
						stroke={stroke}
						fill="none"
					/>
					<ellipse cx="60" cy="42" rx="30" ry="4" stroke={stroke} />
				</svg>
			);
		case "chart":
			return (
				<svg {...props}>
					<line x1="10" y1="10" x2="10" y2="65" stroke={stroke} />
					<line x1="10" y1="65" x2="110" y2="65" stroke={stroke} />
					<polyline
						points="14,50 30,45 45,30 60,35 75,20 90,25 106,12"
						stroke={stroke}
						fill="none"
						strokeWidth="1.5"
					/>
					<polyline
						points="14,60 30,58 45,52 60,50 75,40 90,38 106,28"
						stroke={stroke}
						fill="none"
						strokeWidth="1.5"
						strokeDasharray="2 2"
						opacity="0.6"
					/>
				</svg>
			);
		case "term":
			return (
				<svg {...props}>
					<rect x="6" y="10" width="108" height="60" rx="4" stroke={stroke} />
					<circle cx="12" cy="16" r="1.2" fill={stroke} />
					<circle cx="17" cy="16" r="1.2" fill={stroke} />
					<circle cx="22" cy="16" r="1.2" fill={stroke} />
					<text x="12" y="34" fontFamily="monospace" fontSize="9" fill={stroke}>
						$ ./minishell
					</text>
					<text
						x="12"
						y="46"
						fontFamily="monospace"
						fontSize="9"
						fill={stroke}
						opacity="0.6"
					>
						{">"} pwd
					</text>
					<text
						x="12"
						y="58"
						fontFamily="monospace"
						fontSize="9"
						fill={stroke}
						opacity="0.8"
					>
						/home/tanguy
					</text>
				</svg>
			);
		case "stack":
			return (
				<svg {...props}>
					<rect
						x="24"
						y="50"
						width="72"
						height="12"
						rx="2"
						stroke={stroke}
						fill={fill}
					/>
					<rect
						x="30"
						y="35"
						width="60"
						height="12"
						rx="2"
						stroke={stroke}
						fill={fill}
					/>
					<rect
						x="36"
						y="20"
						width="48"
						height="12"
						rx="2"
						stroke={stroke}
						fill={fill}
					/>
					<text x="42" y="28" fontFamily="monospace" fontSize="7" fill={stroke}>
						vector
					</text>
					<text x="42" y="43" fontFamily="monospace" fontSize="7" fill={stroke}>
						map
					</text>
					<text x="42" y="58" fontFamily="monospace" fontSize="7" fill={stroke}>
						stack
					</text>
				</svg>
			);
		case "mobile":
			return (
				<svg {...props}>
					<rect
						x="40"
						y="8"
						width="40"
						height="64"
						rx="6"
						stroke={stroke}
						fill={fill}
					/>
					<rect
						x="46"
						y="14"
						width="28"
						height="40"
						rx="2"
						stroke={stroke}
						strokeWidth="0.6"
					/>
					<circle cx="60" cy="62" r="3" stroke={stroke} />
				</svg>
			);
	}
}
