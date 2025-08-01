import { IconBackLeftArrow } from "@/assets/icons";
import React, { JSX } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface IProps {
  onPress?: () => void;
  pageName?: string;
  titleTextStyle?: any;
  contentStyle?: any;
}

const BackTitleButton = ({
  onPress,
  pageName,
  titleTextStyle = "",
  contentStyle = "",
}: IProps): JSX.Element => {
  return (
    <View
      style={[tw`flex-row justify-between items-center py-2`, contentStyle]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-14 h-14 bg-white rounded-full justify-center items-center`}
      >
        <SvgXml xml={IconBackLeftArrow} />
      </TouchableOpacity>
      <Text style={[tw`font-medium text-base text-black`, titleTextStyle]}>
        {pageName}
      </Text>
      <Text style={tw`pl-6`}> </Text>
    </View>
  );
};

export default BackTitleButton;
