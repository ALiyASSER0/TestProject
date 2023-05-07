import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useState } from "react";

import Footer from "../Components/Footer";
import R3 from "../assets/R3.png";

import b from "../assets/249.jpg";

export default function About({ navigation }) {
  return (
    <>
      <ImageBackground style={styles.imageBackground} source={b}>
        <View>
          <View style={styles.container}>
            <Text style={styles.headline}> About Us:</Text>
            <Text style={styles.Abouttext}>
              The owner is abdou. The global perfume market size was valued at
              USD 50.85 billion in 2022 and is expected to register a compound
              annual growth rate (CAGR) of 5.9% from 2023 to 2030. The market
              growth is attributed to the growing trend of personal grooming,
              coupled with increasing demand for luxury and exotic The owner is
              abdou fragrances.Christian Dior was born in Granville, a seaside
              town on the coast of Normandy, France.
            </Text>

            <View style={styles.container2}>
              <Text style={styles.headline2}>Contact Us:</Text>
              <Text style={styles.Abouttext2}>Telphone: 0114890000 .</Text>
              <Text style={styles.Abouttext2}>Email: Abdo@gmail .</Text>
              <Text style={styles.Abouttext2}> adress: El giza .</Text>
            </View>
          </View>
          <Footer />
        </View>

        <StatusBar style="dark" />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    marginTop: 15,
    opacity: 0.85,
    marginHorizontal: 30,
    backgroundColor: "#F6F1E9",
    marginBottom: 50,
  },
  container2: {
    flex: 1,
    opacity: 0.87,
    marginHorizontal: 20,
    width: "85%",
    height: "35%",
    backgroundColor: "#F6F1E9",
    marginTop: 30,
    marginBottom: 10,
  },

  imageBackground: {
    opacity: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headline: {
    marginHorizontal: 1,
    textAlign: "center",
    flex: 0.2,
    height: "35%",
    padding: 5,
    fontSize: 25,
    borderWidth: 3,
    borderColor: "darkred",
    borderBottomWidth: 15,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    color: "red",
    // resizeMode: "center",
  },
  headline2: {
    //marginHorizontal: 35,
    borderWidth: 3,
    borderColor: "darkred",

    borderBottomWidth: 12,
    flex: 0.3,
    fontSize: 23,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    color: "red",
    textAlign: "center",
  },
  Abouttext: {
    marginHorizontal: 10,
    fontSize: 19,
    fontWeight: "bold",
  },
  Abouttext2: {
    marginHorizontal: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#420000",
  },
});
