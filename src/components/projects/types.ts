export interface ProjectMeta {
    title: string;
    shortDescription: string;
    tags: string[];
    status: 'completed' | 'in-progress' | 'prototype';
    year: number;
    category: string;
    thumbnail: string;
    links?: {
        demo?: string;
        github?: string;
    };
}

export interface Project extends ProjectMeta {
    id: string;
    filePath: string;
}
