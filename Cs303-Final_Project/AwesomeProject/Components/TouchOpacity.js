import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function TouchOpacity({ Src, onPress,borderColorr,backgroundColorr }) {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
      backgroundColor:backgroundColorr,
        borderColor:borderColorr,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginRight: 10,
      }}
    >
      <Image source={Src} style={{ height: 20, width: 20 }} />
    </TouchableOpacity>
  );
}
