import type { VerticalDividerProps } from '../types';

export function VerticalDivider({ 
  className = '', 
  height = 'h-6' 
}: VerticalDividerProps) {
  return (
    <div 
      className={`
        w-px 
        ${height} 
        bg-foreground/20 
        dark:bg-foreground/10
        ${className}
      `}
    />
  );
}