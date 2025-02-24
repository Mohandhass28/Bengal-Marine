import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import React from "react";
import clsx from "clsx";
import { BlurView } from "expo-blur";
import { Stack, router } from "expo-router";
import { Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/useAuth";

const logout = () => {
  const colorScheme = useColorScheme();
  const { AuthLogout } = useAuthStore((state) => state);

  return (
    <>
      <Stack.Screen
        name="logout"
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade_from_bottom",
          animationDuration: 100,
          animationTypeForReplace: "pop",
        }}
      />
      <BlurView
        intensity={0}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          className={clsx([
            "w-[80%] h-[30%] rounded-[20px]",
            colorScheme === "dark" ? "bg-[#ffffffcd]" : "bg-[#000000e4]",
          ])}
        >
          <View className="items-center mt-20">
            <Text
              className={clsx([
                "text-[24px] font-[600]",
                colorScheme === "dark" ? "text-[#000000e4]" : "text-[#ffffff]",
              ])}
            >
              Log Out
            </Text>
          </View>
          <View className="flex-1 items-center justify-evenly mt-5 flex-row">
            <ButtonComponent
              btnStyle={clsx([
                "w-[110px] h-[46px] items-center justify-center rounded-[10px]",
                colorScheme === "dark" ? "bg-[#000000]" : "bg-[#ffffff]",
              ])}
              text="Cancel"
              textStyle={clsx([
                "text-[19px] font-[600]",
                colorScheme === "dark" ? "text-[#ffffff]" : "text-[#000000e4]",
              ])}
              onPress={() => {
                router.back();
              }}
            />
            <ButtonComponent
              btnStyle={clsx([
                "w-[110px] h-[46px] items-center justify-center rounded-[10px]",
                colorScheme === "dark" ? "bg-[#000000]" : "bg-[#ffffff]",
              ])}
              text="Log Out"
              textStyle={clsx([
                "text-[19px] font-[600]",
                colorScheme === "dark" ? "text-[#ffffff]" : "text-[#000000e4]",
              ])}
              onPress={async () => {
                await AuthLogout();
              }}
            />
          </View>
        </View>
      </BlurView>
    </>
  );
};

export default logout;
