import { IconCopy } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetMyReferralsQuery } from "@/src/redux/apiSlices/userProvider/account/referralFriendsSlices";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";

const Refer_Friend = () => {
  const { referCode } = useLocalSearchParams();

  // ================== pagination states ==================//
  const [page, setPage] = useState<number>(1);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

  // ================== API hook (lazy) ==================//
  const [getMyReferrals, { isLoading, isFetching }] =
    useLazyGetMyReferralsQuery();

  // ================== copy to clipboard ==================//
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Copied to clipboard",
    });
  };

  // ================== load referrals (with pagination) ==================//
  const loadReferrals = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;

      if (isRefresh) {
        setRefreshing(true);
        if (pageNum === 1) setIsFirstLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await getMyReferrals({ page: pageNum }).unwrap();
      const responseData = res?.data || {};
      const newData = responseData?.data || [];
      const currentPage = responseData?.current_page || pageNum;
      const lastPage = responseData?.last_page;

      if (isRefresh) {
        setReferrals(newData);
      } else {
        setReferrals((prev) => {
          const existingIds = new Set(prev.map((item: any) => item.id));
          const uniqueNew = newData.filter(
            (item: any) => !existingIds.has(item.id)
          );
          if (uniqueNew.length === 0) {
            setHasMore(false);
          }

          return [...prev, ...uniqueNew];
        });
      }

      if (typeof lastPage === "number") {
        setHasMore(currentPage < lastPage);
      } else {
        setHasMore(newData.length > 0);
      }

      setPage(currentPage + 1);
    } catch (err) {
      setHasMore(false);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setIsFirstLoading(false);
    }
  };

  // ================== pull to refresh ==================//
  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    loadReferrals(1, true);
  };

  // ================== infinite scroll load more ==================//
  const handleLoadMore = () => {
    if (!hasMore) return;
    if (!loadingMore && !isFetching && !isLoading && page > 1) {
      loadReferrals(page);
    }
  };

  // ================== initial load ==================//
  useEffect(() => {
    loadReferrals(1, true);
  }, []);

  // ================== render item ==================
  const renderReferralItem = ({ item }: any) => {
    const user = item?.referred_user;
    const name = user?.name || "Unknown User";
    const email = user?.email || "No email";
    const avatar = user?.avatar || ImgProfileImg;
    const reward = item?.referral_rewards ?? "0.00";

    return (
      <View
        style={tw`flex-row justify-between items-center p-5 bg-white rounded-xl mb-3`}
      >
        <View style={tw`flex-row items-center gap-3`}>
          <Image
            style={tw`w-16 h-16 rounded-full`}
            source={
              typeof avatar === "string" ? { uri: avatar } : (avatar as any)
            }
          />
          <View>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              numberOfLines={1}
            >
              {email}
            </Text>
          </View>
        </View>
        <Text style={tw`font-DegularDisplayDemoMedium text-xl text-success600`}>
          ₦{reward}
        </Text>
      </View>
    );
  };

  // ================== initial loader ==================//
  if (isFirstLoading && !refreshing && referrals.length === 0) {
    return (
      <View style={tw`flex-1 bg-base_color justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // ================== main render ==================//
  return (
    <View style={tw`bg-base_color flex-1`}>
      <FlatList
        data={referrals}
        keyExtractor={(item, index) => (item?.id ?? index).toString()}
        renderItem={renderReferralItem}
        contentContainerStyle={tw`px-5 pb-10 bg-base_color`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <>
            <BackTitleButton
              pageName={"Refer a friend"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />

            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-2`}
            >
              Your referral code
            </Text>

            <View
              style={tw`flex-row justify-between items-center bg-white rounded-full h-14 px-6 mt-2`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                numberOfLines={1}
              >
                {referCode}
              </Text>
              <TouchableOpacity
                style={tw`p-2`}
                onPress={() => copyToClipboard(referCode as string)}
              >
                <SvgXml xml={IconCopy} />
              </TouchableOpacity>
            </View>

            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-10 mb-3`}
            >
              Your referrals
            </Text>
          </>
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={tw`py-4 items-center`}>
              <ActivityIndicator size="small" />
              <Text style={tw`mt-2 text-gray-500`}>Loading more...</Text>
            </View>
          ) : !hasMore && referrals.length > 0 ? (
            <View style={tw`py-4 items-center`}>
              <Text style={tw`text-gray-500`}>No more referrals</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          !isFirstLoading && !refreshing ? (
            <View style={tw`py-10 items-center`}>
              <Text style={tw`text-lg text-gray-600`}>
                You haven’t referred anyone yet.
              </Text>
            </View>
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default Refer_Friend;
