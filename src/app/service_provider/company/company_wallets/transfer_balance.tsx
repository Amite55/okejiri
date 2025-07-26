import { IconSendWhite } from "@/assets/icons";
import { ImgTransferBalance } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Transfer_Balance = () => {
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to clipboard!");
  };
  return (
    <View style={tw`flex-1 px-5 bg-base_color justify-between flex-grow pb-4`}>
      <View>
        <BackTitleButton
          pageName={"Transfer balance"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />

        <Image
          style={tw` w-full h-48 `}
          resizeMode="stretch"
          source={ImgTransferBalance}
        />

        <View style={tw`my-6`}>
          <Text style={tw`font-DegularDisplayDemoMedium text-base text-black`}>
            Wallet address
          </Text>
          <View style={tw`h-24 p-4 rounded-2xl border border-gray-300`}>
            <TouchableOpacity
              onPress={() =>
                copyToClipboard("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
              }
            >
              <TextInput
                // style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                placeholder="0x742d35Cc6634C05....................."
                placeholderTextColor={"#535353"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`my-6`}>
          <Text style={tw`font-DegularDisplayDemoMedium text-base text-black`}>
            Amount
          </Text>
          <View
            style={tw`h-18 p-4 rounded-2xl border border-gray-300 flex-row justify-between items-center`}
          >
            <TextInput
              keyboardType="number-pad"
              disableKeyboardShortcuts
              placeholder="  0.00"
              placeholderTextColor={"#535353"}
            />

            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              {" "}
              ₦
            </Text>
          </View>
        </View>
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        // onPress={() => router.push("/company/(Tabs)")}
        titleProps="Send"
        IconProps={IconSendWhite}
        contentStyle={tw`mt-4`}
      />
    </View>
  );
};

export default Transfer_Balance;
