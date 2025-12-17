import type { MovieSortOption } from '@/types/movie';

import { useNavigate, useSearch } from '@tanstack/react-router';

export const useMovieFilters = () => {
    const navigate = useNavigate();
    const searchParams: { q?: string; sort?: string; genres?: string } = useSearch({
        strict: false,
    });

    const searchQuery = searchParams.q ?? '';
    const sortBy = searchParams.sort ?? 'popularity.desc';
    const selectedGenres
        = typeof searchParams.genres === 'string'
            ? searchParams.genres.split(',').map(Number).filter(Boolean)
            : [];

    const updateFilters = async (updates: {
        searchQuery?: string;
        sortBy?: MovieSortOption;
        selectedGenres?: number[];
    }) => {
        const newParams = { ...searchParams };

        if (updates.searchQuery !== undefined) {
            if (updates.searchQuery.trim()) {
                newParams.q = updates.searchQuery.trim();
            }
            else {
                delete newParams.q;
            }
        }

        if (updates.sortBy !== undefined) {
            newParams.sort = updates.sortBy;
        }

        if (updates.selectedGenres !== undefined) {
            if (updates.selectedGenres.length > 0) {
                newParams.genres = updates.selectedGenres.join(',');
            }
            else {
                delete newParams.genres;
            }
        }

        await navigate({
            to: '.',
            search: newParams as { q?: string; sort?: string; genres?: string },
            replace: true,
        });
    };

    const resetFilters = async () => {
        await navigate({
            to: '.',
            search: {},
            replace: true,
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
