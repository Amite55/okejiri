import { IconProfileBadge } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IChatProfileProps {
  id: number;
  profileImage?: any;
  userName?: string;
  profileBadge?: boolean;
  chatText?: string;
  time?: string;
  onPress?: () => void;
}

const ChatListProfile = ({ chatItem, onPress }: IChatProfileProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row justify-start items-center bg-white border-gray-200 p-3.5 rounded-2xl border gap-1`}
    >
      <Image
        style={tw`w-14 h-14 rounded-full mr-3`}
        source={{ uri: chatItem?.avatar }}
        contentFit="contain"
      />

      <View style={tw`flex-1`}>
        {/* -------- FIXED PART -------- */}
        <View style={tw`flex-row justify-between items-center w-full`}>
          <View style={tw`flex-row items-center gap-2 flex-1`}>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-black text-xl`}
            >
              {chatItem?.name}
            </Text>

            {chatItem?.badge ? <SvgXml xml={IconProfileBadge} /> : null}
          </View>

          <Text style={tw`font-DegularDisplayBlack text-base`}>
            {chatItem?.last_message_time}
          </Text>
        </View>
        {/* ---------------------------- */}

        <Text
          numberOfLines={1}
          style={tw`mt-1 font-DegularDisplayDemoRegular text-base text-black`}
        >
          {chatItem?.last_message?.length > 40
            ? `${chatItem?.last_message?.slice(0, 40)}...`
            : chatItem?.last_message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListProfile;
