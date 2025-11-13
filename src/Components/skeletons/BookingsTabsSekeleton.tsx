import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";

const { width } = Dimensions.get("window");

const BookingsSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-28 gap-5`}
    >
      {/* ---------- Header part ---------- */}
      <View style={tw`flex-row items-center gap-3 mt-5`}>
        <Skeleton height={56} width={56} radius={"round"} colorMode="light" />
        <View style={tw`gap-2`}>
          <Skeleton height={16} width={140} colorMode="light" />
          <Skeleton height={16} width={100} colorMode="light" />
        </View>
      </View>

      {/* ---------- Title ---------- */}
      <View style={tw`mt-3`}>
        <Skeleton height={28} width={160} colorMode="light" />
      </View>

      {/* ---------- My Bookings Cards ---------- */}
      <View style={tw`gap-3 mt-3`}>
        {[1, 2, 3].map((i) => (
          <View
            key={`my-booking-${i}`}
            style={tw`flex-row items-center bg-white p-2 rounded-xl gap-3`}
          >
            <Skeleton height={80} width={80} radius={10} colorMode="light" />
            <View style={tw`flex-1 gap-2`}>
              <Skeleton height={16} width={width * 0.5} colorMode="light" />
              <Skeleton height={14} width={width * 0.4} colorMode="light" />
              <Skeleton height={14} width={width * 0.3} colorMode="light" />
            </View>
          </View>
        ))}
      </View>

      {/* ---------- Bookings History Header ---------- */}
      <View style={tw`flex-row items-center justify-between mt-6`}>
        <Skeleton height={20} width={160} colorMode="light" />
        <Skeleton height={24} width={60} radius={12} colorMode="light" />
      </View>

      {/* ---------- History Cards ---------- */}
      <View style={tw`gap-3 mt-3`}>
        {[1, 2, 3].map((i) => (
          <View
            key={`history-${i}`}
            style={tw`flex-row items-center bg-white p-2 rounded-xl gap-3`}
          >
            <Skeleton height={80} width={80} radius={10} colorMode="light" />
            <View style={tw`flex-1 gap-2`}>
              <Skeleton height={16} width={width * 0.5} colorMode="light" />
              <Skeleton height={14} width={width * 0.4} colorMode="light" />
              <Skeleton height={14} width={width * 0.3} colorMode="light" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BookingsSkeleton;
