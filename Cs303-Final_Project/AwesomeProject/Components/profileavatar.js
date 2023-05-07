import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { collection, doc, getDocs, updateDoc, where,query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import no from '../assets/no.png'


const ProfileAvatar = () => {
    const [userData, setUserData] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user);
                getUserData(user.uid);
            }
        });
        return unsubscribe;
    }, []);

    const getUserData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            const userData = doc.data();
            setProfileImage(userData.image);

            setUserData(userData);
        });
    }
    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.canceled) {
          setProfileImage(result.assets[0].uri);
          updateData({ Image: result.assets[0].uri });
        }
      };
      
      

    const updateData = async () => {
        try {
            const userDocRef = doc(db, "users", userData.uid);
            await updateDoc(userDocRef, {
                image: profileImage,
            });
            Alert.alert("Success", "Your data has been updated!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "There was an error updating your data.");
        }
    };

    return (
        <TouchableOpacity onPress={handleImagePicker}>
            <View style={styles.avatarContainer}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.avatar} />
                ) : (
                    <Image source={no} style={styles.avatar} />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholder: {
        color: '#555',
        fontSize: 18,
    },
});

export default ProfileAvatar;
