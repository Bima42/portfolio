import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Project } from '@/components/projects/types.ts';
import { ExternalLink, Github } from 'lucide-react';
import { TagList } from '@/components/tags';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.ts';
import type { Components } from 'react-markdown';
import { visit } from 'unist-util-visit';

const videoExtensions = ['.mp4', '.webm', '.mov'];

const isChildVideo = (child: any) => {
    return (
        child.type === 'image' &&
        videoExtensions.some(ext => child.url?.endsWith(ext))
    );
};

const groupImagesPlugin = () => {
    return tree => {
        visit(tree, 'paragraph', node => {
            // Avoid if it's video
            if (node.children.some(isChildVideo)) {
                return;
            }

            const isImageOnly = node.children.every(
                child =>
                    child.type === 'image' ||
                    (child.type === 'text' && child.value.trim() === '')
            );

            if (isImageOnly) {
                if (node.children.length > 1) {
                    node.data = {
                        hName: 'div',
                        hProperties: {
                            className: 'image-gallery',
                        },
                    };
                } else {
                    node.data = {
                        hName: 'div',
                        hProperties: {
                            className: 'single-image',
                        },
                    };
                }
            }
        });
    };
};

interface ProjectContentProps {
    project: Project;
    isMobile?: boolean;
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

const markdownComponents: Components = {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold mb-6 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-3xl font-semibold mb-4 mt-12 text-foreground">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-medium mb-3 mt-10 text-foreground">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => <ul className="mb-4 ml-6 space-y-2">{children}</ul>,
    li: ({ children }) => (
        <li className="text-foreground/80 list-disc">{children}</li>
    ),
    div: ({ className, children, ...props }) => {
        if (className === 'image-gallery') {
            return (
                <div className="w-full h-[50vh] flex justify-center gap-10 bg-background/80 rounded-lg m-6">
                    {children}
                </div>
            );
        }
        if (className === 'single-image') {
            return (
                <div className="w-full h-[45vh] flex justify-center rounded-lg mb-6 my-6">
                    {children}
                </div>
            );
        }
        return (
            <div className={className} {...props}>
                {children}
            </div>
        );
    },
    img: ({ src, alt, ...props }) => {
        if (
            src?.endsWith('.mp4') ||
            src?.endsWith('.webm') ||
            src?.endsWith('.mov')
        ) {
            return (
                <video
                    src={src}
                    controls
                    className="max-h-full object-contain"
                    autoPlay
                    muted
                    loop
                >
                    {alt && <span>{alt}</span>}
                </video>
            );
        }
        return (
            <img
                src={src}
                alt={alt}
                className="max-h-full object-contain"
                {...props}
            />
        );
    },
    code: ({ className, children, ...props }) => {
        return (
            <code
                className={`${className} bg-muted px-1 py-0.5 rounded text-sm`}
                {...props}
            >
                {children}
            </code>
        );
    },
};

export function ProjectContent({ project, isMobile }: ProjectContentProps) {
    const { t, currentLanguage } = useLanguage();
    const [markdownContent, setMarkdownContent] = useState<string>('');

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                const response = await fetch(
                    `${project.filePath}/content-${currentLanguage}.md`
                );
                const content = await response.text();
                setMarkdownContent(content);
            } catch {
                setMarkdownContent('Erreur lors du chargement du contenu.');
            }
        };

        loadMarkdown();
    }, [currentLanguage, project.filePath]);

    return (
        <motion.div
            className="mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div
                className={`flex justify-right relative h-64 rounded-xl overflow-hidden mb-8 ${isMobile ? 'p-4' : ''}`}
                variants={itemVariants}
            >
                <img
                    src={project.lightThumbnail}
                    alt={t(project.title)}
                    className="w-full "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    {!isMobile && (
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {t(project.title)}
                        </h1>
                    )}
                    <p className="text-white/80">
                        {t(project.shortDescription)}
                    </p>
                </div>
            </motion.div>

            {/* Tags */}
            <motion.div
                className="flex flex-wrap gap-2 mb-6"
                variants={itemVariants}
            >
                <TagList tags={project.tags} size="lg" />
            </motion.div>

            {/* Links */}
            {project.links && (
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
                </motion.div>
            )}

            {/* Contenu Markdown */}
            <motion.div
                className="prose prose-lg max-w-none dark:prose-invert"
                variants={itemVariants}
            >
                <ReactMarkdown
                    components={markdownComponents}
                    remarkPlugins={[remarkGfm, groupImagesPlugin]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {markdownContent}
                </ReactMarkdown>
            </motion.div>
        </motion.div>
    );
}
