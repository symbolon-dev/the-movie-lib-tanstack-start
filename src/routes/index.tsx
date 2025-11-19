import { createFileRoute } from '@tanstack/react-router';

import { MovieFilter } from '@/components/movie/movie-filter/movie-filter';
import { MovieResults } from '@/components/movie/movie-list/movie-results';
import { ClientErrorBoundary } from '@/components/shared/client-error-boundary';
import { ServerErrorBoundary } from '@/components/shared/server-error-boundary';
import { getGenres } from '@/data/movies/genre';

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

const Home = () => {
    const { genres } = Route.useLoaderData();

    return (
        <>
            <div className="flex flex-col gap-10 pt-6 pb-12">
                <header className="space-y-3 text-center lg:text-left">
                    <h1 className="heading-1">Discover Your Next Favorite Movie</h1>
                    <p className="text-lead text-muted-foreground">
                        Browse trending titles, fine-tune filters, and dive into detailed
                        information for every film.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
                    <section id="filters" className="lg:sticky lg:top-28">
                        <MovieFilter genres={genres} />
                    </section>

                    <section id="results">
                        <ClientErrorBoundary>
                            <MovieResults />
                        </ClientErrorBoundary>
                    </section>
                </div>
            </div>
        </>
    );
};

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
    component: Home,
    errorComponent: ({ error, reset }) => (
        <ServerErrorBoundary error={error} reset={reset} variant="page" />
    ),
});
