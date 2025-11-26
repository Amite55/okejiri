import { IconEyeClose, IconEyeShow } from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useResetPasswordMutation } from "@/src/redux/apiSlices/authSlices";
import { router, useLocalSearchParams } from "expo-router";
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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const New_pass = () => {
  const { email } = useLocalSearchParams();
  const [isEyeShow, setIsEyeShow] = useState<boolean>(false);
  const [isEyeShowCP, setIsEyeShowCP] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isVisibleCP, setIsVisibleCP] = useState<boolean>(true);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  // ------------------------ api end point ---------------------
  const [credentials, { isLoading: isLoadingLogin }] =
    useResetPasswordMutation();

  const handleResetPassword = async (formData: any) => {
    const payload = {
      ...formData,
      email: email,
    };
    try {
      const res = await credentials(payload).unwrap();
      if (res) {
        router.push("/chose_roll");
      }
    } catch (error: any) {
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Something went wrong" },
      });
    }
  };

  // -=----------------------- validation ---------------------
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.retype_password) {
      errors.retype_password = "Confirm password is required";
    }
    return errors;
  };

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={tw`flex-1 bg-base_color px-5`}
          contentContainerStyle={[
            tw``,
            isKeyboardVisible ? tw`pb-16` : tw`pb-0`,
          ]}
        >
          <BackTitleButton onPress={() => router.back()} pageName={""} />

          <View style={tw`justify-center items-center mb-12`}>
            <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
            <AuthComponents
              title="Enter new password"
              subTitle="Set a new password. This password must be different from your previous one."
            />
          </View>

          <Formik
            initialValues={{
              password: "",
              retype_password: "",
            }}
            onSubmit={(values) => {
              handleResetPassword(values);
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
                  Password
                </Text>
                <View
                  style={tw`flex-row items-center gap-2 border h-12 rounded-full mb-3 px-3`}
                >
                  <TextInput
                    secureTextEntry={isVisible}
                    style={tw`flex-1 text-black text-base font-PoppinsMedium `}
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
                    style={tw`flex-1 text-black text-base font-PoppinsMedium `}
                    placeholderTextColor="#777777"
                    placeholder="confirm password"
                    value={values.retype_password}
                    onChangeText={handleChange("retype_password")}
                    onBlur={handleBlur("retype_password")}
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
                {touched.retype_password && errors.retype_password && (
                  <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                    {errors.retype_password}
                  </Text>
                )}

                <TouchableOpacity
                  style={tw`bg-primary rounded-full mb-6`}
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
                        Loading ...
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={tw`flex-row justify-center items-center gap-4`}
                    >
                      <Text
                        style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                      >
                        Change Password
                      </Text>
                    </View>
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

export default New_pass;
