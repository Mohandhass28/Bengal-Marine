import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

const LineargradentComponent = () => {
  return (
    <LinearGradient
      className=""
      style={{
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      }}
      colors={["#fdfdfd", "#5AECEB", "#131f28"]}
      locations={[0.24, 0.5, 1]}
    />
  );
};

export default LineargradentComponent;
