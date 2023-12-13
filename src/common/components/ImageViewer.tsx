import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from "react-native";


type Props = {
  image: ImageSourcePropType
}
export const ImageViewer = ({image}:Props) => {
  return (
      <Image style={styles.image} source={image}/>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
