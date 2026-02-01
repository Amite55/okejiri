import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import tw from "@/src/lib/tailwind";
import React from "react";
import { ScrollView, View } from "react-native";

const ChatListSkeletonCustom = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-28 gap-5`}
    >
      {/* ---------- Header Skeleton ---------- */}
      <View style={tw`flex-row items-center gap-3 mt-5`}>
        <SkeletonCircle size={56} />

        <View style={tw`gap-2`}>
          <SkeletonBox height={16} width={140} />
          <SkeletonBox height={16} width={100} />
        </View>
      </View>

      {/* ---------- Title: Chats ---------- */}
      <SkeletonBox height={28} width={120} />

      {/* ---------- Search Bar ---------- */}
      <View style={tw`mt-3`}>
        <SkeletonBox height={56} width="100%" radius={28} />
      </View>

      {/* ---------- Chat List Items ---------- */}
      <View style={tw`mt-3 gap-3`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={`chat-${i}`}
            style={tw`flex-row items-center bg-white p-3 rounded-2xl gap-3`}
          >
            {/* Avatar */}
            <SkeletonCircle size={56} />

            {/* Texts */}
            <View style={tw`flex-1 gap-2`}>
              <SkeletonBox height={16} width="70%" />
              <SkeletonBox height={14} width="50%" />
            </View>

            {/* Time */}
            <SkeletonBox height={14} width={40} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChatListSkeletonCustom;
