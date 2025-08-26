import type { Metadata } from "next";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode, Suspense } from "react";

import { UiProvider } from "~/contexts/ui-context";
import { notoSans } from "~/styles/fonts";

import { FallbackPage } from "./fallback";

export const metadata: Metadata = {
  title: "Hyse Notes",
  description: "Create and organize your notes",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <body className={notoSans.variable}>
      <NuqsAdapter>
        <UiProvider>
          <Suspense fallback={<FallbackPage />}>{children}</Suspense>
        </UiProvider>
      </NuqsAdapter>
    </body>
  </html>
);

export default RootLayout;
