import { LinkedInIcon } from '@/components/icons/LinkedInIcon.tsx';

export function LinkedInButton() {
    return (
        <a
            href="https://www.linkedin.com/in/tanguy-pauvret"
            target="_blank"
            rel="noopener noreferrer"
            className="
                  flex items-center space-x-2 px-4 py-2
                  rounded-full glass-background shadow-sm
                  transition-all duration-200
                  text-xs font-medium hover-button
                "
        >
            <LinkedInIcon />
            <span>LINKEDIN</span>
        </a>
    );
}
