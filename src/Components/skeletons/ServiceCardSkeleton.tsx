import { Skeleton } from "moti/skeleton";
import React from "react";
import { FlatList, View } from "react-native";
import tw from "../../lib/tailwind";

const ServiceCardSkeleton = () => {
  const dummyArray = [1, 2, 3, 4, 5, 6];

  return (
    <FlatList
      data={dummyArray}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={tw`bg-base_color flex-1 px-5 gap-3 pb-10`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={() => (
        <View
          style={tw`relative flex-row items-center rounded-xl bg-white p-1.5 gap-4`}
        >
          {/* ---------- Image Section ---------- */}
          <Skeleton height={80} width={80} radius={12} colorMode="light" />

          {/* ---------- Text Section ---------- */}
          <View style={tw`flex-1 gap-2`}>
            {/* Title + Price */}
            <View style={tw`flex-row items-center justify-between`}>
              <Skeleton height={18} width={"55%"} colorMode="light" />
              <Skeleton height={18} width={50} colorMode="light" />
            </View>

            {/* Provider Name + Badge */}
            <View style={tw`flex-row items-center gap-2`}>
              <Skeleton height={14} width={100} colorMode="light" />
              <Skeleton
                width={18}
                height={18}
                radius={"round"}
                colorMode="light"
              />
            </View>

            {/* Ratings */}
            <View style={tw`flex-row items-center gap-2`}>
              <Skeleton
                width={14}
                height={14}
                radius={"round"}
                colorMode="light"
              />
              <Skeleton height={14} width={30} colorMode="light" />
            </View>
          </View>

          {/* ---------- Service Name Tag ---------- */}
          <View style={tw`absolute bottom-2 right-1`}>
            <Skeleton height={28} width={96} radius={8} colorMode="light" />
          </View>
        </View>
      )}
    />
  );
};

export default ServiceCardSkeleton;
