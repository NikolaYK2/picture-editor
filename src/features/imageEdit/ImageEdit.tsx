import React, { useRef, useState } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { ImageViewer } from "common/components/ImageViewer";
import { ButtonCustom } from "common/components/ButtonCustom";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CircleButton from "common/components/CircleButton";
import IconButton from "common/components/IconButton";
import EmojiPicker from "common/components/EmojiPicker";
import EmojiList from "common/components/EmojiList";
import EmojiSticker from "common/components/EmojiSticker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("assets/images/background-image.png");

export const ImageEdit = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); //для сохранения состояния изображения
  const [showAppOptions, setShowAppOptions] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef<View>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true, //можно обрезать изображение при установке на телефонах, но не в web
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); //save image in value selectedImage
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (status === null) {
    requestPermission();
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false} style={{ height: "100%" }}>
          <ImageViewer image={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <ButtonCustom
            name={"Choose a photo"}
            styleBtn={styles.bcButton}
            styleText={styles.textBtn}
            callback={pickImageAsync}
          >
            <Entypo name="images" size={24} color="black" style={styles.buttonIcon} />
          </ButtonCustom>

          <ButtonCustom name={"Use this photo"} callback={() => setShowAppOptions(true)} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onCloseModal={onModalClose} onSelect={setPickedEmoji} />
      </EmojiPicker>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    height: "80%",
    width: 320,
    marginBottom: 30,
  },
  footerContainer: {
    alignItems: "center",
    bottom: 50,
  },
  buttonIcon: {
    paddingRight: 8,
  },

  bcButton: {
    backgroundColor: "#98b4d9",
  },
  textBtn: {
    color: "#000",
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
