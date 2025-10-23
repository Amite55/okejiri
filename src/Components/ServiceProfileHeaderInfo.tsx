import { IconLocation, IconNotificationDark } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import { useProfileQuery } from "../redux/apiSlices/authSlices";

interface IProps {
  onPress?: () => void;
  onPressNotification?: () => void;
}

const ServiceProfileHeaderInfo = ({ onPress, onPressNotification }: IProps) => {
  // ================== api end point ==================
  const { data: userProfileInfo, isLoading, error } = useProfileQuery({});
  console.log(userProfileInfo?.data?.address, "this is get profile");
  console.log(userProfileInfo?.data?.name, "this is get profile");
  return (
    <View
      style={tw`py-3 flex-1 bg-base_color flex-row items-center justify-between `}
    >
      <Pressable
        onPress={onPress}
        style={tw`flex-row justify-start items-center  gap-4`}
      >
        <View style={tw` `}>
          <Image style={tw`w-16 h-16 rounded-full `} source={ImgProfileImg} />
        </View>

        <View style={tw` items-start gap-1`}>
          <Text
            style={tw`font-DegularDisplayDemoSemibold flex-row items-center text-black text-xl`}
          >
            {userProfileInfo?.data?.name}
          </Text>
          <View style={tw`flex-row justify-start items-center gap-1`}>
            <SvgXml xml={IconLocation} />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-base text-black`}
            >
              Dhaka, Bangladesh
            </Text>
          </View>
        </View>
      </Pressable>

      <TouchableOpacity
        onPress={onPressNotification}
        style={tw`w-14 h-14 p-3 text-center bg-white rounded-3xl justify-center items-center`}
      >
        <SvgXml xml={IconNotificationDark} />
        {/* <SvgXml xml={IconNotificationDark} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default ServiceProfileHeaderInfo;
