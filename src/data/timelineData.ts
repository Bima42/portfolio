import type { TimelineData } from '../components/about/types.ts';

export const timelineData: TimelineData = {
  title: 'timeline.title',
  items: [
    {
      id: '1',
      date: '01.2023 - Today',
      title: 'timeline.items.software_engineer.title',
      location: 'timeline.items.software_engineer.location',
      description: 'timeline.items.software_engineer.description',
      type: 'experience'
    },
    {
      id: '2', 
      date: '12.2024 - 06.2025',
      title: 'timeline.items.voltaire.title',
      description: 'timeline.items.voltaire.description',
      link: 'https://voltaire.chat',
      internalLink: '/projects/voltaire',
      type: 'project'
    },
    {
      id: '3',
      date: '09-2024 - 11-2024',
      title: 'timeline.items.prompt_pilot.title',
      description: 'timeline.items.prompt_pilot.description',
      link: 'https://prompt-pilot.app',
      internalLink: '/projects/prompt-pilot',
      type: 'project'
    },
    {
      id: '4',
      date: '10-2021 - Today',
      title: 'timeline.items.42_school.title',
      location: 'timeline.items.42_school.location',
      description: 'timeline.items.42_school.description',
      link: 'https://www.42lausanne.ch',
      type: 'education'
    }
  ]
};