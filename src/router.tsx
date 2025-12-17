import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { getContext } from './integrations/tanstack-query/context';

import * as TanstackQuery from './integrations/tanstack-query/root-provider';
import { routeTree } from './routeTree.gen';

export const getRouter = () => {
    const rqContext = getContext();

    const router = createRouter({
        routeTree,
        context: { ...rqContext },
        defaultPreload: 'intent',
        Wrap: (props: { children: React.ReactNode }) => (
            <TanstackQuery.Provider {...rqContext}>{props.children}</TanstackQuery.Provider>
        ),
        scrollRestoration: true,
    });

    setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient });

    return router;
};
