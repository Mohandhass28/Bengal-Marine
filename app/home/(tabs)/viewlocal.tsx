import ImageContainerComponent from "@/components/ImageContainerComponent/ImageContainerComponent";
import NetInfo from "@react-native-community/netinfo";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { ContainerEntity } from "@/domain/entity/ContainerImage";
import { useAuthStore } from "@/store/useAuth";
import { useImagesContainerUsecases } from "@/store/useImageContainer";

import Animated, {
  BounceIn,
  BounceOut,
  FadeOut,
} from "react-native-reanimated";
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";

const Viewlocal = () => {
  const { containerUsecase } = useImagesContainerUsecases((state) => state);
  const { user } = useAuthStore((state) => state);

  const [LocalData, setLocalData] = useState<ContainerEntity[]>([]);
  const [isRefreshing, setisRefreshing] = useState(false);
  const colorScheme = useColorScheme();

  const LoadData = async () => {
    const data = await containerUsecase.getFromLocal();

    setLocalData(() => {
      return data;
    });
  };

  useFocusEffect(
    useCallback(() => {
      LoadData();
    }, [])
  );

  return (
    <>
      <View className="px-4 flex-1 ">
        <View className="bg-[#ccccccc6] h-[50px] mt-4 items-center justify-center rounded-[8px]">
          <Text className="font-[400] text-[16px]">Local Server</Text>
        </View>
        <FlatList
          className=" mt-4"
          data={LocalData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View className="items-center justify-center h-[100%]">
                <Text className="text-[#4a4a4a] font-[600] text-[16px]">
                  No Data Found
                </Text>
              </View>
            );
          }}
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
          renderItem={({
            index,
            item: { containerNumber, dateAndTime, imageList, type },
          }) => {
            return (
              <Animated.View key={index} className="">
                <ImageContainerComponent
                  saveBtnPress={() => {}}
                  LoadData={LoadData}
                  reloadAGO={isRefreshing}
                  dateAndTime={dateAndTime}
                  key={index}
                  colorScheme={colorScheme}
                  containerNumber={containerNumber}
                  imageList={imageList}
                  type={type}
                  isRecent={false}
                />
              </Animated.View>
            );
          }}
        />
      </View>
    </>
  );
};

export default Viewlocal;
