import React from "react";
import clsx from "clsx";

import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

type props = {
  text: string;
  btnStyle: string;
  textStyle: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const ButtonComponent = ({ disabled = false, ...props }: props) => {
  return (
    <TouchableOpacity
      className={clsx(["", props.btnStyle])}
      onPress={props?.onPress}
      disabled={disabled}
    >
      {props?.icon}
      <Text className={clsx(["", props.textStyle])}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
