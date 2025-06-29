import React, { useRef, useState } from "react";
import { ImageSourcePropType, Platform, StyleSheet, View } from "react-native";
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
import domtoimage from "dom-to-image";

// Placeholder image для начального состояния
const PlaceholderImage = require("assets/images/background-image.png");

export const ImageEdit = () => {
  // URI выбранного изображения из галереи, null если не выбрано
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Показывать основные кнопки («Reset», «Add Sticker», «Save»)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(true);
  // Модалка выбора стикера отображается?
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // Выбранный стикер (Emoji), передаётся в EmojiSticker
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  // Работа с разрешениями на доступ к медиатеке (Android / iOS)
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // Ref для снимка экрана
  const imageRef = useRef<View>(null);
  // Открыть галерею и выбрать изображение
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true, // позволяет обрезать картинку
      quality: 1, // максимальное качество
    });

    if (!result.canceled) {
      // Сохраняем uri выбранного изображения
      setSelectedImage(result.assets[0].uri);
      // Показываем кнопки для работы с изображением
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };
  // Сбросить выбор изображения и скрыть опции
  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(null);
    setPickedEmoji(undefined);
  };
  // Показать модальное окно выбора Emoji
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  // Закрыть модалку выбора Emoji
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  // Сохранить текущее состояние View (изображение + стикеры) в медиатеку
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        // Захватываем снимок экрана (View с imageRef)
        const localUri = await captureRef(imageRef, {
          height: 440, // высота скрина
          quality: 1, // качество
        });
        // Сохраняем изображение в медиатеку устройства
        await MediaLibrary.saveToLibraryAsync(localUri);
        alert("Saved!");
      } catch (e) {
        console.error(e);
        alert("Failed to save image.");
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };
  // Если нет статуса разрешений, запрашиваем
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

      {/* Опции: Reset, Add Sticker, Save */}
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
