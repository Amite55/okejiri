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
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Wallet_Index = () => {
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to clipboard!");
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1  `}
      contentContainerStyle={tw`pb-6 px-5 bg-base_color`}
    >
      <BackTitleButton
        pageName={"Your wallet"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
        contentStyle={tw`px-5`}
      />

      {/* ---------------- card balance -------------- */}
      <View
        style={tw`bg-white rounded-xl h-52 justify-center items-center gap-3 my-4`}
      >
        <View
          style={tw` border border-primary w-14 h-14 rounded-full justify-center items-center`}
        >
          <SvgXml xml={IconBalance} />
        </View>
        <Text style={tw`font-DegularDisplayDemoRegular text-black text-2xl `}>
          Available balance
        </Text>
        <Text style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}>
          ₦1000.50
        </Text>
      </View>

      {/* ------------ wallet refer code ----------------- */}

      <View style={tw`border border-gray-300 rounded-2xl p-4`}>
        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoSemibold text-xl text-black `}>
            Wallet address
          </Text>
          <TouchableOpacity
            onPress={() =>
              copyToClipboard(" 0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
            }
          >
            <SvgXml xml={IconCopy} />
          </TouchableOpacity>
        </View>

        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          0x742d35Cc6634C0532925a3b844Bc454e4438f44e
        </Text>
      </View>

      {/*  ----------------  */}

      <View style={tw`flex-1 flex-row justify-center items-center gap-4 my-7`}>
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
    </ScrollView>
  );
};

export default Wallet_Index;
