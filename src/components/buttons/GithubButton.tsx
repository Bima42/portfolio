export function GithubButton({ isDark }: { isDark: boolean }) {
    return (
        <a
            href="https://github.com/Bima42/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="
                  flex items-center space-x-2 px-4 py-2
                  rounded-full backdrop-blur-sm
                  transition-all duration-200
                  text-xs font-medium hover-button
                "
        >
            <img
                src={isDark ? '/github-mark-white.svg' : '/github-mark.svg'}
                alt="GitHub"
                className="w-4 h-4"
            />
            <span>GITHUB</span>
        </a>
    );
}
