import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";
import tw from "../../lib/tailwind";

const ProviderProfileSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-base_color px-4`}>
      {/* ---------- Cover Image ---------- */}
      <Skeleton
        height={200}
        width={"100%"}
        colorMode="light"
        transition={{ type: "timing" }}
      />

      {/* ---------- Profile Image + Name ---------- */}
      <View style={tw`items-center mt-[-40px]`}>
        <Skeleton
          height={100}
          width={100}
          radius={"round"}
          colorMode="light"
          transition={{ type: "timing" }}
        />
        <View style={tw`mt-3 items-center gap-2`}>
          <Skeleton height={20} width={160} colorMode="light" />
          <Skeleton height={16} width={100} colorMode="light" />
        </View>
      </View>

      {/* ---------- Rating Section ---------- */}
      <View style={tw`mt-3 flex-row justify-center items-center gap-2`}>
        <Skeleton height={14} width={30} colorMode="light" />
        <Skeleton height={14} width={14} radius={"round"} colorMode="light" />
        <Skeleton height={14} width={40} colorMode="light" />
      </View>

      {/* ---------- Report & Message Buttons ---------- */}
      <View style={tw`mt-10 flex-row gap-4`}>
        <Skeleton
          height={48}
          width={"48%"}
          radius={"round"}
          colorMode="light"
          transition={{ type: "timing" }}
        />
        <Skeleton
          height={48}
          width={"48%"}
          radius={"round"}
          colorMode="light"
          transition={{ type: "timing" }}
        />
      </View>

      {/* ---------- Provider Details Card ---------- */}
      <View style={tw`mt-10 border border-gray-300 rounded-lg p-3 gap-3`}>
        <Skeleton height={16} width={"80%"} colorMode="light" />
        <Skeleton height={16} width={"60%"} colorMode="light" />
        <Skeleton height={16} width={"90%"} colorMode="light" />
      </View>
    </View>
  );
};

export default ProviderProfileSkeleton;
