import tw from "@/src/lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const Notifications_Layout = () => {
  return (
    <View style={tw`flex-1 `}>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen name="notifications" />
      </Stack>
    </View>
  );
};

export default Notifications_Layout;
