import { createFileRoute } from '@tanstack/react-router';

import { ServerErrorBoundary } from '@/components/shared/server-error-boundary';
import { getGenres } from '@/data/movies/genre';
import { HomePage } from '@/components/pages/home-page';

const metadata = [
    { title: 'Movie Library - Discover Amazing Movies' },
    {
        name: 'description',
        content:
            'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
    },
    {
        name: 'keywords',
        content:
            'movies, films, cinema, entertainment, movie database, search movies, movie genres',
    },
    { property: 'og:title', content: 'Movie Library - Discover Amazing Movies' },
    {
        property: 'og:description',
        content:
            'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Movie Library' },
    { property: 'og:url', content: '/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Movie Library - Discover Amazing Movies' },
    {
        name: 'twitter:description',
        content:
            'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
    },
];

export const Route = createFileRoute('/')({
    loader: async () => getGenres(),
    head: () => ({
        meta: metadata,
        links: [
            { rel: 'preconnect', href: 'https://api.themoviedb.org' },
            { rel: 'preconnect', href: 'https://image.tmdb.org' },
            { rel: 'canonical', href: '/' },
        ],
    }),
    component: HomePage,
    errorComponent: ({ error, reset }) => (
        <ServerErrorBoundary error={error} reset={reset} variant="page" />
    ),
});
