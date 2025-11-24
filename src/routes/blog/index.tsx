import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { getBlogPosts } from '@/lib/blog';

export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
});

function BlogIndex() {
    const { i18n } = useTranslation();
    const posts = getBlogPosts(i18n.language);

    return (
        <div className="min-h-screen py-20 px-4 md:px-8 max-w-[var(--size-container-lg)] mx-auto">
            <div className="mb-12 text-center">
                <h1 className="h1 mb-4">Blog</h1>
                <p className="text-muted-foreground text-lg mx-auto">
                    {i18n.language === 'fr'
                        ? "Pensées sur le développement, l'architecture et la tech."
                        : 'Thoughts on development, architecture, and tech.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => (
                    <article
                        key={post.slug}
                        className="glass-background rounded-xl p-6 flex flex-col transition-all hover:border-primary/50"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2 flex-wrap">
                                {post.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <time className="text-xs text-muted-foreground font-mono">
                                {post.date}
                            </time>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 text-foreground">
                            {post.title}
                        </h2>

                        <p className="text-muted-foreground mb-6 flex-grow">
                            {post.description}
                        </p>

                        <div className="mt-auto">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full hover-button"
                            >
                                <Link
                                    to="/blog/$slug"
                                    params={{ slug: post.slug }}
                                >
                                    {i18n.language === 'fr'
                                        ? "Lire l'article"
                                        : 'Read article'}
                                </Link>
                            </Button>
                        </div>
                    </article>
                ))}

                {posts.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No posts found.
                    </div>
                )}
            </div>
        </div>
    );
}
