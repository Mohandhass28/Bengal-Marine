import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/core/hooks/useColorScheme";
import { LocalStorageImpl } from "@/data/source/local/local_storage";
import { useAuthStore } from "@/store/useAuth";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
  );
}
