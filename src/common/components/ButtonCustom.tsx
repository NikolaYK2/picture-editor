import React, {ReactNode} from 'react';
import {Pressable, View, StyleSheet, Text} from "react-native";


type Props = {
  name?:string,
  style?: any,
  children?: ReactNode,
  callback: () => void
}
export const ButtonCustom = ({children, callback, name, style}: Props) => {


  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[styles.button, style]} onPress={callback}>
        <Text style={[styles.buttonLabel, style]}>{name}</Text>
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },

  buttonLabel: {
    color: '#98b4d9',
    fontSize: 16,
  },
});
