import { ImgTermsAndCondition } from "@/assets/images/image";
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
  View,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";

const Terms_And_Condition = () => {
  const { data, isLoading, isError } = useGetPagesQuery("Terms %26 Conditions");
  const { width } = useWindowDimensions();

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (isError || !data?.data?.text) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500 text-lg`}>
          Failed to load Terms & Conditions
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      <View style={tw`justify-center items-center -mt-10`}>
        <Image source={ImgTermsAndCondition} />
      </View>

      <View style={tw`justify-center items-center mb-6`}>
        <View
          style={tw`w-full h-16 justify-center items-center bg-white rounded-full`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            Terms & Conditions
          </Text>
        </View>
      </View>

      {/* ✅ Render backend HTML here */}
      <RenderHtml contentWidth={width} source={{ html: data?.data?.text }} />
    </ScrollView>
  );
};

export default Terms_And_Condition;
