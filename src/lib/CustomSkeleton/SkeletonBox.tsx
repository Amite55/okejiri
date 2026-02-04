import { Animated, ViewStyle } from "react-native";
import { useSkeletonAnimation } from "./useSkeletonAnimation";

type Width = number | `${number}%`;

type Props = {
  width?: Width;
  height?: number;
  radius?: number;
  style?: ViewStyle;
};

export default function SkeletonBox({
  width = "100%",
  height = 16,
  radius = 8,
  style,
}: Props) {
  const opacity = useSkeletonAnimation();

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: "#E5E7EB",
          opacity,
        },
        style,
      ]}
    />
  );
}
