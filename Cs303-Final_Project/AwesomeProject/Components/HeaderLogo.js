import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function HeaderAboutLogo() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image style={styles.logo} source={require("../assets/IMG-20230501-WA0067.jpg")} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
});

export default HeaderAboutLogo;