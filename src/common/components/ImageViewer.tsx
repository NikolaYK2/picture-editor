import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from "react-native";


type Props = {
  image: ImageSourcePropType,
  selectedImage: string | null
}
export const ImageViewer = ({image, selectedImage}: Props) => {

  const imageSource = selectedImage ? {uri: selectedImage} : image

  return (
    <Image style={styles.image} source={imageSource}/>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
