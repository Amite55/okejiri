import { Stack } from "expo-router";
import React from "react";

const KYC_Layout = () => {
  return (
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
  );
};

export default KYC_Layout;
