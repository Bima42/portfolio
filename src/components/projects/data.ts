import type { Project } from './types';

export const projectsData: Project[] = [
    {
        id: 'voltaire',
        title: 'projects.voltaire.title',
        shortDescription: 'projects.voltaire.shortDescription',
        tags: [
            'nextjs',
            'fastapi',
            'postgresql',
            'typescript',
            'docker',
            'drizzle',
            'python',
        ],
        lightThumbnail: '/voltaire/logo-voltaire-black.svg',
        darkThumbnail: '/voltaire/logo-voltaire-white.svg',
        links: {
            demo: 'https://voltaire.chat',
        },
        filePath: '/voltaire',
    },
    {
        id: 'tidaka',
        title: 'projects.tidaka.title',
        shortDescription: 'projects.tidaka.shortDescription',
        tags: [
            'react_native',
            'nodejs',
            'typescript',
            'mongodb',
            'docker',
            'socketio',
        ],
        lightThumbnail: '/tidaka/logo-tidaka.png',
        filePath: '/tidaka',
    },
    {
        id: 'prompt-pilot',
        title: 'projects.prompt-pilot.title',
        shortDescription: 'projects.prompt-pilot.shortDescription',
        tags: ['nextjs', 'typescript', 'postgresql', 'docker', 'drizzle'],
        lightThumbnail: '/prompt-pilot/logo-prompt-pilot-black.svg',
        darkThumbnail: '/prompt-pilot/logo-prompt-pilot-white.svg',
        links: {
            demo: 'https://prompt-pilot.app',
        },
        filePath: '/prompt-pilot',
    },
];
