import {
  IconRightCornerArrow,
  IconServiceProvider,
  IconUser,
} from "@/assets/icons";
import { ImgChoseRoll, ImgLogo } from "@/assets/images/image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const chose_roll = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
    >
      <View style={tw`flex-1 justify-center items-center mt-4`}>
        <Image style={tw`w-44 h-12`} source={ImgLogo} />
        <Image style={tw`px-11 mt-3`} source={ImgChoseRoll} />
        <View style={tw`flex-1 justify-center items-center gap-3 my-3`}>
          <Text
            style={tw`flex-1 font-PoppinsMedium text-3xl text-black text-center`}
          >
            Choose your role
          </Text>
          <Text
            style={tw` flex-1 font-PoppinsRegular text-lg text-black text-center`}
          >
            Book trusted services as a User, or list and manage your offerings
            as a Service Provider on Okejiri.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem("roll", "user");
            router.push("/auth/login");
          }}
          style={tw`bg-white w-full rounded-3xl mt-4 p-2 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row items-center gap-5`}>
            <View
              style={tw`bg-primary rounded-3xl w-16 h-16 justify-center items-center`}
            >
              <SvgXml xml={IconUser} />
            </View>
            <Text style={tw`font-medium text-xl text-black`}>Service User</Text>
          </View>
          <View style={tw`pr-4`}>
            <SvgXml xml={IconRightCornerArrow} />
          </View>
        </TouchableOpacity>
        {/* ------------------------------ service provider ---------------------------- */}
        <TouchableOpacity
          onPress={() => {
            router.push("/service_provider/service_provider_roll");
          }}
          style={tw`bg-white w-full rounded-3xl p-2 flex-row justify-between items-center mt-3`}
        >
          <View style={tw`flex-row items-center gap-5`}>
            <View
              style={tw`bg-primary rounded-3xl w-16 h-16 justify-center items-center`}
            >
              <SvgXml xml={IconServiceProvider} />
            </View>
            <Text style={tw`font-medium text-xl text-black`}>
              Service provider
            </Text>
          </View>
          <View style={tw`pr-4`}>
            <SvgXml xml={IconRightCornerArrow} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default chose_roll;
