import ImageContainerComponent from "@/components/ImageContainerComponent/ImageContainerComponent";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { ScrollView, Text, View, useColorScheme } from "react-native";
import { ContainerEntity } from "@/domain/entity/ContainerImage";
import { useImagesContainerUsecases } from "@/store/useImageContainer";
import { timeAgo } from "@/utils";

const Recent = () => {
  const { containerUsecase } = useImagesContainerUsecases((state) => state);

  const [LocalData, setLocalData] = useState<ContainerEntity[]>([]);

  const LoadData = async () => {
    const data = await containerUsecase.getFromLocal();
    setLocalData(() => {
      return data;
    });
  };
  useEffect(() => {
    LoadData();
  }, []);

  const colorScheme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      LoadData();
      return () => {};
    }, [LoadData])
  );
  return (
    <>
      <View className="px-4 flex-1 ">
        <View className="bg-[#ccccccc6] h-[50px] mt-4 items-center justify-center rounded-[8px]">
          <Text className="font-[400] text-[16px]">Recently Uploaded</Text>
        </View>
        <ScrollView className=" mt-4" showsVerticalScrollIndicator={false}>
          {LocalData.map(
            ({ containerNumber, imageList, type, dateAndTime }, index) => {
              return (
                <ImageContainerComponent
                  saveBtnPress={() => {}}
                  key={index}
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
        </ScrollView>
      </View>
    </>
  );
};

export default Recent;
