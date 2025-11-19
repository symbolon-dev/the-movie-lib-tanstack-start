import { useRouter } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

type BackButtonProps = {
    fallback?: string;
    label?: string;
    className?: string;
};

export const BackButton = ({ fallback = '/', label = 'Back', className = '' }: BackButtonProps) => {
    const router = useRouter();

    const handleClick = async () => {
        if (window.history.length > 1) {
            router.history.back();
        } else {
            await router.navigate({ to: fallback, resetScroll: true });
        }
    };

    return (
        <Button
            variant="outline-primary"
            animationType="back"
            className={className}
            onClick={handleClick}
            role="link"
            aria-label={fallback ? `Go to ${fallback}` : 'Go back'}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {label}
        </Button>
    );
};
