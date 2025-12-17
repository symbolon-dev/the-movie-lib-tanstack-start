import { Image } from '@unpic/react';
import { Film } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getMoviePosterUrl } from '@/utils/image';

type PosterImageProps = {
    path: string | null;
    title: string;
    aspectRatio?: '2/3' | 'auto';
    loading?: 'eager' | 'lazy' | undefined;
    sizes?: string;
    className?: string;
    showFallback?: boolean;
    fallbackText?: string;
};

export const PosterImage = ({
    path,
    title,
    aspectRatio = '2/3',
    loading = 'eager',
    sizes = '(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 200px, 240px',
    className = '',
    showFallback = true,
    fallbackText = 'No Image Available',
}: PosterImageProps) => (
    <div
        className={cn(
            'relative size-full overflow-hidden rounded-xl',
            aspectRatio === '2/3' && 'aspect-2/3',
            className,
        )}
    >
        {path != null
            ? (
                    <Image
                        src={getMoviePosterUrl(path, 'w342')}
                        alt={`Movie poster for ${title}`}
                        width={100}
                        height={100}
                        sizes={sizes}
                        loading={loading}
                        className="size-full object-cover"
                    />
                )
            : (
                    showFallback && (
                        <div
                            className={`
                                flex size-full items-center justify-center
                                bg-gray-900 text-center text-gray-500
                            `}
                            role="img"
                            aria-label={`${fallbackText} for ${title}`}
                        >
                            <Film className="mr-2 h-6 w-6" aria-hidden="true" />
                            <span>{fallbackText}</span>
                        </div>
                    )
                )}
    </div>
);
