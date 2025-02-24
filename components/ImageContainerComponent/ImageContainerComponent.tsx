import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Entypo from "@expo/vector-icons/Entypo";
import ImageComponent from "../ImageComponent/ImageComponent";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ColorSchemeName, Text, View } from "react-native";
import { photoList } from "@/domain/entity/ContainerImage";
import { getTime, timeAgo } from "@/utils";

interface Props {
  containerNumber: string;
  imageList: photoList[];
  type: string;
  colorScheme: ColorSchemeName;
  isRecent: boolean;
  dateAndTime: Date;
  saveBtnPress: () => void;
}

const ImageContainerComponent = ({
  containerNumber,
  imageList,
  type,
  colorScheme,
  ...props
}: Props) => {
  const [ago, setago] = useState<string>("");

  useEffect(() => {
    setago(() => {
      return timeAgo(props.dateAndTime);
    });
  }, []);

  return (
    <View className="mb-5">
      <View className="px-3">
        <View className="flex-row justify-between items-center">
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
            <ButtonComponent
              onPress={() => {
                props.saveBtnPress();
              }}
              text="Upload to Server"
              icon={<Entypo name="upload" size={18} color="#fff" />}
              btnStyle="flex-row items-center justify-center mt-2 mb-8 h-[33] w-[200] bg-[#131f28] space-x-[14px]"
              textStyle="text-[#fff] font-[400] text-[15px]"
            />
          ) : (
            <Text className="">{ago}</Text>
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
