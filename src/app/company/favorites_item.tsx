import ServiceCard from "@/src/Components/ServiceCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetFavoritesQuery } from "@/src/redux/apiSlices/userProvider/account/favoritesSlices";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Favorites_Item = () => {
  // --- Pagination States ---
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);

  const [fetchFavoritesQuery, { isLoading, isFetching }] =
    useLazyGetFavoritesQuery();

  // --- Fetch Data Function ---
  const fetchFavorites = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || isLoadingMore) && !isRefresh) return;
      if (!isRefresh) setIsLoadingMore(true);

      const res = await fetchFavoritesQuery({
        page: pageNum,
      }).unwrap();

      const responseData = res?.data || {};
      const newFavorites = responseData?.data || [];
      const pagination = responseData;
      setFavorites((prev) => {
        if (isRefresh) return newFavorites;
        const existingIds = new Set(prev.map((fav) => fav.id));
        const uniqueFavorites = newFavorites.filter(
          (fav: any) => !existingIds.has(fav.id)
        );
        return [...prev, ...uniqueFavorites];
      });

      const current = pagination.current_page || pageNum;
      const last = pagination.last_page || 1;
      setHasMorePages(current < last);
      setCurrentPage(current + 1);
    } catch (err) {
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
    fetchFavorites(1, true);
  };

  // --- Handle Load More ---
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMorePages && !isFetching && !isRefreshing) {
      fetchFavorites(currentPage);
    }
  };

  // --- Initial Fetch ---
  useEffect(() => {
    fetchFavorites(1, true);
  }, []);

  // --- Render Footer Loader ---
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={tw`py-4 flex items-center`}>
        <ActivityIndicator size="small" color={tw.color("primary")} />
        <Text style={tw`text-gray-500 mt-2`}>Loading more favorites...</Text>
      </View>
    );
  };
  // --- Render Empty State ---
  const renderEmpty = () => (
    <View style={tw`flex-1 justify-center items-center mt-10`}>
      <Text style={tw`text-gray-500 text-lg`}>No favorites yet</Text>
      <Text style={tw`text-gray-400 text-center mt-2`}>
        Your favorite items will appear here
      </Text>
    </View>
  );

  if (isLoading && favorites.length === 0) {
    return (
      <View style={tw` bg-base_color`}>
        <BackTitleButton
          pageName={"Favorites"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-base_color`}>
      <FlatList
        data={favorites}
        renderItem={({ item }: any) => {
          // console.log(item?.package?.service?.id, "this is item ------------");
          return (
            <ServiceCard
              item={item?.package}
              index={item?.id}
              onPress={
                () =>
                  router.push({
                    pathname: "/company/serviceDetails",
                    params: { service_id: item?.package?.service?.id },
                  })
                // router.push({
                //   pathname:
                //     "/company/previous_item_Book/previous_booking_confirmation",
                //   params: { id: item?.id },
                // })
              }
            />
          );
        }}
        ListHeaderComponent={() => (
          <BackTitleButton
            pageName={"Favorites"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />
        )}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`bg-base_color flex-1 px-5 gap-3 pb-10 `}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Favorites_Item;
