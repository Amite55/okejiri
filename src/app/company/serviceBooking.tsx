import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const ServiceBooking = () => {
  return (
    <View>
      <BackTitleButton pageName={"Booking"} onPress={() => router.back()} />
    </View>
  );
};

export default ServiceBooking;
