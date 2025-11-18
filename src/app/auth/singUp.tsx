import {
  IconBackLeftArrow,
  IconEyeClose,
  IconEyeShow,
  IconGoogle,
  IconRightArrow,
} from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import { useProviderTypes } from "@/src/hooks/useProviderTypes";
import { useRoll } from "@/src/hooks/useRollHooks";
import tw from "@/src/lib/tailwind";
import { useRegisterMutation } from "@/src/redux/apiSlices/authSlices";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const SingUp = () => {
  const [isEyeShow, setIsEyeShow] = useState<boolean>(false);
  const [isEyeShowCP, setIsEyeShowCP] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isVisibleCP, setIsVisibleCP] = useState<boolean>(true);
  const roll = useRoll();
  const providerTypes = useProviderTypes();

  // ------------------------ api end point ---------------------
  const [credentials, { isLoading: isLoadingRegister }] = useRegisterMutation();
  // ------------------- validate formik ---------------------
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Your name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password && values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!values.password_confirmation) {
      errors.password_confirmation = "Confirm password is required";
    }
    return errors;
  };
  // ------------------------------ auto header title and subtitle ----------------------------
  let autoHeaderTitle;
  if (roll === "user") {
    autoHeaderTitle = "Create an account as a user";
  } else if (roll === "service_provider") {
    autoHeaderTitle = "Create an account as a provider";
  } else if (roll === "company_provider") {
    autoHeaderTitle = "Create an account as a company";
  }
  let autoHeaderSubTitle;
  if (roll === "user") {
    autoHeaderSubTitle = "Use your credentials to create a new account";
  } else if (roll === "service_provider") {
    autoHeaderSubTitle = "Use your credentials to create a new account";
  } else if (roll === "company_provider") {
    autoHeaderSubTitle = "Use your credentials to create a new account";
  }

  const handelRegister = async (value: any) => {
    try {
      const payload = {
        ...value,
        role: roll,
        provider_type: providerTypes ? providerTypes : "",
      };
      if (roll === "USER") {
        delete payload.provider_type;
      }
      const res = await credentials(payload).unwrap();
      if (res) {
        router.push({
          pathname: "/auth/registerOTP",
          params: { email: payload.email },
        });
      }
    } catch (error) {
      console.log(error, "not registered user");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={tw`px-5 bg-base_color `}>
          <View style={tw`flex-row justify-between items-center mb-6 my-2`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`w-14 h-14 bg-white rounded-full justify-center items-center`}
            >
              <SvgXml xml={IconBackLeftArrow} />
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              style={tw`w-36  h-12`}
              source={ImgLogo}
            />
            <Text style={tw`pl-6`}> </Text>
          </View>

          <View style={tw`justify-center items-center mb-12`}>
            <AuthComponents
              title={autoHeaderTitle}
              subTitle={autoHeaderSubTitle}
            />
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
              name: "",
              password_confirmation: "",
              referral_code: "",
            }}
            onSubmit={(values) => {
              handelRegister(values);
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
                  Name
                </Text>
                <View
                  style={tw`flex-row items-center gap-2 border h-12 rounded-full px-3 mb-4`}
                >
                  <TextInput
                    placeholderTextColor="#777777"
                    style={tw`flex-1 text-base font-PoppinsMedium `}
                    placeholder="Enter your name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                    {errors.name}
                  </Text>
                )}

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
                <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
                  Password
                </Text>
                <View
                  style={tw`flex-row items-center gap-2 border h-12 rounded-full mb-3 px-3`}
                >
                  <TextInput
                    secureTextEntry={isVisible}
                    style={tw`flex-1 text-base font-PoppinsMedium `}
                    placeholderTextColor="#777777"
                    placeholder="Enter your password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible(!isVisible);
                      setIsEyeShow(!isEyeShow);
                    }}
                  >
                    <SvgXml xml={isEyeShow ? IconEyeShow : IconEyeClose} />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                    {errors.password}
                  </Text>
                )}
                <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
                  Confirm Password
                </Text>
                <View
                  style={tw`flex-row items-center gap-2 border h-12 rounded-full mb-3 px-3`}
                >
                  <TextInput
                    secureTextEntry={isVisibleCP}
                    style={tw`flex-1 text-base font-PoppinsMedium `}
                    placeholderTextColor="#777777"
                    placeholder="confirm password"
                    value={values.password_confirmation}
                    onChangeText={handleChange("password_confirmation")}
                    onBlur={handleBlur("password_confirmation")}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisibleCP(!isVisibleCP);
                      setIsEyeShowCP(!isEyeShowCP);
                    }}
                  >
                    <SvgXml xml={isEyeShowCP ? IconEyeShow : IconEyeClose} />
                  </TouchableOpacity>
                </View>
                {touched.password_confirmation &&
                  errors.password_confirmation && (
                    <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                      {errors.password_confirmation}
                    </Text>
                  )}
                <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
                  Referral code (Optional)
                </Text>
                <View
                  style={tw`flex-row items-center gap-2 border h-12 rounded-full mb-3 px-3`}
                >
                  <TextInput
                    style={tw`flex-1 text-base font-PoppinsMedium `}
                    placeholderTextColor="#777777"
                    placeholder="454545"
                    value={values.referral_code}
                    onChangeText={handleChange("referral_code")}
                    onBlur={handleBlur("referral_code")}
                    maxLength={6}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={tw`bg-primary rounded-full`}
                  onPress={() => {
                    handleSubmit();
                    // router.replace("/auth/registerOTP");
                  }}
                  disabled={isLoadingRegister}
                >
                  {isLoadingRegister ? (
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
                        Continue
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={tw`flex-row justify-center items-center gap-4`}
                    >
                      <Text
                        style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                      >
                        Continue
                      </Text>
                      <SvgXml xml={IconRightArrow} />
                    </View>
                  )}
                </TouchableOpacity>

                <View
                  style={tw`flex-row justify-between items-center gap-4 my-6`}
                >
                  <View style={tw`flex-1 h-px bg-gray-500`} />
                  <Text>or continue with</Text>
                  <View style={tw`flex-1 h-px bg-gray-500`} />
                </View>

                <View style={tw`justify-center items-center`}>
                  <TouchableOpacity
                    style={tw`w-14 h-14 bg-white rounded-full justify-center items-center `}
                  >
                    <SvgXml xml={IconGoogle} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View style={tw`justify-end items-center my-2`}>
            <Text style={tw` text-sm font-DegularDisplayDemoRegular`}>
              Already have an account ?{" "}
              <Link
                style={tw`text-primary font-bold underline`}
                href={"/auth/login"}
              >
                Sign in
              </Link>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SingUp;
