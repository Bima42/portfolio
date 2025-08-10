import { GithubIcon } from '@/components/icons/GithubIcon.tsx';

export function GithubButton() {
    return (
        <a
            href="https://github.com/Bima42/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="
                  flex items-center space-x-2 px-4 py-2
                  rounded-full glass-background shadow-sm
                  transition-all duration-200
                  text-xs font-medium hover-button
                "
        >
            <GithubIcon />
            <span>GITHUB</span>
        </a>
    );
}
