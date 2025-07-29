import { ImgexpoModalUserHome } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const ExpoModalUserHome = () => {
  return (
    <Pressable
      onPress={() => router.back()}
      style={tw`flex-1 justify-center items-center bg-black bg-opacity-15`}
    >
      <View style={tw`bg-white  rounded-2xl h-7/12 p-4 mx-4`}>
        <View style={tw`justify-center items-center`}>
          <Image source={ImgexpoModalUserHome} />
        </View>
        <Text
          style={tw`font-DegularDisplayDemoRegular text-2xl text-black text-center`}
        >
          Complete your kyc to access all the features of this app
        </Text>

        <View>
          <PrimaryButton
            onPress={() => router.back()}
            textStyle={tw`font-DegularDisplayDemoMedium text-xl text-success600 `}
            contentStyle={tw`bg-transparent border border-gray-300 mt-3 `}
            titleProps="Skip for now"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ExpoModalUserHome;
