import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Check, Copy } from 'lucide-react';

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
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(codeContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (language === 'mermaid') {
        return <MermaidDiagram code={codeContent} />;
    }

    if (language) {
        return (
            <div className="group relative rounded-lg overflow-hidden my-6 border border-border/50 bg-[#1e1e1e] not-prose">
                {/* Copy Button */}
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                        onClick={copyToClipboard}
                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                        aria-label="Copy code"
                    >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                </div>

                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    codeTagProps={{
                        style: { fontFamily: 'inherit' },
                        className: '!bg-transparent !p-0',
                    }}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent', // Handled by parent div
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                    }}
                >
                    {codeContent}
                </SyntaxHighlighter>
            </div>
        );
    }

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
                    '<div class="text-destructive p-4">Failed to render diagram</div>'
                );
            }
        };
        renderDiagram();
    }, [code]);

    return (
        <div
            ref={elementRef}
            className="flex justify-center p-8 bg-[#1e1e1e] rounded-lg my-6 border border-border/50 overflow-x-auto not-prose"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
