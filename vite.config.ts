import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        port: 3000,
    },
    optimizeDeps: {
        include: ['react-use'],
    },
    ssr: {
        noExternal: ['react-use'],
    },
    plugins: [
        devtools(),
        nitro(),
        tsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tanstackStart(),
        viteReact({
            // https://react.dev/learn/react-compiler
            babel: {
                plugins: [
                    [
                        'babel-plugin-react-compiler',
                        {
                            target: '19',
                        },
                    ],
                ],
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
