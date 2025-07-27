import { useTheme } from '@/hooks/useTheme.ts';

export function GithubButton() {
	const { isDark } = useTheme();
	return (
		<a
			href="https://github.com/Bima42/portfolio"
			target="_blank"
			rel="noopener noreferrer"
			className="
                  flex items-center space-x-2 px-4 py-2
                  rounded-full backdrop-blur-sm dark:border dark:border-white/10
                  transition-all duration-200
                  text-xs font-medium
                  dark:bg-white/5
                  text-foreground hover:text-primary
                  hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-sm
                "
		>
			<img
				src={isDark ? "/github-mark-white.svg" : "/github-mark.svg"}
				alt="GitHub"
				className="w-4 h-4"
			/>
			<span>GITHUB</span>
		</a>
	)
}