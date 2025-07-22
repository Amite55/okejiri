import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

import NotificationCard from "@/src/Components/NotificationCard";
import NotificationData from "@/src/json/NotificationData.json";
const Notification = () => {
  // console.log(NotificationData, "-------------------");
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
    >
      <BackTitleButton
        pageName={"Notifications"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
      />

      <View style={tw`gap-3`}>
        {NotificationData.map((item) => {
          return <NotificationCard key={item.id} item={item} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Notification;
