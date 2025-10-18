import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="singUp" />
      <Stack.Screen name="change_pass" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="forgot_pass" />
      <Stack.Screen name="new_pass" />
      <Stack.Screen name="OTP" />
      <Stack.Screen name="provide_service" />
      <Stack.Screen name="registerOTP" />
      <Stack.Screen
        name="ServiceRequestModal"
        options={{
          presentation: "containedTransparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen name="setup_business_profile" />
    </Stack>
  );
};

export default AuthLayout;
