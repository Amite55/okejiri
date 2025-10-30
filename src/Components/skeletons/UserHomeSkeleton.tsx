import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";
const UserHomeSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-20 gap-5`}
    >
      {/* ===== Header part (Profile + notification) ===== */}
      <View style={tw`flex-row justify-between items-center mt-5`}>
        <Skeleton width={50} height={50} radius={"round"} colorMode="light" />
        <Skeleton width={40} height={40} radius={"round"} colorMode="light" />
      </View>

      {/* ===== Search bar ===== */}
      <Skeleton
        height={56}
        width={"100%"}
        colorMode="light"
        radius={"round"}
        transition={{ type: "timing" }}
      />

      {/* ===== Banner / Carousel ===== */}
      <Skeleton
        height={180}
        width={"100%"}
        colorMode="light"
        // radius={""}
        transition={{ type: "timing" }}
      />

      {/* ===== Service section title ===== */}
      <View style={tw`flex-row justify-between items-center`}>
        <Skeleton height={25} width={120} colorMode="light" />
        <Skeleton height={20} width={60} colorMode="light" />
      </View>

      {/* ===== Horizontal service list ===== */}
      <View style={tw`flex-row gap-3 mt-2`}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={tw`gap-2`}>
            <Skeleton height={160} width={160} colorMode="light" />
            <Skeleton height={20} width={120} colorMode="light" />
          </View>
        ))}
      </View>

      {/* ===== Nearby Service section title ===== */}
      <View style={tw`flex-row justify-between items-center mt-6`}>
        <Skeleton height={25} width={180} colorMode="light" />
        <Skeleton height={20} width={60} colorMode="light" />
      </View>

      {/* ===== Service cards ===== */}
      <View style={tw`gap-4 mt-3`}>
        {[1, 2, 3].map((_, i) => (
          <View
            key={i}
            style={tw`rounded-xl border border-gray-200 bg-white p-3 gap-2`}
          >
            <Skeleton height={120} width={"100%"} colorMode="light" />
            <Skeleton height={15} width={"80%"} colorMode="light" />
            <Skeleton height={15} width={"60%"} colorMode="light" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserHomeSkeleton;
