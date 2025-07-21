import { Stack } from "expo-router";
import React from "react";

const ServicerProviderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <StatusBar barStyle={"dark-content"} /> */}
      <Stack.Screen name="service_provider_roll" />
    </Stack>
  );
};

export default ServicerProviderLayout;
