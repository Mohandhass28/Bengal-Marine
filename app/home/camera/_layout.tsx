import React from "react";
import { Slot, Stack } from "expo-router";
import { Text, View } from "react-native";

const _layout = () => {
  return (
    <>
      <Slot />
      <Stack.Screen options={{ headerShown: false }} />
    </>
  );
};

export default _layout;
