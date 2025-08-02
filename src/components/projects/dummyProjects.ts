import type { Project } from './types';

export const dummyProjects: Project[] = [
    {
        id: 'tidaka',
        title: 'Tidaka',
        shortDescription:
            'Mobile app connecting sports coaches with their clients for better training management',
        tags: [
            'react_native',
            'nodejs',
            'typescript',
            'mongodb',
            'docker',
            'socketio',
        ],
        status: 'completed',
        year: 2024,
        category: 'mobile-app',
        featured: true,
        thumbnail: '/tidaka/logo-tidaka.png',
        color: '#6366f1',
        filePath: '/tidaka',
    },
    {
        id: 'voltaire',
        title: 'Voltaire AI',
        shortDescription:
            'AI-powered writing assistant that adapts to your unique style and voice',
        tags: ['react', 'typescript', 'docker'],
        status: 'completed',
        year: 2024,
        category: 'web-app',
        featured: true,
        thumbnail:
            'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=200&fit=crop',
        links: {
            demo: 'https://voltaire-ai.com',
            github: 'https://github.com/username/voltaire',
        },
        color: '#f59e0b',
        filePath: `
# Voltaire AI - Smart Writing Assistant

## Le défi
L'écriture prend trop de temps et manque souvent de cohérence...

## Notre approche
Une IA qui apprend votre style pour vous assister efficacement.
    `,
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
        featured: false,
        thumbnail:
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
        links: {
            demo: 'https://shopflow-demo.com',
            github: 'https://github.com/username/shopflow',
        },
        color: '#10b981',
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
