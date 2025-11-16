import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, View } from "react-native";

const ChatListSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-28 gap-5`}
    >
      {/* ---------- Header Skeleton ---------- */}
      <View style={tw`flex-row items-center gap-3 mt-5`}>
        <Skeleton height={56} width={56} radius={"round"} colorMode="light" />

        <View style={tw`gap-2`}>
          <Skeleton height={16} width={140} colorMode="light" />
          <Skeleton height={16} width={100} colorMode="light" />
        </View>
      </View>

      {/* ---------- Title: Chats ---------- */}
      <Skeleton height={28} width={120} colorMode="light" />

      {/* ---------- Search Bar ---------- */}
      <View style={tw`mt-3`}>
        <Skeleton height={56} width={"100%"} radius={28} colorMode="light" />
      </View>

      {/* ---------- Chat List Items ---------- */}
      <View style={tw`mt-3 gap-3`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={`chat-${i}`}
            style={tw`flex-row items-center bg-white p-3 rounded-2xl gap-3`}
          >
            {/* Avatar */}
            <Skeleton
              height={56}
              width={56}
              radius={"round"}
              colorMode="light"
            />

            {/* Texts */}
            <View style={tw`flex-1 gap-2`}>
              <Skeleton height={16} width={"70%"} colorMode="light" />
              <Skeleton height={14} width={"50%"} colorMode="light" />
            </View>

            {/* Time */}
            <Skeleton height={14} width={40} colorMode="light" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChatListSkeleton;
