import { Skeleton } from "moti/skeleton";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import tw from "../../lib/tailwind";

const ServicePageSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color`}
      contentContainerStyle={tw`pb-8 px-5`}
    >
      {/* ---------- Header part ---------- */}
      <View style={tw`mt-3`}>
        {/* Profile & Notification buttons */}
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Skeleton width={44} height={44} radius={"round"} colorMode="light" />
          <Skeleton width={44} height={44} radius={"round"} colorMode="light" />
        </View>

        {/* Page Title */}
        <Skeleton height={32} width={"40%"} colorMode="light" />
      </View>

      {/* ---------- Services Grid ---------- */}
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        scrollEnabled={false}
        columnWrapperStyle={tw`justify-between mb-5`}
        renderItem={() => (
          <View style={tw`relative items-center`}>
            {/* Service Image */}
            <Skeleton height={190} width={160} radius={16} colorMode="light" />

            {/* Service Name overlay (bottom text blur position er jonno) */}
            <View style={tw`absolute bottom-3`}>
              <Skeleton height={36} width={120} radius={12} colorMode="light" />
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ServicePageSkeleton;
