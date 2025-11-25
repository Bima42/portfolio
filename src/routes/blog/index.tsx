import { createFileRoute } from '@tanstack/react-router';
import { BlogPage } from '@/pages/Blog.tsx';

export const Route = createFileRoute('/blog/')({
    component: BlogPage,
});
