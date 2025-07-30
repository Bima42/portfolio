import { useState } from 'react';
import { constants } from '@/constants.ts';

export function useContentVisible() {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    const handleAnimationEnd = () => {
        if (!animationComplete) {
            setAnimationComplete(true);
            setTimeout(() => {
                setIsContentVisible(true);
            }, constants.DURATION_SECONDS_LOGO_ANIMATION * 1000);
        }
    };

    return { isContentVisible, animationComplete, handleAnimationEnd };
}
