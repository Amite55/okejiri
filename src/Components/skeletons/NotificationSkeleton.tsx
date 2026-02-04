import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import tw from "@/src/lib/tailwind";
import React from "react";
import { ScrollView, View } from "react-native";

interface IProps {
  dummyArray?: number;
}

const NotificationSkeletonCustom = ({ dummyArray = 4 }: IProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-5`}
    >
      {/* ---------- Header Section ---------- */}
      <View style={tw`flex-row items-center mb-5 gap-3`}>
        <SkeletonCircle size={36} />
        <SkeletonBox height={24} width={160} />
      </View>

      {/* ---------- Notification Cards ---------- */}
      <View style={tw`gap-3`}>
        {Array.from({ length: dummyArray }).map((_, i) => (
          <View
            key={i}
            style={tw`flex-row items-start bg-white bg-opacity-10 rounded-xl p-3 gap-3`}
          >
            {/* Avatar/Icon */}
            <SkeletonCircle size={48} />

            {/* Text Content */}
            <View style={tw`flex-1 gap-2`}>
              <SkeletonBox height={16} width="75%" />
              <SkeletonBox height={14} width="90%" />
              <SkeletonBox height={12} width="40%" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default NotificationSkeletonCustom;
