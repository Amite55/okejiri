import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const Dispute_Process = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-28 `}
    >
      <View>
        <BackTitleButton
          pageName={"Previous services"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />
      </View>
    </ScrollView>
  );
};

export default Dispute_Process;
