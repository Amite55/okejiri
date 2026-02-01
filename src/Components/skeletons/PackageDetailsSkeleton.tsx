import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "../../lib/tailwind";

const PackageDetailsSkeletonCustom = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-8 gap-5`}
    >
      {/* ---------- Banner part ---------- */}
      <View style={tw`relative`}>
        <SkeletonBox height={240} width="100%" radius={0} />

        {/* Back button */}
        <View style={tw`absolute top-2 left-1`}>
          <SkeletonCircle size={56} />
        </View>

        {/* Favorite button */}
        <View style={tw`absolute bottom-3 right-2`}>
          <SkeletonCircle size={56} />
        </View>
      </View>

      {/* ---------- Title: Services details ---------- */}
      <View style={tw`self-center mt-2`}>
        <SkeletonBox height={28} width="60%" />
      </View>

      {/* ---------- Package detail items ---------- */}
      <View style={tw`gap-3 mt-2`}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={tw`flex-row items-center gap-3`}>
            <SkeletonCircle size={8} />
            <SkeletonBox height={20} width="85%" />
          </View>
        ))}
      </View>

      {/* ---------- Price and Add to cart ---------- */}
      <View style={tw`flex-row items-center gap-3`}>
        <SkeletonBox height={56} width="75%" radius={28} />
        <SkeletonCircle size={56} />
      </View>

      {/* ---------- Distance ---------- */}
      <View style={tw`mt-4`}>
        <SkeletonBox height={56} width="100%" />
      </View>

      {/* ---------- Provider info ---------- */}
      <View style={tw`flex-row items-center justify-between mt-4`}>
        <View style={tw`flex-row items-center gap-3`}>
          <SkeletonCircle size={44} />
          <View style={tw`gap-2`}>
            <SkeletonBox height={16} width={100} />
            <SkeletonBox height={16} width={80} />
          </View>
        </View>

        {/* message button */}
        <SkeletonBox height={44} width={100} radius={12} />
      </View>
    </ScrollView>
  );
};

export default PackageDetailsSkeletonCustom;
