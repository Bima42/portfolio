import { useEffect, useState } from 'react';

export function TypewriterText({ text }: { text: string }) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setIsTyping(true);
            let index = 0;

            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(typeInterval);
                    setIsTyping(false);
                }
            }, 50);

            return () => clearInterval(typeInterval);
        }, 500);

        return () => clearTimeout(startTimer);
    }, [text]);

    return (
        <span>
            {displayText}
            <span className={isTyping ? 'cursor-static' : 'cursor-blink'}>
                |
            </span>
        </span>
    );
}
