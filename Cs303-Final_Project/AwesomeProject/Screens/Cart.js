import React, {useEffect, useState, useContext} from "react";
import {View, Image, Text, FlatList, StyleSheet, Alert} from "react-native";
import {CartContext} from "../CartContext";
// import {getProduct} from "../data/product"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "native-base";
// import {CartEmpty} from "../Components/CartEmpty"
import { FontAwesome } from '@expo/vector-icons';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth,db } from "../firebase";
export default function Cart({ navigation }){
    
    // const {productId} = route.params;
    // const [product, setProduct] = useState({});
    const {items,deleteItemToCart,addItemToCart, getTotalPrice,getItemsCount} = useContext(CartContext);

    // useEffect(() => {
    //     setProduct(getProduct(productId))
    // })
    const [product, setProduct] = useState({});
   
    let [it, setIt] = useState([]);
    
    // console.log(items);
    // console.log(items[1]["qty"]);

    let [total, setTotal] = useState(0);
    let [flag, setflag] = useState(false);

    useEffect(() => {
        setTotal(getTotalPrice())
        setIt(items)
       
      })
      
const Buy = async () => {
  setProduct(items.map((itm)=>({
    id:itm.id,
    qtn:itm.qty,
  })))
  if(flag===false){
  setflag(true);
  Alert.alert('Confirm', 'Are you sure?', [
    {
      text: 'Cancel',
      onPress: () => setflag(false),
      style: 'cancel',
    },
    {text: 'OK', onPress: Alert.alert("Okey press on buy again")},
  ]);
 
}else{
if(product===null){
  await setDoc(doc(db, "UserBuy", auth.currentUser.uid), {
    cart:product,
    });
    Alert.alert("Success");
  
}else{
  await updateDoc(doc(db, "UserBuy",auth.currentUser.uid), {
    cart:product,
 });
 Alert.alert("Success");

}
setflag(false)
}
}




function deleteFromCart(id){
  setflag(false);

  const flage= items.find((item) => (item.id == id));
      if(flage){
        deleteItemToCart(flage["data"]);
      }
    
      }
      function onAddToCart(id){
        setflag(false);
        const flage= items.find((item) => (item.id == id));
     if(flage){
      addItemToCart(flage["data"]);
     }
      }
 
   function Totals(){
       
  
        return(
          <>
            {getItemsCount()>0?
            <>
               <View style={styles.cartLineTotal}>
           
           <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
         
           <Text style={styles.mainTotal}>$ {total+" "}</Text>
        
       </View>
             <View style={{marginTop:30}}>
      <Button  style={styles.button2} onPress={Buy} >Buy</Button>
          </View>
            </>
         : <View style={{marginLeft:"40%",marginVertical:"65%"}}>
                <FontAwesome name='shopping-basket'  size={100} color={"#4c7cff"} />
                <Text color={"#539165"} style={{marginLeft:15 ,fontWeight:"bold"}} >Cart is Empty</Text>

                </View>}
          </>
        )
     
    }

 
    function renderItem({item}){
        return(
            <>
             {item.qty>0?
             <View style={{marginTop:-10,backgroundColor:"#fff"}}>
             <View style={styles.cartLine}>
                    <Image style={styles.image} source={{uri:item.data.IMG}} />
                    <Text style={styles.lineLeft}>{item.data.name} x {item.qty} <Text style={styles.productTotal}>${item.data.price}</Text></Text>
                    <View style={{marginTop:40,marginLeft:-190,flexDirection:"row",marginBottom:-1}}>
                    <Button style={styles.button} marginRight={20}  onPress={() => onAddToCart(item.id)}>+</Button>
                    <Button  style={styles.button} onPress={() => deleteFromCart(item.id)}>-</Button>
                    {/* <Button style={styles.delete} onPress={() => deleteFromCart(item.product.id)}>delete</Button> */}

                    </View>
                </View>
                </View>:<Text></Text>
                       }
                
            </>
        )
    }

    return(
        <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.data.uid}
            ListFooterComponent={Totals}
        />
    )
  // console.log(items)
  //   return(
  //     <>
  //     {getItemsCount()>0? <View style={styles.cartLineTotal}>
     
  //     <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
    
  //     <Text style={styles.mainTotal}>$ {total+" "}</Text>
  // </View>: <View style={{marginLeft:"40%",marginVertical:"65%"}}>
  //         <FontAwesome name='shopping-basket'  size={100} color={"#4c7cff"} />
  //         <Text color={"#539165"} style={{marginLeft:15 ,fontWeight:"bold"}} >Cart is Empty</Text>

  //         </View>}
  //   </>
  //  )
}

const styles = StyleSheet.create({
	cartLine: {
		flexDirection: 'row',
		width: '100%',
		paddingVertical: 10,
        borderColor:"#eeeeee",
    borderBottomColor:"#4c7cff",
        borderWidth:3,
	
    },
	image: {
		width: '25%',
		aspectRatio: 1,
		marginRight: 5
	},
	cartLineTotal: {
		flexDirection: 'row',
		borderTopColor: '#dddddd',
		borderTopWidth: 1
	},
	productTotal: {
		fontWeight: 'bold'
	},
	lineTotal: {
		fontWeight: 'bold'
	},
	lineLeft: {
		fontSize: 20,
		lineHeight: 40,
		color: '#333333',
    paddingHorizontal:15,

  },
	lineRight: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333333',
		textAlign: 'left',
	},
	mainTotal: {
		flex: 1,
		fontSize: 20,
		fontWeight: 'bold',
		lineHeight: 40,
		color: '#333333',
		textAlign: 'right'
	},
	itemsList: {
		backgroundColor: '#eeeeee'
	},
	itemsListContainer: {
		backgroundColor: '#eeeeee',
		paddingVertical: 8,
		marginHorizontal: 8
	},  button: {
        alignItems: 'center',
        backgroundColor: '#4c7cff',
        marginRight:"-15%",
        marginLeft:"25%",
        marginTop:4,
        marginBottom:30,
      },
      button2:{
        alignItems: 'center',
        backgroundColor: '#4c7cff',
      //  marginRight:"-15%",
      },
      delete: {
        alignItems: 'center',
        backgroundColor: '#4c7cff',
      marginTop:4,
      marginBottom:30,
        marginLeft:27,
      },
})