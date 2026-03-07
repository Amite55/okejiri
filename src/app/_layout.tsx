import { NotificationProvider } from "@/context/NotificationContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useProfileQuery } from "../redux/apiSlices/authSlices";
import store from "../redux/store";

// ============ notification handler ----------------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
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

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        const type = data?.type;
        console.log(data, "this is data ------------->");
        console.log("Notification Clicked Data:", data);
        if (!type) return;
        // ======= call navigation function =========
        handleNavigation(type, data, userProfileInfo);
      },
    );
    return () => subscription.remove();
  }, [userProfileInfo]);

  // ===================== navigation handler =====================
  const handleNavigation = (type: string, data: any, userInfo: any) => {
    // ============ when user don't complete kyc =================
    if (type === "kyc_reject") {
      router.push("/KYC_auth/id_card");
      return;
    }
    if (type === "complete_kyc") {
      if (
        // userProfileInfo?.data?.kyc_status === "In Review" ||
        userInfo?.data?.kyc_status === "Unverified" ||
        userInfo?.data?.kyc_status === "Rejected"
      ) {
        router.push("/KYC_auth/id_card");
      } else {
        if (userInfo?.data?.role === "USER") {
          router.push("/company/userNotifications/userNotification");
        } else {
          router.push("/notification_Global/notifications");
        }
      }
    }
    //   // আপনার পূর্বের Notification.tsx স্ক্রিনের সুইচ কেসগুলো এখানে অ্যাড করুন
    //   switch (type) {
    //     case "order_approved":
    //       router.push({
    //         pathname: "/company/serviceBookings/order_approved",
    //         params: { id: data.order_id },
    //       });
    //       break;
    //     case "new_dispute":
    //       router.push({
    //         pathname: "/service_provider/individual/disputes/dispute_review",
    //         params: { id: data.dispute_id },
    //       });
    //       break;
    //     case "warning":
    //       router.push("/service_provider/individual/warning");
    //       break;
    //     // ডিফল্ট হিসেবে অল নোটিফিকেশন পেজে পাঠাতে পারেন
    //     default:
    //       router.push("/notification_Global");
    //       break;
    //   }
  };

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
  );
}
