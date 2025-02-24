import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ImageViewer } from "common/components/ImageViewer";
import { ButtonCustom } from "common/components/ButtonCustom";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const PlaceholderImage = require("assets/images/background-image.png");

export const ImageEdit = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); //для сохранения состояния изображения

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, //можно обрезать изображение при установке на телефонах, но не в web
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); //save image in value selectedImage
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <ImageViewer image={PlaceholderImage} selectedImage={selectedImage} />
      </View>

      <View style={styles.footerContainer}>
        <ButtonCustom name={"Choose a photo"} style={styles.bcButton} callback={pickImageAsync}>
          <Entypo name="images" size={24} color="black" style={styles.buttonIcon} />
        </ButtonCustom>

        <ButtonCustom name={"Use this photo"} callback={() => alert("hi")} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  buttonIcon: {
    paddingRight: 8,
  },

  bcButton: {
    backgroundColor: "#98b4d9",
    color: "#000",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
