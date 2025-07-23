import {
  IconDate,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IProps {
  ProfileName?: string;
  Description?: string;
  Date?: string;
  onPress?: () => void;
  isProfileBadge?: boolean;
}

const UserCard = ({
  ProfileName,
  Description,
  Date,
  onPress,
  isProfileBadge,
}: IProps) => {
  return (
    <Pressable
      // onPress={() =>
      //   router.push("/service_provider/individual/order_details_profile")
      // }
      style={tw`h-32 px-5 rounded-2xl bg-white flex-row justify-between items-center`}
    >
      <View style={tw`flex-row items-center gap-3`}>
        <Image style={tw`w-16 h-16 rounded-full `} source={ImgProfileImg} />
        <View style={tw`gap-1.5`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              {ProfileName}
            </Text>
            {isProfileBadge ? <SvgXml xml={IconProfileBadge} /> : null}
          </View>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            {Description}
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconDate} />
            <Text>{Date}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-12 h-12 rounded-2xl border border-primary justify-center items-center `}
      >
        <SvgXml xml={IconRightArrowCornerPrimaryColor} />
      </TouchableOpacity>
    </Pressable>
  );
};

export default UserCard;
