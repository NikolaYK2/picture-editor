import { StyleSheet, View } from "react-native";
import { ImageEdit } from "features/imageEdit";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageEdit />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
