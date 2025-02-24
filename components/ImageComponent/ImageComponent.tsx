import clsx from "clsx";
import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

type props = {
  viewStyle: string;
  imageStyle?: string;
  imageSrc?: ImageSourcePropType;
  deleteIcon?: React.ReactNode;
};

const ImageComponent = (props: props) => {
  return (
    <View className={clsx(["my-1", props.viewStyle])}>
      {props?.deleteIcon}
      {props?.imageSrc && (
        <Image
          source={props?.imageSrc}
          className={clsx(["w-[90] h-[90]", props.imageStyle])}
          style={{
            objectFit: "fill",
          }}
        />
      )}
    </View>
  );
};

export default ImageComponent;
