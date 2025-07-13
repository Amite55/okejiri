import { IconRightArrow } from "@/assets/icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IPrimaryButtonProps {
  contentStyle?: any;
  textStyle?: any;
  titleProps?: string;
  IconProps?: any;
  onPress?: () => void;
}

const PrimaryButton = ({
  contentStyle = "",
  textStyle = "",
  titleProps = "next",
  IconProps,
  onPress,
}: IPrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`w-full h-14 bg-primary rounded-full flex-row justify-center items-center gap-3`,
        contentStyle,
      ]}
    >
      <Text
        style={[
          tw`font-DegularDisplayDemoMedium text-xl text-white text-center`,
          textStyle,
        ]}
      >
        {titleProps}
      </Text>
      <SvgXml xml={IconProps || IconRightArrow} />
    </TouchableOpacity>
  );
};

export default PrimaryButton;
