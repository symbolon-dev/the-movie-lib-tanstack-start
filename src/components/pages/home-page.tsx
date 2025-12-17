import { MovieFilter } from '@/components/movie/movie-filter/movie-filter';
import { MovieResults } from '@/components/movie/movie-list/movie-results';
import { ClientErrorBoundary } from '@/components/shared/client-error-boundary';
import { Route } from '@/routes/index';

export const HomePage = () => {
    const { genres } = Route.useLoaderData();

    return (
        <div className="flex flex-col gap-10 pt-6 pb-12">
            <header className={`
                space-y-3 text-center
                lg:text-left
            `}
            >
                <h1 className="heading-1">Discover Your Next Favorite Movie</h1>
                <p className="text-lead text-muted-foreground">
                    Browse trending titles, fine-tune filters, and dive into detailed information
                    for every film.
                </p>
            </header>

            <div
                className={`
                    grid grid-cols-1 gap-8
                    lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]
                    xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]
                `}
            >
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
    );
};
