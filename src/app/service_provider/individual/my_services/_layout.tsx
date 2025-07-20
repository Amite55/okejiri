import { Stack } from "expo-router";
import React from "react";

const My_Services_Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Stack.Screen name="my_service" />
      <Stack.Screen name="add_package" />
      <Stack.Screen name="edit_package" />
      <Stack.Screen name="delivery_extension" />
    </Stack>
  );
};

export default My_Services_Layout;
