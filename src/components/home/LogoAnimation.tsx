const LogoAnimation = () => {
	return (
		<div className="fixed inset-0 z-50 bg-background overflow-hidden">
			<img
				src={"/logo-no-bg.svg"}
				alt="Logo"
				className="absolute top-1/2 left-1/2 w-24 transform -translate-x-1/2 -translate-y-1/2 animate-logo-expand"
			/>
		</div>
	);
};

export default LogoAnimation;