import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';

import type { Movie, MovieSortOption } from '@/types/movie';
import { getDiscoverMovies } from '@/data/movies/discover';
import { getSearchMovies } from '@/data/movies/search';
import { sortMovies } from '@/lib/movie-filters';

export const useMovies = () => {
    const searchParams: { q?: string; sort?: MovieSortOption; genres?: string } = useSearch({
        strict: false,
    });

    const query = searchParams.q ?? '';
    const sortBy = searchParams.sort ?? 'popularity.desc';
    const genres = searchParams.genres ?? '';

    const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ['movies', query, sortBy, genres],
            queryFn: ({ pageParam = 1 }) => {
                if (query) {
                    return getSearchMovies({
                        data: {
                            query,
                            page: pageParam,
                        },
                    });
                }

                return getDiscoverMovies({
                    data: {
                        page: pageParam,
                        sort_by: sortBy,
                        with_genres: genres,
                    },
                });
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                if (lastPage.page < lastPage.total_pages) {
                    return lastPage.page + 1;
                }
                return undefined;
            },
            staleTime: 60000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        });

    const allMovies: Movie[] = data?.pages.flatMap((page) => page.results) ?? [];

    const filteredMovies =
        genres && query
            ? allMovies.filter((movie) => {
                  const genreIds = genres.split(',').map(Number);
                  return genreIds.every((genreId) => movie.genre_ids.includes(genreId));
              })
            : allMovies;

    const sortedMovies = query ? sortMovies(filteredMovies, sortBy) : filteredMovies;

    const uniqueMovies = sortedMovies.filter(
        (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
    );

    const lastPage = data?.pages[data.pages.length - 1];
    const totalPages = lastPage?.total_pages ?? 0;
    const totalResults = lastPage?.total_results ?? 0;
    const currentPage = data?.pages.length ?? 0;

    const loadMoreMovies = () => {
        if (!isFetchingNextPage && hasNextPage) {
            void fetchNextPage();
        }
    };

    return {
        movies: uniqueMovies,
        totalPages,
        totalResults,
        currentPage,
        isLoading,
        isLoadingMore: isFetchingNextPage,
        hasMore: hasNextPage,
        error,
        loadMoreMovies,
        mutate: refetch,
    };
};
