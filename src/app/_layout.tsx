import { NotificationProvider } from "@/context/NotificationContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useNotificationHandler } from "../hooks/useNotificationHandler";
import { useProfileQuery } from "../redux/apiSlices/authSlices";
import store from "../redux/store";

// ============ notification handler ----------------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
// ========== There are root layout ------------
export default function RootLayout() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <RootLayoutNav />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaView>
      </NotificationProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  // api end point -----------------------------
  const { data: userProfileInfo } = useProfileQuery({});
  // ================= call notification handler with user info ------------->
  useNotificationHandler(userProfileInfo);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
        statusBarStyle: "dark",
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
          presentation: "transparentModal",
        }}
      />
      {/* <Stack.Screen
        name="Toaster"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          animation: 'fade',
          gestureEnabled: true,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      /> */}
      <Stack.Screen
        name="Toaster"
        options={{
          sheetAllowedDetents: "fitToContents",
          presentation: "formSheet",
          contentStyle: {
            backgroundColor: "transparent",
            // paddingBottom: 8,
          },
        }}
      />
    </Stack>
  );
}
