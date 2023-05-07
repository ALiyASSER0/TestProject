import React, {createContext, useEffect, useState} from "react";
// import {getProduct} from "./services/ProductsService.js";
import {getProduct} from "./data/product.js"
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from "firebase/firestore";
import { auth, db } from './firebase'
import { onAuthStateChanged } from "firebase/auth";

export const CartContext = createContext();

export function CartProvider(props){

    const [items, setItems] = useState([]);
    const [UserDataa,SetUserDataa]=useState(null);
    // const[authUser,setAuthUser]=useState(null);

    // useEffect(()=>{
    //     addItemToCart();
    //   const listen=onAuthStateChanged(auth,(user)=>{
    //         if(user){
    //             setAuthUser(user);  
    //         }else{
    //             setAuthUser(null);  
    //         }
    //     });
    // return()=>{
    //     listen();
    //   }
    // },[]);
  
    //   useEffect(()=>{
    //       const listen=onAuthStateChanged(auth,(user)=>{
    //           if(user){
    //               setAuthUser(user);  
    //           }else{
    //               setAuthUser(null);  
    //           }
    //       });
    //   return()=>{
    //       listen();
    //   }
    //   },[]);
const[flag,SetFlag]=useState(false);
 


function addItemToCart(data){
    const id=data.uid;
const price=data.price;
        setItems((prevItems) => {
            const item = prevItems.find((item) => (item.id == id));
            if(!item){
            
                return [...prevItems, {
                    id, 
                    qty: 1,
                    data, 
                    totalPrice: price
               
                }]
            }else{
                return prevItems.map((item) => {
                    if(item.id == id){
                        item.qty++;
                  item.totalPrice = (Number(item.totalPrice)+Number(price));
                 
                }
                   console.log("recieve"); 
                   return item;
                })
            }
        })
    }
   
 
    function deleteItemToCart(data){
        const id=data.uid;
const price=data.price;
        setItems((prevItems) => {
            const item = prevItems.find((item) => (item.id == id));
            if(!item){
                return [...prevItems, {
                    id, 
                    qty: 1,
                    data, 
                    totalPrice: price
                }]
            }else{
                return prevItems.map((item) => {
                    if(item.id == id){
                     if(item.qty>0){
                         item.qty--;
                        item.totalPrice =  (Number(item.totalPrice)-Number(price));
                     }else{
                        item.qty=0;
                     }
                       
                    }
                    return item;
                })
            }
        })
    }
    function getItemsCount(){
        return items.reduce((sum,item) => (Number(sum) + Number(item.qty)), 0)
    }

    function getTotalPrice(){
        return items.reduce((sum, item) => (Number(sum) +Number(item.totalPrice)), 0)
    }

    return(
        <CartContext.Provider value={{items,deleteItemToCart,getItemsCount, addItemToCart, getTotalPrice}}>
            {props.children}
        </CartContext.Provider>
    )

}