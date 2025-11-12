import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import MasonryList from "@react-native-seoul/masonry-list";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  IconCross,
  IconDeleteRed,
  IconPlus,
  IconSwapGreen,
  IconThreeWhite,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import { useLazyGetPortfoliosQuery } from "@/src/redux/apiSlices/companyProvider/account/portfolioSlice";
import { SvgXml } from "react-native-svg";

const Portfolio = () => {
  const [selectModalVisible, setSelectModalVisible] = React.useState(false);
  const [page, setPage] = useState<number>(1);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [fetchPortfolios, { isLoading, isFetching }] =
    useLazyGetPortfoliosQuery();

  // === Load data from API ===
  const loadPortfolios = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;
      if (!isRefresh) setLoadingMore(true);

      const res = await fetchPortfolios({ page: pageNum }).unwrap();
      const responseData = res?.data || {};
      const newData = responseData?.data || [];
      const currentPage = responseData?.current_page || 1;
      const lastPage = responseData?.last_page || currentPage;

      if (isRefresh) {
        setPortfolios(newData);
      } else {
        const existingIds = new Set(portfolios.map((p) => p.id));
        const uniqueNew = newData.filter((p: any) => !existingIds.has(p.id));
        setPortfolios((prev) => [...prev, ...uniqueNew]);
      }

      setHasMore(newData.length > 0);
      setPage(currentPage + 1);
    } catch (err) {
      console.log("Portfolio fetch error:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // === Refresh ===
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadPortfolios(1, true);
  };

  // === Load More ===
  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetching) {
      loadPortfolios(page);
    }
  };

  useEffect(() => {
    loadPortfolios(1, true);
  }, []);

  return (
    <View style={tw`flex-1 bg-base_color px-3 pb-2`}>
      <MasonryList
        data={portfolios}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <BackTitleButton
            pageName="Portfolio"
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />
        }
        ListFooterComponent={
          <View style={tw`mt-4 mb-8 flex justify-center items-center`}>
            {loadingMore ? (
              <>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={tw`mt-2 text-gray-500`}>Loading more...</Text>
              </>
            ) : !hasMore && portfolios.length > 0 ? (
              <Text style={tw`text-gray-500`}>No more items</Text>
            ) : null}
            <PrimaryButton
              titleProps="Send"
              IconProps={IconPlus}
              contentStyle={tw`mt-4`}
            />
          </View>
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3`}
        style={tw`pt-2`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={tw`relative mb-3 px-1`}>
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={[
                tw`w-full rounded-2xl`,
                { height: Math.random() * 90 + 220 },
              ]}
            />
            <TouchableOpacity
              onPress={() => setSelectModalVisible(true)}
              style={tw`absolute top-3 right-3 justify-center items-center w-10 h-10 rounded-full border border-white`}
            >
              <SvgXml xml={IconThreeWhite} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ========= selected modal ============= */}
      <Modal
        animationType="none"
        transparent={true}
        visible={selectModalVisible}
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            <View style={tw`w-full flex-row justify-between items-center`}>
              <Text style={tw`text-2xl font-bold mt-3`}>Select one</Text>
              <Pressable
                style={tw`p-3`}
                onPress={() => setSelectModalVisible(false)}
              >
                <SvgXml xml={IconCross} />
              </Pressable>
            </View>

            <View style={tw`w-full m-4`}>
              <TouchableOpacity
                style={tw`flex-row justify-center items-center border border-[#0063E580] w-full p-1 rounded-lg gap-2 mb-2`}
              >
                <SvgXml xml={IconSwapGreen} />
                <Text>Swap image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-row justify-center items-center border border-[#C47575] w-full p-1 rounded-lg gap-2`}
              >
                <SvgXml xml={IconDeleteRed} />
                <Text>Delete image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Portfolio;
