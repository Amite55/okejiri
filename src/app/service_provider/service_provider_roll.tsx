import {
  IconMultipleUser,
  IconRightCornerArrow,
  IconUser,
} from "@/assets/icons";
import { ImgLogo, ImgServiceProviderRoll } from "@/assets/images/image";
import tw from "@/src/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ServiceProviderRoll = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
    >
      <View style={tw`justify-center items-center mb-28 gap-14`}>
        <Image style={tw`w-44 h-12 mt-12`} source={ImgLogo} />
        <Image source={ImgServiceProviderRoll} />
      </View>

      <View>
        <Text
          style={tw`font-PoppinsRegular text-black text-lg text-center mb-4 px-1`}
        >
          What type of service provider you are ?
        </Text>
        <Text
          style={tw`font-PoppinsRegular text-black text-lg text-center px-1`}
        >
          Choose a type of provider that suits best with you.
        </Text>

        <TouchableOpacity
          // onPress={() => router.push("/auth/login")}
          onPress={() => {
            AsyncStorage.setItem("roll", "service_provider");
            router.push("/auth/login");
          }}
          style={tw`bg-white w-full rounded-3xl mt-10 p-2 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row items-center gap-5`}>
            <View
              style={tw`bg-primary rounded-3xl w-16 h-16 justify-center items-center`}
            >
              <SvgXml xml={IconUser} />
            </View>
            <Text style={tw`font-medium text-xl text-black`}>Individual</Text>
          </View>
          <View style={tw`pr-4`}>
            <SvgXml xml={IconRightCornerArrow} />
          </View>
        </TouchableOpacity>
        {/* ------------------------------ service provider with company  ---------------------------- */}
        <TouchableOpacity
          // onPress={() => router.push("/auth/login")}
          onPress={() => {
            AsyncStorage.setItem("roll", "company_provider");
            router.push("/auth/login");
          }}
          style={tw`bg-white w-full rounded-3xl p-2 flex-row justify-between items-center mt-3`}
        >
          <View style={tw`flex-row items-center gap-5`}>
            <View
              style={tw`bg-primary rounded-3xl w-16 h-16 justify-center items-center`}
            >
              <SvgXml xml={IconMultipleUser} />
            </View>
            <Text style={tw`font-medium text-xl text-black`}>Company</Text>
          </View>
          <View style={tw`pr-4`}>
            <SvgXml xml={IconRightCornerArrow} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ServiceProviderRoll;
