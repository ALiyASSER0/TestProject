import * as React from 'react';
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth ,db } from "../firebase";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import About from "../Screens/About";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function More({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("About")} style={styles.button}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>

      {isLoggedIn && (
        <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF0000",
    borderColor: "#FF0000",
  },
  logoutButtonText: {
    color: "#FFFFFF",
  },
});