import {
  IconChangePasskey,
  IconEditPenBlack,
  IconFAQ,
  IconGetterThen,
  IconTermsAndCondition,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Setting_Index = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-24`}
    >
      <BackTitleButton
        pageName={"Settings"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
      />
      <View style={tw`gap-3 my-2`}>
        {/* ---------------------- Edit profile -=--------------- */}
        <Pressable
          onPress={() =>
            router.push("/service_provider/individual/settings/edit_profile")
          }
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconEditPenBlack} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Edit profile
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        {/* ----------------------FAQ-=--------------- */}
        <Pressable
          onPress={() =>
            router.push("/service_provider/individual/settings/FAQ")
          }
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconFAQ} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>FAQ</Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        {/* ---------------------- About us -=--------------- */}
        <Pressable
          onPress={() =>
            router.push("/service_provider/individual/settings/about")
          }
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconFAQ} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              About us
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        {/* ---------------------- terms and condition  -=--------------- */}
        <Pressable
          onPress={() =>
            router.push(
              "/service_provider/individual/settings/terms_and_condition"
            )
          }
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconTermsAndCondition} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Terms & conditions
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        {/* ---------------------- Edit profile -=--------------- */}
        <Pressable
          onPress={() => router.push("/auth/change_pass")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconChangePasskey} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Change password
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Setting_Index;
