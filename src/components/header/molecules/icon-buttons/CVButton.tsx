import { CVIcon } from '@/components/icons/CVIcon.tsx';
import { HeaderIconButtonLayout } from '@/components/header';

export function CVButton() {
    return (
        <HeaderIconButtonLayout
            href="/CV-Tanguy.pdf"
            download="CV-Tanguy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Download CV (PDF file)"
        >
            <CVIcon aria-hidden="true" />
            <span>CV</span>
        </HeaderIconButtonLayout>
    );
}
