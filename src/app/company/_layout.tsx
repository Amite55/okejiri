import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Stack.Screen name="(Tabs)" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="serviceNearbyHistory" />
      <Stack.Screen name="bookingsHistory" />
      <Stack.Screen name="serviceDetails" />
      <Stack.Screen name="serviceBookings" />
      <Stack.Screen name="dispute_process" />
    </Stack>
  );
};

export default _layout;
