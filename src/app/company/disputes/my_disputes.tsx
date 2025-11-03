import {
  IconPending,
  IconResolved,
  IconRightArrowCornerGray,
  IconUnderReview,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyMyDisputeQuery } from "@/src/redux/apiSlices/userProvider/account/myDisputesSlices";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const [disputes, setDisputes] = useState<any[]>([]);

  const [fetchDisputes, { isLoading, isFetching }] = useLazyMyDisputeQuery();

  const loadDisputes = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;
      if (!isRefresh) setLoadingMore(true);

      const res = await fetchDisputes({ page: pageNum }).unwrap();
      const responseData = res?.data || {};
      const newData = responseData?.data || [];
      const currentPage = responseData?.current_page || 1;
      const lastPage = responseData?.last_page || currentPage;

      if (isRefresh) {
        setDisputes(newData);
      } else {
        const existingIds = new Set(disputes.map((d) => d.id));
        const uniqueNew = newData.filter((d: any) => !existingIds.has(d.id));
        setDisputes((prev) => [...prev, ...uniqueNew]);
      }

      setHasMore(newData.length > 0);
      setPage(currentPage + 1);
    } catch (err) {
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadDisputes(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetching) {
      loadDisputes(page);
    }
  };

  useEffect(() => {
    loadDisputes(1, true);
  }, []);

  console.log("🗂️ disputes list:", disputes.length, "items");

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
        onPress={() =>
          router.push({
            pathname: "/company/disputes/disputes_status",
            params: { id: item.id },
          })
        }
        style={[
          tw`  h-28 px-4 py-2 rounded-3xl w-full bg-white border-b border-red-400`,
        ]}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl  mb-2`}>
          {item.reason.split(" ").slice(0, 5).join(" ")}
        </Text>
        <View style={tw`flex-row justify-between items-end  `}>
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

  return (
    <FlatList
      data={disputes}
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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`bg-base_color flex-1 px-5 gap-3 pb-10`}
      ListFooterComponent={
        <View style={tw`py-4 mb-44 flex justify-center items-center`}>
          {loadingMore ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text style={tw`mt-2 text-gray-500`}>Loading more...</Text>
            </>
          ) : !hasMore && disputes.length > 0 ? (
            <Text style={tw`text-gray-500`}>No more disputes to load</Text>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        !isLoading ? (
          <View style={tw`py-10 flex justify-center items-center`}>
            <Text style={tw`text-gray-500`}>No disputes found</Text>
          </View>
        ) : null
      }
    />
  );
};

export default My_Disputes;

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
      onPress={() => router.push("/company/disputes/disputes_status")}
      style={[
        tw`  h-28 px-4 py-2 rounded-3xl w-full bg-white border-b border-red-400`,
      ]}
    >
      <Text style={tw`font-DegularDisplayDemoMedium text-2xl mb-2`}>
        Provider harassed me
      </Text>
      <View style={tw`flex-row justify-between items-end  `}>
        <Text numberOfLines={2} style={tw`flex-1`}>
          Lorem ipsum dolor sit amet consectetur. Blandit pharetra adipiscing
          neque
        </Text>
        <SvgXml xml={IconRightArrowCornerGray} />
      </View>

      <TouchableOpacity style={tw`absolute -right-2 top-3 z-50`}>
        <SvgXml xml={statusIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
