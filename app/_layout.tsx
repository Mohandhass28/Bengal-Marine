import React, { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { useColorScheme } from "@/core/hooks/useColorScheme";
import { store } from "@/redux/store";
import { useAuthStore } from "@/store/useAuth";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { AuthCheck, status } = useAuthStore((state) => state);

  const [isLogin, setisLogin] = useState<boolean>();

  const LoginCheck = async () => {
    if (AuthCheck === undefined) {
      return;
    }
    await AuthCheck();
  };

  useEffect(() => {
    LoginCheck();
  }, []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack />
          {status ? (
            <>
              <Redirect href={"/home"} />
            </>
          ) : (
            <>
              <Redirect href={"/auth"} />
            </>
          )}
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
