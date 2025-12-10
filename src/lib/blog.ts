export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    lang: 'fr' | 'en';
    component: React.ComponentType<any>;
};

export function getBlogPosts(lang: string) {
    const modules = import.meta.glob('../content/**/*.mdx', { eager: true });

    const posts: BlogPost[] = [];

    for (const path in modules) {
        const mod = modules[path] as any;
        const frontmatter = mod.frontmatter || {};

        const fileName = path.split('/').pop() || '';
        const fileLang = fileName.includes('.fr.') ? 'fr' : 'en';

        if (fileLang !== lang && lang !== 'all') continue;

        const slug = fileName.replace(`.${fileLang}.mdx`, '');

        posts.push({
            slug,
            title: frontmatter.title || 'Sans titre',
            date: frontmatter.date || new Date().toISOString(),
            description: frontmatter.description || '',
            tags: frontmatter.tags || [],
            lang: fileLang as 'fr' | 'en',
            component: mod.default,
        });
    }

    return posts.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}

export function getBlogPost(slug: string, lang: string) {
    const posts = getBlogPosts(lang);
    return posts.find(p => p.slug === slug);
}
