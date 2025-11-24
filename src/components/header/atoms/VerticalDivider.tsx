interface VerticalDividerProps {
    className?: string;
    height?: string;
}

export function VerticalDivider({
    className = '',
    height = 'h-6',
}: VerticalDividerProps) {
    return (
        <div
            className={`
        w-px 
        ${height} 
        bg-foreground/20 
        bg-foreground/10
        ${className}
      `}
        />
    );
}
