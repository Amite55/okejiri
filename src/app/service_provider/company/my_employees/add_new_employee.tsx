import { IconUploadImage } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

const Add_New_Employee = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"Add employee"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
        // contentStyle={tw`px-5`}
      />

      {/* ------------------ Image upload ------------------ */}

      <Pressable
        style={tw`border-2 border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center   gap-2 `}
      >
        <SvgXml xml={IconUploadImage} />

        <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
          Upload employee image
        </Text>
        <TouchableOpacity
          style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
        >
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-white`}>
            Browse
          </Text>
        </TouchableOpacity>
      </Pressable>
    </ScrollView>
  );
};

export default Add_New_Employee;
