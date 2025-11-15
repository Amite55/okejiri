import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import ProviderNotificationCard from "@/src/Components/ProviderNotificationCard";
import { useGetNotificationsQuery, useSingleMarkMutation } from "@/src/redux/apiSlices/notificationsSlices";
const Notification = () => {

  const { provider_type } = useLocalSearchParams();
  console.log("================ provider type ================= ", provider_type)

  const [page, setPage] = useState(1);
  const [notifications, setNotification] = useState<any[]>([]);
  const [isFetchMore, setIsFetchMore] = useState(false);

  // ------------------------------- API ------------------------------- //
  const { data: notificationData, isLoading: isLoadingNotification, isError: isErrorLoadingNotification } = useGetNotificationsQuery(page);
  const [singleMark, { data: singleMarkData, isLoading: isLoadingSingleMarkData }] = useSingleMarkMutation();

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
  const values = notificationData?.data?.notifications?.data || [] // only for read_at, id 
  const notificationDetails = values?.data
  // console.log("values ================= ", JSON.stringify(notificationData?.data, null, 2))
  // console.log("notifications =================== ", JSON.stringify(notificationDetails, null, 2));


  const handleNotification = (item: any) => {

    const handleMark = async () => {
      try {
        // console.log(" ========================id =============== ", item.id)

        const response = await singleMark(item.id);


      } catch (err: any) {
        router.push({
          pathname: "/Toaster",
          params: { res: "Failed to marking" }
        })
      }
    }

    if (item.read_at === null) {
      handleMark()
    }

    // console.log(" ======== dispute id: ", item?.data)

    console.log(" ===== item for new order ============= ", JSON.stringify(item?.data, null, 2))

    if (item?.data?.type === "new_order") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/individual/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }
      else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }

    }
    else if (item?.data?.type === "warning") {
      router.push("/service_provider/individual/warning");
    }
    else if (item?.data?.type === "new_dispute") {

      router.push({
        pathname: "/service_provider/individual/disputes/dispute_review",
        params: {
          id: item?.data?.dispute_id
        }
      })


    } else if (item?.data?.type === "order_rejected") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/individual/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }
      else {
        // router.push("")
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id
          }
        })
      }

    }
    else if (item?.data?.type === "delivery_request_sent") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/individual/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }
      else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id
          }
        })
      }

    }
    else if (item?.data?.type === "order_approved") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/individual/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }
      else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id
          }
        })
      }

    }
    else if (item?.data.type === "new_report") {
      router.push({
        pathname: "/service_provider/individual/warning",
        params: {
          title: item?.data.title,
          subtitle: item?.data.sub_title
        }
      })
    }
    else if (item?.data.type === "report") {
      router.push({
        pathname: "/service_provider/individual/warning",
        params: {
          title: item?.data.title,
          subtitle: item?.data.data?.report_description
        }
      })
    }
    else if (item?.data.type === "order_cancelled") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/individual/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }
      else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id
          }
        })
      }

    }
    else if (item?.data.type === "delivery_request_decline") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/individual/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }
      else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id
          }
        })
      }

    }
    else if (item?.data.type === "delivery_request_approved") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/individual/order_details_profile",
          params: {
            id: item.data.order_id || item.id
          }
        })
      }
      else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id
          }
        })
      }

    }
    else {
      //
    }

  }



  // console.log("")
  // console.log(NotificationData, "-------------------");
  return (
    <View

      style={tw`flex-1  bg-base_color px-5 `}

    >
      <BackTitleButton
        pageName={"Notifications"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3 px-2 py-2`}
        onEndReached={loading_more}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListFooterComponent={
          isFetchMore ? (<ActivityIndicator size="large" color="#FF6600" />) : null
        }
        refreshing={isFetchMore}
        onRefresh={() => setPage(1)}
        renderItem={({ item }) => (
          <ProviderNotificationCard
            item={item}

            onPress={() => handleNotification(item)}
          />
        )}
      />
      {/* <View style={tw`gap-3 py-2`}>
        {values && values.map((item: any, index: any) => {
          return (
            <ProviderNotificationCard
              key={item.id}
              item={item}
              onPress={() => handleNotification(item)}

           
            />
          );
        })}
      </View> */}
    </View>
  );
};

export default Notification;
