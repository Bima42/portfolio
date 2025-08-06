import type { Project } from './types';

export const projectsData: Project[] = [
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
        status: 'completed',
        year: 2023,
        category: 'mobile-app',
        thumbnail: '/tidaka/logo-tidaka.png',
        filePath: '/tidaka',
    },
    {
        id: 'voltaire',
        title: 'projects.voltaire.title',
        shortDescription: 'projects.voltaire.shortDescription',
        tags: [
            'nextjs',
            'fastapi',
            'postgresql',
            'python',
            'typescript',
            'docker',
        ],
        status: 'completed',
        year: 2024,
        category: 'web-app',
        thumbnail: '/voltaire/logo-voltaire.svg',
        links: {
            demo: 'https://voltaire.chat',
        },
        filePath: '/voltaire',
    },
    {
        id: 'ecommerce',
        title: 'ShopFlow',
        shortDescription:
            'Modern e-commerce platform with real-time inventory and analytics dashboard',
        tags: ['react', 'typescript', 'docker'],
        status: 'in-progress',
        year: 2024,
        category: 'web-app',
        thumbnail:
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
        links: {
            demo: 'https://shopflow-demo.com',
            github: 'https://github.com/username/shopflow',
        },
        filePath: `
# ShopFlow - E-commerce Platform

## Vision
Créer une plateforme e-commerce moderne et performante.

## Stack technique
- Frontend: React + TypeScript
- Backend: Node.js + PostgreSQL
- Payment: Stripe Integration
    `,
    },
];
