


import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { IconDeliveryTimeExt } from "@/assets/icons";
import AcceptedModal from "@/src/Components/AcceptedModal";
import FeedbackModel from "@/src/Components/FeedbackModal";
import ProviderNotificationCard from "@/src/Components/ProviderNotificationCard";
import RequestDeliveryTimeExtModal from "@/src/Components/RequestDeliveryTimeExtModal";
import RequestForDeliveryModal from "@/src/Components/RequestForDeliveryModal";

import {
  useGetNotificationsQuery,
  useSingleMarkMutation,
} from "@/src/redux/apiSlices/notificationsSlices";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Notification = () => {
  const { provider_type } = useLocalSearchParams();

  // ------------------------------- STATES ------------------------------- //
  const [page, setPage] = useState(1);
  const [notifications, setNotification] = useState<any[]>([]);
  const [isFetchMore, setIsFetchMore] = useState(false);

  // Modal Refs
  const deliveryModalRef = useRef<BottomSheetModal>(null);
  const feedbackModalRef = useRef<BottomSheetModal>(null);
  const requestDeliveryTimeExtModalRef = useRef<BottomSheetModal>(null);

  // Selected IDs
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [requestDeliveryExtId, setRequestDeliveryExtId] = useState<number | null>(null);

  const [acceptedModalShow, setAcceptedModalShow] = useState(false);

  // ------------------------------- API ------------------------------- //
  const {
    data: notificationData,
    isLoading: isLoadingNotification,
  } = useGetNotificationsQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  const [singleMark] = useSingleMarkMutation();

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

  // ------------------------------- HANDLE PRESS ------------------------------- //
  const handleNotificationPress = async (item: any) => {
    // Mark notification as read
    if (item.read_at === null) {
      try {
        await singleMark(item.id);
      } catch { }
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
      requestDeliveryTimeExtModalRef.current?.present();
      return;
    }

    // ---------------- Routing Types ---------------- //
    const navigateToOrder = () => {
      router.push({
        pathname:
          provider_type === "individual"
            ? "/service_provider/individual/order_details_profile"
            : "/service_provider/company/order_details_profile",
        params: { id: item.data.order_id || item.id },
      });
    };

    switch (type) {
      // case "new_order":
      case "order_approved":
        router.push({
          pathname: "/company/serviceBookings/order_approved",
          params: {
            id: item.data.order_id
          }
        })
        break;

      case "order_cancelled":
        router.push({
          pathname: "/company/serviceBookings/order_cancelled",
          params: {
            title: item?.data?.title,
            subtitle: item?.data?.sub_title ,
            reason: item?.data?.reason 
          },
        });
        break;
      case "order_rejected":
         router.push({
          pathname: "/company/serviceBookings/order_cancelled",
          params: {
            title: item?.data?.title,
            subtitle: item?.data?.sub_title ,
            reason: item?.data?.reason 
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
              item?.data?.sub_title ||
              item?.data?.data?.report_description,
          },
        });
        break;

      default:
        break;
    }
  };

  if (isLoadingNotification) {
    return <ActivityIndicator size="large" style={tw`mt-20`} />;
  }

  return (
    <View style={tw`flex-1 bg-base_color px-5`}>
      <BackTitleButton
        pageName={"Notifications"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3 pb-5`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchMore && (
            <ActivityIndicator size="large" color="#FF6600" />
          )
        }
        renderItem={({ item }) => (
          <ProviderNotificationCard
            item={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
      />

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

