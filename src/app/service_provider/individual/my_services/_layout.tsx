import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const My_Services_Layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />

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
    </View>
  );
};

export default My_Services_Layout;
