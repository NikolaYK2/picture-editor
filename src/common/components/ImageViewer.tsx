import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
  image: ImageSourcePropType;
  selectedImage: string | null;
};
export const ImageViewer = ({ image, selectedImage }: Props) => {
  const imageSource = selectedImage ? { uri: selectedImage } : image;

  return <Image style={styles.image} source={imageSource} contentFit={"cover"} />;
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
    width: "100%",
    height: "100%",
  },
});
