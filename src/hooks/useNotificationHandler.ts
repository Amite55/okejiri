import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect } from "react";

export const useNotificationHandler = (userProfileInfo: any) => {
  // ================= Foreground — when your app is open =================
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (!data?.type) return;
        handleNotificationNavigation(data, userProfileInfo);
      },
    );
    return () => subscription.remove();
  }, [userProfileInfo]);

  // ================= Cold Start — app opened from killed state =================
  useEffect(() => {
    const handleColdStart = async () => {
      const lastNotification =
        await Notifications.getLastNotificationResponseAsync();
      if (!lastNotification) return;

      const data = lastNotification.notification.request.content.data;
      if (!data?.type) return;

      setTimeout(() => {
        handleNotificationNavigation(data, userProfileInfo);
      }, 500);
    };

    if (userProfileInfo) {
      handleColdStart();
    }
  }, [userProfileInfo]);
};

// ===================== Navigation Handler =====================
const handleNotificationNavigation = (data: any, userInfo: any) => {
  const type = data?.type;
  const role = userInfo?.data?.role;
  const provider_type = userInfo?.data?.provider_type;
  const kycStatus = userInfo?.data?.kyc_status;

  // ── KYC routes (role-independent, handle first & return) ──
  if (type === "kyc_reject") {
    router.replace("/KYC_auth/id_card");
    return;
  }

  if (type === "complete_kyc") {
    if (kycStatus === "Unverified" || kycStatus === "Rejected") {
      router.replace("/KYC_auth/id_card");
    } else {
      router.replace(
        role === "USER"
          ? "/company/userNotifications/userNotification"
          : "/notification_Global/notifications",
      );
    }
    return;
  }

  if (type === "kyc_approved") {
    router.replace(
      role === "USER"
        ? "/company/userNotifications/userNotification"
        : "/notification_Global/notifications",
    );
    return;
  }

  // ── USER role routing ──
  if (role === "USER") {
    switch (type) {
      case "order_approved":
        router.replace({
          pathname: "/company/serviceBookings/order_approved",
          params: { id: data?.order_id },
        });
        break;

      case "order_cancelled":
        router.replace({
          pathname: "/company/serviceBookings/order_cancelled",
          params: {
            title: data?.title,
            subtitle: data?.sub_title,
            reason: data?.reason,
          },
        });
        break;

      case "order_rejected":
        router.replace({
          pathname: "/company/serviceBookings/order_cancelled",
          params: {
            title: data?.title,
            subtitle: data?.sub_title,
            reason: data?.reason,
          },
        });
        break;

      case "warning":
        router.replace("/service_provider/individual/warning");
        break;

      case "new_dispute":
        router.replace({
          pathname: "/service_provider/individual/disputes/dispute_review",
          params: { id: data?.dispute_id },
        });
        break;

      case "report":
      case "new_report":
        router.replace({
          pathname: "/service_provider/individual/warning",
          params: {
            title: data?.title,
            subtitle: data?.sub_title || data?.data?.report_description,
          },
        });
        break;

      default:
        router.replace("/company/userNotifications/userNotification");
        break;
    }
    return;
  }

  // ── PROVIDER role routing ──
  if (role === "PROVIDER") {
    // helper — most PROVIDER routes go to order_details_profile
    const goToOrderDetails = (id: string | undefined) => {
      router.replace({
        pathname: "/service_provider/company/order_details_profile",
        params: { id },
      });
    };

    switch (type) {
      case "new_order":
        goToOrderDetails(data?.order_id || data?.id);
        break;

      case "order_approved":
        goToOrderDetails(data?.order_id || data?.id);
        break;

      case "order_rejected":
        goToOrderDetails(data?.order_id || data?.id);
        break;

      case "order_cancelled":
        goToOrderDetails(data?.order_id || data?.id);
        break;

      case "delivery_request_sent":
        goToOrderDetails(data?.order_id || data?.id);
        break;

      case "delivery_request_decline":
        goToOrderDetails(data?.order_id || data?.id);
        break;

      case "delivery_request_approved":
        goToOrderDetails(data?.order_id || data?.id);
        break;

      case "warning":
        router.replace("/service_provider/individual/warning");
        break;

      case "new_dispute":
        router.replace({
          pathname: "/service_provider/individual/disputes/dispute_review",
          params: { id: data?.dispute_id },
        });
        break;

      case "new_report":
        router.replace({
          pathname: "/service_provider/individual/warning",
          params: {
            title: data?.title,
            subtitle: data?.sub_title,
          },
        });
        break;

      case "report":
        router.replace({
          pathname: "/service_provider/individual/warning",
          params: {
            title: data?.title,
            subtitle: data?.data?.report_description,
          },
        });
        break;

      default:
        router.replace("/notification_Global/notifications");
        break;
    }
    return;
  }

  // ── Fallback (no role matched) ──
  router.replace("/notification_Global/notifications");
};
