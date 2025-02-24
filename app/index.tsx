import React from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

const index = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default index;
