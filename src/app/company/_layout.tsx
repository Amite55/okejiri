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
      <Stack.Screen name="previous_item_Book" />
      <Stack.Screen name="favorites_item" />
      <Stack.Screen name="disputes" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="provider_profile" />
      <Stack.Screen name="messaging" />
      <Stack.Screen name="wallets" />
      <Stack.Screen name="my_booking" />
    </Stack>
  );
};

export default _layout;
