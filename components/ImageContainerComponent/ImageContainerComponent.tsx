import Animated, { BounceOut } from "react-native-reanimated";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Entypo from "@expo/vector-icons/Entypo";
import ImageComponent from "../ImageComponent/ImageComponent";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { router } from "expo-router";
import { photoList } from "@/domain/entity/ContainerImage";
import { useAuthStore } from "@/store/useAuth";
import { useImagesContainerUsecases } from "@/store/useImageContainer";
import { timeAgo } from "@/utils";

import {
  ActivityIndicator,
  Alert,
  ColorSchemeName,
  Text,
  View,
} from "react-native";

interface Props {
  containerNumber: string;
  imageList: photoList[];
  type: string;
  colorScheme: ColorSchemeName;
  isRecent: boolean;
  dateAndTime: Date;
  saveBtnPress: () => void;
  reloadAGO?: boolean;
  showAge?: boolean;
  isLoading?: boolean;
  LoadData?: () => Promise<void>;
}

const ImageContainerComponent = ({
  containerNumber,
  imageList,
  type,
  colorScheme,
  reloadAGO = false,
  showAge = false,
  LoadData,
  ...props
}: Props) => {
  const [ago, setago] = useState<string>("");
  const { containerUsecase } = useImagesContainerUsecases((state) => state);
  const { user } = useAuthStore((state) => state);
  const changeAgo = () => {
    setago(() => {
      return timeAgo(props.dateAndTime);
    });
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

  const [isLoading, setisLoading] = useState<boolean>(false);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const save = async (containerNumber: string) => {
    try {
      if (user === undefined) {
        return router.replace("/auth");
      }
      setisLoading(true);
      await delay(1000);
      if (!isConnected) {
        Alert.alert("Status", "No Internet Connections");
        setisLoading(false);
      }
      const status = await containerUsecase.saveToServer(containerNumber, user);
      Alert.alert("Status", status.message);
      if (LoadData) {
        await LoadData();
      }
      setisLoading(false);
      if (status.status === 1) {
        return true;
      }
    } catch (error) {
      Alert.alert("Status", String(error));
    } finally {
      setisLoading(false);
    }
    return false;
  };
  useEffect(() => {
    changeAgo();
  }, [reloadAGO]);

  return (
    <View className="mb-5">
      <View className="px-3">
        <View className="flex-row justify-between items-center gap-4">
          <View>
            <Text
              className={clsx([
                "font-[500] text-[16px] mb-5",
                colorScheme === "dark" ? "text-[#fff]" : "text-[#000]",
              ])}
            >
              {containerNumber}
            </Text>
            <Text
              className={clsx([
                "font-[500] text-[16px]",
                colorScheme === "dark" ? "text-[#fff]" : "text-[#000]",
              ])}
            >
              {type}
            </Text>
          </View>

          {!props.isRecent ? (
            <View className="">
              <ButtonComponent
                disabled={isLoading}
                onPress={() => {
                  props.saveBtnPress();
                  save(containerNumber);
                }}
                text="Upload to Server"
                icon={
                  <>
                    {isLoading ? (
                      <>
                        <ActivityIndicator />
                      </>
                    ) : (
                      <>
                        <Entypo name="upload" size={18} color="#fff" />
                      </>
                    )}
                  </>
                }
                btnStyle="flex-row items-center justify-center mt-2 mb-8 h-[35] w-[170] bg-[#131f28] flex-1 space-x-[14px] rounded-[7px]"
                textStyle="text-[#fff] font-[400] text-[15px]"
              />
              <View className="flex-row items-center justify-end">
                <Text
                  className={clsx([
                    "font-[500] text-[16px]",
                    colorScheme === "dark" ? "text-[#fff]" : "text-[#000]",
                  ])}
                >
                  <Text className="">{ago}</Text>
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View className="flex-row flex-wrap justify-start">
        {imageList.map(({ image, id }) => {
          return (
            <ImageComponent
              key={id}
              imageSrc={{ uri: image }}
              viewStyle="mb-2 mr-1"
            />
          );
        })}
      </View>
    </View>
  );
};

export default ImageContainerComponent;
