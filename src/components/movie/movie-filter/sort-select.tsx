import type { LucideIcon } from 'lucide-react';
import type { MovieSortOption } from '@/types/movie';

import { ArrowDown, ArrowUp } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMovieFilters } from '@/hooks/use-movie-filters';
import { cn } from '@/lib/utils';
import { MOVIE_SORT_OPTIONS } from '@/schemas/api-params';

const SORT_OPTION_METADATA: Record<MovieSortOption, { label: string; icon: LucideIcon }> = {
    'popularity.desc': { label: 'Popularity', icon: ArrowDown },
    'popularity.asc': { label: 'Popularity', icon: ArrowUp },
    'primary_release_date.desc': { label: 'Release Date', icon: ArrowDown },
    'primary_release_date.asc': { label: 'Release Date', icon: ArrowUp },
    'title.asc': { label: 'Title', icon: ArrowUp },
    'title.desc': { label: 'Title', icon: ArrowDown },
    'vote_average.desc': { label: 'Rating', icon: ArrowDown },
    'vote_average.asc': { label: 'Rating', icon: ArrowUp },
    'original_title.asc': { label: 'Original Title', icon: ArrowUp },
    'original_title.desc': { label: 'Original Title', icon: ArrowDown },
    'revenue.asc': { label: 'Revenue', icon: ArrowUp },
    'revenue.desc': { label: 'Revenue', icon: ArrowDown },
    'vote_count.asc': { label: 'Vote Count', icon: ArrowUp },
    'vote_count.desc': { label: 'Vote Count', icon: ArrowDown },
};

type SortSelectProps = {
    className?: string;
};

export const SortSelect = ({ className = '' }: SortSelectProps) => {
    const { sortBy, setSortBy } = useMovieFilters();

    const handleValueChange = async (value: string) => {
        await setSortBy(value as MovieSortOption);
    };

    return (
        <div className={cn('w-full', className)}>
            <Select
                value={sortBy}
                onValueChange={(value) => {
                    void handleValueChange(value);
                }}
            >
                <SelectTrigger className="w-full" aria-label="Sort movies by">
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                    {MOVIE_SORT_OPTIONS.map((value) => {
                        const { label, icon: Icon } = SORT_OPTION_METADATA[value];
                        return (
                            <SelectItem key={value} value={value}>
                                <div className="flex items-center gap-2">
                                    <span>{label}</span>
                                    <Icon className="h-3 w-3" />
                                </div>
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
};
