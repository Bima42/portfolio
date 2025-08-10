import { GithubIcon } from '@/components/icons/GithubIcon.tsx';
import { HeaderIconButtonLayout } from '@/components/header';

export function GithubButton() {
    return (
        <HeaderIconButtonLayout
            href="https://github.com/Bima42/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="View portfolio source code on GitHub"
        >
            <GithubIcon aria-hidden="true" />
            <span>GITHUB</span>
        </HeaderIconButtonLayout>
    );
}
