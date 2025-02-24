import FontAwesome from "@expo/vector-icons/FontAwesome";
import Logo from "../../assets/AppLogo/NoB/0aa9de04-0b0f-4023-9ed0-e3f151127f24 1.png";
import React from "react";
import clsx from "clsx";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  useColorScheme,
} from "react-native";

type props = {
  viewStyle?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const HeaderComponent = (props: props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      className={clsx([
        "flex-row items-center justify-between mt-2",
        props.viewStyle,
      ])}
    >
      <Image
        source={Logo}
        style={{
          width: 100,
          height: 100,
          objectFit: "fill",
        }}
      />
      <TouchableOpacity
        onPress={props?.onPress}
        className="items-center justify-center"
      >
        <FontAwesome
          name="power-off"
          size={30}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
        <Text
          className={clsx([
            "",
            colorScheme === "dark" ? "text-[#fff]" : "text-black",
          ])}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
