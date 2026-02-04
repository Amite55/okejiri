import { IconPayCardWhite } from "@/assets/icons";
import { ImgBoostPlan } from "@/assets/images/image";
import PaymentWebview from "@/src/app/company/serviceBookings/paymentWebview";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import {
  useBoostMyProfilePostMutation,
  useGetSettingQuery,
} from "@/src/redux/apiSlices/companyProvider/account/boostProfileSlice";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isWabViewOpen, setIsWebviewOpen] = useState(false);

  // ..................payment works.................//
  const [boostMyProfilePost, { isLoading: isBoostLoading }] =
    useBoostMyProfilePostMutation();

  // ......... Api intragre ..........//
  const { data: settingProfile, isLoading: settingProfileLoading } =
    useGetSettingQuery({});
  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery(
    {},
  );

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

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

  const handlePayment = async (res: any) => {
    if (!selectedPrice || !value) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please select a plan first!" },
      });
      return;
    }
    setIsProcessing(true);
    try {
      if (res.type === "cancel") {
        console.log("User cancelled payment");
        return;
      }
      if (res.type === "success") {
        const paymentData = res.data;
        const response = await boostMyProfilePost({
          number_of_days: value,
          payment_method: "flutterwave",
          payment_amount: selectedPrice,
          payment_intent_id: paymentData.transaction_id,
          tx_ref: paymentData.tx_ref,
        }).unwrap();
        if (response) {
          handleCloseModalPress();
          router.replace(
            "/service_provider/individual/boost_profiles/boost_profile",
          );
          router.push({
            pathname: "/Toaster",
            params: {
              res:
                response?.data?.message ||
                "Boost request submitted successfully.",
            },
          });
        }
      }
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

  // ================== flutter wave payment integration ==================
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
      amount: ${selectedPrice},
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: "${profileData?.data?.email}",
        phone_number: "${profileData?.data?.phone}",
        name: "${profileData?.data?.name}",
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 px-5 bg-base_color`}
          contentContainerStyle={tw`pb-1 flex-grow justify-between`}
        >
          <View>
            <BackTitleButton
              pageName={"Boost your profile individual"}
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
              Boost your profile to increase the visibility within your
              location.
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
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                {value
                  ? `Upgrade your boost for ${value} days`
                  : "Select a plan"}
              </Text>

              <Text
                style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
              >
                ₦ {selectedPrice ?? "0.00"}
              </Text>
            </View>

            <PrimaryButton
              titleProps={isProcessing ? "Processing..." : "Pay now"}
              IconProps={IconPayCardWhite}
              contentStyle={tw`mt-1 h-12`}
              onPress={() => {
                if (!value) {
                  router.push({
                    pathname: "/Toaster",
                    params: { res: "Please select a plan first!" },
                  });
                  return;
                } else {
                  handlePresentModalPress();
                }
              }}
            />
          </View>

          {/* -0---------------------------- order address edit modal --------------------------- */}
          <BottomSheetModalProvider>
            <BottomSheetModal
              onDismiss={() => {
                setIsWebviewOpen(false);
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
              <BottomSheetView style={{ flex: 1 }}>
                <PaymentWebview
                  html={flutterwaveHTML}
                  onMessage={handlePayment}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
