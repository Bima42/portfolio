export interface TimelineItem {
  id: string;
  date: string;
  title: string;           // Translation key for title
  location?: string;       // Translation key for location
  description: string;     // Translation key for description
  link?: string;           // Optional link for being redirected outside the app
  internalLink?: string;   // Optional link for project details in portfolio
  type: 'education' | 'experience' | 'project' | 'personal';
}

export interface TimelineData {
  items: TimelineItem[];
  title?: string;         // Translation key for title
}

export interface TimelineItemProps {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}