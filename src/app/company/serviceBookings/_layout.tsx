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
      <Stack.Screen name="billing_details" />
      <Stack.Screen name="booking_confirmation" />
    </Stack>
  );
};

export default ServiceLayout;
