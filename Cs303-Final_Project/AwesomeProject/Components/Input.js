import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function InputField({
  label,
  icon,
  r,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
  style,variant
}) {
  return (
    <>
   
      <View
        style={{
          flexDirection: "row",
          marginBottom: 25,
        }}
      >
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
            {fieldButtonLabel}
          </Text>
        </TouchableOpacity>
        
        {inputType == "password" ? (
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            style={styles.StyleInput}
            secureTextEntry={r}
            value={value}
            onChangeText={onChangeText}
          />
        ) : (
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            style={styles.StyleInput}
            value={value}
            onChangeText={onChangeText}
            
          />
        )}

{icon}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  StyleInput: {
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
});
