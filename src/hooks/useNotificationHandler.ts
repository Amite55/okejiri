import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect } from "react";

export const useNotificationHandler = (userProfileInfo: any) => {
  // ================= Foreground — when your app open in foreground =================
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

  useEffect(() => {
    const handleColdStart = async () => {
      const lastNotification =
        await Notifications.getLastNotificationResponseAsync();
      if (!lastNotification) return;

      const data = lastNotification.notification.request.content.data;
      if (!data?.type) return;

      //  ============== if the user is login in this app then this code will run ==============
      setTimeout(() => {
        handleNotificationNavigation(data, userProfileInfo);
      }, 500);
    };

    if (userProfileInfo) {
      handleColdStart();
    }
  }, [userProfileInfo]);
};

//  hare is all routing in notification -------------------------
const handleNotificationNavigation = (data: any, userInfo: any) => {
  const type = data?.type;
  const role = userInfo?.data?.role;
  const provider_type = userInfo?.data?.provider_type;
  const kycStatus = userInfo?.data?.kyc_status;

  let defaultPath = "/notification_Global/notifications";

  if (role === "USER") {
    defaultPath = "/company/userNotifications/userNotification";
  } else if (role === "PROVIDER") {
    defaultPath = "/notification_Global/notifications";
  }

  switch (type) {
    case "kyc_reject":
      router.replace("/KYC_auth/id_card");
      break;
    case "complete_kyc":
      if (kycStatus === "Unverified" || kycStatus === "Rejected") {
        router.replace("/KYC_auth/id_card");
      } else {
        if (role === "USER") {
          router.replace("/company/userNotifications/userNotification");
        } else {
          router.replace("/notification_Global/notifications");
        }
      }
      break;
    case "kyc_approved":
      if (role === "USER") {
        router.replace("/company/userNotifications/userNotification");
      } else {
        router.replace("/notification_Global/notifications");
      }

      break;

    default:
      if (role === "USER") {
        router.replace("/company/userNotifications/userNotification");
      } else {
        router.replace("/notification_Global/notifications");
      }
      break;
  }

  if (role === "USER") {
    // ============== user role notification routing ==============
    switch (type) {
      case "order_approved":
        router.replace({
          pathname: "/company/serviceBookings/order_approved",
          params: {
            id: data.order_id,
          },
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
      // ============ next time change this default code -==========
      default:
        break;
    }
  } else if (role === "PROVIDER") {
    if (provider_type === "Individual") {
      if (type === "new_order") {
        if (provider_type === "individual") {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        } else {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        }
      } else if (type === "warning") {
        router.replace("/service_provider/individual/warning");
      } else if (type === "new_dispute") {
        router.replace({
          pathname: "/service_provider/individual/disputes/dispute_review",
          params: {
            id: data?.dispute_id,
          },
        });
      } else if (type === "order_rejected") {
        if (provider_type === "individual") {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        } else {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id,
            },
          });
        }
      } else if (type === "delivery_request_sent") {
        if (provider_type === "individual") {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        } else {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id,
            },
          });
        }
      } else if (type === "order_approved") {
        if (provider_type === "individual") {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        } else {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id,
            },
          });
        }
      } else if (type === "new_report") {
        router.replace({
          pathname: "/service_provider/individual/warning",
          params: {
            title: data?.title,
            subtitle: data.sub_title,
          },
        });
      } else if (type === "report") {
        router.replace({
          pathname: "/service_provider/individual/warning",
          params: {
            title: data?.title,
            subtitle: data?.data?.report_description,
          },
        });
      } else if (type === "order_cancelled") {
        if (provider_type === "individual") {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        } else {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id,
            },
          });
        }
      } else if (type === "delivery_request_decline") {
        if (provider_type === "individual") {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        } else {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id,
            },
          });
        }
      } else if (type === "delivery_request_approved") {
        if (provider_type === "individual") {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id || data?.id,
            },
          });
        } else {
          router.replace({
            pathname: "/service_provider/company/order_details_profile",
            params: {
              id: data?.order_id,
            },
          });
        }
      }
    }
  }
};
