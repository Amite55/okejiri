import { Stack } from "expo-router";
import React from "react";

const Previous_Book_Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="previous_booking_confirmation" />
    </Stack>
  );
};

export default Previous_Book_Layout;
