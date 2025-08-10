import { LinkedInIcon } from '@/components/icons/LinkedInIcon.tsx';
import { HeaderIconButtonLayout } from '@/components/header';

export function LinkedInButton() {
    return (
        <HeaderIconButtonLayout
            href="https://www.linkedin.com/in/tanguy-pauvret"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Visit Tanguy's LinkedIn profile"
        >
            <LinkedInIcon aria-hidden="true" />
            <span>LINKEDIN</span>
        </HeaderIconButtonLayout>
    );
}
