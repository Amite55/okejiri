import { IconEyeClose, IconEyeShow } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useChangePasswordMutation } from "@/src/redux/apiSlices/authSlices";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Change_Pass = () => {
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(true);
  const [isVisibleNew, setIsVisibleNew] = useState(true);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(true);

  const [isEyeShowCurrent, setIsEyeShowCurrent] = useState(false);
  const [isEyeShowNew, setIsEyeShowNew] = useState(false);
  const [isEyeShowConfirm, setIsEyeShowConfirm] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.current_password) {
      errors.current_password = "Current password is required";
    }
    if (!values.new_password) {
      errors.new_password = "New password is required";
    }
    if (values.new_password && values.new_password.length < 6) {
      errors.new_password = "Password must be at least 6 characters";
    }
    if (!values.retype_password) {
      errors.retype_password = "Confirm password is required";
    } else if (values.new_password !== values.retype_password) {
      errors.retype_password = "Passwords do not match";
    }
    return errors;
  };

  const handleChangePassword = async (values: any) => {
    try {
      const response: any = await changePassword({
        current_password: values.current_password,
        new_password: values.new_password,
        retype_password: values.retype_password,
      });

      if (response?.data?.status === "success") {
        setModalVisible(true);
      } else {
        router.push({
          pathname: "/Toaster",
          params: { res: "Something went wrong!" },
        });
      }
    } catch (error) {
      Alert.alert("Error", "Password change failed!");
    }
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          style={tw`bg-base_color px-5`}
          contentContainerStyle={[
            tw` flex-1`,
            isKeyboardVisible ? tw`pb-16` : tw`pb-2`,
          ]}
        >
          <BackTitleButton
            pageName={"Change password"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />

          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              retype_password: "",
            }}
            validate={validate}
            onSubmit={handleChangePassword}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <View style={tw`flex-1 justify-between`}>
                {/* ---------- current password ---------- */}
                <View style={tw`mt-4`}>
                  <View
                    style={tw`flex-row items-center gap-2 border border-gray-400 h-14 rounded-full mb-3 px-3`}
                  >
                    <TextInput
                      secureTextEntry={isVisibleCurrent}
                      style={tw`flex-1 text-black text-base font-PoppinsMedium`}
                      placeholderTextColor="#777777"
                      placeholder="Current password"
                      value={values.current_password}
                      onChangeText={handleChange("current_password")}
                      onBlur={handleBlur("current_password")}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisibleCurrent(!isVisibleCurrent);
                        setIsEyeShowCurrent(!isEyeShowCurrent);
                      }}
                    >
                      <SvgXml
                        xml={isEyeShowCurrent ? IconEyeShow : IconEyeClose}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.current_password && errors.current_password && (
                    <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                      {errors.current_password}
                    </Text>
                  )}

                  {/* ---------- new password ---------- */}
                  <View
                    style={tw`flex-row items-center gap-2 border border-gray-400 h-14 rounded-full mb-3 px-3`}
                  >
                    <TextInput
                      secureTextEntry={isVisibleNew}
                      style={tw`flex-1 text-black text-base font-PoppinsMedium`}
                      placeholderTextColor="#777777"
                      placeholder="New password"
                      value={values.new_password}
                      onChangeText={handleChange("new_password")}
                      onBlur={handleBlur("new_password")}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisibleNew(!isVisibleNew);
                        setIsEyeShowNew(!isEyeShowNew);
                      }}
                    >
                      <SvgXml xml={isEyeShowNew ? IconEyeShow : IconEyeClose} />
                    </TouchableOpacity>
                  </View>
                  {touched.new_password && errors.new_password && (
                    <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                      {errors.new_password}
                    </Text>
                  )}

                  {/* ---------- confirm password ---------- */}
                  <View
                    style={tw`flex-row items-center gap-2 border border-gray-400 h-14 rounded-full mb-3 px-3`}
                  >
                    <TextInput
                      secureTextEntry={isVisibleConfirm}
                      style={tw`flex-1 text-black text-base font-PoppinsMedium`}
                      placeholderTextColor="#777777"
                      placeholder="Confirm password"
                      value={values.retype_password}
                      onChangeText={handleChange("retype_password")}
                      onBlur={handleBlur("retype_password")}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisibleConfirm(!isVisibleConfirm);
                        setIsEyeShowConfirm(!isEyeShowConfirm);
                      }}
                    >
                      <SvgXml
                        xml={isEyeShowConfirm ? IconEyeShow : IconEyeClose}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.retype_password && errors.retype_password && (
                    <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                      {errors.retype_password}
                    </Text>
                  )}
                </View>

                {/* ---------- submit ---------- */}
                <PrimaryButton
                  onPress={() => handleSubmit()}
                  titleProps={isLoading ? "Updating..." : "Update Password"}
                  contentStyle={tw`mt-4`}
                />
              </View>
            )}
          </Formik>

          {/* ---------- success modal ---------- */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
            >
              <View
                style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
              >
                <Image style={tw`mt-6 mb-2`} source={ImgSuccessGIF} />
                <Text style={tw`text-4xl font-DegularDisplayDemoBold mt-3`}>
                  Success!
                </Text>
                <Text style={tw`text-base text-gray-500 text-center mt-2`}>
                  Your password has been updated successfully.
                </Text>
                <PrimaryButton
                  onPress={() => {
                    setModalVisible(false);
                    router.replace("/company/settings/setting");
                  }}
                  titleProps="Go Back"
                  contentStyle={tw`mt-4`}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Change_Pass;
