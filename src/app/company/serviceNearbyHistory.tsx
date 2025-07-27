import ServiceCard from "@/src/Components/ServiceCard";

import CleaningData from "@/src/json/CleaningData.json";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const serviceNearbyHistory = () => {
  return (
    <FlatList
      data={CleaningData}
      renderItem={({ item, index }: any) => (
        <ServiceCard
          item={item}
          index={index}
          onPress={() => router.push("/company/serviceDetails")}
        />
      )}
      ListHeaderComponent={() => (
        <BackTitleButton
          pageName={"Services nearby"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />
      )}
      keyExtractor={(item) => item.Id.toString()}
      contentContainerStyle={tw`pt-4  bg-base_color px-5 gap-3 pb-10`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default serviceNearbyHistory;
