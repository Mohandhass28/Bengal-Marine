import Entypo from "@expo/vector-icons/Entypo";
import ImageContainerComponent from "@/components/ImageContainerComponent/ImageContainerComponent";
import React, { useCallback, useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useFocusEffect } from "expo-router";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
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

  const [DateValue, setDate] = useState(new Date());

  const LoadData = async (date: Date) => {
    const data = await getImagesFromServer(
      date.toDateString(),
      user?.userID || ""
    );
    console.log(data);

    await setLocalData(() => {
      return data;
    });
  };
  useEffect(() => {
    LoadData(DateValue);
  }, []);

  useFocusEffect(
    useCallback(() => {
      LoadData(DateValue);
    }, [])
  );

  const OpenDatePicker = () => {
    DateTimePickerAndroid.open({
      value: DateValue,
      onChange: async (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        await setDate(currentDate);
        if (event.type === "set") {
          await LoadData(currentDate);
        }
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const colorScheme = useColorScheme();
  return (
    <>
      <View className="px-4 flex-1 ">
        <View className="bg-[#ccccccc6] h-[50px] mt-4 items-center justify-center rounded-[8px]">
          <Text className="font-[400] text-[16px]">Recently Uploaded</Text>
        </View>
        <TouchableOpacity
          className="mt-2 justify-end items-end"
          onPress={OpenDatePicker}
        >
          <Text className="text-[#4a4a4a] font-[600] text-[16px]">
            {DateValue.toLocaleString().slice(0, 9).trim()}
          </Text>
          <Entypo
            name="calendar"
            size={40}
            color={colorScheme === "dark" ? "#fff" : "black"}
          />
        </TouchableOpacity>

        {isLoadign ? (
          <View className="items-center justify-center">
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={LocalData}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={async () => {
                    setisRefreshing(true);
                    await LoadData(DateValue);
                    setisRefreshing(false);
                  }}
                />
              }
              maxToRenderPerBatch={5}
              initialNumToRender={5}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({
                item: { containerNumber, imageList, type, dateAndTime },
                index,
              }) => {
                type =
                  ((type as unknown) as number) === 1
                    ? "Pre"
                    : ((type as unknown) as number) === 2
                    ? "Post"
                    : "AV/UR";
                return (
                  <ImageContainerComponent
                    key={index}
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
              }}
            />
            {/* {LocalData.map(
                ({ containerNumber, imageList, type, dateAndTime }, index) => {
                  type =
                    ((type as unknown) as number) === 1
                      ? "Pre"
                      : ((type as unknown) as number) === 2
                      ? "Post"
                      : "AV/UR";

                  return (
                    <ImageContainerComponent
                      key={index}
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
              )} */}
          </>
        )}
      </View>
    </>
  );
};

export default Recent;
