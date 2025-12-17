import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

import { RootDocument } from '@/components/layout/root-document';

import { ErrorMessage } from '@/components/shared/error-message';
import appCss from '../styles.css?url';

type MyRouterContext = {
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'The Movie Lib - TanStack Start',
                description: 'Discover and explore movies with The Movie Lib',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
    notFoundComponent: () => (
        <ErrorMessage
            error="The requested page could not be found"
            fullPage
            title="Page not found"
            actionText="Back"
            actionLink="/"
        />
    ),
});
