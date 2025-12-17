import type { MovieDetail } from '@/types/movie';

import { createFileRoute, notFound } from '@tanstack/react-router';
import { MovieDetailSkeleton } from '@/components/movie/movie-detail/movie-detail-skeleton';
import { MovieDetailPage } from '@/components/pages/movie-detail-page';
import { ErrorMessage } from '@/components/shared/error-message';
import { ServerErrorBoundary } from '@/components/shared/server-error-boundary';
import { getMovie } from '@/data/movies/detail';
import { getMovieBackdropUrl } from '@/utils/image';

type MetaTag = {
    title?: string;
    name?: string;
    content?: string;
    property?: string;
    rel?: string;
    href?: string;
    tagname?: 'link';
};

const generateMetadata = (movie: MovieDetail | undefined) => {
    if (!movie) {
        return [
            { title: 'Movie Not Found - Movie Library' },
            { name: 'description', content: 'The requested movie could not be found.' },
        ];
    }

    try {
        const title = `${movie.title} - Movie Library`;
        const description
            = movie.overview || `Watch ${movie.title} and discover more amazing movies.`;
        const backdropUrl = movie.backdrop_path != null
            ? getMovieBackdropUrl(movie.backdrop_path, 'w1280')
            : undefined;

        const openGraphImages = backdropUrl != null
            ? [{ url: backdropUrl, width: 1280, height: 720, alt: `${movie.title} backdrop` }]
            : [];

        let tags: MetaTag[] = [];

        tags = [...tags, { title }];

        tags = [...tags, { name: 'description', content: description }];

        if (movie.id) {
            tags = [...tags, { rel: 'canonical', href: `/movies/${movie.id}`, tagname: 'link' }];
        }

        tags = [
            ...tags,
            { property: 'og:title', content: movie.title },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'video.movie' },
            { property: 'og:url', content: `/movies/${movie.id}` },
            { property: 'og:site_name', content: 'Movie Library' },
            ...openGraphImages.map(img => ({ property: 'og:image', content: img.url })),
        ];

        tags = [
            ...tags,
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: movie.title },
            { name: 'twitter:description', content: description },
            ...(backdropUrl != null ? [{ name: 'twitter:image', content: backdropUrl }] : []),
        ];

        tags = [
            ...tags,
            {
                name: 'keywords',
                content: [
                    movie.title,
                    'movie',
                    'film',
                    'cinema',
                    ...movie.genres.map((g: { name: string }) => g.name),
                ].join(', '),
            },
        ];

        return tags;
    }
    catch (error) {
        console.error('Failed to generate movie metadata', error);
        return [
            { title: 'Movie Not Found - Movie Library' },
            { name: 'description', content: 'The requested movie could not be found.' },
        ];
    }
};

export const Route = createFileRoute('/movies/$id')({
    loader: async ({ params }) => {
        try {
            const movie = await getMovie({ data: { id: params.id } });
            return { movie };
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('404')) {
                throw notFound();
            }
            throw error;
        }
    },
    head: ({ loaderData, params }) => {
        const movieData = loaderData?.movie;
        return {
            meta: generateMetadata(movieData),
            links: [
                { rel: 'preconnect', href: 'https://image.tmdb.org' },
                { rel: 'canonical', href: `/movies/${params.id}` },
            ],
        };
    },
    component: MovieDetailPage,
    pendingComponent: () => <MovieDetailSkeleton />,
    notFoundComponent: () => (
        <ErrorMessage
            error="The requested movie could not be found"
            fullPage
            title="Movie not found"
            actionText="Back to Home"
            actionLink="/"
        />
    ),
    errorComponent: ({ error, reset }) => (
        <ServerErrorBoundary
            error={error}
            reset={reset}
            title="Failed to load movie"
            message="We couldn't load the movie details. This might be due to an invalid movie ID or a temporary server issue."
            showBackButton
            variant="section"
        />
    ),
});
