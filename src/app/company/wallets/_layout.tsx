import { Stack } from "expo-router";
import React from "react";

const Wallet_Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Stack.Screen name="wallet" />
      <Stack.Screen name="transfer_balance" />
    </Stack>
  );
};

export default Wallet_Layout;
