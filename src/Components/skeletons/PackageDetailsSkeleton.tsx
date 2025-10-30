import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "../../lib/tailwind";

const PackageDetailsSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-8 gap-5`}
    >
      {/* ---------- Banner part ---------- */}
      <View style={tw`relative`}>
        <Skeleton height={240} width={"100%"} colorMode="light" />

        {/* Back button */}
        <View style={tw`absolute top-2 left-1`}>
          <Skeleton width={56} height={56} radius={"round"} colorMode="light" />
        </View>

        {/* Favorite button */}
        <View style={tw`absolute bottom-3 right-2`}>
          <Skeleton width={56} height={56} radius={"round"} colorMode="light" />
        </View>
      </View>

      {/* ---------- Title: Services details ---------- */}
      <Skeleton
        height={28}
        width={"60%"}
        colorMode="light"
        style={tw`self-center mt-2`}
      />

      {/* ---------- Package detail items ---------- */}
      <View style={tw`gap-3 mt-2`}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={tw`flex-row items-center gap-3`}>
            <Skeleton width={8} height={8} radius={"round"} colorMode="light" />
            <Skeleton height={20} width={"85%"} colorMode="light" />
          </View>
        ))}
      </View>

      {/* ---------- Price and Add to cart ---------- */}
      <View style={tw`flex-row items-center gap-3`}>
        <Skeleton
          height={56}
          width={"75%"}
          radius={"round"}
          colorMode="light"
        />
        <Skeleton height={56} width={56} radius={"round"} colorMode="light" />
      </View>

      {/* ---------- Distance ---------- */}
      <View style={tw`mt-4`}>
        <Skeleton height={56} width={"100%"} colorMode="light" />
      </View>

      {/* ---------- Provider info ---------- */}
      <View style={tw`flex-row items-center justify-between mt-4`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Skeleton width={44} height={44} radius={"round"} colorMode="light" />
          <View style={tw`gap-2`}>
            <Skeleton height={16} width={100} colorMode="light" />
            <Skeleton height={16} width={80} colorMode="light" />
          </View>
        </View>

        {/* message button */}
        <Skeleton height={44} width={100} colorMode="light" />
      </View>
    </ScrollView>
  );
};

export default PackageDetailsSkeleton;
