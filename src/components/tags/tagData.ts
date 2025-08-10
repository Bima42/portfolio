export interface TagData {
    id: string;
    label: string;
    icon: string;
}

export const tagData: Record<string, TagData> = {
    react: {
        id: 'react',
        label: 'React',
        icon: '/logos/logo-react.svg',
    },
    react_native: {
        id: 'react_native',
        label: 'ReactNative',
        icon: '/logos/logo-react.svg',
    },
    typescript: {
        id: 'typescript',
        label: 'TypeScript',
        icon: '/logos/logo-ts.svg',
    },
    docker: {
        id: 'docker',
        label: 'Docker',
        icon: '/logos/logo-docker.svg',
    },
    nodejs: {
        id: 'nodejs',
        label: 'Node.js',
        icon: '/logos/logo-nodejs.svg',
    },
    python: {
        id: 'python',
        label: 'Python',
        icon: '/logos/logo-python.svg',
    },
    django: {
        id: 'django',
        label: 'Django',
        icon: '/logos/logo-django.svg',
    },
    fastapi: {
        id: 'fastapi',
        label: 'FastAPI',
        icon: '/logos/logo-fastapi.svg',
    },
    postgresql: {
        id: 'postgresql',
        label: 'PostgreSQL',
        icon: '/logos/logo-postgresql.svg',
    },
    mongodb: {
        id: 'mongodb',
        label: 'MongoDB',
        icon: '/logos/logo-mongodb.svg',
    },
    socketio: {
        id: 'socketio',
        label: 'Socket.IO',
        icon: '/logos/logo-socketio.svg',
    },
    nextjs: {
        id: 'nextjs',
        label: 'Next.js',
        icon: '/logos/logo-nextjs.svg',
    },
    drizzle: {
        id: 'drizzle',
        label: 'Drizzle ORM',
        icon: '/logos/logo-drizzle.svg',
    },
};

export const getTagById = (id: string): TagData | undefined => {
    return tagData[id];
};
