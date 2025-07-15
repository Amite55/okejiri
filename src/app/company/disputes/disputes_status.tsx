import { IconDeleteWhite } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Disputes_Status = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-6 justify-between flex-1 flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Dispute status"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />

        <View style={tw`justify-center items-center`}>
          <View
            style={tw`flex-row justify-center items-center h-14 w-36 gap-2 rounded-full bg-violet`}
          >
            <View style={tw`w-2 h-2 rounded-full bg-white`} />
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white`}>
              Pending
            </Text>
          </View>
        </View>
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        // onPress={() => router.push("/company/(Tabs)")}
        titleProps="Delete dispute"
        IconProps={IconDeleteWhite}
        contentStyle={tw`mt-4`}
      />
    </ScrollView>
  );
};

export default Disputes_Status;
