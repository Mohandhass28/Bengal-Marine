import ImageContainerComponent from "@/components/ImageContainerComponent/ImageContainerComponent";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { ScrollView, Text, View, useColorScheme } from "react-native";
import { ContainerEntity } from "@/domain/entity/ContainerImage";
import { useAuthStore } from "@/store/useAuth";
import { useImagesContainerUsecases } from "@/store/useImageContainer";

const Viewlocal = () => {
  const { containerUsecase } = useImagesContainerUsecases((state) => state);
  const { user } = useAuthStore((state) => state);

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

  const saveLocal = (containerNumber: string) => {
    if (user === undefined) {
      return router.replace("/auth");
    }
    containerUsecase.saveToServer(containerNumber, user);
  };

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
          <Text className="font-[400] text-[16px]">Local Server</Text>
        </View>
        <ScrollView className=" mt-4" showsVerticalScrollIndicator={false}>
          {LocalData.map(
            ({ containerNumber, imageList, type, dateAndTime }, index) => {
              return (
                <ImageContainerComponent
                  saveBtnPress={() => {
                    saveLocal(containerNumber);
                  }}
                  dateAndTime={dateAndTime}
                  key={index}
                  colorScheme={colorScheme}
                  containerNumber={containerNumber}
                  imageList={imageList}
                  type={type}
                  isRecent={false}
                />
              );
            }
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Viewlocal;
