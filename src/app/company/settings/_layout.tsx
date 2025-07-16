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
      <Stack.Screen name="setting" />
      <Stack.Screen name="edit_profile" />
      <Stack.Screen name="FAQ" />
      <Stack.Screen name="about" />
    </Stack>
  );
};

export default _layout;
