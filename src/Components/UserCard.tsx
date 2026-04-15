import {
  IconDate,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
} from "@/assets/icons";
import { ImgportfolioFive } from "@/assets/images/image";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IProps {
  ProfileName?: string;
  Description?: string;
  Date?: string;
  onPress?: () => void;
  isProfileBadge?: boolean;
  ImgProfileImg?: string;
}

const UserCard = ({
  ProfileName,
  Description,
  Date,
  onPress,
  isProfileBadge,
  ImgProfileImg,
}: IProps) => {
  return (
    <View
      style={tw`min-h-28 px-3 py-3 rounded-2xl bg-white flex-row items-center gap-3`}
    >
      {/* fixed size image */}
      <Image
        style={tw`w-16 h-16 rounded-full shrink-0`}
        source={ImgProfileImg}
        contentFit="cover"
        placeholder={ImgportfolioFive}
      />

      {/* text block — flex-1 so it takes remaining space */}
      <View style={tw`flex-1 gap-1.5`}>
        <View style={tw`flex-row items-center gap-2`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`flex-1 font-DegularDisplayDemoMedium text-xl text-black`}
          >
            {ProfileName}
          </Text>
          {isProfileBadge ? <SvgXml xml={IconProfileBadge} /> : null}
        </View>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
        >
          {Description}
        </Text>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconDate} />
          <Text style={tw`text-sm`}>{Date}</Text>
        </View>
      </View>

      {/* fixed size button */}
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-12 h-12 shrink-0 rounded-2xl border border-primary justify-center items-center`}
      >
        <SvgXml xml={IconRightArrowCornerPrimaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default UserCard;
