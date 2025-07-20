import { Stack } from "expo-router";
import React from "react";

const Individual_Layout = () => {
  return (
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
    </Stack>
  );
};

export default Individual_Layout;
