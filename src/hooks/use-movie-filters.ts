import type { MovieSortOption } from '@/types/movie';

import { parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { MOVIE_SORT_OPTIONS } from '@/schemas/api-params';

export const useMovieFilters = () => {
    const [filters, setFilters] = useQueryStates(
        {
            q: parseAsString.withDefault('').withOptions({
                history: 'replace',
                throttleMs: 300,
            }),
            sort: parseAsStringLiteral(MOVIE_SORT_OPTIONS as readonly string[]).withDefault('popularity.desc').withOptions({
                history: 'replace',
            }),
            genres: parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({
                history: 'replace',
            }),
        },
        {
            history: 'replace',
        },
    );

    const searchQuery = filters.q;
    const sortBy = filters.sort;
    const selectedGenres = filters.genres;

    const updateFilters = async (updates: {
        searchQuery?: string;
        sortBy?: MovieSortOption;
        selectedGenres?: number[];
    }) => {
        await setFilters({
            ...(updates.searchQuery !== undefined && { q: updates.searchQuery.trim() || null }),
            ...(updates.sortBy !== undefined && { sort: updates.sortBy }),
            ...(updates.selectedGenres !== undefined && { genres: updates.selectedGenres.length > 0 ? updates.selectedGenres : null }),
        });
    };

    const resetFilters = async () => {
        await setFilters({
            q: null,
            sort: 'popularity.desc',
            genres: null,
        });
    };

    const hasActiveFilters
        = searchQuery.trim() !== '' || selectedGenres.length > 0 || sortBy !== 'popularity.desc';

    const setSearchQuery = async (query: string) => updateFilters({ searchQuery: query });
    const setSortBy = async (sort: MovieSortOption) => updateFilters({ sortBy: sort });
    const setSelectedGenres = async (genres: number[]) => updateFilters({ selectedGenres: genres });

    return {
        searchQuery,
        sortBy,
        selectedGenres,
        hasActiveFilters,
        updateFilters,
        resetFilters,
        setSearchQuery,
        setSortBy,
        setSelectedGenres,
    };
};
