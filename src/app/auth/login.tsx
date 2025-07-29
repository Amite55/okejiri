import { IconEyeClose, IconEyeShow, IconGoogle } from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SvgXml } from "react-native-svg";
const LoginIndex = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEyeShow, setIsEyeShow] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
  };

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
    }
    return errors;
  };

  return (
    <KeyboardAwareScrollView style={tw`px-5 bg-base_color `}>
      <BackTitleButton
        onPress={() => router.back()}
        pageName={"Login as a service user"}
        titleTextStyle={tw`text-2xl`}
      />

      <View style={tw`justify-center items-center mb-12`}>
        <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
        <AuthComponents
          title="Welcome back"
          subTitle="Use your credentials to sign in"
        />
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(
            values,
            "this is 39 line login input console -------------->"
          );
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
            <View style={tw`flex-row justify-between items-center mt-4 mb-10`}>
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
              style={tw`bg-primary rounded-full`}
              onPress={() => {
                // handleSubmit();
                router.replace("/company");
              }}
            >
              {isLoading ? (
                <View style={tw`flex-row justify-center items-center gap-3`}>
                  <ActivityIndicator size={"small"} color={tw.color("white")} />{" "}
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

            <View style={tw`flex-row justify-between items-center gap-4 my-6`}>
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
          Don’t have an account?{" "}
          <Link
            style={tw`text-primary font-bold underline`}
            href={"/auth/singUp"}
          >
            Sign up
          </Link>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginIndex;
