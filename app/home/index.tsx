import AntDesign from "@expo/vector-icons/AntDesign";
import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import Constants from "expo-constants";
import Entypo from "@expo/vector-icons/Entypo";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import TextField from "@/components/TextField/TextField";
import clsx from "clsx";
import { Stack, router } from "expo-router";
import { useForm } from "react-hook-form";
import { AxiosInstance } from "@/api";
import { ContainerModle } from "@/data/model/Container_Image_Model";
import { ApiImpl } from "@/data/source/network/api";
import { useAuthStore } from "@/store/useAuth";
import { useImagesContainerUsecases } from "@/store/useImageContainer";
import { imageObject, openMobileCamera } from "@/utils/TakeImage";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";

const Home = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [photos, setphotos] = useState<imageObject[]>([]);
  const { user } = useAuthStore((state) => state);

  const [type, setType] = useState<string>("");

  const { containerUsecase } = useImagesContainerUsecases((state) => state);

  const [showUploaded, setshowUploaded] = useState<boolean>(false);

  const ShowUploadedText = () => {
    ResetAll();
    setshowUploaded(true);
    setTimeout(() => {
      setshowUploaded(false);
    }, 3000);
  };
  const colorScheme = useColorScheme();
  const save = (containerNumber: string) => {
    if (user === undefined) {
      return router.replace("/auth");
    }
    const status = containerUsecase.saveToServer(containerNumber, user);
  };
  useEffect(() => {
    if (photos.length === 0) {
      setType(() => "");
    }
  }, [photos]);

  const ResetAll = () => {
    setphotos([]);
    reset();
  };
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      return setIsConnected(state.isConnected ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View className="flex-1 px-4">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View className="flex-1">
          <View className="">
            <Text
              className={clsx([
                "font-[500] text-[16px]",
                colorScheme === "dark" ? "text-[#fff]" : "text-[#000]",
              ])}
            >
              Container Number
            </Text>
          </View>
          <View className="px-2">
            <View className="">
              <TextField
                handleTextChange={(text: string) => {
                  const filteredText = text.replace(/[^A-Z0-9]/g, "");
                  console.log(filteredText);
                  return filteredText;
                }}
                inputTextAlign="center"
                control={control}
                name="container_number"
                isSecureText={false}
                inputTextStyle="font-[600] text-[20px]"
                TextStyle="my-0"
                placeholder=""
                viewStyle={clsx([
                  "mt-1",
                  errors?.container_number?.message !== undefined
                    ? "border-[red]"
                    : "border-[#ccc]",
                ])}
                autoCapitalize="characters"
                text=""
                rules={{
                  required: {
                    message: "Container Number is required",
                    value: true,
                  },
                  maxLength: {
                    message: "Container Number must be 11 characters",
                    value: 11,
                  },
                  minLength: {
                    message: "Container Number must be 11 characters",
                    value: 11,
                  },
                }}
              />
            </View>
            {errors?.container_number?.message ? (
              <View className="relative">
                <Text className="font-[500] text-[14px] text-[#D13434] leading-[21px]">
                  {errors?.container_number?.message.toString()}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View className="">
              <ButtonComponent
                text="Upload Pre Container Image"
                onPress={async () => {
                  await openMobileCamera({
                    addimageToList: setphotos,
                    setTyet: () => {
                      setType("Pre");
                    },
                  });
                }}
                disabled={type === "Pre" || type === "" ? false : true}
                btnStyle={clsx([
                  "flex-row items-center justify-center mt-2 h-[50] bg-[#131f28] space-x-[14px]",
                  type === "Pre" || type === "" ? "opacity-100" : "opacity-60",
                ])}
                textStyle="text-[#fff] font-[300] text-[16px]"
                icon={<Entypo name="camera" size={24} color="#fff" />}
              />
            </View>
            <View className="">
              <ButtonComponent
                text="Upload Post Container Image"
                onPress={async () => {
                  await openMobileCamera({
                    addimageToList: setphotos,
                    setTyet: () => {
                      setType("Post");
                    },
                  });
                }}
                disabled={type === "Post" || type === "" ? false : true}
                btnStyle={clsx([
                  "flex-row items-center justify-center mt-2 h-[50] bg-[#131f28] space-x-[14px]",
                  type === "Post" || type === "" ? "opacity-100" : "opacity-60",
                ])}
                textStyle="text-[#fff] font-[300] text-[16px]"
                icon={<Entypo name="camera" size={24} color="#fff" />}
              />
            </View>
            <View className="">
              <ButtonComponent
                text="Upload AV/UR Container Image"
                onPress={async () => {
                  await openMobileCamera({
                    addimageToList: setphotos,
                    setTyet: () => {
                      setType("AV/UR");
                    },
                  });
                }}
                disabled={type === "AV/UR" || type === "" ? false : true}
                btnStyle={clsx([
                  "flex-row items-center justify-center mt-2 h-[50] bg-[#131f28] space-x-[14px]",
                  type === "AV/UR" || type === ""
                    ? "opacity-100"
                    : "opacity-60",
                ])}
                textStyle="text-[#fff] font-[300] text-[16px]"
                icon={<Entypo name="camera" size={24} color="#fff" />}
              />
            </View>
          </View>
          {showUploaded && (
            <View className="bg-[#ccccccc6] h-[50px] mt-4 items-center justify-center rounded-[8px]">
              <Text className="font-[400] text-[16px]">Images Uploaded</Text>
            </View>
          )}

          <ScrollView nestedScrollEnabled={true} contentContainerStyle={{}}>
            <View className="flex-wrap flex-row justify-start mt-4">
              {photos.map((image, index) => {
                return (
                  <ImageComponent
                    key={image.id}
                    imageSrc={{ uri: image.image }}
                    deleteIcon={
                      <TouchableOpacity
                        onPress={() => {
                          setphotos((state) => {
                            return state.filter((object) => {
                              if (object.id === image.id) {
                                return false;
                              }
                              return true;
                            });
                          });
                        }}
                        className="absolute z-10 right-2 top-1"
                      >
                        <AntDesign name="delete" size={24} color="red" />
                      </TouchableOpacity>
                    }
                    viewStyle="relative mb-2 mr-1"
                    imageStyle=""
                  />
                );
              })}
            </View>
          </ScrollView>

          <View className="justify-end">
            <ButtonComponent
              text="Save to Local"
              icon={<Ionicons name="document-lock" size={24} color="#fff" />}
              onPress={async () => {
                handleSubmit(async (data) => {
                  const modle = new ContainerModle(
                    data.container_number,
                    photos,
                    type
                  );
                  const status = await containerUsecase.saveToLocal(modle);
                  if (status) {
                    ShowUploadedText();
                  }
                })();
              }}
              btnStyle="flex-row items-center justify-center mt-2 h-[50] bg-[#131f28] space-x-[14px]"
              textStyle="text-[#fff] font-[400] text-[17px]"
            />
            <ButtonComponent
              text="Upload to Server"
              onPress={async () => {
                if (!isConnected) {
                  Alert.alert("Status", "No Internet Connections");
                  return;
                }
                handleSubmit(() => {})();
                if (watch("container_number").length !== 11) return;
                if (photos.length === 0) return;
                const modle = new ContainerModle(
                  watch("container_number"),
                  photos,
                  type
                );
                await containerUsecase.saveToLocal(modle);
                await save(watch("container_number"));
                ResetAll();
                ShowUploadedText();
              }}
              icon={<Entypo name="upload" size={24} color="#fff" />}
              btnStyle="flex-row items-center justify-center mt-4 h-[50] bg-[#131f28] space-x-[14px] mb-2"
              textStyle="text-[#fff] font-[400] text-[17px]"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
