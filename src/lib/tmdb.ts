import type { z } from 'zod';

import type { MovieDiscoverParams } from '@/types/movie';

import process from 'node:process';
import { GenreResponseSchema, MovieDetailSchema, MovieResponseSchema } from '@/schemas/movie';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchFromTMDB = async <T>(endpoint: string, schema: z.ZodSchema<T>): Promise<T> => {
    if (API_KEY == null) {
        throw new Error('TMDB API key is not defined');
    }

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(
                `Error fetching from TMDB: ${response.status} - ${response.statusText}`,
            );
        }

        const data: unknown = await response.json();

        try {
            return schema.parse(data);
        }
        catch (validationError) {
            console.error('Schema validation error:', validationError);
            throw new Error(
                `Schema validation error: API response does not match the expected schema. ${validationError instanceof Error ? validationError.message : 'Unknown error'}`,
            );
        }
    }
    catch (error) {
        throw new Error(
            `Failed to fetch data from TMDB: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
};

export const discoverMovies = async (options?: MovieDiscoverParams) => {
    const page = options?.page?.toString() ?? '1';
    const sortBy = options?.sortBy ?? 'popularity.desc';
    const withGenres = options?.withGenres ?? '';

    return fetchFromTMDB(
        `/discover/movie?page=${page}&sort_by=${sortBy}&with_genres=${withGenres}&include_adult=false`,
        MovieResponseSchema,
    );
};

export const searchMovies = async (query: string, page: number = 1) => {
    if (!query) {
        throw new Error('Search query cannot be empty');
    }

    return fetchFromTMDB(
        `/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`,
        MovieResponseSchema,
    );
};

export const fetchMovieDetails = async (id: string) => {
    if (!id) {
        throw new Error('Movie ID cannot be empty');
    }

    return fetchFromTMDB(`/movie/${id}`, MovieDetailSchema);
};

export const fetchMovieGenres = async () => fetchFromTMDB('/genre/movie/list', GenreResponseSchema);
