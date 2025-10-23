import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useForgotPasswordMutation } from "@/src/redux/apiSlices/authSlices";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Forgot_pass = () => {
  // ========================= api end point =========================
  const [credentials, { isLoading: isLoadingLogin }] =
    useForgotPasswordMutation();

  // ---------------- handle forgot password ---------------------
  const handleForgotPass = async (formData: any) => {
    try {
      const res = await credentials(formData).unwrap();
      if (res) {
        router.push({
          pathname: "/auth/OTP",
          params: { email: formData.email },
        });
      }
    } catch (error) {
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    }
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.email.includes("@")) {
      errors.email = "Invalid email";
    }
    return errors;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={tw`flex-1 bg-base_color px-5`}>
          <BackTitleButton onPress={() => router.back()} pageName={""} />

          <View style={tw`justify-center items-center mb-12`}>
            <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
            <AuthComponents
              title="Forgot Password ?"
              subTitle="Enter your email address that you provided during sign up. We will send you a 6 digit code through that email."
            />
          </View>

          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values) => {
              handleForgotPass(values);
            }}
            validate={validate}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <View style={tw` `}>
                <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
                  Email
                </Text>
                <View
                  style={tw`flex-row items-center gap-2 border h-12 rounded-full px-3 mb-4`}
                >
                  <TextInput
                    placeholderTextColor="#777777"
                    style={tw`flex-1 text-base font-PoppinsMedium `}
                    placeholder="Enter your email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                    {errors.email}
                  </Text>
                )}

                <TouchableOpacity
                  style={tw`bg-primary rounded-full mb-10`}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  {isLoadingLogin ? (
                    <View
                      style={tw`flex-row justify-center items-center gap-3`}
                    >
                      <ActivityIndicator
                        size={"small"}
                        color={tw.color("white")}
                      />
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
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Forgot_pass;
