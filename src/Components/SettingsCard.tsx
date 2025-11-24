import { IconGetterThen } from "@/assets/icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface ISettingsProps {
  onPress?: () => void;
  title?: string;
  fastIcon?: any;
  lastIcon?: any;
  textStyle?: any;
  contentStyle?: any;
}

const SettingsCard = ({
  onPress,
  title,
  fastIcon,
  lastIcon,
  textStyle = "",
  contentStyle = "",
}: ISettingsProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`,
        contentStyle,
      ]}
    >
      <View style={tw`flex-row items-center gap-3`}>
        <SvgXml xml={fastIcon || null} />
        <Text style={[tw`font-DegularDisplayDemoRegular text-xl  `, textStyle]}>
          {title}
        </Text>
      </View>
      <SvgXml xml={lastIcon || IconGetterThen} />
    </TouchableOpacity>
  );
};

export default SettingsCard;
