import * as FileSystem from "expo-file-system";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useCallback, useRef } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { Type } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center px-4">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Text className="text-center mb-4">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();

      if (!photo?.uri) {
        throw new Error("Failed to capture photo: No URI received");
      }

      const fileInfo = await FileSystem.getInfoAsync(photo.uri);
      if (!fileInfo.exists) {
        throw new Error("Captured photo file not found");
      }

      const newPath = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;
      await FileSystem.copyAsync({
        from: photo.uri,
        to: newPath,
      });

      console.log("Photo saved to:", newPath);

      router.push({
        pathname: "/home/camera/submit_add_retry",
        params: {
          photo: newPath,
          type: Type,
        },
      });
    } catch (error) {
      console.error("Error in takePhoto:", error);
    }
  };

  return (
    <CameraView className="flex-1" ref={cameraRef}>
      <View className="absolute bottom-0 justify-center w-full items-center">
        <TouchableOpacity
          onPress={takePhoto}
          className="p-4 bg-[#afafaf71] rounded-full mb-5"
        >
          <Text className="text-white">
            <Entypo name="camera" size={40} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

export default Index;
