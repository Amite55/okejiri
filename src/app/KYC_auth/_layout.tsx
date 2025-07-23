import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const KYC_Layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="id_card" />
        <Stack.Screen name="take_selfie" />
        <Stack.Screen name="KYC_confirmation" />
        <Stack.Screen name="success_screen" />
      </Stack>
    </View>
  );
};

export default KYC_Layout;
