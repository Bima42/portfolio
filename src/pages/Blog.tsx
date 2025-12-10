import { useTranslation } from 'react-i18next';
import { getBlogPosts } from '@/lib/blog.ts';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function BlogPage() {
    const { i18n, t } = useTranslation();
    const { tag } = useSearch({ from: '/blog/' });
    const navigate = useNavigate();

    const posts = getBlogPosts(i18n.language);
    const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();
    const filteredPosts = tag ? posts.filter(p => p.tags.includes(tag)) : posts;

    const handleTagChange = (value: string) => {
        navigate({
            to: '/blog',
            search: { tag: value === 'all' ? undefined : value },
        });
    };

    return (
        <div className="min-h-screen py-[120px] px-16 bg-background">
            <div className="max-w-[var(--size-container-md)] lg:max-w-[var(--size-container-lg)] mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {t('blog.description')}
                    </p>
                </div>

                <div className="mb-8 flex items-center gap-4">
                    <Select
                        value={tag ?? 'all'}
                        onValueChange={handleTagChange}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder={t('blog.filterByTag')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                {t('blog.allTags')}
                            </SelectItem>
                            {allTags.map(tagName => (
                                <SelectItem key={tagName} value={tagName}>
                                    {tagName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {filteredPosts.map(post => (
                        <Link
                            key={post.slug}
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="group relative flex flex-col glass-background rounded-md p-6 h-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <time className="text-sm font-mono text-muted-foreground">
                                    {post.date}
                                </time>
                                <div className="flex gap-2">
                                    {post.tags.slice(0, 2).map(t => (
                                        <span
                                            key={t}
                                            className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-secondary/10 text-secondary"
                                        >
                                            {t}
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
                                {t('blog.read')}
                                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-border rounded-md">
                        <p className="text-muted-foreground">
                            {t('blog.commingSoon')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
