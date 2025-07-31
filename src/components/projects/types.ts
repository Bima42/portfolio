export interface ProjectMeta {
    title: string;
    shortDescription: string;
    tags: string[];
    status: 'completed' | 'in-progress' | 'prototype';
    year: number;
    category: string;
    featured: boolean;
    thumbnail: string;
    gallery: string[];
    links: {
        demo?: string;
        github?: string;
        playstore?: string;
        appstore?: string;
    };
    color: string;
}

export interface Project extends ProjectMeta {
    id: string;
    content: string; // Le contenu MDX compilé
}
