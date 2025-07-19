import { IconProfileBadge, IconSearch } from "@/assets/icons";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ChatListData from "@/src/json/ChatListData.json";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const chats = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* ================== profile header component =========== */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/company/(Tabs)/profile")}
      />

      <Text style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}>
        Chats
      </Text>

      {/* ======================= search bar -=-o--------------------------- */}
      <View
        style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2 bg-white rounded-full my-3`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput placeholder="Search chats" />
      </View>

      <View style={tw`gap-1`}>
        {ChatListData?.length === 0 ? (
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
          >
            Your Chat List
          </Text>
        ) : (
          ChatListData?.map((chatItem) => {
            return (
              <TouchableOpacity
                onPress={() => router.push("/company/messaging")}
                key={chatItem?.id}
                style={tw`flex-row justify-start items-center bg-white border-gray-200 p-3.5 rounded-2xl border gap-1`}
              >
                <Image
                  style={tw`w-14 h-14 rounded-full mr-3`}
                  source={{ uri: chatItem?.image }}
                />
                <View>
                  <View style={tw`flex-row justify-between`}>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text
                        style={tw`font-DegularDisplayDemoSemibold text-black text-xl `}
                      >
                        {chatItem?.name}
                      </Text>
                      {chatItem.badge ? (
                        <SvgXml xml={IconProfileBadge} />
                      ) : null}
                    </View>
                    <Text style={tw``}>Time</Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={tw`mt-1 font-DegularDisplayDemoRegular text-base text-black`}
                  >
                    {chatItem?.text}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default chats;
