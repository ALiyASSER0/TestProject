import React from "react";
import no from '../assets/no.png'
import {
  View,
  TextInput,
  SafeAreaView,RefreshControl,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from "../Components/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import Botton from "../Components/btn";
import Facebook from "../assets/facebook.png";
import Googlee from "../assets/google.png";
import Twitter from "../assets/twitter.png";
import TouchOpacity  from "../Components/TouchOpacity"
import { auth, db } from "../firebase";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { Alert } from "react-native";
export default function Signup({ navigation }) {
  var provider = new GoogleAuthProvider();
  // const [accessToken, SetAccessToken] = useState();
  // const [userInfo, SetUserInfo] = useState();
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   webClientId:
  //     "248629810532-gae2c1d016o919dhta3kdgtojt9cegoq.apps.googleusercontent.com",
  // });
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [day, SetDay] = useState("");
  const [month, SetMonth] = useState("");
  const [year, SetYear] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confPassword, SetconfPassword] = useState("");
  const [Icon, SetIcon] = useState("eye-off-outline");
  const [Icon2, SetIcon2] = useState("eye-off-outline");
  const [bool, Setbool] = useState(true);
  const [bool2, Setbool2] = useState(true);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  console.log(bool);
  const ChangeIcon = () => {
    if (Icon === "eye-off-outline") {
      SetIcon("eye-outline");
      Setbool(false);
    } else {
      SetIcon("eye-off-outline");
      Setbool(true);
    }
  };
  const ChangeIcon2 = () => {
    if (Icon2 === "eye-off-outline") {
      SetIcon2("eye-outline");
      Setbool2(false);
    } else {
      SetIcon2("eye-off-outline");
      Setbool2(true);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  const hangleGoolge=()=>{
    console.log("HERE");
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
     console.log(user.email);
    Alert.alert("done google");
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorMessage);
      console.log(errorCode);
      
      
    });
  }
  const handleSignUp = async () => {
    if (name.trim().length < 2) {
      Alert.alert("please enter a name");
    } else {
      if (password === confPassword) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "users", auth.currentUser.uid), {
              email: email.toLowerCase().trim(),
              uid: user.uid,
              name: name.trim(),
              password: password.trim(),
              phone: phone.trim(),
              image: no,
              BirthDate: date.toLocaleDateString()
            });
            Alert.alert("done");
            navigation.navigate("Login");
          })

          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorMessage);
          });
      } else {
        Alert.alert("Password doesnot match");
      }
    }
  };

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      SetUserInfo(data);
    });
    let password = "1234567";
    await createUserWithEmailAndPassword(auth, userInfo.email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          email: userInfo.email.toLowerCase().trim(),
          uid: user.uid,
          name: userInfo.name.trim(),
          password: password.trim(),
          day: day,
          Month: month,
          year: year,
          Card: [],
        });
        Alert.alert("done");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     SetAccessToken(response.authentication.accessToken);
  //   }
  // }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageBackground source={require('../assets/249.jpg')} size="lg" alt='logo' w="full" resizeMode="cover" >
          <View style={{ marginTop: 35, marginLeft: "20%", marginRight: "20%" }}>
            <Text style={{ textAlign: "center", fontSize: 40, color: '#000', fontWeight: "bold", marginBottom: 34 }}>Hello!</Text>
            <InputField label={'Full name'} value={name} onChangeText={SetName} />
            <Ionicons name="person-circle-outline" size={17} color="#539165" style={styles.icons} />
            <InputField label={'Email'} keyboardType="email-address" value={email} onChangeText={SetEmail} />
            <Ionicons name="mail-outline" size={17} color="#539165" style={styles.icons} />

            <InputField icon={<Ionicons name={Icon} size={19} color="#666" style={{ marginTop: 20, marginLeft: -30 }} onPress={ChangeIcon}></Ionicons>} label={'Password'} inputType="password" value={password} onChangeText={SetPassword} r={bool} />
            <Ionicons name='ios-lock-closed-outline' size={17} color="#539165" style={styles.icons} />
            {/* icon={<Ionicons name={Icon} size={19} color="#666" style={{marginTop:-90,marginBottom:100,marginLeft:190}} onPress={ChangeIcon}></Ionicons>
    } */}
            <InputField icon={<Ionicons name={Icon2} size={19} color="#666" style={{ marginTop: 20, marginLeft: -30 }} onPress={ChangeIcon2}></Ionicons>} label={'Confirm password'} inputType="password" value={confPassword} onChangeText={SetconfPassword} r={bool2} />
            {/* <Ionicons name={Icon2} size={19} color="#666" style={{marginTop:-90,marginBottom:60,marginLeft:190}} onPress={ChangeIcon2}></Ionicons> */}
            <Ionicons name='ios-lock-closed-outline' size={17} color="#539165" style={styles.icons} />
            <InputField label={'Phone'} keyboardType='numeric' onChangeText={SetPhone} />
            <Ionicons name='call-outline' size={17} color="#539165" style={styles.icons} />
           

          
            <TouchableOpacity onPress={showDatePicker}>
            <TextInput
                    style={styles.input}
                    placeholder="Birth Date "
                    value={date.toLocaleDateString()}
                    onChangeText={(text) => setDate(text)}
                    keyboardType="numeric"
                    editable={false}
                />
            </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginLeft: 10 }}>

            </View>
          </View>
          <Botton label={"Register"} onPress={handleSignUp} />


          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 116, color: '#000', marginTop: -12 }}>Already register?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#000', fontWeight: 700, marginLeft: 10, marginRight: 5, marginBottom: 170, marginTop: -11 }}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',marginLeft:70,marginTop:-150,marginBottom:10}}>
      <TouchOpacity  onPress={()=>{}} Src={Facebook} borderColorr='red' />
          <TouchOpacity Src={Googlee} borderColorr='#fff'   onPress={hangleGoolge}   />
          <TouchOpacity  borderColorr='red' onPress={()=>{}} Src={Twitter} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center"
  },
  icons: {
    marginTop: -80,
    marginLeft: -15,
    marginBottom: 35,
  },
  input: {
    width: '135%',
    padding: 17,
    marginBottom: 13,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: 'red',
    borderWidth: 1,
    textAlign:'center',
    marginLeft:-40,
},
  StyleInput: {
    width: "30%",
    padding: 15,
    textAlign: "center",
    marginLeft: -20,
    marginBottom: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#539165",
    borderWidth: 1,
    flexWrap: 'wrap'
  }

});
