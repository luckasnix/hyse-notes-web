"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { Toast, type ToastOptions, type ToastProps } from "~/components/toast";
import { theme } from "~/styles/theme";

export type UiContextValue = {
  showToast: (options: ToastOptions) => void;
};

export type UiProviderProps = Readonly<{
  children: ReactNode;
}>;

export const UiContext = createContext<UiContextValue | null>(null);

export const UiProvider = ({ children }: UiProviderProps) => {
  const [toast, setToast] = useState<Omit<ToastProps, "onClose">>({
    open: false,
    severity: "info",
    message: "",
  });

  const closeToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const showToast = useCallback(({ severity, message }: ToastOptions) => {
    setToast((prev) => ({
      ...prev,
      open: true,
      severity,
      message,
    }));
  }, []);

  return (
    <UiContext.Provider value={{ showToast }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <Toast {...toast} onClose={closeToast} />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error("The hook 'useUi' must be used inside 'UiProvider'.");
  }

  return context;
};
