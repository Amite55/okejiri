import { IconWaringRed, IconWaringRound } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Warning = () => {
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
        titleTextStyle={tw`text-2xl`}
      />
      <View style={tw`justify-center items-center gap-1 mt-4`}>
        <SvgXml xml={IconWaringRed} />
        <View style={tw`flex-row items-center justify-center gap-2`}>
          <SvgXml xml={IconWaringRound} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Sexual content
          </Text>
        </View>
      </View>

      <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black mt-8 `}>
        Lorem ipsum dolor sit amet consectetur. Et iaculis suspendisse at
        tortor. Leo massa ut mus vitae facilisis quis vestibulum. Urna nec
        pretium imperdiet duis ut amet iaculis amet. Egestas non tempus et nulla
        est eu elementum vestibulum et. Tristique bibendum sagittis habitasse
        pulvinar egestas tristique nunc eu. Felis lacus morbi sagittis enim
        metus amet tincidunt sed malesuada. Tristique a id blandit nullam
        scelerisque lobortis facilisi in. Pharetra ullamcorper placerat lacus
        lectus fermentum facilisi tempor urna. Pellentesque volutpat ultrices
        nibh blandit vitae odio blandit massa ut. Turpis commodo etiam mi
        pretium pretium quis ultrices facilisis. Aliquet egestas arcu a volutpat
        cras id.
      </Text>
    </ScrollView>
  );
};

export default Warning;
