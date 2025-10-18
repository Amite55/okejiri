import { ImgTermsAndCondition } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Terms_And_Condition = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
      //   keyboardShouldPersistTaps="handled"
    >
      <BackTitleButton
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />
      <View style={tw`justify-center items-center -mt-10`}>
        <Image source={ImgTermsAndCondition} />
      </View>
      <View style={tw`justify-center items-center`}>
        <View
          style={tw`w-full h-16 justify-center items-center bg-white rounded-full`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            About us
          </Text>
        </View>
      </View>

      <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black mt-11`}>
        Lorem ipsum dolor sit amet consectetur. Blandit elementum eu nisi sed
        turpis pellentesque sagittis. Risus consequat orci risus risus tincidunt
        eget nunc aliquam. Et phasellus nisl donec eget erat tincidunt sem.
        Vitae et morbi amet tempus eleifend consectetur cursus quam enim.{" "}
      </Text>
      <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black mt-8`}>
        Lorem ipsum dolor sit amet consectetur. Blandit elementum eu nisi sed
        turpis pellentesque sagittis. Risus consequat orci risus risus tincidunt
        eget nunc aliquam. Et phasellus nisl donec eget erat tincidunt sem.
        Vitae et morbi amet tempus eleifend consectetur cursus quam enim.{" "}
      </Text>
    </ScrollView>
  );
};

export default Terms_And_Condition;
