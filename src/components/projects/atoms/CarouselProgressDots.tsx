export function CarouselProgressDots({ cards, activeIndex }: { cards: number[], activeIndex: number }) {
	return (
		<div className="flex gap-2 mt-8">
			{cards.map((index) => (
				<div
					key={index}
					className={`w-2 h-2 rounded-full transition-all duration-300 ${
						activeIndex === index
							? 'bg-primary scale-125'
							: 'bg-foreground/30'
					}`}
				/>
			))}
		</div>
	);
}