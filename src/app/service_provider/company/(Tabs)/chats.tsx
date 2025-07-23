import { IconSearch } from "@/assets/icons";
import ChatListProfile from "@/src/Components/ChatListProfile";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ChatListData from "@/src/json/ChatListData.json";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Chats = () => {
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
        onPress={() => router.push("/service_provider/company/(Tabs)/account")}
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
              <ChatListProfile
                key={chatItem?.id}
                chatItem={chatItem}
                onPress={() => router.push("/company/messaging")}
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default Chats;
