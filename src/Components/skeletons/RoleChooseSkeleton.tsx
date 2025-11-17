import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
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
        <Skeleton height={45} width={180} colorMode="light" />
      </View>

      {/* ---------- Banner Image ---------- */}
      <View style={tw`mt-6`}>
        <Skeleton height={260} width={"100%"} radius={20} colorMode="light" />
      </View>

      {/* ---------- Text Section ---------- */}
      <View style={tw`items-center mt-8 gap-3`}>
        <Skeleton height={28} width={"70%"} colorMode="light" />
        <Skeleton height={18} width={"90%"} colorMode="light" />
        <Skeleton height={18} width={"80%"} colorMode="light" />
      </View>

      {/* ---------- USER Button Skeleton ---------- */}
      <View
        style={tw`w-full bg-white bg-opacity-10 rounded-3xl p-4 flex-row items-center justify-between mt-10`}
      >
        <View style={tw`flex-row items-center gap-4`}>
          {/* Icon circle */}
          <Skeleton height={64} width={64} radius={"round"} colorMode="light" />
          {/* Text */}
          <Skeleton height={22} width={120} colorMode="light" />
        </View>

        {/* Arrow */}
        <Skeleton height={22} width={22} radius={"round"} colorMode="light" />
      </View>

      {/* ---------- PROVIDER Button Skeleton ---------- */}
      <View
        style={tw`w-full bg-white bg-opacity-10 rounded-3xl p-4 flex-row items-center justify-between mt-4`}
      >
        <View style={tw`flex-row items-center gap-4`}>
          {/* Icon circle */}
          <Skeleton height={64} width={64} radius={"round"} colorMode="light" />
          {/* Text */}
          <Skeleton height={22} width={150} colorMode="light" />
        </View>

        {/* Arrow */}
        <Skeleton height={22} width={22} radius={"round"} colorMode="light" />
      </View>
    </ScrollView>
  );
};

export default RoleChooseSkeleton;
