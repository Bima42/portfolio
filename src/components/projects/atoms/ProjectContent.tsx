import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Project } from '@/components/projects/types.ts';
import { ExternalLink, Github, Smartphone } from 'lucide-react';
import { TagList } from '@/components/tags';
import 'highlight.js/styles/github-dark.css'; // ou un autre thème

interface ProjectContentProps {
    project: Project;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

// Composants personnalisés pour ReactMarkdown
const markdownComponents = {
    h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold mb-6 text-foreground">{children}</h1>
    ),
    h2: ({ children }: any) => (
        <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground">
            {children}
        </h2>
    ),
    h3: ({ children }: any) => (
        <h3 className="text-xl font-medium mb-3 mt-6 text-foreground">
            {children}
        </h3>
    ),
    p: ({ children }: any) => (
        <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: any) => (
        <ul className="mb-4 ml-6 space-y-2">{children}</ul>
    ),
    li: ({ children }: any) => (
        <li className="text-foreground/80 list-disc">{children}</li>
    ),
    code: ({ inline, className, children, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || '');
        return !inline ? (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                <code className={className} {...props}>
                    {children}
                </code>
            </pre>
        ) : (
            <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                {children}
            </code>
        );
    },
};

export function ProjectContent({ project }: ProjectContentProps) {
    return (
        <motion.div
            className="mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header avec image */}
            <motion.div
                className="relative h-64 rounded-xl overflow-hidden mb-8"
                variants={itemVariants}
            >
                <img
                    src={project.gallery[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {project.title}
                    </h1>
                    <p className="text-white/80">{project.shortDescription}</p>
                </div>
            </motion.div>

            {/* Tags */}
            <motion.div
                className="flex flex-wrap gap-2 mb-6"
                variants={itemVariants}
            >
                <TagList tags={project.tags} size="md" />
            </motion.div>

            {/* Links */}
            <motion.div
                className="flex flex-wrap gap-4 mb-8"
                variants={itemVariants}
            >
                {project.links.demo && (
                    <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                    </a>
                )}
                {project.links.github && (
                    <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </a>
                )}
                {project.links.playstore && (
                    <a
                        href={project.links.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
                    >
                        <Smartphone className="w-4 h-4" />
                        Play Store
                    </a>
                )}
            </motion.div>

            {/* Contenu Markdown */}
            <motion.div
                className="prose prose-lg max-w-none dark:prose-invert"
                variants={itemVariants}
            >
                <ReactMarkdown
                    components={markdownComponents}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {project.content}
                </ReactMarkdown>
            </motion.div>
        </motion.div>
    );
}
