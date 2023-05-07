import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Botton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '80%',
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 50,
        marginTop: 0,
        marginLeft: '10.6%',
        justifyContent:'center',
      }}>
      <Text style={{   color:"white",textAlign:"center"}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}