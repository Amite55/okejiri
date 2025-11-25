import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import tw from "../lib/tailwind";
import store from "../redux/store";
export default function RootLayout() {
  return (
    <SafeAreaView style={tw`flex-1 bg-base_color`}>
      {/* <KeyboardProvider> */}
      {/* <AlertNotificationRoot> */}

      <Provider store={store}>
        <StripeProvider
          publishableKey={`pk_test_51QKAtBKOpUtqOuW1x5VdNqH3vG7CZZl1P6V3VuV1qsRUmPLNk26i34AXeu2zCO3QurFJAOZ9zfb0EkWeCVhqBYgH008X41cXr6`}
        >
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
        </StripeProvider>
      </Provider>

      {/* </AlertNotificationRoot> */}
      {/* </KeyboardProvider> */}
    </SafeAreaView>
  );
}
