import { IconEyeClose, IconEyeShow, IconGoogle } from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import { useProviderTypes } from "@/src/hooks/useProviderTypes";
import { useRoll } from "@/src/hooks/useRollHooks";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useLoginMutation,
  useProfileQuery,
} from "@/src/redux/apiSlices/authSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
const LoginIndex = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isEyeShow, setIsEyeShow] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const providerTypes = useProviderTypes();
  const roll = useRoll();
  // ------------------------ api end point ---------------------
  const [credentials, { isLoading: isLoadingLogin }] = useLoginMutation();
  const { data: userProfileInfo, isLoading } = useProfileQuery({});

  // ----------------- handel login ---------------------
  const handleLogin = async (formData: any) => {
    Keyboard.dismiss();
    const payload = {
      ...formData,
      role: roll,
      provider_type: providerTypes ? providerTypes : "",
    };
    try {
      if (roll === "USER") {
        delete payload.provider_type;
        const res = await credentials(payload).unwrap();
        // ------------- login info save async storage -------------
        if (isChecked) {
          await AsyncStorage.setItem(
            "loginInfo",
            JSON.stringify({
              email: formData.email,
              password: formData.password,
            })
          );
        } else {
          await AsyncStorage.removeItem("loginInfo");
        }
        // dynamic route change ========================😩
        if (res?.data?.user?.is_personalization_complete === false) {
          await AsyncStorage.setItem("token", res?.data?.access_token);
          router.push("/auth/contact");
        } else {
          if (res?.data?.user?.role === roll) {
            await AsyncStorage.setItem("token", res?.data?.access_token);
            router.replace("/company/(Tabs)");
            if (userProfileInfo?.data?.kyc_status === "Unverified") {
              setTimeout(() => {
                router.push("/kyc_completed_modal");
              }, 500);
            }
          }
        }
      } else if (roll === "PROVIDER") {
        const res = await credentials(payload).unwrap();
        if (res?.data?.user?.is_personalization_completed === false) {
          await AsyncStorage.setItem("token", res?.data?.access_token);
          router.push("/auth/contact");
        } else {
          if (providerTypes === "Individual") {
            if (res?.data?.user?.provider_type === providerTypes) {
              await AsyncStorage.setItem("token", res?.data?.access_token);
              router.replace("/service_provider/individual/(Tabs)/home");
              if (userProfileInfo?.data?.kyc_status === "Unverified") {
                setTimeout(() => {
                  router.push("/kyc_completed_modal");
                }, 500);
              }
            }
          } else if (providerTypes === "Company") {
            if (res?.data?.user?.provider_type === providerTypes) {
              await AsyncStorage.setItem("token", res?.data?.access_token);
              router.replace("/service_provider/company/home");
              if (userProfileInfo?.data?.kyc_status === "Unverified") {
                setTimeout(() => {
                  router.push("/kyc_completed_modal");
                }, 500);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error, "login fail -----");
      router.push({
        pathname: `/Toaster`,
        params: {
          res: error?.message || error || "Login Fail Please Try Again",
        },
      });
      if (error?.metadata?.redirect_verification === true) {
        setTimeout(() => {
          router.push({
            pathname: `/auth/registerOTP`,
            params: { email: formData.email },
          });
        }, 1000);
      }
    }
  };

  // ============== remember me checkbox handler ================
  const handleCheckBox = async () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    await AsyncStorage.setItem("rememberMe", JSON.stringify(newValue));
  };
  // ================= form validation =====================
  const validate = (values: any) => {
    const errors: any = {};
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
    return errors;
  };

  // -------------------- default render ---------------------
  useEffect(() => {
    const loadData = async () => {
      const check = await AsyncStorage.getItem("rememberMe");
      const savedInfo = await AsyncStorage.getItem("loginInfo");

      if (check === "true" && savedInfo) {
        const parsed = JSON.parse(savedInfo);

        setIsChecked(true);
        setSavedEmail(parsed.email);
        setSavedPassword(parsed.password);
      }
    };

    loadData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={tw`px-5 bg-base_color `}>
          <BackTitleButton
            onPress={() => router.back()}
            pageName={"Login as a service user"}
            titleTextStyle={tw`text-xl`}
          />

          <View style={tw`justify-center items-center mb-12`}>
            <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
            <AuthComponents
              title="Welcome back"
              subTitle="Use your credentials to sign in"
            />
          </View>
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: savedEmail,
              password: savedPassword,
            }}
            // initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              handleLogin(values);
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
                {/* ----------- checkbox and password -------------------- */}
                <View
                  style={tw`flex-row justify-between items-center mt-4 mb-10`}
                >
                  <View style={tw`flex-row gap-2 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-sm`,
                        isChecked ? `bg-primary border-0` : `bg-transparent`
                      )}
                    >
                      {isChecked ? (
                        <Text style={tw`text-white text-sm`}>✔</Text>
                      ) : null}
                    </TouchableOpacity>
                    <Text>Remember me</Text>
                  </View>
                  <Text
                    style={tw`text-primary text-base font-DegularDisplayDemoRegular`}
                  >
                    <Link href={"/auth/forgot_pass"}>Forgot password?</Link>
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={tw`bg-primary rounded-full`}
                  disabled={isLoadingLogin}
                  onPress={() => handleSubmit()}
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
                        Sign in
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                    >
                      Sign in
                    </Text>
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
              Don’t have an account?
              <Link
                style={tw`text-primary font-bold underline`}
                href={"/auth/singUp"}
              >
                Sign up
              </Link>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginIndex;
