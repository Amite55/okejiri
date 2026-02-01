import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import tw from "@/src/lib/tailwind";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";

const { width } = Dimensions.get("window");

const BookingsSkeletonCustom = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-28 gap-5`}
    >
      {/* ---------- Header part ---------- */}
      <View style={tw`flex-row items-center gap-3 mt-5`}>
        <SkeletonCircle size={56} />
        <View style={tw`gap-2`}>
          <SkeletonBox height={16} width={140} />
          <SkeletonBox height={16} width={100} />
        </View>
      </View>

      {/* ---------- Title ---------- */}
      <View style={tw`mt-3`}>
        <SkeletonBox height={28} width={160} />
      </View>

      {/* ---------- My Bookings Cards ---------- */}
      <View style={tw`gap-3 mt-3`}>
        {[1, 2, 3].map((i) => (
          <View
            key={`my-booking-${i}`}
            style={tw`flex-row items-center bg-white p-2 rounded-xl gap-3`}
          >
            <SkeletonBox height={80} width={80} radius={10} />
            <View style={tw`flex-1 gap-2`}>
              <SkeletonBox height={16} width={width * 0.5} />
              <SkeletonBox height={14} width={width * 0.4} />
              <SkeletonBox height={14} width={width * 0.3} />
            </View>
          </View>
        ))}
      </View>

      {/* ---------- Bookings History Header ---------- */}
      <View style={tw`flex-row items-center justify-between mt-6`}>
        <SkeletonBox height={20} width={160} />
        <SkeletonBox height={24} width={60} radius={12} />
      </View>

      {/* ---------- History Cards ---------- */}
      <View style={tw`gap-3 mt-3`}>
        {[1, 2, 3].map((i) => (
          <View
            key={`history-${i}`}
            style={tw`flex-row items-center bg-white p-2 rounded-xl gap-3`}
          >
            <SkeletonBox height={80} width={80} radius={10} />
            <View style={tw`flex-1 gap-2`}>
              <SkeletonBox height={16} width={width * 0.5} />
              <SkeletonBox height={14} width={width * 0.4} />
              <SkeletonBox height={14} width={width * 0.3} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BookingsSkeletonCustom;
