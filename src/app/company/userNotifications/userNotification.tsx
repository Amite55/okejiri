import { IconDeliveryTimeExt } from "@/assets/icons";
import AcceptedModal from "@/src/Components/AcceptedModal";
import FeedbackModel from "@/src/Components/FeedbackModal";
import ProviderNotificationCard from "@/src/Components/ProviderNotificationCard";
import RequestDeliveryTimeExtModal from "@/src/Components/RequestDeliveryTimeExtModal";
import RequestForDeliveryModal from "@/src/Components/RequestForDeliveryModal";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useDeleteAllNotificationsMutation,
  useDeleteSingleNotificationMutation,
  useGetNotificationsQuery,
  useSingleMarkMutation,
} from "@/src/redux/apiSlices/notificationsSlices";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import NotificationSkeleton from "@/src/Components/skeletons/NotificationSkeleton";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Notification = () => {
  // ------------------------------- STATES ------------------------------- //
  const [page, setPage] = useState(1);
  const [notifications, setNotification] = useState<any[]>([]);
  const [isFetchMore, setIsFetchMore] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  // Modal Refs
  const deliveryModalRef = useRef<BottomSheetModal>(null);
  const feedbackModalRef = useRef<BottomSheetModal>(null);
  const requestDeliveryTimeExtModalRef = useRef<BottomSheetModal>(null);

  // Selected IDs
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [requestDeliveryExtId, setRequestDeliveryExtId] = useState<
    number | null
  >(null);

  const [acceptedModalShow, setAcceptedModalShow] = useState(false);

  // ------------------------------- API ------------------------------- //
  const {
    data: notificationData,
    isLoading: isLoadingNotification,
    isFetching: isFetchingNotification,
    refetch,
  } = useGetNotificationsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const [singleMark] = useSingleMarkMutation();
  const { data: userProfileInfo, isLoading: isProfileLoading } =
    useProfileQuery({});
  const [deleteAllNotification, { isLoading: isAllNotificationLoading }] =
    useDeleteAllNotificationsMutation();
  const [
    deleteNotification,
    { isLoading: isDeleteSingleNotificationDeleteLoading },
  ] = useDeleteSingleNotificationMutation();

  // ===================== handle sing delete ===================== //
  const handleDelete = async (id: any) => {
    try {
      const res = await deleteNotification(id).unwrap();
      if (res) {
        router.push({
          pathname: "/Toaster",
          params: { res: res?.message || "Notification Deleted" },
        });
      }
    } catch (error) {
      console.log(error, "not Delete all item !");
    }
  };

  // ------------------------------- EFFECT ------------------------------- //
  useEffect(() => {
    if (notificationData?.data?.notifications?.data) {
      if (page === 1) {
        setNotification(notificationData.data.notifications.data);
      } else {
        setNotification((prev) => [
          ...prev,
          ...notificationData.data.notifications.data,
        ]);
      }
    }
  }, [notificationData]);

  // ------------------------------- LOAD MORE ------------------------------- //
  const loadMore = () => {
    if (!isFetchMore && notificationData?.data?.notifications?.next_page_url) {
      setIsFetchMore(true);
      setPage((prev) => prev + 1);
      setTimeout(() => setIsFetchMore(false), 400);
    }
  };

  // [----------------- refresh function ----------------]
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([refetch()]);
    } catch (error) {
      console.log(error, "refresh error");
    } finally {
      setRefreshing(false);
    }
  };

  // ------------------------------- HANDLE PRESS ------------------------------- //
  const handleNotificationPress = async (item: any) => {
    // Mark notification as read
    if (item?.read_at === null) {
      try {
        await singleMark(item?.id);
      } catch {}
    }
    const type = item?.data?.type;

    // ---------------- Modal Types ---------------- //
    if (type === "delivery_request_sent") {
      setSelectedOrderId(item?.data?.order_id);
      deliveryModalRef.current?.present();
      return;
    }
    if (type === "extend_delivery_time") {
      setRequestDeliveryExtId(item?.data?.request_id);
      requestDeliveryTimeExtModalRef?.current?.present();
      return;
    } else if (type === "complete_kyc") {
      if (
        // userProfileInfo?.data?.kyc_status === "In Review" ||
        userProfileInfo?.data?.kyc_status === "Unverified" ||
        userProfileInfo?.data?.kyc_status === "Rejected"
      ) {
        router.push("/KYC_auth/id_card");
      } else {
        router.push({
          pathname: "/Toaster",
          params: {
            res: "You have already completed your KYC Please wait for approval",
          },
        });
      }
    } else if (type === "kyc_approved") {
      router.push({
        pathname: "/Toaster",
        params: {
          res: "Your KYC is approved.",
        },
      });
    } else if (type === "kyc_reject") {
      router.push("/KYC_auth/id_card");
    }
    switch (type) {
      case "order_approved":
        router.push({
          pathname: "/company/serviceBookings/order_approved",
          params: {
            id: item.data.order_id,
          },
        });
        break;
      case "order_cancelled":
        router.push({
          pathname: "/company/serviceBookings/order_cancelled",
          params: {
            title: item?.data?.title,
            subtitle: item?.data?.sub_title,
            reason: item?.data?.reason,
          },
        });
        break;
      case "order_rejected":
        router.push({
          pathname: "/company/serviceBookings/order_cancelled",
          params: {
            title: item?.data?.title,
            subtitle: item?.data?.sub_title,
            reason: item?.data?.reason,
          },
        });
        break;
      case "warning":
        router.push("/service_provider/individual/warning");
        break;
      case "new_dispute":
        router.push({
          pathname: "/service_provider/individual/disputes/dispute_review",
          params: { id: item?.data?.dispute_id },
        });
        break;
      case "report":
      case "new_report":
        router.push({
          pathname: "/service_provider/individual/warning",
          params: {
            title: item?.data?.title,
            subtitle:
              item?.data?.sub_title || item?.data?.data?.report_description,
          },
        });
        break;
      default:
        break;
    }
  };

  if (isLoadingNotification) {
    return <NotificationSkeleton />;
  }

  return (
    <View style={tw`flex-1 bg-base_color px-5`}>
      <BackTitleButton
        pageName={"Notifications"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      {notifications?.length > 0 && (
        <TouchableOpacity
          disabled={isAllNotificationLoading}
          onPress={async () => {
            try {
              const res = await deleteAllNotification({}).unwrap();
              if (res) {
                router.push({
                  pathname: "/Toaster",
                  params: { res: res?.message || "All Notification Deleted" },
                });
              }
            } catch (error: any) {
              console.log(error, "all Notification no delete ");
              router.push({
                pathname: "/Toaster",
                params: {
                  res: error?.message || "All Notification Not Deleted",
                },
              });
            }
          }}
          style={tw`p-1 self-end  mb-2`}
          activeOpacity={0.6}
        >
          {isAllNotificationLoading ? (
            <ActivityIndicator size="small" color="#FF6600" />
          ) : (
            <Text style={tw`underline text-red-600 font-semibold text-lg `}>
              Clear all
            </Text>
          )}
        </TouchableOpacity>
      )}

      {isLoadingNotification && (
        <View style={tw`py-10 items-center`}>
          <ActivityIndicator size="large" color="#FF6600" />
        </View>
      )}

      {/* ----------- Empty state ----------- */}
      {!isLoadingNotification && notifications?.length === 0 && (
        <View style={tw`py-10 items-center`}>
          <Text style={tw`text-gray-500 text-base font-PoppinsBlack`}>
            No notifications found
          </Text>
        </View>
      )}
      {notifications?.length > 0 && (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`gap-3 pb-5`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchMore ? (
              <ActivityIndicator size="large" color="#FF6600" />
            ) : isFetchingNotification === false ? (
              <View style={tw`items-center py-6`}>
                <Text style={tw`text-gray-400 font-PoppinsMedium`}>
                  No more notifications
                </Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <ProviderNotificationCard
              item={item}
              onPress={() => handleNotificationPress(item)}
              onDelete={() => handleDelete(item?.id)}
              deleteLoading={isDeleteSingleNotificationDeleteLoading}
            />
          )}
        />
      )}

      {/* ------------------- Delivery Request Modal ------------------ */}
      <RequestForDeliveryModal
        ref={deliveryModalRef}
        id={selectedOrderId}
        onClose={() => deliveryModalRef?.current?.dismiss()}
        onAccepted={() => {
          deliveryModalRef?.current?.dismiss();
          setTimeout(() => {
            feedbackModalRef?.current?.present();
          }, 500);
        }}
      />

      {/* ------------------- Feedback Modal ------------------ */}
      <FeedbackModel
        ref={feedbackModalRef}
        id={selectedOrderId}
        onClose={() => feedbackModalRef?.current?.dismiss()}
      />

      {/* ------------------- Request Extension Modal ------------------ */}
      <RequestDeliveryTimeExtModal
        ref={requestDeliveryTimeExtModalRef}
        id={requestDeliveryExtId}
        onClose={() => requestDeliveryTimeExtModalRef?.current?.dismiss()}
        onAccepted={() => {
          requestDeliveryTimeExtModalRef?.current?.dismiss();
          setTimeout(() => setAcceptedModalShow(true), 500);
        }}
      />

      {/* ------------------- Extension Accepted Modal ------------------ */}
      <AcceptedModal
        visible={acceptedModalShow}
        title="Delivery extension request accepted"
        titleStyle={tw`text-success600 font-DegularDisplayDemoMedium text-xl`}
        icon={IconDeliveryTimeExt}
        btnText="Cancel"
        btnStyle={tw`bg-white border border-gray-300 w-full`}
        btnTextStyle={tw`text-black font-PoppinsMedium text-base`}
        onPress={() => setAcceptedModalShow(false)}
        onClose={() => setAcceptedModalShow(false)}
      />
    </View>
  );
};

export default Notification;
