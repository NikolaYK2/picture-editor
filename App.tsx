import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Text} from 'react-native';
import {ImageViewer} from "@/common/components/ImageViewer";
import {ButtonCustom} from "@/common/components/ButtonCustom";

const PlaceholderImage = require('src/assets/images/background-image.png');

export default function App() {


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer image={PlaceholderImage}/>
      </View>

      <ButtonCustom callback={()=>alert('hi')}>
        <Text style={{color:'#fff', fontSize:16}}>add</Text>
      </ButtonCustom>
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
});
