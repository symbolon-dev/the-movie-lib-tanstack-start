import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Scripts } from '@tanstack/react-router';

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Header } from '@/components/layout/header';

import { ThemeProvider } from '@/components/providers/theme-provider';

import TanStackQueryDevtools from  '../../integrations/tanstack-query/devtools';

export const RootDocument = ({ children }: { children: React.ReactNode }) => (
    <html lang="en" suppressHydrationWarning>
        <head>
            <HeadContent />
        </head>
        <body className={`
            bg-background text-foreground min-h-screen font-sans antialiased
        `}
        >
            <ThemeProvider defaultTheme="system">
                <Header />
                <main className={`
                    container mx-auto px-4
                    md:px-8
                `}
                >
                    {children}
                </main>
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
