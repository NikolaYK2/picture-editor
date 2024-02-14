import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {ImageViewer} from "common/components/ImageViewer";
import {ButtonCustom} from "common/components/ButtonCustom";
import {Entypo} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import {useState} from "react";

const PlaceholderImage = require('assets/images/background-image.png');

export default function App() {

  const [selectedImage, setSelectedImage] = useState<string | null>(null) //для сохранения состояния изображения

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, //можно обрезать изображение при установке на телефонах, но не в web
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri) //save image in value selectedImage
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <ImageViewer image={PlaceholderImage} selectedImage={selectedImage}/>
      </View>

      <View style={styles.footerContainer}>

        <ButtonCustom name={'Choose a photo'} style={styles.bcButton} callback={pickImageAsync}>
          <Entypo name="images" size={24} color="black" style={styles.buttonIcon}/>
        </ButtonCustom>

        <ButtonCustom name={'Use this photo'} callback={() => alert('hi')}/>

      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1d1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  bcButton: {
    backgroundColor: "#98b4d9",
    color: "#000",
  },
});
