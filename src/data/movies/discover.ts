import { createServerFn } from '@tanstack/react-start';

import { discoverMovies } from '@/lib/tmdb';
import { DiscoverMoviesParamsSchema } from '@/schemas/api-params';

export const getDiscoverMovies = createServerFn({
    method: 'GET',
})
    .inputValidator(DiscoverMoviesParamsSchema)
    .handler(async ({ data }) => {
        const movies = await discoverMovies({
            page: data.page,
            sortBy: data.sort_by,
            withGenres: data.with_genres,
        });

        return movies;
    });
