import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon } from 'lucide-react';
import { getBlogPosts } from '@/lib/blog';

export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
});

function BlogIndex() {
    const { i18n } = useTranslation();
    const posts = getBlogPosts(i18n.language);

    return (
        <div className="min-h-screen py-24 px-4 md:px-8">
            <div className="max-w-[var(--size-container-lg)] mx-auto">
                <div className="mb-16 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {i18n.language === 'fr'
                            ? "Explorations sur l'ingénierie logicielle, le design systems et l'architecture web."
                            : 'Explorations in software engineering, design systems, and web architecture.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {posts.map(post => (
                        <Link
                            key={post.slug}
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="group relative flex flex-col glass-card rounded-sm p-6 md:p-8 h-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <time className="text-sm font-mono text-muted-foreground">
                                    {post.date}
                                </time>
                                <div className="flex gap-2">
                                    {post.tags.slice(0, 2).map(tag => (
                                        <span
                                            key={tag}
                                            className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-sm bg-secondary/10 text-secondary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>

                            <p className="text-muted-foreground mb-8 line-clamp-3 flex-grow leading-relaxed">
                                {post.description}
                            </p>

                            <div className="flex items-center text-sm font-medium text-primary mt-auto">
                                {i18n.language === 'fr'
                                    ? "Lire l'article"
                                    : 'Read article'}
                                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-border rounded-sm">
                        <p className="text-muted-foreground">
                            {i18n.language === 'fr'
                                ? 'Bientôt disponible...'
                                : 'Coming soon...'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
