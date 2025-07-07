import { IconBackLeftArrow } from "@/assets/icons";
import React, { JSX } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

const BackTitleButton = ({ onPress, pageName }): JSX.Element => {
  return (
    <View style={tw`flex-row justify-between items-center my-2`}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-14 h-14 bg-white rounded-full justify-center items-center`}
      >
        <SvgXml xml={IconBackLeftArrow} />
      </TouchableOpacity>
      <Text style={tw`font-medium text-base text-black`}>{pageName}</Text>
      <Text style={tw`pl-6`}> </Text>
    </View>
  );
};

export default BackTitleButton;
