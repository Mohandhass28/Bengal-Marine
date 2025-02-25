import ImageContainerComponent from "@/components/ImageContainerComponent/ImageContainerComponent";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { ContainerEntity } from "@/domain/entity/ContainerImage";
import { useAuthStore } from "@/store/useAuth";
import { useImagesContainerUsecases } from "@/store/useImageContainer";
import { timeAgo } from "@/utils";

import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";

const Recent = () => {
  const {
    containerUsecase,
    getImagesFromServer,
    isLoadign,
  } = useImagesContainerUsecases((state) => state);

  const { user } = useAuthStore((state) => state);

  const [LocalData, setLocalData] = useState<ContainerEntity[]>([]);

  const [isRefreshing, setisRefreshing] = useState(false);

  const LoadData = async () => {
    const data = await getImagesFromServer(
      new Date().toDateString(),
      user?.userID || ""
    );

    setLocalData(() => {
      return data;
    });
  };
  useEffect(() => {
    LoadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      LoadData();
    }, [])
  );

  const colorScheme = useColorScheme();
  return (
    <>
      <View className="px-4 flex-1 ">
        <View className="bg-[#ccccccc6] h-[50px] mt-4 items-center justify-center rounded-[8px]">
          <Text className="font-[400] text-[16px]">Recently Uploaded</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={async () => {
                setisRefreshing(true);
                await LoadData();
                setisRefreshing(false);
              }}
            />
          }
          className=" mt-4"
          showsVerticalScrollIndicator={false}
        >
          {isLoadign ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator />
            </View>
          ) : (
            <>
              {LocalData.map(
                ({ containerNumber, imageList, type, dateAndTime }, index) => {
                  type =
                    ((type as unknown) as number) === 1
                      ? "Pre"
                      : ((type as unknown) as number) === 2
                      ? "Post"
                      : "AV/UR";
                  return (
                    <ImageContainerComponent
                      reloadAGO={isRefreshing}
                      saveBtnPress={() => {}}
                      colorScheme={colorScheme}
                      containerNumber={containerNumber}
                      imageList={imageList}
                      type={type}
                      dateAndTime={dateAndTime}
                      isRecent={true}
                    />
                  );
                }
              )}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Recent;
