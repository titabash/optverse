import {
  config,
  CustomToast,
  TamaguiProvider,
  TamaguiProviderProps,
  Theme,
  ToastProvider,
} from "@my/ui";
import { useColorScheme } from "react-native";

import { ToastViewport } from "./ToastViewport";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "app/provider/AuthProvider";
import { PortalProvider } from "@tamagui/portal";
import { useAtom } from "jotai";
import { themeAtom } from "app/features/themeToggle";
import { useEffect } from "react";

/**
 * This component provides the app with the necessary context providers.
 *
 * @export
 * @param {Omit<TamaguiProviderProps, "config">} param0
 * @param {Omit<TamaguiProviderProps, "config">} param0.children
 * @param {Omit<TamaguiProviderProps, "config">} param0....rest
 * @returns {*}
 */
export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  const scheme = useColorScheme();
  const queryClient = new QueryClient();
  const [themeName, setThemeName] = useAtom(themeAtom);
  useEffect(() => {
    setThemeName(scheme === "dark" ? "dark" : "light");
  }, []);
  return (
    <TamaguiProvider
      config={config}
      disableInjectCSS
      defaultTheme={themeName}
      {...rest}
    >
      <PortalProvider shouldAddRootHost>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ToastProvider
              swipeDirection="horizontal"
              duration={6000}
              native={
                [
                  /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
                  // 'mobile'
                ]
              }
            >
              {children}

              <CustomToast />
              <ToastViewport />
            </ToastProvider>
          </AuthProvider>
        </QueryClientProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
