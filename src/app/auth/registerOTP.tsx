import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
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
                onTextChange={(text) => {
                  setValue(text);
                }}
                onFilled={async (text) => {
                  // try {
                  //   const res = await otpVerify({
                  //     email: email,
                  //     otp: text,
                  //   }).unwrap();
                  //   if (res.status) {
                  //     await AsyncStorage.setItem(
                  //       "token",
                  //       res?.data?.access_token
                  //     );
                  //     router?.replace("/drewer/home");
                  //   } else {
                  //     Toast.show({
                  //       type: ALERT_TYPE.DANGER,
                  //       title: "Error!",
                  //       textBody: "Wrong OTP",
                  //     });
                  //   }
                  // } catch (error) {}
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

            <TouchableOpacity
              style={tw`bg-primary rounded-full my-3`}
              onPress={() => {
                router.replace("/auth/contact");
              }}
            >
              {isLoading ? (
                <View style={tw`flex-row justify-center items-center gap-3`}>
                  <ActivityIndicator size={"small"} color={tw.color("white")} />{" "}
                  <Text
                    style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                  >
                    Send
                  </Text>
                </View>
              ) : (
                <Text
                  style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                >
                  Send
                </Text>
              )}
            </TouchableOpacity>

            <View style={tw`w-full items-end mt-1`}>
              <TouchableOpacity style={tw``}>
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
