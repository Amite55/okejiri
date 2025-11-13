import ServiceCard from "@/src/Components/ServiceCard";
import ServiceCardSkeleton from "@/src/Components/skeletons/ServiceCardSkeleton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useServiceNearbyQuery } from "@/src/redux/apiSlices/userProvider/homeSlices";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const ServiceNearbyHistory = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [nearByData, setNearByData] = useState<any[]>([]);

  // ------------------ api end point ------------------
  const {
    data: nearByServiceData,
    isLoading: isNearByServiceLoading,
    isFetching,
  } = useServiceNearbyQuery({ per_page: 10, page: currentPage });
  // -------------------- pagination ---------------------
  useEffect(() => {
    if (nearByServiceData?.data?.data?.length > 0) {
      setNearByData((prev) => [...prev, ...nearByServiceData.data.data]);
    } else {
      setHasMorePages(false);
    }
  }, [nearByServiceData]);
  // --------------------- skeleton ---------------------
  if (isFetching && currentPage === 1) {
    return <ServiceCardSkeleton />;
  }
  // ------------------ when no data found ------------------
  if (!isFetching && nearByData.length === 0) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-lg text-primary`}>No service data found</Text>
      </View>
    );
  }
  return (
    <FlatList
      onEndReachedThreshold={0.3}
      onEndReached={() => {
        if (hasMorePages && !isFetching) {
          setCurrentPage((prev) => prev + 1);
        }
      }}
      // data={nearByServiceData?.data?.data}
      data={nearByData}
      renderItem={({ item, index }: any) => (
        <ServiceCard
          item={item}
          index={index}
          onPress={() =>
            router.push({
              pathname: "/company/serviceDetails",
              params: { service_id: item?.id },
            })
          }
        />
      )}
      ListHeaderComponent={() => (
        <BackTitleButton
          pageName={"Services nearby"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
      )}
      keyExtractor={(item, index) => (item.id || item._id || index).toString()}
      contentContainerStyle={tw`bg-base_color  px-5 gap-3 pb-10`}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color`}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={() =>
        isFetching && hasMorePages ? (
          <ActivityIndicator size="large" color="#FF6600" style={tw`my-5`} />
        ) : null
      }
    />
  );
};

export default ServiceNearbyHistory;
