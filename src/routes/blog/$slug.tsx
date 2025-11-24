import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { getBlogPost } from '@/lib/blog';

export const Route = createFileRoute('/blog/$slug')({
    component: BlogPost,
});

function BlogPost() {
    const { slug } = Route.useParams();
    const { i18n } = useTranslation();

    const post = getBlogPost(slug, i18n.language);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">404 - Article not found</h1>
                <Button asChild>
                    <Link to="/blog">Back to blog</Link>
                </Button>
            </div>
        );
    }

    const MDXContent = post.component;

    return (
        <div className="min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-[var(--size-container-md)] mx-auto">
                <Button
                    asChild
                    variant="ghost"
                    className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
                >
                    <Link to="/blog">
                        <ArrowLeftIcon className="mr-2 size-4" />
                        Back
                    </Link>
                </Button>

                <header className="mb-12">
                    <div className="flex gap-2 mb-4">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
                        {post.title}
                    </h1>
                    <time className="text-muted-foreground font-mono text-sm">
                        {post.date}
                    </time>
                </header>

                <article
                    className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-pre:bg-secondary/5 prose-pre:border prose-pre:border-white/10
                "
                >
                    <MDXContent />
                </article>
            </div>
        </div>
    );
}
