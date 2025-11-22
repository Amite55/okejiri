import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const Company_Layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(Tabs)" />
        {/* <Stack.Screen name="company_wallets" /> */}
        <Stack.Screen name="company_services" />
        <Stack.Screen name="my_employees" />
        <Stack.Screen name="order_details_profile" />
      </Stack>
    </View>
  );
};

export default Company_Layout;
