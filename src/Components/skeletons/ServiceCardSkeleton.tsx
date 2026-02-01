import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
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
          <SkeletonBox height={80} width={80} radius={12} />

          {/* ---------- Text Section ---------- */}
          <View style={tw`flex-1 gap-2`}>
            {/* Title + Price */}
            <View style={tw`flex-row items-center justify-between`}>
              <SkeletonBox height={18} width="55%" />
              <SkeletonBox height={18} width={50} />
            </View>

            {/* Provider Name + Badge */}
            <View style={tw`flex-row items-center gap-2`}>
              <SkeletonBox height={14} width={100} />
              <SkeletonCircle size={18} />
            </View>

            {/* Ratings */}
            <View style={tw`flex-row items-center gap-2`}>
              <SkeletonCircle size={14} />
              <SkeletonBox height={14} width={30} />
            </View>
          </View>

          {/* ---------- Service Name Tag ---------- */}
          <View style={tw`absolute bottom-2 right-1`}>
            <SkeletonBox height={28} width={96} radius={8} />
          </View>
        </View>
      )}
    />
  );
};

export default ServiceCardSkeleton;
