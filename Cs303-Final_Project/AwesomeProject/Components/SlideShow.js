import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function SlideShow({ Imgurl, CatName }) {
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View >
      <ScrollView>
        <SafeAreaView>
          <View style={styles.scrollContainer1}>
            <View style={{ flexDirection: "row", marginTop: 40 }}>
              <Text style={styles.scrollHead}>{CatName}</Text>
              <TouchableOpacity
                style={{
                  marginLeft: 250,
                  backgroundColor: "#e80405",
                  borderRadius: 10,
                  height: 23,
                }}
              >
                <Text style={styles.scrollHeadsee}> More </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={1}
            >
              {Imgurl.map((image, imageIndex) => {
                return (
                  <View>
                    <TouchableOpacity
                      key={imageIndex}
                      onPress={() => navigation.navigate("Login")}
                      style={{
                        height: 230,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 10,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160,
                      }}
                    >
                      <View
                        style={{ width: windowWidth - 243, height: 200 }}
                        key={imageIndex}
                      >
                        <Image source={{ uri: image }} style={styles.card} />

                        <View
                          style={{
                            paddingHorizontal: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {CatName}kmimimjkgbhnjuijolooooo
                          </Text>
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#e80405",
                              paddingTop: 10,
                            }}
                          >
                            $1000
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer1: {
    height: 330,
    width: 400,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  HeaderCard: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 2,
    marginTop: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "red",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollHeadsee: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollHead: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    letterSpacing: 1,
  },
});
