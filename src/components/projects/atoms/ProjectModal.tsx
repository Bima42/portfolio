import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectContent } from './ProjectContent';
import { IconButton } from '@/components/buttons/IconButton';
import { X } from 'lucide-react';
import type { Project } from '../types';
import { useEffect } from 'react';

function CloseModalButton({ onClose }: { onClose: () => void }) {
    return (
        <IconButton
            icon={<X className="h-4 w-4" />}
            onClick={onClose}
            ariaLabel="Fermer la modal"
            variant="ghost"
            size="md"
            className="bg-background/80 hover:bg-background/90 border-foreground/20"
        />
    );
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    isMobile?: boolean;
}

export function ProjectModal({
    project,
    isOpen,
    onClose,
    isMobile,
}: ProjectModalProps) {
    // Block scrolling on the body when the modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            {isOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100" />
            )}

            <DialogContent
                className="max-w-[95vw] w-full max-h-[90vh] overflow-hidden p-0 sm:max-w-[90vw] z-101"
                onWheel={e => e.stopPropagation()}
                onTouchMove={e => e.stopPropagation()}
            >
                <div className="absolute right-4 top-4 z-10">
                    <CloseModalButton onClose={onClose} />
                </div>

                <div
                    className="max-w-full overflow-x-hidden overflow-y-auto max-h-[90vh]"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    <div className="p-6 pt-12">
                        {project && (
                            <ProjectContent
                                project={project}
                                isMobile={isMobile}
                            />
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
