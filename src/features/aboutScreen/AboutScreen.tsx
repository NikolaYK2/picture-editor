import React from 'react';
import {View, StyleSheet, Text} from "react-native";

export default function AboutScreen() {
  return (
    <View>
      <Text style={styles.text}>About screen</Text>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});