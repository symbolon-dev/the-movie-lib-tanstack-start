import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import { fetchMovieDetails } from '@/lib/tmdb';

export const getMovie = createServerFn({ method: 'GET' })
    .inputValidator(z.object({ id: z.string().min(1) }))
    .handler(async ({ data }) => fetchMovieDetails(data.id));
