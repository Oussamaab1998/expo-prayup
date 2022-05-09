import { Dimensions, PixelRatio, Platform } from "react-native";
import { isIphoneX } from "./IsIphoneX";
let { height, width } = Dimensions.get("window");

Dimensions.addEventListener("change", ({ window, screen }) => {
  height = window.height;
  width = window.width;
});

height -= Platform.OS == "ios" ? (isIphoneX() ? 70 : 20) : 24;

const scale = height / 812;

const normalize = (size) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize + 0.5));
};

const VerticalSize = (size = 812) => (size / 812) * height;
const HorizontalSize = (size = 375) => (size / 375) * width;

export default {
  Radius: VerticalSize(20),
  LightRadius: VerticalSize(6),
  ActiveOpacity: 0.7,
  customFontSize: normalize,
  FontRegular: normalize(16),
  FontExtraSmall: normalize(12),
  FontSmall: normalize(14),
  FontMedium: normalize(18),
  FontLarge: normalize(22),
  FontExtraLarge: normalize(24),
  VerticalSize,
  HorizontalSize,
};
