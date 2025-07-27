import type { LucideIcon } from 'lucide-react';

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}