import { IconSendWhite } from "@/assets/icons";
import { ImgTransferBalance } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useTransfer_balanceMutation } from "@/src/redux/apiSlices/IndividualProvider/account/availableBalanceSlice";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ALL_ACCOUNT_TYPES = [
  { id: 1, name: "Earned balance", value: "referral_balance" },
  { id: 2, name: "Deposited balance", value: "wallet_balance" },
];

const REFERRAL_ONLY = [
  { id: 1, name: "Earned balance", value: "referral_balance" },
];

const Transfer_Balance = () => {
  const params = useLocalSearchParams<{
    from?: string;
    account_type?: string;
  }>();

  const isFromProviderWallet = params?.from === "provider_wallet";

  const dropdownData = isFromProviderWallet ? REFERRAL_ONLY : ALL_ACCOUNT_TYPES;

  const [isFocus, setIsFocus] = React.useState(false);
  const [selectedAccountType, setSelectedAccountType] = React.useState<
    string | null
  >(
    isFromProviderWallet
      ? (params?.account_type as string) || "referral_balance"
      : null
  );
  const [amount, setAmount] = React.useState<string>("");
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const [transferBalance, { isLoading: isTransferBalanceLoading }] =
    useTransfer_balanceMutation();

  const handleTransferBalance = async () => {
    if (!amount || !walletAddress || !selectedAccountType) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please enter amount ,wallet address and account type" },
      });
      return;
    }

    const transferData = {
      amount: Number(amount),
      wallet_address: walletAddress,
      account_type: selectedAccountType,
    };

    try {
      const response = await transferBalance(transferData).unwrap();
      if (response) {
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message || (response as any) },
        });
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    } catch (error: any) {
      console.log("error", error);
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || "Something went wrong" },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={tw`flex-1 px-5 bg-base_color `}
          contentContainerStyle={[
            tw`justify-between flex-grow `,
            isKeyboardVisible ? tw`pb-10` : tw`pb-1`,
          ]}
        >
          <View>
            <BackTitleButton
              pageName={"Transfer balance"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />

            <Image
              style={tw` w-full h-48 `}
              resizeMode="stretch"
              source={ImgTransferBalance}
            />

            {/* Wallet address */}
            <View style={tw`my-6`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-black pb-1`}
              >
                Wallet address
              </Text>
              <View style={tw`h-24 p-4 rounded-2xl border border-gray-300`}>
                <TextInput
                  style={tw`flex-1 text-black text-base`}
                  placeholder="0x742d35Cc6634C05....................."
                  placeholderTextColor={"#535353"}
                  onChangeText={(value: any) => setWalletAddress(value)}
                />
              </View>
            </View>

            {/* Select account */}
            <View>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-black pb-1`}
              >
                Select account
              </Text>

              <Dropdown
                style={[
                  tw`h-12 border border-gray-300 rounded-2xl px-4`,
                  isFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={tw`text-base`}
                selectedTextStyle={tw`text-base`}
                data={dropdownData}
                maxHeight={300}
                labelField="name"
                valueField="value"
                dropdownPosition="bottom"
                placeholder={
                  selectedAccountType
                    ? dropdownData.find((d) => d.value === selectedAccountType)
                        ?.name || "Select account"
                    : !isFocus
                    ? "Select account"
                    : "..."
                }
                value={selectedAccountType || undefined}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setIsFocus(false);
                  setSelectedAccountType(item.value);
                }}
                disable={isFromProviderWallet}
              />
            </View>

            {/* Amount */}
            <View style={tw`my-6`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-black pb-1`}
              >
                Amount
              </Text>
              <View
                style={tw`h-18 p-4 rounded-2xl border border-gray-300 flex-row justify-between items-center`}
              >
                <TextInput
                  keyboardType="number-pad"
                  style={tw`flex-1 text-black text-base`}
                  placeholder="0.00"
                  placeholderTextColor={"#535353"}
                  onChangeText={(value: any) => setAmount(value)}
                />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                >
                  ₦
                </Text>
              </View>
            </View>
          </View>

          {/* Send button */}
          <PrimaryButton
            onPress={handleTransferBalance}
            titleProps={isTransferBalanceLoading ? "Sending..." : "Send"}
            IconProps={IconSendWhite}
            contentStyle={tw`mt-4`}
            disabled={isTransferBalanceLoading}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Transfer_Balance;
