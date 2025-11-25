import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";

interface IProps {
  dummyArray?: number;
}

const NotificationSkeleton = ({ dummyArray = 4 }: IProps) => {
  // const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-5`}
    >
      {/* ---------- Header Section ---------- */}
      <View style={tw`flex-row items-center mb-5`}>
        <Skeleton width={36} height={36} radius={"round"} colorMode="light" />
        <Skeleton height={24} width={160} colorMode="light" />
      </View>

      {/* ---------- Notification Cards ---------- */}
      <View style={tw`gap-3`}>
        {Array.from({ length: dummyArray }).map((_, i) => (
          <View
            key={i}
            style={tw`flex-row items-start bg-white bg-opacity-10 rounded-xl p-3 gap-3`}
          >
            {/* Avatar/Icon */}
            <Skeleton
              height={48}
              width={48}
              radius={"round"}
              colorMode="light"
            />

            {/* Text Content */}
            <View style={tw`flex-1 gap-2`}>
              <Skeleton height={16} width={"75%"} colorMode="light" />
              <Skeleton height={14} width={"90%"} colorMode="light" />
              <Skeleton height={12} width={"40%"} colorMode="light" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default NotificationSkeleton;
