import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import tw from "@/src/lib/tailwind";
import React from "react";
import { ScrollView, View } from "react-native";

const RoleChooseSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-10`}
    >
      {/* ---------- Logo ---------- */}
      <View style={tw`items-center mt-6`}>
        <SkeletonBox height={45} width={180} />
      </View>

      {/* ---------- Banner Image ---------- */}
      <View style={tw`mt-6`}>
        <SkeletonBox height={260} width="100%" radius={20} />
      </View>

      {/* ---------- Text Section ---------- */}
      <View style={tw`items-center mt-8 gap-3`}>
        <SkeletonBox height={28} width="70%" />
        <SkeletonBox height={18} width="90%" />
        <SkeletonBox height={18} width="80%" />
      </View>

      {/* ---------- USER Button Skeleton ---------- */}
      <View
        style={tw`w-full bg-white bg-opacity-10 rounded-3xl p-4 flex-row items-center justify-between mt-10`}
      >
        <View style={tw`flex-row items-center gap-4`}>
          {/* Icon circle */}
          <SkeletonCircle size={64} />
          {/* Text */}
          <SkeletonBox height={22} width={120} />
        </View>

        {/* Arrow */}
        <SkeletonCircle size={22} />
      </View>

      {/* ---------- PROVIDER Button Skeleton ---------- */}
      <View
        style={tw`w-full bg-white bg-opacity-10 rounded-3xl p-4 flex-row items-center justify-between mt-4`}
      >
        <View style={tw`flex-row items-center gap-4`}>
          {/* Icon circle */}
          <SkeletonCircle size={64} />
          {/* Text */}
          <SkeletonBox height={22} width={150} />
        </View>

        {/* Arrow */}
        <SkeletonCircle size={22} />
      </View>
    </ScrollView>
  );
};

export default RoleChooseSkeleton;
