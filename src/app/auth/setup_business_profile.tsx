import PrimaryButton from "@/src/Components/PrimaryButton";
import ProviderProfileSkeleton from "@/src/Components/skeletons/ProviderProfileSkeleton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useEditProfilePictureMutation,
  useProfileQuery,
} from "@/src/redux/apiSlices/authSlices";
import { useGetServicesQuery } from "@/src/redux/apiSlices/companyProvider/account/services/servicesSlice";
import { useCompletePersonalizationMutation } from "@/src/redux/apiSlices/personalizationSlice";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";

const Setup_Business_Profile = () => {
  const { jsonContactInfo } = useLocalSearchParams();
  const contactInfo = JSON.parse(jsonContactInfo as any);
  const [value, setValue] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState("");
  const stgValue = value.map(String);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [imageAsset, setImageAsset] =
    React.useState<ImagePicker.ImagePickerAsset | null>(null);

  // ************************** api end point **************************
  const [information, { isLoading: isLoadingPersonalization }] =
    useCompletePersonalizationMutation({});
  const { data: getServiceData, isLoading: isLoadingServices } =
    useGetServicesQuery({});
  const [editProfilePicture, { isLoading: isLoadingProfileImage }] =
    useEditProfilePictureMutation();
  const { data: userProfileInfo, isLoading: isprofileLoading } =
    useProfileQuery({});

  // -------------------- image picker ---------------------
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImageAsset(selectedImage);
      const form = new FormData();
      const filename =
        selectedImage.fileName ??
        selectedImage.uri.split("/").pop() ??
        `photo_${Date.now()}.jpg`;
      const extMatch = /\.(\w+)$/.exec(filename);
      const mime = extMatch ? `image/${extMatch[1]}` : "image/jpeg";
      form.append("photo", {
        uri: selectedImage.uri,
        name: filename,
        type: mime,
      } as any);

      try {
        const response = await editProfilePicture(form).unwrap();
        if (response.status === "success") {
          router.push({
            pathname: "/Toaster",
            params: { res: response?.message },
          });
        }
      } catch (err: any) {
        router.push({
          pathname: "/Toaster",
          params: { res: err?.message || "Something went wrong" || err },
        });
      }
    } else {
      console.log("❌ Image selection cancelled");
    }
  };

  const handleScreenValue = async (formData: any) => {
    try {
      if (value.length === 0) {
        setError("Please select your service");
        return;
      } else {
        setError("");
        const payload = {
          ...contactInfo,
          ...formData,
          service_id: stgValue,
        };
        const res = await information(payload).unwrap();
        if (res?.status === "success") {
          router.replace("/service_provider/company/(Tabs)/home");
          if (res?.data?.kyc_status === "Unverified") {
            setTimeout(() => {
              router.push("/kyc_completed_modal");
            }, 500);
          }
        }
      }
    } catch (error) {
      console.log(error, "not registered user");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Something went wrong" },
      });
    }
  };
  useEffect(() => {
    setValue([]);
  }, []);
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
  const validate = (values: any) => {
    const errors = {};
    if (!values.business_name) {
      errors.business_name = "Required";
    } else if (values.business_name.length < 3) {
      errors.business_name = "Business name must be at least 3 characters";
    }
    if (!values.business_location) {
      errors.business_location = "Required";
    } else if (values.business_location.length < 3) {
      errors.business_location =
        "Business location must be at least 3 characters";
    }
    if (!values.about_business) {
      errors.about_business = "Required";
    } else if (values.about_business.length < 3) {
      errors.about_business =
        "Business description must be at least 3 characters";
    }
    if (!values.emp_no) {
      errors.emp_no = "Required";
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
  };

  if (isLoadingServices) {
    return <ProviderProfileSkeleton />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{
            business_name: "",
            business_location: "",
            about_business: "",
            emp_no: "",
          }}
          onSubmit={(values) => {
            handleScreenValue(values);
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
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1  bg-base_color`}
              contentContainerStyle={[
                tw`px-4 flex-grow justify-between `,
                isKeyboardVisible ? tw`pb-16` : tw`pb-1`,
              ]}
            >
              <View style={tw` mb-8`}>
                <BackTitleButton
                  pageName={"Setup your business profile"}
                  onPress={() => router.back()}
                  titleTextStyle={tw`text-lg`}
                />
                {/* <View style={tw` justify-center items-center mt-4`}>
                  {isprofileLoading || isLoadingProfileImage ? (
                    <ActivityIndicator size="large" color="blue" />
                  ) : (
                    <Image
                      style={tw`relative w-24 h-24 rounded-full `}
                      source={{ uri: userProfileInfo?.data?.avatar }}
                      contentFit="cover"
                    />
                  )}
                  <TouchableOpacity
                    onPress={pickImage}
                    activeOpacity={0.8}
                    style={tw`w-12 h-12 bg-primary rounded-full justify-center items-center absolute -bottom-4 right-33`}
                  >
                    <SvgXml xml={IconCameraProfile} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={tw`font-DegularDisplayDemoMedium text-lg text-black text-center mt-6`}
                >
                  Upload your business logo
                </Text> */}

                {/* --------------------- input from ---------------- */}

                {/*  ------------------ business name ------------------- */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-6`}
                >
                  Business name
                </Text>
                <TextInput
                  style={tw` rounded-full border border-gray-400 mt-2 text-base text-black px-4`}
                  placeholderTextColor={"#535353"}
                  placeholder="Enter your business name"
                  textAlign="left"
                  textAlignVertical="top"
                  value={values.business_name}
                  onChangeText={handleChange("business_name")}
                  onBlur={handleBlur("business_name")}
                />
                {touched.business_name && errors.business_name && (
                  <Text
                    style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm pt-4`}
                  >
                    {errors.business_name}
                  </Text>
                )}
                {/*  --------- company location ------------- */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-3`}
                >
                  Location
                </Text>
                <TextInput
                  style={tw` rounded-full border border-gray-400 mt-2 text-base text-black px-4`}
                  placeholder="Address"
                  placeholderTextColor={"#535353"}
                  value={values.business_location}
                  onChangeText={handleChange("business_location")}
                  onBlur={handleBlur("business_location")}
                  textAlign="left"
                  textAlignVertical="top"
                />
                {touched.business_location && errors.business_location && (
                  <Text
                    style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm pt-4`}
                  >
                    {errors.business_location}
                  </Text>
                )}
                {/* ----------- company about --------------- */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-3`}
                >
                  About your business
                </Text>
                <TextInput
                  style={tw` rounded-3xl border border-gray-400 mt-2 text-base text-black px-4 h-28`}
                  multiline
                  numberOfLines={10}
                  placeholder="Description"
                  value={values.about_business}
                  onChangeText={handleChange("about_business")}
                  onBlur={handleBlur("about_business")}
                  textAlign="left"
                  textAlignVertical="top"
                />
                {touched.about_business && errors.about_business && (
                  <Text
                    style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm pt-4`}
                  >
                    {errors.about_business}
                  </Text>
                )}
                <MultiSelect
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={getServiceData?.data?.services}
                  maxHeight={300}
                  labelField="name"
                  dropdownPosition="top"
                  valueField="id"
                  placeholder={!isFocus ? "-select your services-" : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item);
                  }}
                />
                {error && (
                  <Text
                    style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm pt-4`}
                  >
                    {error}
                  </Text>
                )}
                {/*  --------- company location ------------- */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-3`}
                >
                  Number of employees
                </Text>
                <TextInput
                  style={tw` rounded-full border border-gray-400 mt-2 text-base text-black px-4`}
                  keyboardType="numeric"
                  placeholder="20"
                  textAlign="left"
                  textAlignVertical="top"
                  value={values.emp_no}
                  onChangeText={handleChange("emp_no")}
                  onBlur={handleBlur("  emp_no")}
                />
                {touched.emp_no && errors.emp_no && (
                  <Text
                    style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm pt-4`}
                  >
                    {errors.emp_no}
                  </Text>
                )}
              </View>
              {isLoadingPersonalization ? (
                <ActivityIndicator
                  size="small"
                  color={tw.color("primary")}
                  style={tw`mt-2`}
                />
              ) : (
                <PrimaryButton
                  onPress={() => handleSubmit()}
                  contentStyle={tw`h-12 `}
                  titleProps="Submit"
                />
              )}
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Setup_Business_Profile;

// ------------ dropdown Style --------------------

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
    marginTop: 15,
    paddingBottom: 10,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 350,
    maxHeight: 400,
    borderRadius: 30,
  },
});
