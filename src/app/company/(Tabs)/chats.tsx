import { IconSearch } from "@/assets/icons";
import ChatListProfile from "@/src/Components/ChatListProfile";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import tw from "@/src/lib/tailwind";
import {
  useLazyGetChartListQuery,
  useMarkAsReadMutation,
} from "@/src/redux/apiSlices/messagingSlices";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDebounce } from "use-debounce";

const Chats = () => {
  const [search, setSearch] = React.useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  // =============== API ===============
  const [triggerSearch, { data: searchResult, isLoading: isSearchLoading }] =
    useLazyGetChartListQuery();
  const [markAsRead] = useMarkAsReadMutation();

  const listToRender = searchResult?.data?.data ?? [];

  const readData = async () => {
    try {
      await triggerSearch({
        page: 1,
        per_page: 20,
        role: "",
        search: "",
      });
    } catch (error) {
      console.log(error, "data not fetch --------->");
    }
  };

  useEffect(() => {
    readData();
  }, []);

  // ========= Search change হলে call হবে =========
  useEffect(() => {
    if (debouncedSearch?.length === 0) {
      readData();
    } else {
      // search হলে search API call
      triggerSearch({
        page: 1,
        per_page: 20,
        role: "",
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch]);

  // =========== next routing ===========
  const handleNext = async (id: any) => {
    await markAsRead({ receiver_id: id });
    router.push({
      pathname: "/company/messaging",
      params: { receiverId: id },
    });
  };

  return (
    <View style={tw`flex-1 bg-base_color px-5 pb-28`}>
      {/* ===== Header ===== */}
      <FlatList
        data={listToRender || []}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-2`}
        ListHeaderComponent={
          <>
            <ServiceProfileHeaderInfo
              onPress={() => router.push("/company/(Tabs)/profile")}
              onPressNotification={() =>
                router.push("/company/userNotifications/userNotification")
              }
            />

            <Text
              style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-2`}
            >
              Chats
            </Text>

            {/* ===== Search Bar ===== */}
            <View
              style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2 bg-white rounded-full my-3`}
            >
              <SvgXml xml={IconSearch} />
              <TextInput
                value={search}
                placeholder="Search chats"
                placeholderTextColor={"#535353"}
                onChangeText={(text) => setSearch(text)}
                style={tw`flex-1 text-base text-black font-DegularDisplayDemoRegular`}
              />
            </View>

            {listToRender?.length === 0 && (
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center my-4`}
              >
                Your Chat List
              </Text>
            )}
          </>
        }
        renderItem={({ item }) => {
          return (
            <ChatListProfile
              chatItem={item}
              isRead={item?.is_read}
              onPress={() => {
                handleNext(item?.user_id);
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Chats;
