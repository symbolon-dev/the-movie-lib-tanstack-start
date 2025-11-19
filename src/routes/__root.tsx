import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import appCss from '../styles.css?url';
import { Header } from '@/components/layout/header';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ErrorMessage } from '@/components/shared/error-message';

const RootLayout = () => (
    <html lang="en" suppressHydrationWarning>
        <head>
            <HeadContent />
        </head>
        <body className="bg-background text-foreground min-h-screen font-sans antialiased">
            <QueryProvider>
                <ThemeProvider defaultTheme="system">
                    <Header />
                    <main className="container mx-auto px-4 md:px-8">
                        <Outlet />
                    </main>
                    <Scripts />
                    <TanStackDevtools
                        config={{
                            position: 'bottom-left',
                        }}
                        plugins={[
                            {
                                name: 'TanStack Query',
                                render: <ReactQueryDevtoolsPanel />,
                                defaultOpen: true,
                            },
                            {
                                name: 'Tanstack Router',
                                render: <TanStackRouterDevtoolsPanel />,
                                defaultOpen: true,
                            },
                        ]}
                    />
                </ThemeProvider>
            </QueryProvider>
        </body>
    </html>
);

export const Route = createRootRoute({
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
    component: RootLayout,
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
