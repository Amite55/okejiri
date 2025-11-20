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
      <Stack.Screen name="make_payment" />
      <Stack.Screen name="order_approved" />
      <Stack.Screen name="order_cancelled" />
    </Stack>
  );
};

export default ServiceLayout;
