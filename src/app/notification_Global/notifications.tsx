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
      style={tw`flex-1  bg-base_color px-5 `}
      contentContainerStyle={tw`pb-5`}
    >
      <BackTitleButton
        pageName={"Notifications"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
      />

      <View style={tw`gap-3`}>
        {NotificationData.map((item) => {
          return (
            <NotificationCard
              key={item.id}
              item={item}
              onPress={() => {
                if (item.type === "new_order") {
                  router.push(
                    "/service_provider/individual/order_details_profile"
                  );
                } else if (item.type === "warning") {
                  router.push("/service_provider/individual/warning");
                } else if (item.type === "cancelled") {
                  router.push("/service_provider/individual/booking_cancel");
                } else if (item.type === "new_dispute") {
                  router.push(
                    "/service_provider/individual/disputes/dispute_review"
                  );
                } else if (item.type === "KYC_complete") {
                  router.push("/KYC_auth/id_card");
                }
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Notification;
