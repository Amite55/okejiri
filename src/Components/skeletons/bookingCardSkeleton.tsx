import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import React from "react";
import { View } from "react-native";

export const BookingCardSkeletonCustom = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <SkeletonBox height={120} width="100%" radius={10} />
    </View>
  );
};
