import { BlogPost } from '@/components/blog/BlogPost.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/$slug')({
    component: BlogPost,
});
