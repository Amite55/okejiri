import { IconEyeClose, IconEyeShow } from "@/assets/icons";
import { ImgLocationView, ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const new_pass = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEyeShow, setIsEyeShow] = useState<boolean>(false);
  const [isEyeShowCP, setIsEyeShowCP] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isVisibleCP, setIsVisibleCP] = useState<boolean>(true);
  const [successModal, setSuccessModal] = useState(false);

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <View style={tw`flex-1 bg-base_color px-5`}>
      <BackTitleButton onPress={() => router.canGoBack()} pageName={""} />

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
          c_password: "",
        }}
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
                value={values.c_password}
                onChangeText={handleChange("c_password")}
                onBlur={handleBlur("c_password")}
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
            {/* {touched.password && errors.password && (
              <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                {errors.password}
              </Text>
            )} */}

            <TouchableOpacity
              style={tw`bg-primary rounded-full`}
              onPress={() => {
                setSuccessModal(true);
                // handleSubmit();
                // router.replace("/auth/contact");
              }}
            >
              {isLoading ? (
                <View style={tw`flex-row justify-center items-center gap-3`}>
                  <ActivityIndicator size={"small"} color={tw.color("white")} />{" "}
                  <Text
                    style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                  >
                    Change Password
                  </Text>
                </View>
              ) : (
                <View style={tw`flex-row justify-center items-center gap-4`}>
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

      {/* =============c successful modal -========================= */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModal}
        onRequestClose={() => {
          setSuccessModal(!successModal);
        }}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`bg-white w-[85%] rounded-xl py-4 px-6`}>
            <View style={tw`justify-center items-center mb-4`}>
              <Image style={tw`w-56 h-56`} source={ImgLocationView} />
              <Text
                style={tw`text-center font-DegularDisplayDemoRegular  text-xl my-2`}
              >
                Password change successful
              </Text>
            </View>

            <View style={tw`gap-3`}>
              <TouchableOpacity
                onPress={() => {
                  setSuccessModal(false);
                  router.push("/auth/login");
                }}
                style={tw`w-full  rounded-full bg-black`}
              >
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-center p-3 text-white`}
                >
                  Back to login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default new_pass;
