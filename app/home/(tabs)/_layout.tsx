import Entypo from "@expo/vector-icons/Entypo";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Stack, Tabs, router } from "expo-router";
import { View } from "react-native";
import { useAuthStore } from "@/store/useAuth";

const _layout = () => {
  const { AuthLogout } = useAuthStore((state) => state);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="px-4 mt-2">
        <HeaderComponent
          onPress={async () => {
            router.push("/logout");
          }}
        />
      </View>

      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Upload",
            tabBarLabelStyle: { fontSize: 12 },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="document-lock"
                  size={24}
                  color={focused ? "#0075f1" : "#828485"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="viewlocal"
          options={{
            title: "Local",
            tabBarLabelStyle: { fontSize: 12 },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <Entypo
                  name="upload"
                  size={24}
                  color={focused ? "#0075f1" : "#828485"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="recent"
          options={{
            title: "Recent",
            tabBarLabelStyle: { fontSize: 12 },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialIcons
                  name="recent-actors"
                  size={24}
                  color={focused ? "#0075f1" : "#828485"}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;
