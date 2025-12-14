import { createServerFn } from '@tanstack/react-start';

import { searchMovies } from '@/lib/tmdb';
import { SearchMoviesParamsSchema } from '@/schemas/api-params';

export const getSearchMovies = createServerFn({
    method: 'GET',
})
    .inputValidator(SearchMoviesParamsSchema)
    .handler(async ({ data }) => {
        const movies = await searchMovies(data.query, data.page);

        return movies;
    });
