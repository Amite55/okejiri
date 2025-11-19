import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import FeedbackModel from "@/src/Components/FeedbackModal";
import NotificationCard from "@/src/Components/NotificationCard";
import RequestForDeliveryModal from "@/src/Components/RequestForDeliveryModal";
import NotificationSkeleton from "@/src/Components/skeletons/NotificationSkeleton";
import {
  useGetNotificationsQuery,
  useSingleMarkMutation,
} from "@/src/redux/apiSlices/notificationsSlices";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const UserNotification = () => {
  // -------------------- api end point ---------------------
  // const { data: notificationData, isLoading: isNotificationLoading } =
  //   useGetNotificationsQuery({ page: 1 });

  // const [markAsReadNotification] = useSingleMarkMutation();

  // ==================== loading skeleton ====================



  const [page, setPage] = useState(1);
  const [notifications, setNotification] = useState<any[]>([]);
  const [isFetchMore, setIsFetchMore] = useState(false);
  const deliveryModalRef = useRef<BottomSheetModal>(null);
  const feedbackModalRef = useRef<BottomSheetModal>(null);
  const requestDeliveryTimeExtModalRef = useRef<BottomSheetModal>(null);
  // ------------------------------- API ------------------------------- //
  const { data: notificationData, isLoading: isLoadingNotification, isError: isErrorLoadingNotification } = useGetNotificationsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const [singleMark, { data: singleMarkData, isLoading: isLoadingSingleMarkData }] = useSingleMarkMutation();

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [requestDeliveryExtId, setRequestId] = useState<number | null>(null);
  // -------------------------------- Effect -------------------------- //
  useEffect(() => {
    // console.log("===========  notification item =========== ", JSON.stringify(notificationData, null, 2))
    if (notificationData?.data?.notifications?.data) {
      if (page == 1) {
        setNotification(notificationData.data.notifications.data)
      } else {
        setNotification((prev) => [
          ...prev, ...notificationData.data.notifications.data
        ])
      }
    }
  }, [notificationData])

  const loading_more = () => {
    if (!isFetchMore && notificationData?.data?.notifications?.next_page_url) {
      setIsFetchMore(true);
      setPage((prev) => prev + 1);
      setTimeout(() => setIsFetchMore(false), 500)
    }
  }

  // -------------------------------- handler -------------------------- //
  // useEffect(()=>{

  // },[provider_type])
  const values = notifications || [] // only for read_at, id 
  const notificationDetails = values
  // console.log("values ================= ", JSON.stringify(notificationData, null, 2))
  // console.log("======================== notifications =================== ", JSON.stringify(notificationDetails, null, 2));
  // console.log("select item id", selectedOrderId)
  if (isLoadingNotification) {
    return <NotificationSkeleton />;
  }

  return (
    <View style={tw`flex-1  bg-base_color  `}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        style={tw`flex-1  bg-base_color px-5 `}
        contentContainerStyle={tw`pb-5`}
      >
        <BackTitleButton
          pageName={"Notifications"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />

        <View style={tw`gap-3`}>
          {notificationDetails?.map((item: any) => {
            return (
              <NotificationCard
                key={item.id}
                item={item}
                onPress={async () => {
                  // console.log("====== item ", JSON.stringify(item, null, 2))
                  await singleMark(item.id);

                  if (item?.data.type === "order_approved") {
                    router.push(
                      "/service_provider/individual/order_details_profile"
                    );
                  } else if (item?.data.type === "warning") {
                    router.push("/service_provider/individual/warning");
                  } else if (item?.data.type === "cancelled") {
                    router.push("/service_provider/individual/booking_cancel");
                  }
                  else if (item?.data.type === "new_dispute") {
                    router.push(
                      "/service_provider/individual/disputes/dispute_review"
                    );
                  }
                  else if (item?.data.type === "delivery_request_sent") {
                    // console.log("item", item)
                    setSelectedOrderId(item?.data.order_id);
                    deliveryModalRef.current?.present();
                  }
                  else if (item?.data.type === "extend_delivery_time") {
                    // console.log(" ================ item ====== ", item);
                    setRequestId(item?.data?.request_id);
                  }
                }}
              />
            );
          })}
        </View>

      </ScrollView>
      <RequestForDeliveryModal
        ref={deliveryModalRef}
        id={selectedOrderId} // <-- pass notification id
        onClose={() => deliveryModalRef?.current?.dismiss()}
        onAccepted={() => {
          deliveryModalRef?.current?.dismiss();
          setTimeout(() => {
            feedbackModalRef?.current?.present();
          }, 500);
        }}
      />
      <FeedbackModel
        ref={feedbackModalRef}
        id={selectedOrderId}
        onClose={() => feedbackModalRef?.current?.dismiss()}

      />
      {/* <RequestDeliveryTimeExtModal 
        ref={requestDeliveryTimeExtModalRef}
        id={selectedOrderId} // <-- pass notification id
        onClose={() => deliveryModalRef?.current?.dismiss()}
        onAccepted={() => {
          deliveryModalRef?.current?.dismiss();
          setTimeout(() => {
            feedbackModalRef?.current?.present();
          }, 500);
        }}

      /> */}
    </View>

  );
};

export default UserNotification;
