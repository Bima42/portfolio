export interface ProjectMeta {
    title: string;
    shortDescription: string;
    tags: string[];
    lightThumbnail: string;
    darkThumbnail?: string;
    links?: {
        demo?: string;
        github?: string;
    };
}

export interface Project extends ProjectMeta {
    id: string;
    filePath: string;
}
