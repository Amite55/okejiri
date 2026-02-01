import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import tw from "../../lib/tailwind";

const ServicePageSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color`}
      contentContainerStyle={tw`pb-8 px-5`}
    >
      {/* ---------- Header part ---------- */}
      <View style={tw`mt-3`}>
        {/* Profile & Notification buttons */}
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <SkeletonCircle size={44} />
          <SkeletonCircle size={44} />
        </View>

        {/* Page Title */}
        <SkeletonBox height={32} width="40%" />
      </View>

      {/* ---------- Services Grid ---------- */}
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        scrollEnabled={false}
        columnWrapperStyle={tw`justify-between mb-5`}
        renderItem={() => (
          <View style={tw`relative items-center`}>
            {/* Service Image */}
            <SkeletonBox height={190} width={160} radius={16} />

            {/* Service Name overlay */}
            <View style={tw`absolute bottom-3`}>
              <SkeletonBox height={36} width={120} radius={12} />
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ServicePageSkeleton;
