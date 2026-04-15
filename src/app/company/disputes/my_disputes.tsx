import {
  IconPending,
  IconResolved,
  IconRightArrowCornerGray,
  IconUnderReview,
} from "@/assets/icons";
import NotificationSkeletonCustom from "@/src/Components/skeletons/NotificationSkeleton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyMyDisputeQuery } from "@/src/redux/apiSlices/companyProvider/account/myDisputeSlice";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const My_Disputes = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [disputesData, setDisputesData] = useState<any[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);

  const [getMyDispute, { isLoading: isDisputeLoading }] =
    useLazyMyDisputeQuery();

  const fetchDisputes = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        if ((isDisputeLoading || isLoadingMore) && !isRefresh) return;
        if (!isRefresh) setIsLoadingMore(true);
        const res = await getMyDispute({
          page: pageNum,
          per_page: 10,
        }).unwrap();
        const responseData = res || {};
        const newDisputes = responseData?.data || [];
        setDisputesData((prev) => {
          if (isRefresh) return newDisputes;
          const existingIds = new Set(prev.map((dispute: any) => dispute.id));
          const uniqueDisputes = newDisputes.filter(
            (dispute: any) => !existingIds.has(dispute.id),
          );
          return [...prev, ...uniqueDisputes];
        });
        const current = responseData.current_page || pageNum;
        const last = responseData.last_page || 1;
        setHasMorePages(current < last);
        setPage(current + 1);
      } catch (err) {
        console.log(err, "not get disputes==================");
      } finally {
        setRefreshing(false);
        setIsLoadingMore(false);
      }
    },
    [getMyDispute],
  );

  // --- Initial Fetch ---
  useEffect(() => {
    fetchDisputes(1, true);
  }, [getMyDispute]);

  // ----------- render item for disputes ------------- //
  const DisputesRenderData = ({ item }: { item: any }) => {
    let statusIcon;
    if (item?.status === "Pending") {
      statusIcon = IconPending;
    } else if (item?.status === "Under review") {
      statusIcon = IconUnderReview;
    } else if (item?.status === "Resolved") {
      statusIcon = IconResolved;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          router.push({
            pathname: "/company/disputes/disputes_status",
            params: { id: item?.id },
          })
        }
        style={tw`h-28 px-4 py-2 rounded-3xl w-full bg-white border-b border-red-400`}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl mb-2`}>
          {item?.reason.split(" ").slice(0, 3).join(" ")}
        </Text>
        <View style={tw`flex-row justify-between items-end`}>
          <Text numberOfLines={2} style={tw`flex-1`}>
            {item?.details}
          </Text>
          <SvgXml xml={IconRightArrowCornerGray} />
        </View>

        <TouchableOpacity style={tw`absolute -right-2 top-3 z-50`}>
          <SvgXml xml={statusIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // ----------- handle load more ------------- //
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMorePages) {
      setHasMorePages(true);
      fetchDisputes(page);
    }
  };

  // ============ onRefresh =============== //
  const refetch = useCallback(async () => {
    try {
      setRefreshing(true);
      fetchDisputes(1, true);
    } catch (error) {
      console.log(error, "your failed------->");
    } finally {
      setRefreshing(false);
    }
  }, [fetchDisputes]);
  // ================= loading skeleton ================== //
  if (isDisputeLoading) {
    return <NotificationSkeletonCustom />;
  }

  return (
    <FlatList
      data={disputesData}
      renderItem={DisputesRenderData}
      keyExtractor={(item, index) => `dispute-${item?.id || index}`}
      ListHeaderComponent={() => (
        <BackTitleButton
          pageName={"My disputes "}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refetch} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color`}
      contentContainerStyle={tw`bg-base_color px-5 gap-3 `}
      ListFooterComponent={
        <View style={tw`py-4  flex justify-center items-center`}>
          {loadingMore ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text style={tw`mt-2 text-gray-500`}>Loading more...</Text>
            </>
          ) : !hasMore && disputesData.length > 0 ? (
            <Text style={tw`text-gray-500`}>No more disputes to load</Text>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        !isDisputeLoading ? (
          <View style={tw`py-4 flex justify-center items-center`}>
            <Text style={tw`text-gray-500`}>No disputes found</Text>
          </View>
        ) : null
      }
    />
  );
};

export default My_Disputes;
