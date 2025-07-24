import {
  IconAboutBlack,
  IconChangePasskey,
  IconEditPenBlack,
  IconFAQ,
  IconTermsAndCondition,
} from "@/assets/icons";
import SettingsCard from "@/src/Components/SettingsCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

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

        <SettingsCard
          title=" Edit profile"
          onPress={() => router.push("/company/settings/edit_profile")}
          fastIcon={IconEditPenBlack}
        />

        {/* ----------------------FAQ-=--------------- */}
        <SettingsCard
          title="FAQ"
          onPress={() => router.push("/company/settings/FAQ")}
          fastIcon={IconFAQ}
        />

        {/* ---------------------- About us -=--------------- */}
        <SettingsCard
          title="About us"
          onPress={() => router.push("/company/settings/about")}
          fastIcon={IconAboutBlack}
        />

        {/* ---------------------- terms and condition  -=--------------- */}

        <SettingsCard
          title="Terms & conditions"
          onPress={() => router.push("/company/settings/terms_and_condition")}
          fastIcon={IconTermsAndCondition}
        />

        {/* ---------------------- Edit profile -=--------------- */}
        <SettingsCard
          title="Change password"
          onPress={() => router.push("/auth/change_pass")}
          fastIcon={IconChangePasskey}
        />
      </View>
    </ScrollView>
  );
};

export default Setting_Index;
