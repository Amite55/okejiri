import { IconProfileBadge } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const ChatListProfile = ({ chatItem, onPress, isRead }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        tw`flex-row items-center border-gray-100 px-4 py-3 rounded-2xl border gap-3`,
        isRead ? tw`bg-white` : tw`bg-blue-50`,
      ]}
    >
      {/* Avatar with online dot */}
      <View>
        <Image
          style={tw`w-12 h-12 rounded-full`}
          source={{ uri: chatItem?.avatar }}
          contentFit="cover"
        />
        {!isRead && (
          <View
            style={tw`absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white`}
          />
        )}
      </View>

      {/* Content */}
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-center`}>
          {/* Name + Badge */}
          <View style={tw`flex-row items-center gap-1 flex-shrink`}>
            <Text
              numberOfLines={1}
              style={tw`font-DegularDisplayDemoSemibold text-black text-base`}
            >
              {chatItem?.name}
            </Text>
            {chatItem?.badge ? <SvgXml xml={IconProfileBadge} /> : null}
          </View>

          {/* Time */}
          <Text style={tw`font-DegularDisplayBlack text-xs text-gray-500 ml-2`}>
            {chatItem?.last_message_time}
          </Text>
        </View>

        {/* Last message + unread badge */}
        <View style={tw`flex-row justify-between items-center mt-0.5`}>
          <Text
            numberOfLines={1}
            style={[
              tw`text-sm flex-1 mr-2`,
              isRead
                ? tw`font-DegularDisplayDemoRegular text-gray-400`
                : tw`font-DegularDisplayDemoSemibold text-black`,
            ]}
          >
            {chatItem?.last_message}
          </Text>

          {/* Unread count badge */}
          {!isRead && (
            <View
              style={tw`bg-blue-500 rounded-full min-w-5 h-5 justify-center items-center px-1`}
            >
              <Text style={tw`text-white text-xs font-bold`}>1</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListProfile;
