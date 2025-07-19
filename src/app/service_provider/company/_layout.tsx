import { Stack } from "expo-router";
import React from "react";

const Company_Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(Tabs)" />
    </Stack>
  );
};

export default Company_Layout;
