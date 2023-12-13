import React, {ReactNode} from 'react';
import {Pressable, View, StyleSheet} from "react-native";


type Props = {
  children: ReactNode,
  callback:()=>void
}
export const ButtonCustom = ({children,callback}: Props) => {


  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={callback}>
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
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
