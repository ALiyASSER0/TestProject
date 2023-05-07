import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Link,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Footer({}) {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "#D8E3E7" }}>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 10,
          textAlign: "left",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        2023-@CopyRight:Eng_A_
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#637CF2",
    justifyContent: "center",
  },
});
