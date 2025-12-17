import { BackButton } from '@/components/layout/back-button';
import { MovieDetailContent } from '@/components/movie/movie-detail/movie-detail-content';
import { Route } from '@/routes/movies/$id';

export const MovieDetailPage = () => {
    const { movie } = Route.useLoaderData();

    return (
        <div className={`
            flex min-h-[calc(100dvh-5rem)] flex-col gap-8 pt-6 pb-12
        `}
        >
            <BackButton label="Back to Movies" className="w-fit" />

            <MovieDetailContent movie={movie} />
        </div>
    );
};
