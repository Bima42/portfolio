import { useEffect, useState } from "react";

export function useActiveIndex(itemRefs: React.RefObject<(HTMLDivElement | null)[]>) {
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

export function useIsDark() {
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
