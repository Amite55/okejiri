import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const _layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="settings" />
        <Stack.Screen name="edit_profile" />
      </Stack>
    </View>
  );
};

export default _layout;
