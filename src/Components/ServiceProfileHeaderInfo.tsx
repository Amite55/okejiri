import { IconLocation, IconNotificationDark } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const ServiceProfileHeaderInfo = () => {
  return (
    <View style={tw`py-3 flex-row items-center justify-between `}>
      <Pressable
        onPress={() => router.push("/company/profile")}
        style={tw`flex-row justify-start items-center  gap-4`}
      >
        <View style={tw` `}>
          <Image style={tw`w-16 h-16 rounded-full `} source={ImgProfileImg} />
        </View>
        <View>
          <View style={tw` items-start gap-2`}>
            <Text
              style={tw`font-DegularDisplayDemoBold flex-row items-center text-black text-2xl`}
            >
              John Doe,
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
        </View>
      </Pressable>

      <TouchableOpacity
        onPress={() => router.push("/company/notification")}
        style={tw`w-18 h-16 p-3 text-center bg-white rounded-3xl justify-center items-center`}
      >
        <SvgXml xml={IconNotificationDark} />
      </TouchableOpacity>
    </View>
  );
};

export default ServiceProfileHeaderInfo;
