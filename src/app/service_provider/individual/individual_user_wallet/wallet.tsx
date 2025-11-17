import {
  IconBalance,
  IconCopy,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
  IconTransfer,
  IconWithdraw,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { useWithdrawMutation } from "@/src/redux/apiSlices/IndividualProvider/account/availableBalanceSlice";
import { useGetAvailableBalanceQuery } from "@/src/redux/apiSlices/stripeSlices";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Wallet_Index = () => {
  const { data: userProfileInfo, isLoading } = useProfileQuery({});
  const stripeAccountId = userProfileInfo?.data?.stripe_account_id;
  const {
    data: availableAmount,
    isLoading: availableAmountLoading,
    refetch: refetchAvailableBalance,
  } = useGetAvailableBalanceQuery(String(stripeAccountId), {
    skip: !stripeAccountId,
  });
  const referralBonus = Number(userProfileInfo?.data?.referral_balance) || 0;
  const earned = Number(availableAmount?.data?.available?.[0]?.amount) || 0;
  const earnedFormatted = earned;
  const referralFormatted = referralBonus;
  const totalBalance = earnedFormatted + referralFormatted;

  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [withdraw, { isLoading: isWithdrawing }] = useWithdrawMutation();

  if (isLoading || availableAmountLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-2`}>Loading profile...</Text>
      </View>
    );
  }

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    router.push({
      pathname: "/Toaster",
      params: { res: "Copied to clipboard!" },
    });
  };

  const handleWithdraw = async () => {
    const amountToWithdraw = Number(withdrawAmount);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please enter a valid positive amount.", type: "error" },
      });
      return;
    }
    if (amountToWithdraw > totalBalance) {
      router.push({
        pathname: "/Toaster",
        params: {
          res: "Insufficient balance to withdraw this amount.",
          type: "error",
        },
      });
      return;
    }

    try {
      const response = await withdraw({
        amount: amountToWithdraw,
        currency: "NGN",
      }).unwrap();

      router.push({
        pathname: "/Toaster",
        params: {
          res: response.message || "Withdrawal successful!",
          type: "success",
        },
      });
      setWithdrawModalVisible(false);
      setWithdrawAmount("");
      refetchAvailableBalance();
    } catch (error: any) {
      console.error("Withdrawal error:", error);
      router.push({
        pathname: "/Toaster",
        params: {
          res: error?.data?.message || "An error occurred during withdrawal.",
          type: "error",
        },
      });
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1`}
      contentContainerStyle={tw`pb-6 px-5 bg-base_color`}
    >
      <BackTitleButton
        pageName={"Your wallet"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />
      {/* ---------------- card balance -------------- */}
      <View
        style={tw`bg-white rounded-xl py-4 justify-center items-center gap-3 my-4`}
      >
        <View
          style={tw`border border-primary w-14 h-14 rounded-full justify-center items-center`}
        >
          <SvgXml xml={IconBalance} />
        </View>

        {/*title */}
        <Text style={tw`font-DegularDisplayDemoRegular text-black text-2xl`}>
          Available balance
        </Text>

        {/* ✅ total balance = earned + referral */}
        <Text style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}>
          ₦{totalBalance.toFixed(2)}
        </Text>

        <View style={tw`flex-row items-center`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-base text-regularText`}
          >
            Earned:
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            ₦{earnedFormatted.toFixed(2)}
          </Text>
        </View>

        <View style={tw`flex-row items-center`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-base text-regularText`}
          >
            Referral bonus:
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            ₦{referralFormatted.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* ------------ wallet refer code ----------------- */}

      <View style={tw`border border-gray-300 rounded-2xl p-4`}>
        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoSemibold text-xl text-black `}>
            Wallet address
          </Text>
          <TouchableOpacity
            onPress={() =>
              copyToClipboard(userProfileInfo?.data?.wallet_address)
            }
          >
            <SvgXml xml={IconCopy} />
          </TouchableOpacity>
        </View>

        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          {userProfileInfo?.data?.wallet_address}
        </Text>
      </View>

      {/*  ----------------  */}

      <View style={tw`flex-row justify-center items-center gap-4 my-7`}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/company/wallets/transfer_balance",
              params: {
                from: "provider_wallet",
                account_type: "referral_balance",
              },
            })
          }
          style={tw`flex-row justify-center items-center gap-3 w-48 h-12 border border-gray-300 rounded-2xl`}
        >
          <SvgXml xml={IconTransfer} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Transfer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setWithdrawModalVisible(true)} // Open modal on press
          style={tw`flex-row justify-center items-center gap-3 w-48 h-12 border border-gray-300 rounded-2xl`}
        >
          <SvgXml xml={IconWithdraw} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      {/* ------------------------ Recent transactions ----------------- */}
      <View>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          Recent transactions
        </Text>
        <View style={tw`gap-4 my-3`}>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => {
            return (
              <View
                key={index}
                style={tw`flex-row items-center justify-between`}
              >
                <View style={tw`flex-row items-center gap-4`}>
                  <SvgXml xml={IconRightArrowCornerPrimaryColor} />
                  <View>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                    >
                      Service title goes here
                    </Text>
                    <View style={tw`flex-row gap-2 items-center `}>
                      <Text
                        style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
                      >
                        Jhon Doe
                      </Text>
                      <SvgXml xml={IconProfileBadge} />
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-primary  text-2xl `}
                >
                  ₦200.00
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Withdraw Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isWithdrawModalVisible}
        onRequestClose={() => setWithdrawModalVisible(false)}
      >
        <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-t-2xl p-6`}>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-2xl text-black mb-6 text-center`}
            >
              Withdraw Funds
            </Text>

            <View style={tw`mb-6`}>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg text-black mb-2`}
              >
                Amount
              </Text>
              <View
                style={tw`flex-row  items-center border border-gray-300 rounded-full px-4 py-1`}
              >
                <TextInput
                  style={tw`flex-1 font-DegularDisplayDemoRegular text-xl text-black`}
                  keyboardType="numeric"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChangeText={(text) => setWithdrawAmount(text)}
                />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                >
                  ₦
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleWithdraw}
              disabled={isWithdrawing}
              style={tw`bg-primary rounded-full py-4 items-center`}
            >
              {isWithdrawing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={tw`font-DegularDisplayDemoSemibold text-white text-xl`}
                >
                  Confirm Withdrawal
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setWithdrawModalVisible(false)}
              style={tw`mt-4 py-3 items-center`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-regularText text-lg`}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Wallet_Index;
