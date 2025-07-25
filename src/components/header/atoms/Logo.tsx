import { Link } from '@tanstack/react-router';
import type { LogoProps } from '../types';

export function Logo({ 
  src, 
  alt = 'Logo', 
  className = '',
  href = '/' 
}: LogoProps) {

  return (
    <Link
      to={href}
      className={`flex items-center space-x-2 transition-opacity hover:opacity-80 ${className}`}
    >
      <img src={src} alt={alt} className="h-8 w-auto" />
    </Link>
  );
}