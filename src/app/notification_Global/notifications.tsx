import ProviderNotificationCard from "@/src/Components/ProviderNotificationCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import {
  useDeleteAllNotificationsMutation,
  useDeleteSingleNotificationMutation,
  useGetNotificationsQuery,
  useSingleMarkMutation,
} from "@/src/redux/apiSlices/notificationsSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Notification = () => {
  const { provider_type } = useLocalSearchParams();
  const [page, setPage] = useState(1);
  const [notifications, setNotification] = useState<any[]>([]);
  const [isFetchMore, setIsFetchMore] = useState(false);

  // ------------------------------- API ------------------------------- //
  const { data: notificationData, isLoading: isLoadingNotification } =
    useGetNotificationsQuery(page, {
      refetchOnMountOrArgChange: true,
    });
  const [singleMark] = useSingleMarkMutation();
  const { data: userProfileInfo, isLoading: isProfileLoading } =
    useProfileQuery({});
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

  // -------------------------------- Effect -------------------------- //
  useEffect(() => {
    if (notificationData?.data?.notifications?.data) {
      if (page == 1) {
        setNotification(notificationData.data.notifications.data);
      } else {
        setNotification((prev) => [
          ...prev,
          ...notificationData.data.notifications.data,
        ]);
      }
    }
  }, [notificationData]);

  const loading_more = () => {
    if (!isFetchMore && notificationData?.data?.notifications?.next_page_url) {
      setIsFetchMore(true);
      setPage((prev) => prev + 1);
      setTimeout(() => setIsFetchMore(false), 500);
    }
  };

  // -------------------------------- handler -------------------------- /
  const handleNotification = (item: any) => {
    const handleMark = async () => {
      try {
        await singleMark(item?.id);
      } catch (err: any) {
        router.push({
          pathname: "/Toaster",
          params: { res: "Failed to marking" },
        });
      }
    };

    if (item?.read_at === null) {
      handleMark();
    }
    if (item?.data?.type === "new_order") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      } else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      }
    } else if (item?.data?.type === "warning") {
      router.push("/service_provider/individual/warning");
    } else if (item?.data?.type === "new_dispute") {
      router.push({
        pathname: "/service_provider/individual/disputes/dispute_review",
        params: {
          id: item?.data?.dispute_id,
        },
      });
    } else if (item?.data?.type === "order_rejected") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      } else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id,
          },
        });
      }
    } else if (item?.data?.type === "delivery_request_sent") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      } else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id,
          },
        });
      }
    } else if (item?.data?.type === "order_approved") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      } else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id,
          },
        });
      }
    } else if (item?.data.type === "new_report") {
      router.push({
        pathname: "/service_provider/individual/warning",
        params: {
          title: item?.data?.title,
          subtitle: item?.data.sub_title,
        },
      });
    } else if (item?.data?.type === "report") {
      router.push({
        pathname: "/service_provider/individual/warning",
        params: {
          title: item?.data?.title,
          subtitle: item?.data?.data?.report_description,
        },
      });
    } else if (item?.data?.type === "order_cancelled") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      } else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id,
          },
        });
      }
    } else if (item?.data.type === "delivery_request_decline") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      } else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id,
          },
        });
      }
    } else if (item?.data?.type === "delivery_request_approved") {
      if (provider_type === "individual") {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id || item?.id,
          },
        });
      } else {
        router.push({
          pathname: "/service_provider/company/order_details_profile",
          params: {
            id: item?.data?.order_id,
          },
        });
      }
    } else if (item?.data?.type === "complete_kyc") {
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
            res: "You have already completed your KYC.",
          },
        });
      }
    } else if (item?.data?.type === "kyc_approved") {
      router.push({
        pathname: "/Toaster",
        params: {
          res: "Your KYC is approved.",
        },
      });
    } else if (item?.data?.type === "kyc_reject") {
      router.push("/KYC_auth/id_card");
    }
  };

  return (
    <View style={tw`flex-1  bg-base_color px-5 `}>
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
          keyExtractor={(item, index) => `${item?.id}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`gap-3 px-2 py-2`}
          onEndReached={loading_more}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          windowSize={5}
          removeClippedSubviews={true}
          ListFooterComponent={
            isFetchMore ? (
              <ActivityIndicator size="large" color="#FF6600" />
            ) : (
              <View style={tw`items-center py-6`}>
                <Text style={tw`text-gray-400 font-PoppinsMedium`}>
                  No more notifications
                </Text>
              </View>
            )
          }
          refreshing={isFetchMore}
          onRefresh={() => setPage(1)}
          renderItem={({ item }) => (
            <ProviderNotificationCard
              item={item}
              onPress={() => handleNotification(item)}
              onDelete={() => handleDelete(item?.id)}
              deleteLoading={isDeleteSingleNotificationDeleteLoading}
            />
          )}
        />
      )}
    </View>
  );
};

export default Notification;
