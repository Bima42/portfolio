export interface TagData {
    id: string;
    label: string;
    icon: string;
}

export const tagData: Record<string, TagData> = {
    react: {
        id: 'react',
        label: 'React',
        icon: '/logo-react.svg',
    },
    react_native: {
        id: 'react_native',
        label: 'ReactNative',
        icon: '/logo-react.svg',
    },
    typescript: {
        id: 'typescript',
        label: 'TypeScript',
        icon: '/logo-ts.svg',
    },
    docker: {
        id: 'docker',
        label: 'Docker',
        icon: '/logo-docker.svg',
    },
    nodejs: {
        id: 'nodejs',
        label: 'Node.js',
        icon: '/logo-nodejs.svg',
    },
    python: {
        id: 'python',
        label: 'Python',
        icon: '/logo-python.svg',
    },
    django: {
        id: 'django',
        label: 'Django',
        icon: '/logo-django.svg',
    },
    fastapi: {
        id: 'fastapi',
        label: 'FastAPI',
        icon: '/logo-fastapi.svg',
    },
    postgresql: {
        id: 'postgresql',
        label: 'PostgreSQL',
        icon: '/logo-postgresql.svg',
    },
    mongodb: {
        id: 'mongodb',
        label: 'MongoDB',
        icon: '/logo-mongodb.svg',
    },
    socketio: {
        id: 'socketio',
        label: 'Socket.IO',
        icon: '/logo-socketio.svg',
    },
};

export const getTagById = (id: string): TagData | undefined => {
    return tagData[id];
};
