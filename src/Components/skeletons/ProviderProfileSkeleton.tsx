import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import tw from "@/src/lib/tailwind";
import React from "react";
import { ScrollView, View } from "react-native";

const ProviderProfileSkeletonCustom = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-4`}
      contentContainerStyle={tw`pb-10`}
    >
      {/* ---------- Cover Image ---------- */}
      <SkeletonBox height={200} width="100%" radius={0} />

      {/* ---------- Profile Image + Name ---------- */}
      <View style={tw`items-center mt-[-40px]`}>
        <SkeletonCircle size={100} />
        <View style={tw`mt-3 items-center gap-2`}>
          <SkeletonBox height={20} width={160} />
          <SkeletonBox height={16} width={100} />
        </View>
      </View>

      {/* ---------- Rating Section ---------- */}
      <View style={tw`mt-3 flex-row justify-center items-center gap-2`}>
        <SkeletonBox height={14} width={30} />
        <SkeletonCircle size={14} />
        <SkeletonBox height={14} width={40} />
      </View>

      {/* ---------- Report & Message Buttons ---------- */}
      <View style={tw`mt-10 flex-row gap-4`}>
        <SkeletonBox height={48} width="48%" radius={24} />
        <SkeletonBox height={48} width="48%" radius={24} />
      </View>

      {/* ---------- Provider Details Card ---------- */}
      <View style={tw`mt-10 border border-gray-300 rounded-lg p-3 gap-3`}>
        <SkeletonBox height={16} width="80%" />
        <SkeletonBox height={16} width="60%" />
        <SkeletonBox height={16} width="90%" />
      </View>
    </ScrollView>
  );
};

export default ProviderProfileSkeletonCustom;
