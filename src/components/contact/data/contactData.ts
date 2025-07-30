import { Linkedin, Mail, Github } from 'lucide-react';
import type { ContactItem } from '../types';

export const contactData: ContactItem[] = [
    {
        id: 'linkedin',
        label: 'LinkedIn',
        value: 'tanguy-pauvret',
        icon: Linkedin,
        href: 'https://www.linkedin.com/in/tanguy-pauvret',
    },
    {
        id: 'mail',
        label: 'Email',
        value: 'pauvret.tanguy@gmail.com',
        icon: Mail,
        href: 'mailto:pauvret.tanguy@gmail.com',
    },
    {
        id: 'github',
        label: 'GitHub',
        value: 'Bima42',
        icon: Github,
        href: 'https://github.com/Bima42',
    },
];
