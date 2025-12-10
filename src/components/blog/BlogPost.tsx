import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from 'lucide-react';
import { getBlogPost } from '@/lib/blog';
import { cn } from '@/lib/utils.ts';
import { Route } from '@/routes/blog/$slug.tsx';
import { CodeBlock } from '@/components/blog/CodeBlock.tsx';

const mdxComponents = {
    pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    code: CodeBlock,
};

export function BlogPost() {
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
        <div className="min-h-screen py-[120px] px-4 md:px-8 bg-background">
            <article className="max-w-[var(--size-container-md)] lg:max-w-[var(--size-container-lg)] mx-auto">
                <Link
                    to="/blog"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    search={{ tag: undefined }}
                >
                    <ArrowLeftIcon className="mr-2 size-4" />
                    {i18n.language === 'fr' ? 'Retour au blog' : 'Back to blog'}
                </Link>

                <header className="mb-12 pb-8 border-b border-border">
                    <div className="flex gap-2 mb-6">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-secondary/10 text-secondary"
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
                        // 1. Text Colors
                        'prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground',

                        // 2. Links
                        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',

                        // 3. Lists (Fix for Problem #1)
                        'prose-ul:list-disc prose-ul:pl-6',
                        'prose-ol:list-decimal prose-ol:pl-6',
                        'prose-li:text-muted-foreground prose-li:marker:text-primary',

                        // 4. Inline Code (Fix for Problem #3)
                        // Note: We use :not(pre)>code to target inline code only, avoiding conflict with CodeBlock
                        'prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none',

                        // 5. Blockquotes
                        'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground',

                        // 6. Tables
                        'prose-table:table-auto prose-table:w-full prose-table:border prose-table:border-border prose-table:rounded-md prose-th:border prose-th:border-border prose-th:bg-secondary/20 prose-th:px-4 prose-th:py-2 prose-td:text-foreground prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2'
                    )}
                >
                    <MDXContent components={mdxComponents} />
                </div>
            </article>
        </div>
    );
}
