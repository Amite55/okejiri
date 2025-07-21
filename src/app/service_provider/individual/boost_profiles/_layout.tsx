import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { View } from "react-native-animatable";

const Boost_Profile_Layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="boost_profile" />
        <Stack.Screen name="boost_profile_plan" />
      </Stack>
    </View>
  );
};

export default Boost_Profile_Layout;
