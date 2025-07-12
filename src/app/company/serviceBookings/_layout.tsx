import { Stack } from "expo-router";
import React from "react";

const ServiceLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Stack.Screen name="serviceBooking" />
    </Stack>
  );
};

export default ServiceLayout;
