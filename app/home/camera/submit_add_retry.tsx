import * as FileSystem from "expo-file-system";
import React, { useContext, useEffect } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { addImage, setType } from "@/redux/containerImages/containerImageSlice";
import { AppDispacher } from "@/redux/store";

const SubmitAddRetry = () => {
  const { photo, type } = useLocalSearchParams();
  const dispacher = useDispatch<AppDispacher>();
  useEffect(() => {
    const checkPhotoExists = async () => {
      if (photo) {
        try {
          const fileInfo = await FileSystem.getInfoAsync(photo as string);
          console.log("File exists:", fileInfo.exists, "File info:", fileInfo);
        } catch (error) {
          console.error("Error checking file:", error);
        }
      }
    };

    checkPhotoExists();
  }, [photo]);

  const addToContainer = () => {
    dispacher(addImage({ image: photo as string }));
    dispacher(setType({ type: type as string }));
    router.back();
  };
  const retry = () => {
    router.back();
  };
  const submit = () => {
    dispacher(addImage({ image: photo as string }));
    dispacher(setType({ type: type as string }));
    router.replace("/home");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 w-full items-center justify-center  relative">
        <Image
          source={{ uri: photo as string }}
          className="w-full h-full object-contain"
        />
        <View className="absolute bottom-0 w-full flex-row items-center justify-evenly mb-2">
          <TouchableOpacity
            onPress={submit}
            className="py-2 px-4 bg-[#afafaf71] rounded-full mb-5"
          >
            <Text className="text-white text-[17px] font-bold">Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={retry}
            className="py-2 px-4 bg-[#afafaf71] rounded-full mb-5"
          >
            <Text className="text-white text-[17px] font-bold">Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addToContainer}
            className="py-2 px-4 bg-[#afafaf71] rounded-full mb-5"
          >
            <Text className="text-white text-[17px] font-bold">
              Add to Container
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SubmitAddRetry;
