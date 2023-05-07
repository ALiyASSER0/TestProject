import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import {
  View,
} from "react-native";
import HeaderAboutLogo from "../Components/HeaderLogo";

const Stack = createNativeStackNavigator();



//screens import 
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import About from '../Screens/About';
import More from '../Screens/More';
import Cart from '../Screens/Cart';
import Profile from '../Screens/Profile';
import Product from '../Screens/ProductsList';
import ProductDetails from '../Screens/ProductDetails';
import { NativeBaseProvider } from "native-base";
import { CartProvider } from "../CartContext";

const Tab = createBottomTabNavigator();

const homeName = "Home";
const loginName = "Login";
const registerName = "Register";
const aboutName = "About";
const moreName = "More";
const cartName = "Cart";
const profileName = "Profile";
const productName = "ProductsList";


function NavBar() 
{
  

    return (
    
     <NavigationContainer>
      <CartProvider>
        < NativeBaseProvider>
    
      <Stack.Navigator> 
         <Stack.Screen
           name="Generous"
           component={Morefun}
           options={{ headerShown: false }}
         />

         <Stack.Screen name="About" component={About} options={{
            headerTitle: () => <HeaderAboutLogo />,
            headerStyle: {
              backgroundColor: "#fff",
            },

            headerTintColor: "green",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "black",
            },
          }}/>
         <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
   
      </NativeBaseProvider>
   
      </CartProvider>
       </NavigationContainer>
    );
}


function Morefun() {
  const [State, setState] = useState(false);


onAuthStateChanged(auth, (user) => {
    if (user) {
      setState(true);
      const uid = user.uid;
    } else {
      setState(false);
    }
  });

  return (
    
    
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = focused ? 'home' : 'home-outline';

        } else if (rn === loginName) {
          iconName = focused ? 'log-in' : 'log-in-outline';

        }
        else if (rn === registerName) {
            iconName = focused ? 'person-add' : 'person-add-outline';
        }
        // else if (rn === aboutName) {
        //     iconName = focused ? 'information-circle' : 'information-circle-outline';
        // }
        else if (rn === moreName) {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
        }
        else if (rn === cartName) {
            iconName = focused ? 'cart' : 'cart-outline';
        }
        else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
        }

        else if (rn === productName) {
    

          iconName = focused ? 'grid' : 'grid-outline';
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      // hex code for red color
        activeTintColor: '#ff0000',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70}
      }}
      >

        <Tab.Screen name={homeName} component={Home}  options={{
            headerTitle: () => <HeaderAboutLogo />,
            headerStyle: {
              // backgroundColor: "gold",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "black",
            },
          }}
          />
        <Tab.Screen name={productName} component={Product} options={{
            headerTitle: () => <HeaderAboutLogo />,
            headerStyle: {
              // backgroundColor: "gold",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "black",
            },
          }}/>

        {State == true ? (
        <Tab.Screen name={profileName} component={Profile} options={{
          headerTitle: () => <HeaderAboutLogo />,
          headerStyle: {
            // backgroundColor: "gold",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
          },
        }}/>
          ) : (

        <Tab.Screen name={loginName} component={Login} options={{
          headerTitle: () => <HeaderAboutLogo />,
          headerStyle: {
            // backgroundColor: "gold",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
          },
        }}/>
        )}

        {State == true ? (
        <Tab.Screen name={cartName} component={Cart} options={{
          headerTitle: () => <HeaderAboutLogo />,
          headerStyle: {
            // backgroundColor: "gold",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
          },
        }}/>
          ) : (
        <Tab.Screen name={registerName} component={Register} options={{
          headerTitle: () => <HeaderAboutLogo />,
          headerStyle: {
            // backgroundColor: "gold",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
          },
        }}/>
        )}

    <Tab.Screen name={moreName} component={More} options={{
            headerTitle: () => <HeaderAboutLogo />,
            headerStyle: {
              backgroundColor: "white",
            },
          }}/>
    
    </Tab.Navigator>
  );
}

export default NavBar;
