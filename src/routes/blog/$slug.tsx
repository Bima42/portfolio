import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from 'lucide-react';
import { getBlogPost } from '@/lib/blog';
import { cn } from '@/lib/utils.ts';

export const Route = createFileRoute('/blog/$slug')({
    component: BlogPost,
});

function BlogPost() {
    const { slug } = Route.useParams();
    const { i18n } = useTranslation();
    const post = getBlogPost(slug, i18n.language);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-foreground">
                    {i18n.language === 'fr'
                        ? 'Article non trouvé'
                        : 'Post Not Found'}
                </h1>
            </div>
        );
    }

    const MDXContent = post.component;

    return (
        <div className="min-h-screen py-24 px-4 md:px-8">
            <article className="max-w-[var(--size-container-md)] mx-auto">
                <Link
                    to="/blog"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeftIcon className="mr-2 size-4" />
                    {i18n.language === 'fr' ? 'Retour au blog' : 'Back to blog'}
                </Link>

                <header className="mb-12 pb-8 border-b border-border">
                    <div className="flex gap-2 mb-6">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-2.5 py-0.5 rounded-sm bg-secondary/10 text-secondary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight leading-[1.1]">
                        {post.title}
                    </h1>
                    <time className="text-muted-foreground font-mono text-sm">
                        {post.date}
                    </time>
                </header>

                <div
                    className={cn(
                        'prose prose-lg max-w-none',
                        // Color adaptations
                        'prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground',
                        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
                        'prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none',
                        'prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:border prose-pre:border-border',
                        'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground'
                    )}
                >
                    <MDXContent />
                </div>
            </article>
        </div>
    );
}
