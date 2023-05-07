import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sendPasswordResetEmail } from 'firebase/auth';
import b from '../assets/249.jpg'
import TouchOpacity from '../Components/TouchOpacity';
import Facebook from "../assets/facebook.png";
import Googlee from "../assets/google.png";
import Twitter from "../assets/twitter.png";
import { ScrollView } from 'native-base';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";

export default function Login({ navigation }) {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Icon, SetIcon] = useState('eye-off-outline');
  const [bool, Setbool] = useState(true);

  const auth = getAuth();
  var provider = new GoogleAuthProvider();



  const ChangeIcon = () => {
    if (Icon === 'eye-off-outline') {
      SetIcon('eye-outline')
      Setbool(false)
    }
    else {
      SetIcon('eye-off-outline')
      Setbool(true)

    }
  }


  const handleResetPassword = () => {
    if (Email) {
      sendPasswordResetEmail(auth, Email)
        .then(() => {
          Alert.alert("Password reset email sent.");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    } else {
      Alert.alert("Please enter your email address to reset your password.");
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        Alert.alert("Sign-in Successfully");
        navigation.navigate("Home")
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      })
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
  return (
    <ScrollView>
    <ImageBackground
      source={b}
      style={styles.backgroundImage}
    >

      <View style={styles.inputsContainer}>

        <Text style={{ fontSize: 40, marginTop: 80, fontWeight: 'bold' }}>Hello Again!</Text>
        <Text style={{ fontSize: 30, marginTop: 0 }}>Wellcome back you've</Text>
        <Text style={{ fontSize: 30, marginBottom: 80 }}>been missed!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={bool}

        />
        <View>
          <Ionicons name="ios-lock-closed-outline" size={17} color="#666" style={{ marginTop: -59, marginLeft: -130 }} />
          <Ionicons name="mail-outline" size={17} color="#666" style={{ marginTop: -99, marginLeft: -130 }} />
        </View>
        <Ionicons name={Icon} size={19} color="#666" style={{ marginTop: -57, marginBottom: 40, marginRight: -260 }} onPress={ChangeIcon}></Ionicons>

        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.link1}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonn} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.link}>You Don't Have An Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link0}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',marginLeft:20,marginTop:25,marginBottom:80}}>
      <TouchOpacity  onPress={()=>{}} Src={Facebook} borderColorr='red' />
          <TouchOpacity Src={Googlee} borderColorr='#fff'   onPress={hangleGoolge}   />
          <TouchOpacity  borderColorr='red' onPress={()=>{}} Src={Twitter} />
          </View>

      </View>

    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 425,
  },

  hcontainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
    marginBottom: 130,
    opacity: 0,
  },
  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: -20,
    marginBottom: -20,
  },
  input: {
    width: '80%',
    padding: 19,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: 'red',
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
    marginBottom: 160,
    marginLeft: 274,
    fontSize: 10,

  },
  link: {
    fontWeight: 700,
  },
  link1: {
    fontWeight: 700,
    marginBottom: 33,
    marginRight: -160,
    marginLeft: 50,
  },
  link0: {
    textDecorationLine: 'underline',
    fontWeight: 700,
    marginLeft: 10,
  },
  buttonn: {
    width: '80%',
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 50,
    marginTop: -11,
    marginLeft: 0,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    backgroundColor: 'red',
  },
});