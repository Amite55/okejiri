import {
  IconBalance,
  IconCopy,
  IconCrossWhite,
  IconDownloadBlack,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
  IconTransfer,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import {
  useDepositSuccessMutation,
  useGetRecentTransactionsQuery,
} from "@/src/redux/apiSlices/userProvider/account/availableBalanceSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import PaymentWebview from "../serviceBookings/paymentWebview";

const Wallet_Index = () => {
  const { wallet_address, wallet_balance } = useLocalSearchParams();
  const [balance, setBalance] = useState<number | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isWabViewOpen, setIsWebviewOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // === pagination states ===
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // API ------------------------------
  const {
    data: recentTransactions,
    isLoading,
    isFetching: isTransactionsFetching,
  } = useGetRecentTransactionsQuery({ per_page: 10, page });
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isFetching: isProfileFetching,
  } = useProfileQuery({});
  const [depositAmount, { isLoading: depositLoading }] =
    useDepositSuccessMutation();

  // === Load data ===//
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

  // =================== handle refresh control ===================
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([isTransactionsFetching, isProfileFetching]);
    } catch (error: any) {
      console.log(error, "Profile Refresh not success!");
    } finally {
      setRefreshing(false);
    }
  }, [isTransactionsFetching, isProfileFetching]);

  // ------------------ deposit function handler ====================
  const handleDeposit = async (res: any) => {
    try {
      const intentInfo = {
        amount: Number(balance),
        currency: "NGN",
      };
      if (res.type === "cancel") {
        console.log("User cancelled payment");
        handleCloseModalPress();
        setIsWebviewOpen(false);
        setBalance(null);
        return;
      }
      if (res.type === "success") {
        const depositData = res.data;
        const depositResponse = await depositAmount({
          deposit_amount: intentInfo.amount,
          currency: intentInfo.currency,
          payment_intent_id: depositData?.transaction_id,
        }).unwrap();
        if (depositResponse) {
          setTimeout(() => {
            handleCloseModalPress();
            setIsWebviewOpen(false);
            router.replace("/company/(Tabs)");
          }, 1000);
        }
      }
    } catch (error: any) {
      console.log(error, "Deposit not success =======>");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    }
  };

  // === Copy text ===
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    router.push({
      pathname: "/Toaster",
      params: { res: "Wallet address copied to clipboard" },
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
        pageName={"Your Wallet"}
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
          activeOpacity={0.8}
          onPress={handlePresentModalPress}
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

  const flutterwaveHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://checkout.flutterwave.com/v3.js"></script>
</head>
<body>
  <script>
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-8ae5ae7873e218ce9a69eadc088ca540-X",
      tx_ref: "TX_${Date.now()}",
      amount: ${balance},
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email:    "${profileData?.data?.email || ""}",
        phone_number: "${profileData?.data?.phone || ""}",
        name:  "${profileData?.data?.name || ""}",
      },
      callback: function (data) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "success", data: data })
        );
      },
      onclose: function () {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "cancel" })
        );
      }
    });
  </script>
</body>
</html>
`;

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
        style={tw`flex-1 bg-base_color`}
      />
      {/* -0---------------------------- order address edit modal --------------------------- */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          onDismiss={() => {
            setIsWebviewOpen(false);
            setBalance(null);
          }}
          ref={bottomSheetModalRef}
          snapPoints={["98%"]}
          enableContentPanningGesture={false}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          containerStyle={tw`bg-gray-500 bg-opacity-20`}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          )}
        >
          {isWabViewOpen ? (
            <BottomSheetView style={{ flex: 1 }}>
              <PaymentWebview
                html={flutterwaveHTML}
                onMessage={handleDeposit}
              />
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView
              style={tw`flex-1`}
              contentContainerStyle={tw`  bg-white flex-grow justify-between`}
            >
              {/* ----------------- header title part ---------------- */}
              <View>
                <View
                  style={tw`flex-row items-center justify-between bg-primary py-2 px-4 rounded-t-2xl`}
                >
                  <View />
                  <Text style={tw`font-PoppinsSemiBold text-base text-white`}>
                    Enter Deposit Balance
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => bottomSheetModalRef.current?.close()}
                    style={tw`bg-slate-300 rounded-full p-2`}
                  >
                    <SvgXml xml={IconCrossWhite} />
                  </TouchableOpacity>
                </View>

                <View style={tw`px-4 pt-6`}>
                  <Text
                    style={tw`font-DegularDisplayDemoSemibold text-lg text-black pb-1`}
                  >
                    Amount
                  </Text>
                  <View
                    style={tw`h-12 px-4 rounded-full border border-gray-300 flex-row justify-between items-center`}
                  >
                    <TextInput
                      keyboardType="number-pad"
                      style={tw`flex-1 text-black text-lg font-DegularDisplayDemoMedium`}
                      placeholder="0.00"
                      placeholderTextColor={"#535353"}
                      onChangeText={(value: any) => setBalance(value)}
                    />

                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                    >
                      ₦
                    </Text>
                  </View>
                </View>
              </View>

              <View style={tw`px-4`}>
                {depositLoading ? (
                  <ActivityIndicator color={tw.color("primary")} size="large" />
                ) : (
                  <PrimaryButton
                    titleProps="Deposit"
                    onPress={() => {
                      if (balance >= 800) {
                        setIsWebviewOpen(true);
                      } else {
                        router.push({
                          pathname: `/Toaster`,
                          params: { res: "Minimum deposit amount is ₦800" },
                        });
                      }
                    }}
                    contentStyle={tw`h-12 mt-6`}
                  />
                )}
              </View>
            </BottomSheetScrollView>
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default Wallet_Index;
