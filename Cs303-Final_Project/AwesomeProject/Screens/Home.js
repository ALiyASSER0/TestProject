import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,RefreshControl,
  SafeAreaView,
  ScrollView,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import SlideShow from "../Components/SlideShow";

const Imgurl = [
  "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4482677/pexels-photo-4482677.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/39574/flower-exotic-colorful-pink-39574.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=1600",

  "https://images.pexels.com/photos/639086/pexels-photo-639086.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export default function Home({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const userr = auth.currentUser;
  const { width: windowWidth } = useWindowDimensions();

  const [State, setState] = useState(false);

  const [UserData, SetUserData] = useState(null);

  const [authUser, setAuthUser] = useState(null);


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    getUserData();
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setState(true);
      } else {
        setAuthUser(null);
        setState(false);
      }
    });
    return () => {
      getUserData();
      listen();
    };
  }, []);

  useEffect(() => {
    getUserData();
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        getUserData();
        setState(true);
      } else {
        setAuthUser(null);
        setState(false);
      }
    });
    return () => {
      getUserData();
      listen();
    };
  }, []);

  const getUserData = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      SetUserData(doc.data());
    });
  };

  console.log(UserData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {State == true ? (
            <View>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20,marginLeft: 10, }}
              >
                    Hello {UserData?.name}
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 20,
                  marginLeft: 15,
                  marginTop: 10,
                  color: "#e80405",
                }}
              >
                Hello to shop
              </Text>
            </View>
          )}
        </View>

        <SafeAreaView>
          <View style={styles.scrollContainer}>
            
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],null)}
              scrollEventThrottle={1}
            >
            
              {Imgurl.map((image, imageIndex) => {
                return (
                  <View>         
                   
                    <TouchableOpacity
                      key={imageIndex}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <View
                        style={{ width: windowWidth, height: 250 }}
                        key={imageIndex}
                      >   
           
                        <ImageBackground
                          source={{ uri: image }}
                          style={styles.HeaderCard}
                        >
                          
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.indicatorContainer}>
              {Imgurl.map((image, imageIndex) => {
                const width = scrollX.interpolate({
                  inputRange: [
                    windowWidth * (imageIndex - 1),
                    windowWidth * imageIndex,
                    windowWidth * (imageIndex + 1),
                  ],
                  outputRange: [8, 16, 8],
                  extrapolate: "clamp",
                });
                return (
                  <Animated.View
                    key={imageIndex}
                    style={[styles.normalDot, { width }]}
                  />
                );
              })}
            </View>
          </View>
        </SafeAreaView>

        <View>
          <SafeAreaView>
            <View style={{ marginTop: 40, marginBottom: 40 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.scrollHead}>Categories</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 200,
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
                          backgroundColor: "#FFF",
                        }}
                      >
                        <View
                          style={{ width: windowWidth - 260, height: 120 }}
                          key={imageIndex}
                        >
                          <ImageBackground
                            source={{ uri: image }}
                            style={styles.catCard}
                          >
                            <Text
                              style={{
                                color: "#e80405",
                                fontSize: 24,
                                fontWeight: "bold",
                              }}
                            >
                              {imageIndex}
                            </Text>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
        <View>
          <SlideShow Imgurl={Imgurl} CatName="Men" />
          <SlideShow Imgurl={Imgurl} CatName="Women" />
          <SlideShow Imgurl={Imgurl} CatName="East" />
          <SlideShow Imgurl={Imgurl} CatName="West" />
        </View>
      </ScrollView>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logOutL: {
    marginTop: 40,
    marginLeft: 350,
    width: 50,
    height: 40,
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer1: {
    height: 250,
    width: 400,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  HeaderCard: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    
  },
  catCard: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity:0.5,
  },
  card: {
    flex: 1,
    marginVertical: 60,
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
    backgroundColor: "#e80405",
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
