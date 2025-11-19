import { createServerFn } from '@tanstack/react-start';

import { searchMovies } from '@/lib/tmdb';
import { SearchMoviesParamsSchema } from '@/schemas/api-params';

export const getSearchMovies = createServerFn({
    method: 'GET',
})
    .inputValidator(SearchMoviesParamsSchema)
    .handler(({ data }) => {
        const movies = searchMovies(data.query, data.page);

        return movies;
    });
