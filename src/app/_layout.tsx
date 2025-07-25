import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../lib/tailwind";

export default function RootLayout() {
  return (
    <View style={tw`flex-1 `}>
      <StatusBar barStyle={"dark-content"} />
      <AlertNotificationRoot>
        <SafeAreaView style={tw`flex-1 bg-base_color`}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarAnimation: "fade",
                statusBarStyle: "light",
                // statusBarBackgroundColor: tw.color("primary"),
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="chose_roll" />
              <Stack.Screen name="auth" />
              <Stack.Screen name="notification_Global" />
              <Stack.Screen name="KYC_auth" />
            </Stack>
          </GestureHandlerRootView>
        </SafeAreaView>
      </AlertNotificationRoot>
    </View>
  );
}
