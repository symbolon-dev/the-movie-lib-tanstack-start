import { createServerFn } from '@tanstack/react-start';

import { fetchMovieGenres } from '@/lib/tmdb';

export const getGenres = createServerFn({
    method: 'GET',
}).handler(() => fetchMovieGenres());
