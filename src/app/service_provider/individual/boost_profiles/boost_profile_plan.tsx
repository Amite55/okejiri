import { IconPayCardWhite } from "@/assets/icons";
import { ImgBoostPlan } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useBoostMyProfilePostMutation,
  useGetSettingQuery,
} from "@/src/redux/apiSlices/companyProvider/account/boostProfileSlice";
import { useCreatePaymentIntentMutation } from "@/src/redux/apiSlices/stripeSlices";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// ------------------ static dropdown value ----------------- //
const dropdownData = [
  { label: "3 days", value: "3" },
  { label: "7 days", value: "7" },
  { label: "15 days", value: "15" },
  { label: "30 days", value: "30" },
];

const Boost_Profile_Plan = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  // ..................payment works.................//
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [boostMyProfilePost] = useBoostMyProfilePostMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // ......... Api intragre ..........//
  const { data: settingProfile, isLoading: settingProfileLoading } =
    useGetSettingQuery({});

  // ----------- dynamic price mapping ---------------- //
  if (settingProfileLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  const getSelectedPrice = () => {
    if (!settingProfile?.data || !value) return null;

    const prices = {
      "3": settingProfile.data.three_day_boosting_price,
      "7": settingProfile.data.seven_day_boosting_price,
      "15": settingProfile.data.fifteen_day_boosting_price,
      "30": settingProfile.data.thirty_day_boosting_price,
    };

    return prices[value] || null;
  };

  const selectedPrice = getSelectedPrice();

  const handlePayment = async () => {
    if (!selectedPrice || !value) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please select a plan first!" },
      });
      return;
    }

    setIsProcessing(true);

    try {
      const paymentIntentRes = await createPaymentIntent({
        amount: selectedPrice,
        currency: "NGN",
      }).unwrap();

      const clientSecret = paymentIntentRes?.data?.client_secret;
      const paymentIntentId =
        paymentIntentRes?.data?.id || paymentIntentRes?.data?.payment_intent_id;

      if (!clientSecret) {
        throw new Error("Client secret missing!");
      }

      const initSheet = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Your App Name",
      });

      if (initSheet.error) {
        throw new Error(initSheet.error.message);
      }

      const presentSheet = await presentPaymentSheet();

      if (presentSheet.error) {
        router.push({
          pathname: "/Toaster",
          params: { res: presentSheet.error.message },
        });
        return;
      }

      const boostRes = await boostMyProfilePost({
        number_of_days: value,
        payment_method: "stripe",
        payment_amount: selectedPrice,
        payment_intent_id: paymentIntentId,
      }).unwrap();

      const msg = boostRes?.message || "Boost request submitted successfully.";

      router.push({
        pathname: "/Toaster",
        params: { res: msg },
      });
    } catch (error: any) {
      console.log(error, "payment not success");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || "Payment failed!" },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-1 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton
          pageName={"Boost your profile"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />

        <View style={tw`justify-center items-center`}>
          <Image
            resizeMode="contain"
            style={tw`h-80 w-full`}
            source={ImgBoostPlan}
          />
        </View>

        <Text
          style={tw` font-DegularDisplayDemoMedium text-xl text-black text-center my-8`}
        >
          Boost your profile to increase the visibility within your location.
        </Text>

        <View style={tw`flex-row justify-center items-center my-14`}>
          <Text
            style={tw`font-DegularDisplayDemoSemibold text-4xl text-primary `}
          >
            ₦ {settingProfile?.data?.thirty_day_boosting_price || "0.00"}
          </Text>
          <Text
            style={tw`font-DegularDisplayDemoRegular  text-xl text-primary`}
          >
            / month
          </Text>
        </View>

        {/*  ------------ dropdown section ----------------- */}

        <View style={tw``}>
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
          >
            Extend delivery time for
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            dropdownPosition="top"
            placeholder={!isFocus ? "- Select -" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View style={tw`gap-2 mt-6`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            {value ? `Upgrade your boost for ${value} days` : "Select a plan"}
          </Text>

          <Text style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}>
            ₦ {selectedPrice ?? "0.00"}
          </Text>
        </View>

        <PrimaryButton
          titleProps={isProcessing ? "Processing..." : "Pay now"}
          IconProps={IconPayCardWhite}
          contentStyle={tw`mt-1`}
          onPress={handlePayment}
        />
      </View>
    </ScrollView>
  );
};

export default Boost_Profile_Plan;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
});
