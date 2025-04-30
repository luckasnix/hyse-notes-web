import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "~/styles/theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Hyse Notes",
  description: "Create and organize your notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <NuqsAdapter>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* TODO: Add a fallback component */}
              <Suspense fallback={<div>Carregando...</div>}>
                {children}
              </Suspense>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
