import BookingCard from "@/src/Components/BookingCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyBookingHistoryQuery } from "@/src/redux/apiSlices/userProvider/account/bookingHistory";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";

const BookingsHistory = () => {
  // --- Pagination States ---
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [fetchBookingHistoryQuery, { isLoading, isFetching, error }] =
    useLazyBookingHistoryQuery();

  // --- Fetch Data Function ---
  const fetchBookings = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || isLoadingMore) && !isRefresh) return;
      if (!isRefresh) setIsLoadingMore(true);
      setApiError(null);
      const res = await fetchBookingHistoryQuery({
        page: pageNum,
        per_page: 10,
      }).unwrap();
      // Handle different response structures
      let responseData, newBookings, pagination;

      if (res?.data) {
        // If response has data property
        responseData = res.data;
        newBookings = responseData?.data || responseData?.bookings || [];
        pagination = responseData;
      } else {
        // If response is direct
        responseData = res;
        newBookings = res?.data || res?.bookings || [];
        pagination = res;
      }
      setBookings((prev) => {
        if (isRefresh) return newBookings;
        const existingIds = new Set(prev.map((booking) => booking.id));
        const uniqueBookings = newBookings.filter(
          (booking: any) => !existingIds.has(booking.id)
        );
        return [...prev, ...uniqueBookings];
      });

      // Safe pagination handling
      const current = parseInt(pagination?.current_page) || pageNum;
      const last = parseInt(pagination?.last_page) || 1;

      setHasMorePages(current < last);
      setCurrentPage(current + 1);
    } catch (err: any) {
      setApiError(err?.data?.message || "Failed to load bookings");
      // Show alert for backend errors
      if (err?.data?.message?.includes("Unsupported operand types")) {
        Alert.alert(
          "Server Error",
          "There is a temporary issue with the server. Please try again later.",
          [{ text: "OK" }]
        );
      }
    } finally {
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  // --- Handle Pull-to-Refresh ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setHasMorePages(true);
    setApiError(null);
    fetchBookings(1, true);
  };

  // --- Handle Load More ---
  const handleLoadMore = () => {
    if (
      !isLoadingMore &&
      hasMorePages &&
      !isFetching &&
      !isRefreshing &&
      !apiError
    ) {
      fetchBookings(currentPage);
    }
  };

  // --- Initial Fetch ---
  useEffect(() => {
    fetchBookings(1, true);
  }, []);

  // --- Retry fetching ---
  const handleRetry = () => {
    setApiError(null);
    fetchBookings(1, true);
  };

  // --- Render Footer Loader ---
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={tw`py-4 flex items-center`}>
        <ActivityIndicator size="small" color={tw.color("primary")} />
        <Text style={tw`text-gray-500 mt-2`}>Loading more bookings...</Text>
      </View>
    );
  };

  // --- Render Empty State ---
  const renderEmpty = () => (
    <View style={tw`flex-1 justify-center items-center mt-10`}>
      <Text style={tw`text-gray-500 text-lg`}>No bookings yet</Text>
      <Text style={tw`text-gray-400 text-center mt-2`}>
        Your booking history will appear here
      </Text>
    </View>
  );

  // --- Render Error State ---
  const renderError = () => (
    <View style={tw`flex-1 justify-center items-center mt-10 px-5`}>
      <Text style={tw`text-red-500 text-lg mb-2`}>Failed to load bookings</Text>
      <Text style={tw`text-gray-500 text-center mb-4`}>
        {apiError || "Please try again"}
      </Text>
      <Text style={tw`text-primary underline`} onPress={handleRetry}>
        Tap to retry
      </Text>
    </View>
  );

  // Show skeleton during initial load
  if (isLoading && bookings.length === 0 && !apiError) {
    return (
      <View style={tw`flex-1 bg-base_color`}>
        <BackTitleButton
          pageName={"Bookings history"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      renderItem={({ item }: any) => (
        <BookingCard
          item={item}
          index={item?.id}
          onPress={() =>
            router.push({
              pathname: "/company/booking_service_details",
              params: { id: item?.id },
            })
          }
        />
      )}
      ListHeaderComponent={() => (
        <View>
          <BackTitleButton
            pageName={"Bookings history"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />
          {apiError && (
            <View style={tw`mx-5 mb-3 p-3 bg-red-50 rounded-lg`}>
              <Text style={tw`text-red-500 text-sm`}>{apiError}</Text>
              <Text
                style={tw`text-primary text-sm underline mt-1`}
                onPress={handleRetry}
              >
                Tap to retry
              </Text>
            </View>
          )}
        </View>
      )}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={!isLoading && apiError ? renderError : renderEmpty}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`bg-base_color flex-1 px-5 gap-3 pb-10`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default BookingsHistory;
