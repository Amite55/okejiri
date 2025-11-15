import ServiceCard from "@/src/Components/ServiceCard";
import ServiceCardSkeleton from "@/src/Components/skeletons/ServiceCardSkeleton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { usePackagesByServiceIdQuery } from "@/src/redux/apiSlices/userProvider/servicesSlices";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

const CategoryByService = () => {
  const { categoryService, service_id } = useLocalSearchParams();

  // ------------------ api end point ------------------
  const { data: PackagesByServiceData, isLoading } =
    usePackagesByServiceIdQuery(Number(service_id));

  // ------------------ loading skeleton ------------------
  if (isLoading) {
    return <ServiceCardSkeleton />;
  }
  // =================== no data found ==================
  if (PackagesByServiceData?.data?.packages?.length === 0) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-lg text-primary`}>No service data found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={PackagesByServiceData?.data?.packages}
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
          pageName={categoryService ? categoryService : "Services "}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
      )}
      keyExtractor={(item, index) => (item.id || item._id || index).toString()}
      contentContainerStyle={tw`bg-base_color flex-1 px-5 gap-3 pb-10`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CategoryByService;
