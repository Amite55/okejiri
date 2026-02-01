import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import tw from "@/src/lib/tailwind";
import React from "react";
import { ScrollView, View } from "react-native";

const UserHomeSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-20 gap-5`}
    >
      {/* ===== Header (Profile + Notification) ===== */}
      <View style={tw`flex-row justify-between items-center mt-5`}>
        <SkeletonCircle size={50} />
        <SkeletonCircle size={40} />
      </View>

      {/* ===== Search bar ===== */}
      <SkeletonBox height={56} width="100%" radius={28} />

      {/* ===== Banner / Carousel ===== */}
      <SkeletonBox height={180} width="100%" radius={12} />

      {/* ===== Service section title ===== */}
      <View style={tw`flex-row justify-between items-center`}>
        <SkeletonBox height={25} width={120} />
        <SkeletonBox height={20} width={60} />
      </View>

      {/* ===== Horizontal service list ===== */}
      <View style={tw`flex-row gap-3 mt-2`}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={tw`gap-2`}>
            <SkeletonBox height={160} width={160} radius={12} />
            <SkeletonBox height={20} width={120} />
          </View>
        ))}
      </View>

      {/* ===== Nearby Service section title ===== */}
      <View style={tw`flex-row justify-between items-center mt-6`}>
        <SkeletonBox height={25} width={180} />
        <SkeletonBox height={20} width={60} />
      </View>

      {/* ===== Service cards ===== */}
      <View style={tw`gap-4 mt-3`}>
        {[1, 2, 3].map((_, i) => (
          <View
            key={i}
            style={tw`rounded-xl border border-gray-200 bg-white p-3 gap-2`}
          >
            <SkeletonBox height={120} width="100%" radius={10} />
            <SkeletonBox height={15} width="80%" />
            <SkeletonBox height={15} width="60%" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserHomeSkeleton;
