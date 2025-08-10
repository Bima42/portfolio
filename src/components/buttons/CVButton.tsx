import { CVIcon } from '@/components/icons/CVIcon.tsx';

export function CVButton() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/CV-Tanguy.pdf';
        link.download = 'CV-Tanguy.pdf';
        link.click();
    };

    return (
        <button
            onClick={handleDownload}
            className="
                  flex items-center space-x-2 px-4 py-2
                  rounded-full glass-background shadow-sm
                  transition-all duration-200
                  text-xs font-medium hover-button
                "
        >
            <CVIcon />
            <span>CV</span>
        </button>
    );
}
