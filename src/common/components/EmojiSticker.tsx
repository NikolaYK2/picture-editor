import { ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// Определяем тип пропсов, которые принимает компонент
type Props = {
  imageSize: number; // Размер изображения
  stickerSource: ImageSourcePropType; // Источник изображения (файл или URL)
};

// Экспортируем функциональный компонент
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  // Создаём анимируемые значения:
  const scaleImage = useSharedValue(imageSize); // Значение для масштаба изображения
  const translateX = useSharedValue(0); // Значение для смещения по оси X
  const translateY = useSharedValue(0); // Значение для смещения по оси Y

  // Определяем жест двойного нажатия
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2) // Указываем, что жест срабатывает при двойном нажатии
    .onStart(() => {
      // Логика увеличения и уменьшения масштаба при двойном нажатии
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2; // Увеличиваем в 2 раза
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2); // Уменьшаем в 2 раза с округлением
      }
    });

  // Создаём анимированный стиль для изображения
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value), // Анимируем ширину
      height: withSpring(scaleImage.value), // Анимируем высоту
    };
  });

  // Определяем жест перетаскивания
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX; // Обновляем положение по оси X
    translateY.value += event.changeY; // Обновляем положение по оси Y
  });

  // Создаём анимированный стиль для контейнера, чтобы применять смещение
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value }, // Смещение по X
        { translateY: translateY.value }, // Смещение по Y
      ],
    };
  });

  return (
    // Оборачиваем в GestureDetector, чтобы добавить поддержку перетаскивания
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        {/* Внутри Animated.View оборачиваем изображение в GestureDetector для обработки двойного нажатия */}
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource} // Источник изображения
            resizeMode="contain" // Устанавливаем режим изменения размера
            style={[
              imageStyle,
              {
                width: imageSize,
                height: imageSize,
              },
            ]} // Применяем анимированные стили
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
