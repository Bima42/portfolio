import { useEffect, useState } from 'react';

export function TypewriterText({ text }: { text: string }) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        const startTimer = setTimeout(() => {
            let index = 0;

            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 80);

            return () => clearInterval(typeInterval);
        }, 3300);

        return () => clearTimeout(startTimer);
    }, [text]);

    return (
        <span>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
}