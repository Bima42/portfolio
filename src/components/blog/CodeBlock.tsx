import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
});

interface CodeBlockProps {
    className?: string;
    children?: React.ReactNode;
}

export function CodeBlock({ className, children }: CodeBlockProps) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const codeContent = String(children).replace(/\n$/, '');

    if (language === 'mermaid') {
        return <MermaidDiagram code={codeContent} />;
    }

    if (language) {
        return (
            <div className="rounded-md overflow-hidden my-6 border border-border">
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    codeTagProps={{
                        style: {
                            backgroundColor: 'transparent',
                            fontFamily: 'inherit',
                        },
                        className: '!bg-transparent !p-0',
                    }}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'var(--color-muted)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                    }}
                >
                    {codeContent}
                </SyntaxHighlighter>
            </div>
        );
    }

    // Fallback for code blocks without language
    return <code className={className}>{children}</code>;
}

function MermaidDiagram({ code }: { code: string }) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');

    useEffect(() => {
        const renderDiagram = async () => {
            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, code);
                setSvg(svg);
            } catch (error) {
                console.error('Mermaid render error:', error);
                setSvg(
                    '<div class="text-destructive">Failed to render diagram</div>'
                );
            }
        };
        renderDiagram();
    }, [code]);

    return (
        <div
            ref={elementRef}
            className="flex justify-center p-8 bg-white/5 rounded-md my-6 border border-border overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
