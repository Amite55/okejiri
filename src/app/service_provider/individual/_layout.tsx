import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const Individual_Layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(Tabs)" />
        <Stack.Screen name="order_details_profile" />
        <Stack.Screen name="individual_user_wallet" />
        <Stack.Screen name="manage_discounts" />
        <Stack.Screen name="portfolio" />
        <Stack.Screen name="disputes" />
      </Stack>
    </View>
  );
};

export default Individual_Layout;
