import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "@/src/redux/apiSlices/authSlices";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const RegisterOTP = () => {
  const { email } = useLocalSearchParams();

  // ------------------------ api end point ---------------------
  const [otpVerify, { isLoading: isLoadingRegister, reset }] =
    useVerifyOtpMutation();
  const [resendOtp, { isLoading: isLoadingResend }] =
    useForgotPasswordMutation();

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({ email }).unwrap();
      if (response) {
        router.push({
          pathname: "/Toaster",
          params: { res: "OTP resent again" },
        });
      }
    } catch (error) {
      console.log("Error resending OTP:", error);
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
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
        <View style={tw`flex-1 bg-base_color px-5`}>
          <BackTitleButton onPress={() => router.back()} pageName={""} />

          <View style={tw`justify-center items-center mb-12`}>
            <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
            <AuthComponents
              title="Verify Code"
              subTitle="Enter the 6 digit code that we sent you to your provided email."
            />
          </View>

          <View style={tw`w-full`}>
            <Text style={tw`mb-1`}>OTP</Text>
            <View style={tw`flex-row gap-5`}>
              <OtpInput
                numberOfDigits={6}
                focusColor={PrimaryColor}
                autoFocus={false}
                hideStick={true}
                placeholder="0"
                blurOnFilled={true}
                disabled={false}
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={500}
                // onTextChange={(text) => {
                //   clg
                // }}
                onFilled={async (text) => {
                  try {
                    const res = await otpVerify({
                      email: email,
                      otp: text,
                    }).unwrap();
                    if (res.status) {
                      await AsyncStorage.setItem(
                        "token",
                        res?.data?.access_token
                      );
                      router.replace("/auth/contact");
                    }
                  } catch (error) {
                    console.log(error, "OTP not verified ");
                    router.push({
                      pathname: `/Toaster`,
                      params: { res: error?.message || error },
                    });
                  }
                }}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                theme={{
                  containerStyle: tw`rounded-full mb-2`,
                  pinCodeContainerStyle: tw`h-12 w-[46px] justify-center items-center bg-white rounded-lg `,
                  pinCodeTextStyle: tw`text-[#262626] text-2xl font-PoppinsBold `,
                  placeholderTextStyle: tw`text-[#6D6D6D] text-2xl font-PoppinsBold`,
                }}
              />
            </View>

            <View style={tw`w-full items-end mt-1`}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Keyboard.dismiss();
                  handleResendOtp();
                }}
              >
                <Text style={tw`text-primary font-semibold text-[12px]`}>
                  Send Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterOTP;
