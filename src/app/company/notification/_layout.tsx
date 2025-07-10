import { Stack } from "expo-router";
import React from "react";

const NotificationLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default NotificationLayout;
