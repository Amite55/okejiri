import { IconEyeClose, IconEyeShow } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Change_Pass = () => {
  const [isVisibleCurrent, setIsVisibleCurrent] = useState<boolean>(true);
  const [isVisibleNew, setIsVisibleNew] = useState<boolean>(true);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(true);
  const [isEyeShowCurrent, setIsEyeShowCurrent] = useState<boolean>(false);
  const [isEyeShowNew, setIsEyeShowNew] = useState<boolean>(false);
  const [isEyeShowConfirm, setIsEyeShowConfirm] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState(false);

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
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw` bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6 flex-1`}
      //   keyboardShouldPersistTaps="handled"
    >
      <BackTitleButton
        pageName={"Change password"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      {/*  ------------- password information ------------------- */}

      <Formik
        initialValues={{
          current_Password: "",
          new_Password: "",
          confirm_password: "",
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
          <View style={tw`flex-1 flex-grow justify-between`}>
            <View style={tw` mt-4`}>
              {/* -------------------- current password ------------------ */}
              <View
                style={tw`flex-row items-center gap-2 border border-gray-400 h-14 rounded-full mb-3 px-3`}
              >
                <TextInput
                  secureTextEntry={isVisibleCurrent}
                  style={tw`flex-1 text-base font-PoppinsMedium `}
                  placeholderTextColor="#777777"
                  placeholder="Current password"
                  value={values.current_Password}
                  onChangeText={handleChange("current_Password")}
                  onBlur={handleBlur("current_Password")}
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsVisibleCurrent(!isVisibleCurrent);
                    setIsEyeShowCurrent(!isEyeShowCurrent);
                  }}
                >
                  <SvgXml xml={isEyeShowCurrent ? IconEyeShow : IconEyeClose} />
                </TouchableOpacity>
              </View>
              {touched.current_Password && errors.current_Password && (
                <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                  {errors.current_Password}
                </Text>
              )}

              {/*  ---------- new password ------------------------- */}
              <View
                style={tw`flex-row items-center gap-2 border border-gray-400  h-14 rounded-full mb-3 px-3`}
              >
                <TextInput
                  secureTextEntry={isVisibleNew}
                  style={tw`flex-1 text-base font-PoppinsMedium `}
                  placeholderTextColor="#777777"
                  placeholder="New password"
                  value={values.new_Password}
                  onChangeText={handleChange("new_Password")}
                  onBlur={handleBlur("new_Password")}
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
              {touched.new_Password && errors.new_Password && (
                <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                  {errors.new_Password}
                </Text>
              )}

              {/* ----------------------- confirm password ------------------ */}
              <View
                style={tw`flex-row items-center gap-2 border border-gray-400  h-14 rounded-full mb-3 px-3`}
              >
                <TextInput
                  secureTextEntry={isVisibleConfirm}
                  style={tw`flex-1 text-base font-PoppinsMedium `}
                  placeholderTextColor="#777777"
                  placeholder="Confirm password"
                  value={values.confirm_password}
                  onChangeText={handleChange("confirm_password")}
                  onBlur={handleBlur("confirm_password")}
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsVisibleConfirm(!isVisibleConfirm);
                    setIsEyeShowConfirm(!isEyeShowConfirm);
                  }}
                >
                  <SvgXml xml={isEyeShowConfirm ? IconEyeShow : IconEyeClose} />
                </TouchableOpacity>
              </View>
              {touched.confirm_password && errors.confirm_password && (
                <Text style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm`}>
                  {errors.confirm_password}
                </Text>
              )}
            </View>
            {/* ----------------------- submit password -------------- */}
            <PrimaryButton
              // onPress={() => handleSubmit()}
              onPress={() => setModalVisible(true)}
              titleProps="Update password"
              // IconProps={IconRightArrow}
              contentStyle={tw`mt-4`}
            />
          </View>
        )}
      </Formik>

      {/*  ========================== successful modal ======================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw` flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            {/* Check Icon */}
            <Image style={tw`mt-6 mb-2`} source={ImgSuccessGIF} />

            {/* Success Message */}
            <Text style={tw`text-4xl font-DegularDisplayDemoBold mt-3`}>
              Success!
            </Text>
            <Text style={tw`text-base text-gray-500 text-center mt-2`}>
              Your Password Updated.
            </Text>

            {/* Close Button */}
            {/*  ------------- next button -------------------- */}
            <PrimaryButton
              onPress={() => {
                setModalVisible(false);
                router.push("/company/settings/setting");
              }}
              titleProps="Go Back"
              // IconProps={""}
              contentStyle={tw`mt-4`}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Change_Pass;
