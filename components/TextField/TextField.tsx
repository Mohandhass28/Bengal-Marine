import React from "react";
import clsx from "clsx";
import { Text, TextInput, View } from "react-native";

import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type props = {
  text?: string;
  control: Control<any, any>;
  isSecureText: boolean;
  name: string;
  placeholder: string;
  viewStyle: string;
  inputTextStyle: string;
  TextStyle: string;
  inputTextAlign?: "center" | "left" | "right" | undefined;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  iconConponent?: React.ReactNode;
  autoCapitalize?: "characters" | "none" | "sentences" | "words" | undefined;
  handleTextChange: (text: string) => string;
};

const TextField = ({ ...props }: props) => {
  return (
    <View>
      {props.text !== "" ? (
        <>
          <Text
            className={clsx(["my-2 text-[16px] font-[600]", props.TextStyle])}
          >
            {props.text}
          </Text>
        </>
      ) : (
        <></>
      )}
      <View
        className={clsx([
          "border-[2px] border-[#ccc] rounded-[8px] bg-[#fff] h-[50px] justify-center",
          props.viewStyle,
        ])}
      >
        <Controller
          name={props.name}
          rules={props.rules}
          control={props.control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                className={clsx(["pl-3", props.inputTextStyle])}
                value={value}
                textAlign={props?.inputTextAlign}
                autoCapitalize={props?.autoCapitalize}
                onChangeText={(text) => onChange(props.handleTextChange(text))}
                placeholder={props?.placeholder}
                secureTextEntry={props.isSecureText}
              />
            );
          }}
        />
        {props?.iconConponent}
      </View>
    </View>
  );
};

export default TextField;
