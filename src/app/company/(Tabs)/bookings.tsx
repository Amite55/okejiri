import { IconMostResentGray } from "@/assets/icons";
import BookingCard from "@/src/Components/BookingCard";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import CleaningData from "@/src/json/CleaningData.json";
import tw from "@/src/lib/tailwind";
import {
  useBookingsHistoryQuery,
  useMyBookingsQuery,
} from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SvgXml } from "react-native-svg";

const Bookings = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  // =================== api endpoint ===================
  const {
    data: getMyBookingsData,
    isLoading: isMyBookingsLoading,
    refetch,
  } = useMyBookingsQuery({ page: 1, per_page: 10 });
  const {
    data: getMyServiceBookingsData,
    isLoading: isMyServiceBookingsLoading,
    refetch: refetchBookingsHistory,
  } = useBookingsHistoryQuery({ page: 1, per_page: 10 });

  const renderHeader = () => (
    <>
      {/* ============= profile header component =========== */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/company/(Tabs)/profile")}
        onPressNotification={() =>
          router.push("/company/userNotifications/userNotification")
        }
      />

      <Text style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}>
        My Bookings
      </Text>
      <View style={tw`gap-3`}>
        {/* --------------------------- My Bookings item ------------------------ */}
        {CleaningData?.length === 0 ? (
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
          >
            No Bookings
          </Text>
        ) : (
          getMyBookingsData?.data?.data?.map((item, index) => {
            return (
              <BookingCard
                key={item?.id}
                item={item}
                index={item?.id}
                // onPress={() =>
                //   router.push({
                //     pathname: "/company/my_booking",
                //     params: { status: "booking_request_pending" },
                //   })
                // }
                onPress={() =>
                  router.push({
                    pathname: "/company/booking_service_details",
                    params: { id: item?.id },
                  })
                }
              />
            );
          })
        )}
      </View>

      <View style={tw`mt-6 flex-row justify-between`}>
        <View style={tw`flex-row justify-start items-center gap-3 mt-3`}>
          <SvgXml xml={IconMostResentGray} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Bookings history
          </Text>
        </View>

        {getMyServiceBookingsData?.data?.data?.length > 0 && (
          <TouchableOpacity
            style={tw`border border-primary rounded-full px-2 py-1 justify-center items-center`}
            activeOpacity={0.7}
            onPress={() => router.push("/company/bookingsHistory")}
          >
            <Text style={tw`text-black font-PoppinsMedium text-sm`}>
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  // [----------------- refresh function ----------------]
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([
        refetch,
        refetchBookingsHistory,
        getMyBookingsData,
        getMyServiceBookingsData,
      ]);
    } catch (error) {
      console.log(error, "refresh error");
    } finally {
      setRefreshing(false);
    }
  };

  // ------------ is loading component state ------------

  if (isMyBookingsLoading || isMyServiceBookingsLoading) {
    return (
      <View style={tw`flex-1 bg-base_color justify-center items-center`}>
        <ActivityIndicator size="large" color={"blue"} />
      </View>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={getMyServiceBookingsData?.data?.data}
      keyExtractor={(_, index) => index.toString()}
      style={tw`flex-1 bg-base_color`}
      renderItem={({ item }) => {
        return (
          <BookingCard
            key={item?.id}
            item={item}
            index={item?.id}
            onPress={() =>
              router.push({
                pathname: "/company/booking_service_details",
                params: { id: item?.id },
              })
            }
          />
        );
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`px-5 pb-28 gap-3 bg-base_color`}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={() => {
        return (
          <View style={tw`justify-center items-center mt-4 mb-10`}>
            <Text
              style={tw`font-PoppinsSemiBold text-xl items-center text-gray-500`}
            >
              No Booking History
            </Text>
          </View>
        );
      }}
    />
  );
};

export default Bookings;
