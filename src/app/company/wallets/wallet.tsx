import {
  IconBalance,
  IconCopy,
  IconDownloadBlack,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
  IconTransfer,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetRecentTransactionsQuery } from "@/src/redux/apiSlices/userProvider/account/availableBalanceSlices";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";

const Wallet_Index = () => {
  const { wallet_address, wallet_balance } = useLocalSearchParams();

  // === pagination states ===
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // API
  const { data: recentTransactions, isLoading } = useGetRecentTransactionsQuery(
    { per_page: 10, page }
  );

  // === Load data ===
  useEffect(() => {
    if (recentTransactions?.data?.data) {
      const newItems = recentTransactions.data.data;

      if (newItems.length > 0) {
        setListData((prev) => [...prev, ...newItems]);
      } else {
        setHasMore(false);
      }
    }
  }, [recentTransactions]);

  // === Copy text ===
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Copied to clipboard",
    });
  };

  // ------------------ Render Each Transaction ------------------
  const renderTransaction = ({ item }: any) => (
    <View style={tw`flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center gap-4`}>
        <SvgXml xml={IconRightArrowCornerPrimaryColor} />
        <View>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            {item.service_title || "Service title"}
          </Text>
          <View style={tw`flex-row gap-2 items-center`}>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
            >
              {item.receiver?.name || "Unknown"}
            </Text>
            {item.receiver?.kyc_status === "Verified" && (
              <SvgXml xml={IconProfileBadge} />
            )}
          </View>
        </View>
      </View>

      <Text style={tw`font-DegularDisplayDemoMedium text-primary text-2xl`}>
        ₦{item.amount || "0.00"}
      </Text>
    </View>
  );

  // ------------------ FlatList Header ------------------
  const ListHeader = () => (
    <View style={tw``}>
      <BackTitleButton
        pageName={"Your wallet"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      {/* Balance Card */}
      <View
        style={tw`bg-white rounded-xl h-52 justify-center items-center gap-3 my-4`}
      >
        <View
          style={tw`border border-primary w-14 h-14 rounded-full justify-center items-center`}
        >
          <SvgXml xml={IconBalance} />
        </View>
        <Text style={tw`font-DegularDisplayDemoRegular text-black text-2xl`}>
          Available balance
        </Text>
        <Text style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}>
          ₦ {wallet_balance || "0.00"}
        </Text>
      </View>

      {/* Wallet Address */}
      <View style={tw`border border-gray-300 rounded-2xl p-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}>
            Wallet address
          </Text>
          <TouchableOpacity
            disabled={!wallet_address}
            onPress={() => copyToClipboard(wallet_address as string)}
          >
            <SvgXml xml={IconCopy} />
          </TouchableOpacity>
        </View>
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          {wallet_address || "N/A"}
        </Text>
      </View>

      {/* Transfer / Deposit */}
      <View style={tw`flex-row justify-center items-center gap-4 my-7`}>
        <TouchableOpacity
          onPress={() => router.push("/company/wallets/transfer_balance")}
          style={tw`flex-row justify-center items-center gap-3 flex-1 h-12 border border-gray-300 rounded-2xl`}
        >
          <SvgXml xml={IconTransfer} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Transfer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row justify-center items-center gap-3 flex-1 h-12 border border-gray-300 rounded-2xl`}
        >
          <SvgXml xml={IconDownloadBlack} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Deposit
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
        Recent transactions
      </Text>
      <View style={tw`h-4`} />
    </View>
  );

  return (
    <FlatList
      data={listData}
      renderItem={renderTransaction}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.3}
      onEndReached={() => {
        if (!isLoading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }}
      ListFooterComponent={
        isLoading ? (
          <View style={tw`py-5`}>
            <ActivityIndicator size="large" />
          </View>
        ) : !hasMore ? (
          <View style={tw`py-4 items-center`}>
            <Text style={tw`text-gray-500 text-base`}>No more data</Text>
          </View>
        ) : null
      }
      ListHeaderComponent={<ListHeader />}
      contentContainerStyle={tw`bg-base_color pb-10 px-5 gap-4`}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Wallet_Index;
