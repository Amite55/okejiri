import {
  IconPending,
  IconResolved,
  IconRightArrowCornerGray,
  IconUnderReview,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useMyDisputeQuery } from "@/src/redux/apiSlices/companyProvider/account/myDisputeSlice";
import { router } from "expo-router";
import React, { useState } from "react";
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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const {
    data: disputes,
    isLoading,
    isFetching,
    refetch,
  } = useMyDisputeQuery({});

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.log("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

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
        activeOpacity={0.7}
        onPress={() =>
          router.push({
            pathname: "/service_provider/individual/disputes/disputes_status",
            params: { id: item.id },
          })
        }
        style={tw`h-28 px-4 py-2 rounded-3xl w-full bg-white border-b border-red-400`}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl mb-2`}>
          {item.reason.split(" ").slice(0, 3).join(" ")}
        </Text>
        <View style={tw`flex-row justify-between items-end`}>
          <Text numberOfLines={2} style={tw`flex-1`}>
            {item.details}
          </Text>
          <SvgXml xml={IconRightArrowCornerGray} />
        </View>

        <TouchableOpacity style={tw`absolute -right-2 top-3 z-50`}>
          <SvgXml xml={statusIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Show full screen loader when first time loading
  if (isLoading && !refreshing) {
    return (
      <View style={tw`flex-1 bg-base_color justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-4 text-gray-500`}>Loading disputes...</Text>
      </View>
    );
  }

  return (
    <View style={tw`bg-base_color flex-1`}>
      <FlatList
        data={disputes?.data}
        renderItem={DisputesRenderData}
        keyExtractor={(item, index) => `dispute-${item?.id || index}`}
        ListHeaderComponent={() => (
          <BackTitleButton
            pageName={"My disputes"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base_color px-5 gap-3 `}
        ListFooterComponent={
          <View style={tw`py-4 flex justify-center items-center`}>
            {isFetching && !refreshing ? (
              <>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={tw`mt-2 text-gray-500`}>Updating disputes...</Text>
              </>
            ) : loadingMore ? (
              <>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={tw`mt-2 text-gray-500`}>Loading more...</Text>
              </>
            ) : !hasMore && disputes?.data?.length > 0 ? (
              <Text style={tw`text-gray-500`}>No more disputes to load</Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          !isLoading && !isFetching ? (
            <View style={tw`py-10 flex justify-center items-center`}>
              <Text style={tw`text-gray-500 text-lg mb-2`}>
                No disputes found
              </Text>
              <Text style={tw`text-gray-400 text-center`}>
                You don't have any disputes at the moment.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default My_Disputes;
