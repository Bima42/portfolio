export interface Project {
    id: string;
    filePath: string;
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
