import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {ImageViewer} from "common/components/ImageViewer";
import {ButtonCustom} from "common/components/ButtonCustom";
import {Entypo} from "@expo/vector-icons";

const PlaceholderImage = require('assets/images/background-image.png');

export default function App() {


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer image={PlaceholderImage}/>
      </View>
      <View style={styles.footerContainer}>
        <ButtonCustom name={'Choose a photo'} style={styles.bcButton} callback={() => alert('hi')}>
          <Entypo name="images" size={24} color="black" style={styles.buttonIcon}/>
        </ButtonCustom>
        <ButtonCustom  name={'Use this photo'} callback={() => alert('hi')}/>
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
    color:"#000",
  },
});
