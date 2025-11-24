import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';
import { Header } from '@/components/layout/header';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ErrorMessage } from '@/components/shared/error-message';

type MyRouterContext = {
    queryClient: QueryClient;
};

const RootDocument = ({ children }: { children: React.ReactNode }) => (
    <html lang="en" suppressHydrationWarning>
        <head>
            <HeadContent />
        </head>
        <body className="bg-background text-foreground min-h-screen font-sans antialiased">
            <ThemeProvider defaultTheme="system">
                <Header />
                <main className="container mx-auto px-4 md:px-8">{children}</main>
                <TanStackDevtools
                    config={{
                        position: 'bottom-left',
                    }}
                    plugins={[
                        {
                            name: 'Tanstack Router',
                            render: <TanStackRouterDevtoolsPanel />,
                            defaultOpen: true,
                        },
                        TanStackQueryDevtools,
                    ]}
                />
                <Scripts />
            </ThemeProvider>
        </body>
    </html>
);

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
