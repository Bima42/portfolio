import { createFileRoute } from '@tanstack/react-router';
import { BlogPage } from '@/pages/Blog.tsx';

export const Route = createFileRoute('/blog/')({
    component: BlogPage,
    validateSearch: (search: Record<string, unknown>) => ({
        tag: typeof search.tag === 'string' ? search.tag : undefined,
    }),
});
