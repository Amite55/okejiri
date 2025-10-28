import ServiceCard from "@/src/Components/ServiceCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { usePackagesByServiceIdQuery } from "@/src/redux/apiSlices/userProvider/servicesSlices";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const ServiceNearbyHistory = () => {
  const { categoryService, id } = useLocalSearchParams();
  const { data: PackagesByServiceData, isLoading } =
    usePackagesByServiceIdQuery(Number(1));

  return (
    <FlatList
      data={PackagesByServiceData?.data?.packages}
      renderItem={({ item, index }: any) => (
        <ServiceCard
          item={item}
          index={index}
          onPress={() => router.push("/company/serviceDetails")}
        />
      )}
      ListHeaderComponent={() => (
        <BackTitleButton
          pageName={categoryService ? "Booking" : "Services nearby"}
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

export default ServiceNearbyHistory;
