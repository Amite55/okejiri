import { Stack } from "expo-router";

import { NotificationProvider } from "@/context/NotificationContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import tw from "../lib/tailwind";
import store from "../redux/store";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <NotificationProvider>
      <SafeAreaView style={tw`flex-1 bg-base_color`}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
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
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaView>
    </NotificationProvider>
  );
}
