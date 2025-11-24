import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

export default defineConfig({
    plugins: [
        {
            enforce: 'pre',
            ...mdx({
                remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
                providerImportSource: '@mdx-js/react',
            }),
        },
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
