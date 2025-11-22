import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const Wallet_Layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
          // tabBarHideOnKeyboard: true,
        }}
      >
        <Stack.Screen name="wallet" />
        {/* <Stack.Screen name="transfer_balance" /> */}
      </Stack>
    </View>
  );
};

export default Wallet_Layout;
