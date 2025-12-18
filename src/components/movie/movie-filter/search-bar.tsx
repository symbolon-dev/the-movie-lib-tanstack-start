import type { ChangeEvent } from 'react';
import { Search, XCircle } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useMovieFilters } from '@/hooks/use-movie-filters';
import { cn } from '@/lib/utils';

type SearchBarProps = {
    className?: string;
};

export const SearchBar = ({ className = '' }: SearchBarProps) => {
    const { searchQuery, setSearchQuery } = useMovieFilters();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        void setSearchQuery(value);
    };

    const handleClear = async () => {
        await setSearchQuery('');
    };

    return (
        <div className={cn('relative flex items-center', className)}>
            <div className={`
                text-muted-foreground pointer-events-none absolute left-3
            `}
            >
                <Search size={20} />
            </div>

            <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleChange}
                className="w-full pr-10 pl-10"
            />

            {searchQuery
                ? (
                        <button
                            type="button"
                            onClick={() => {
                                void handleClear();
                            }}
                            className={`
                                text-muted-foreground absolute right-3
                                hover:text-foreground
                            `}
                            aria-label="Clear search"
                        >
                            <XCircle size={20} />
                        </button>
                    )
                : null}
        </div>
    );
};
