import { VerticalDivider } from '../../atoms';
import { LanguageToggle, ThemeToggle } from '../index.ts';
import { GithubButton } from '@/components/buttons/GithubButton.tsx';
import { useTheme } from '@/hooks/useTheme.tsx';

export function DesktopControls() {
    const { isDark } = useTheme();

    return (
        <div className="hidden md:flex items-center space-x-3">
            <GithubButton isDark={isDark} />
            <VerticalDivider />
            <LanguageToggle />
            <VerticalDivider />
            <ThemeToggle />
        </div>
    );
}
