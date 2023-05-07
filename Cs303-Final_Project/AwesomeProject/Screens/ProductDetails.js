import React, {useEffect, useState, useContext} from 'react';
import {Text, StyleSheet, View, Image, ScrollView, SafeAreaView, Button, ImageBackground} from "react-native";
// import { getProduct } from '../services/ProductsService';
import {CartContext} from "../CartContext";
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from "firebase/firestore";
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';

export default function ProductDetails({route}) {

    const {productId} = route.params;
    console.log("heloow:"+productId);
    const {addItemToCart,getItemsCount,items} = useContext(CartContext)
    const [UserData,SetUserData]=useState(null);
    // const[authUser,setAuthUser]=useState(null);
    const userr=auth.currentUser;
    useEffect(()=>{
      getUserData();
      const listen=onAuthStateChanged(auth,(user)=>{
            if(user){
                setAuthUser(user);  
            }else{
                setAuthUser(null);  
            }
        });
    return()=>{
        listen();
      }
    },[]);
  
  const[authUser,setAuthUser]=useState(null);
      useEffect(()=>{
          const listen=onAuthStateChanged(auth,(user)=>{
              if(user){
                  setAuthUser(user);  
              }else{
                  setAuthUser(null);  
              }
          });
      return()=>{
          listen();
      }
      },[]);
  const getUserData = async () => {
      const q = query(collection(db,"Products"), where("uid", "==",productId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          console.log(doc.id, " ====> ", doc.data());
          SetUserData(doc.data());
      });
  };
  

    function onAddToCart(){
      addItemToCart(UserData)
    }

  return (
    <SafeAreaView>
        <ScrollView style={{  backgroundColor:"#fff"}}>
            <View style={styles.imageContainer}>
        <Image  source={{uri:UserData?.IMG}}  style={styles.image}/>

            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{UserData?.name}</Text>
                <Text style={styles.price}>$ {UserData?.price}</Text>
                <Text style={styles.description}>{UserData?.description}</Text>
          
            <Button onPress={onAddToCart} style={{backgroundColor:"#00a46c"}} title="Add To Cart" />
       
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      backgroundColor: '#fff'
    },
    image: {
      width: 500,
      height:'50%',
      aspectRatio: 1,
      resizeMode:'contain'
    },
    infoContainer: {
        padding: 10
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: '#787878',
      marginBottom: 16,
    },
  });