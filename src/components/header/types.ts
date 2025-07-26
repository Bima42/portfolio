import type { ReactNode } from 'react';

export interface NavigationMenuItem {
  href: string;
  label: string;
  isActive?: boolean;
  icon?: ReactNode;
}