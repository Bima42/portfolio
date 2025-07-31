import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectContent } from './ProjectContent';
import { IconButton } from '@/components/buttons/IconButton';
import { X } from 'lucide-react';
import type { Project } from '../types';

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
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-hidden p-0 sm:max-w-[90vw] z-101">
                <div className="absolute right-4 top-4 z-10">
                    <CloseModalButton onClose={onClose} />
                </div>

                <div className="overflow-y-auto max-h-[90vh]">
                    <div className="p-6 pt-12">
                        {' '}
                        {project && <ProjectContent project={project} />}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
