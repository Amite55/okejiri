import { Stack } from "expo-router";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import tw from "../lib/tailwind";
import store from "../redux/store";
export default function RootLayout() {
  return (
    <>
      <AlertNotificationRoot>
        <SafeAreaView style={tw`flex-1 bg-base_color`}>
          <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarAnimation: "fade",
                  statusBarStyle: "dark",
                  // statusBarBackgroundColor: tw.color("primary"),
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="chose_roll" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="notification_Global" />
                <Stack.Screen name="KYC_auth" />
                <Stack.Screen
                  name="kyc_completed_modal"
                  options={{
                    animation: "fade",
                    // animationDuration: 2000,
                    presentation: "transparentModal",
                  }}
                />
                <Stack.Screen
                  name="Toaster"
                  options={{
                    sheetAllowedDetents: "fitToContents",
                    presentation: "formSheet",
                    contentStyle: {
                      backgroundColor: "transparent",
                      paddingBottom: 8,
                    },
                  }}
                />
              </Stack>
            </GestureHandlerRootView>
          </Provider>
        </SafeAreaView>
      </AlertNotificationRoot>
    </>
  );
}
