import { VerticalDivider } from '../../atoms';
import { LanguageToggle, ThemeToggle } from '../index.ts';
import { GithubButton } from '@/components/header/molecules/icon-buttons/GithubButton.tsx';
import { LinkedInButton } from '@/components/header/molecules/icon-buttons/LinkedInButton.tsx';
import { CVButton } from '@/components/header/molecules/icon-buttons/CVButton.tsx';

export function DesktopControls() {
    return (
        <div className="hidden md:flex items-center space-x-3">
            <VerticalDivider />
            <GithubButton />
            <VerticalDivider />
            <LinkedInButton />
            <VerticalDivider />
            <CVButton />
            <VerticalDivider />
            <LanguageToggle />
            <VerticalDivider />
            <ThemeToggle />
        </div>
    );
}
