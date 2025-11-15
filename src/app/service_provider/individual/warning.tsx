import { IconWaringRed, IconWaringRound } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Warning = () => {
  const {title, subtitle} = useLocalSearchParams();



  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"Warning details"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />
      <View style={tw`justify-center items-center gap-4 mt-4`}>
        <SvgXml xml={IconWaringRed} />
        <View style={tw`flex-row items-center justify-center gap-2`}>
          <SvgXml xml={IconWaringRound} />
          {/* <View style={tw`py-2`}> */}
            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black w-[90%] text-center`}>
            {title}
          </Text>
          {/* </View> */}
          
        </View>
      </View>

      <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black mt-8 `}>
        {subtitle}
      </Text>
    </ScrollView>
  );
};

export default Warning;
