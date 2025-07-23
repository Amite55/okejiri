import { IconRightArrowCornerPrimaryColor } from "@/assets/icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IProps {
  Icon?: any;
  SeeMorePathPress?: () => void;
  FastTitle?: string;
  IconTitle?: string;
}

const ShortDataTitle = ({
  SeeMorePathPress,
  Icon,
  IconTitle,
  FastTitle,
}: IProps) => {
  return (
    <View style={tw`flex-row justify-between items-center mt-6 `}>
      <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}>
        {FastTitle}
      </Text>
      <TouchableOpacity
        onPress={SeeMorePathPress}
        style={tw`border border-primary rounded-full w-28 h-11 flex-row justify-between items-center px-4`}
      >
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}>
          {IconTitle}
        </Text>
        <SvgXml xml={Icon || IconRightArrowCornerPrimaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default ShortDataTitle;
