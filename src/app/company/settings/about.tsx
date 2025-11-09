import { ImgAbout_Us } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetPagesQuery } from "@/src/redux/apiSlices/userProvider/account/settingsSlices";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";

const About_Us = () => {
  const { width } = useWindowDimensions();
  const { data, isLoading, isError } = useGetPagesQuery("About Us");

  const aboutContent = data?.data?.text || "";

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base_color`}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={tw`mt-3 text-lg text-black`}>Loading About Us...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base_color`}>
        <Text style={tw`text-lg text-red-600`}>Failed to load About Us 😔</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      <View style={tw`justify-center items-center -mt-10`}>
        <Image source={ImgAbout_Us} />
      </View>

      <View style={tw`justify-center items-center`}>
        <View
          style={tw`w-full h-16 justify-center items-center bg-white rounded-full`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            About Us
          </Text>
        </View>
      </View>

      {/* ---------- Dynamic About Us Content ---------- */}
      <View style={tw`mt-10`}>
        <RenderHTML
          contentWidth={width}
          source={{ html: aboutContent }}
          baseStyle={{
            fontFamily: "PoppinsRegular",
            fontSize: 16,
            color: "#000",
            lineHeight: 24,
            textAlign: "justify",
          }}
        />
      </View>
    </ScrollView>
  );
};

export default About_Us;
