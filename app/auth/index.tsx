import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import Constants from "expo-constants";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import LineargradentComponent from "@/components/LinearGradient/LineargradentComponent";
import React, { useEffect, useState } from "react";
import TextField from "@/components/TextField/TextField";
import clsx from "clsx";
import { Redirect, Stack, router } from "expo-router";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuth";
import { userModle } from "@/data/model/user_Model";
import { supabase } from "@/lib/supabase";

import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const Logo = require("../../assets/AppLogo/NoB/0aa9de04-0b0f-4023-9ed0-e3f151127f24 1.png");

export type formType = {
  email: string;
  password: string;
};

const AuthScreen = () => {
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<formType>();

  const [showPass, setshowPass] = useState(false);

  const { Authlogin, error } = useAuthStore((state) => state);

  useEffect(() => {
    if (error.length > 0) {
      setError("password", { message: error });
    }
  }, [error]);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <SafeAreaView className="flex-1">
          <LineargradentComponent />
          <View className="px-4">
            <View className="items-center">
              <Image
                source={Logo}
                className="w-[240px] h-[240px]"
                style={{
                  objectFit: "fill",
                }}
              />
            </View>
            <View className="items-center mt-4">
              <Text className="font-[500] text-[27px]">Log In</Text>
              <Text className="font-[400] text-[20px]">
                Log into your account
              </Text>
            </View>
            <View className="mt-10">
              <TextField
                handleTextChange={(text) => text}
                name="email"
                text="Email ID"
                placeholder="Enter Email"
                rules={{
                  required: {
                    value: true,
                    message: "Please Enter Email ID",
                  },
                  minLength: 8,
                }}
                control={control}
                isSecureText={false}
                inputTextStyle=""
                viewStyle={clsx([
                  errors?.email?.message ? "border-[#D13434]" : "border-[#ccc]",
                ])}
                TextStyle=""
              />
            </View>
            {errors?.email?.message ? (
              <View className="relative">
                <Text className="font-[500] text-[14px] text-[#D13434] leading-[21px]">
                  {errors?.email?.message}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View className="mt-10 ">
              <TextField
                handleTextChange={(text) => text}
                name="password"
                text="Password"
                placeholder="Enter Password"
                rules={{}}
                control={control}
                isSecureText={!showPass}
                inputTextStyle="flex-1"
                viewStyle={clsx([
                  "flex-row items-center justify-between pr-3",
                  errors?.password?.message
                    ? "border-[#D13434]"
                    : "border-[#ccc]",
                ])}
                TextStyle=""
                iconConponent={
                  <TouchableOpacity
                    onPress={() => {
                      setshowPass((state) => !state);
                    }}
                  >
                    {showPass ? (
                      <>
                        <Feather name="eye" size={24} color="black" />
                      </>
                    ) : (
                      <>
                        <Entypo name="eye-with-line" size={24} color="black" />
                      </>
                    )}
                  </TouchableOpacity>
                }
              />
            </View>
            {errors?.password?.message ? (
              <View className="relative">
                <Text className="font-[500] text-[14px] text-[#D13434] leading-[21px]">
                  {errors?.password?.message}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View className="mt-16">
              <ButtonComponent
                text="Log In"
                textStyle="text-[#fff]"
                btnStyle="items-center bg-[#131f28] h-[50] justify-center rounded-[8px]"
                onPress={() => {
                  handleSubmit(async (data: formType) => {
                    if (Authlogin === undefined) {
                      setError("password", { message: "Loing invalid" });
                      return;
                    }
                    await Authlogin({
                      email: data.email,
                      password: data.password,
                    }).then((val) => {
                      if (val === "Login Success") {
                        router.replace("/home");
                      } else {
                        if (val.includes("email")) {
                          setError("email", { message: val });
                          return;
                        }
                        setError("password", { message: val });
                      }
                    });
                  })();
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default AuthScreen;
