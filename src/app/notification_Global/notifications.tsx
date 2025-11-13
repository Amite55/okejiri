import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

import ProviderNotificationCard from "@/src/Components/ProviderNotificationCard";
import { useGetNotificationsQuery, useSingleMarkMutation } from "@/src/redux/apiSlices/notificationsSlices";
const Notification = () => {

  const { provider_type } = useLocalSearchParams();
  console.log("================ provider type ================= ", provider_type)


  // ------------------------------- API ------------------------------- //
  const { data: notificationData, isLoading: isLoadingNotification, isError: isErrorLoadingNotification } = useGetNotificationsQuery(10);
  const [singleMark, { data: singleMarkData, isLoading: isLoadingSingleMarkData }] = useSingleMarkMutation();

  // -------------------------------- Effect -------------------------- //

  // -------------------------------- handler -------------------------- //
  // useEffect(()=>{

  // },[provider_type])
  const values = notificationData?.data?.notifications?.data || [] // only for read_at, id 
  const notificationDetails = values?.data
  console.log("values ================= ", JSON.stringify(notificationData?.data, null, 2))
  console.log("notifications =================== ", JSON.stringify(notificationDetails, null, 2));


  const handleNotification = (item: any) => {
    const handleMark = async () => {
      try {
        const response = await singleMark(item.id);
        console.log("======== mark notification res ==========", response);

        // ================================ route part
        if (response) {
          if (notificationDetails.type === "new_order") {
            router.push({
              pathname: "/service_provider/company/order_details_profile",
              params: {
                id: item.data.order_id || item.id
              }
            })
          }
          else if (notificationDetails.type === "warning") {
            router.push("/service_provider/individual/warning");
          }
          else if (notificationDetails.type === "new_dispute") {
            router.push("/service_provider/individual/disputes/dispute_review")
          } else if (notificationDetails.type === "order_rejected") {
            // router.push("")
          } else if (notificationDetails.type === "delivery_request_decline") {
            // router.push("")
          }
          else {
            // 
          }
        }

      } catch (err: any) {
        router.push({
          pathname: "/Toaster",
          params: { res: "Failed to marking" }
        })
      }
    }
    handleMark()
  }



  // console.log("")
  // console.log(NotificationData, "-------------------");
  return (
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

      <View style={tw`gap-3 py-2`}>
        {values && values.map((item: any, index: any) => {
          return (
            <ProviderNotificationCard
              key={item.id}
              item={item}
              onPress={() => handleNotification(item)}

            //  {
            //   if (item.data.type === "new_order") {
            //     router.push({
            //       pathname: "/service_provider/company/order_details_profile",
            //       params: {
            //         id: item.id
            //       }
            //     });
            //   } else if (item.data.type === "warning") {
            //     router.push("/service_provider/individual/warning");
            //   } else if (item.data.type === "cancelled") {
            //     router.push("/service_provider/individual/booking_cancel");
            //   } else if (item.data.type === "new_dispute") {
            //     router.push(
            //       "/service_provider/individual/disputes/dispute_review"
            //     );
            //   } else if (item.data.type === "KYC_complete") {
            //     router.push("/KYC_auth/id_card");
            //   } else if (item.data.type === "request_approved") {
            //     router.push({
            //       pathname: "/company/my_booking",
            //       params: { status: "booking_request_approved" },
            //     });
            //   }
            // }
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Notification;
