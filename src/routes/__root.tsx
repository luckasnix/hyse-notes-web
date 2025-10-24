import fontsourceVariableNotoSansCss from "@fontsource-variable/noto-sans?url";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import { type ReactNode, Suspense } from "react";

import { UiProvider } from "~/contexts/ui-context";
import { FallbackPage } from "~/pages/fallback-page";
import { NotFoundPage } from "~/pages/not-found-page";

const RootDocument = ({ children }: { children: ReactNode }) => (
  // TODO: Add internationalization with American English and Brazilian Portuguese
  <html lang="en">
    <head>
      <HeadContent />
    </head>
    <body>
      <NuqsAdapter>
        <UiProvider>
          <Suspense fallback={<FallbackPage />}>{children}</Suspense>
        </UiProvider>
      </NuqsAdapter>
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content: "Create and organize your notes",
      },
      {
        title: "Hyse Notes",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: fontsourceVariableNotoSansCss,
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  shellComponent: RootDocument,
});
