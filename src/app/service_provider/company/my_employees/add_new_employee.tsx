import {
  IconLocationGray,
  IconPhoneGray,
  IconUploadImage,
} from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import SuccessModal from "@/src/Components/SuccessModal";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { SvgXml } from "react-native-svg";

import { useAddEmployeeMutation } from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import * as ImagePicker from "expo-image-picker";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "User", value: "1" },
  { label: "Service Provider", value: "2" },
];

const Add_New_Employee = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [successModalVisible, setSuccessModal] = useState<boolean>(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const [
    newEmployee,
    {
      isLoading: isLoadingNewEmployee,
      error: ErrorNewEmployee,
      isError: isErrorMyEmployee,
    },
  ] = useAddEmployeeMutation();

  const validation = (values: any) => {
    const errors: any = {};

    if (!values.image) errors.image = "Employee image is required";
    if (!values.name) errors.name = "Name is required";
    else if (values.name < 3) errors.name = "Name must be at least 3 letters";

    if (!values.phone) errors.phone = "Phone number is required";
    else if (!/^[0-9]{10,15}$/.test(values.phone)) {
      errors.phone = "Enter a valid phone number";
    }
    if (!values.location) {
      errors.location = "Location is required";
    }
    return errors;
  };

  // ---------------------- IMAGE PICKER -------------------------
  const pickImage = async (setFieldValue: any, setFieldTouched: any) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission needed to access gallery");
      return;
    }
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      const picked = result.assets[0];

      // Extract file extension from URI
      const uriParts = picked.uri.split(".");
      const fileExt = uriParts[uriParts.length - 1];

      // Set name dynamically: user + timestamp + extension
      const fileName = `employee_${Date.now()}.${fileExt}`;

      // Set MIME type dynamically
      const fileType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;

      // Set Formik field
      setFieldValue("image", {
        uri: picked.uri,
        name: fileName,
        type: fileType,
      });
      setFieldTouched("image", true);
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
          style={tw`px-5 bg-base_color `}
          contentContainerStyle={[
            tw`pb-6 `,
            isKeyboardVisible ? tw`pb-20` : tw`pb-1`,
          ]}
        >
          <BackTitleButton
            pageName={"Add employee"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
            // contentStyle={tw`px-5`}
          />

          <Formik
            initialValues={{
              image: "",
              name: "",
              phone: "",
              location: "",
            }}
            validate={validation}
            onSubmit={async (values) => {
              try {
                const formData = new FormData();
                if (values.image) {
                  formData.append("image", {
                    uri: (values.image as any).uri,
                    name: (values.image as any).name || "photo.jpg",
                    type: (values.image as any).type || "image/jpeg",
                  } as any);
                }
                formData.append("name", values.name);
                formData.append("location", values.location);
                formData.append("phone", values.phone);
                const response = await newEmployee(formData).unwrap();
                if (response) {
                  setSuccessModal(true);
                }
              } catch (err) {
                console.log(
                  "Error form submited",
                  err,
                  " api error: ",
                  ErrorNewEmployee,
                  " api is error: ",
                  isErrorMyEmployee
                );
                router.push({
                  pathname: "/Toaster",
                  params: {
                    res: err?.message || err || "Something went wrong",
                  },
                });
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
              values,
              setFieldTouched,
            }) => (
              <View style={tw`flex-1 flex-grow justify-between`}>
                <Pressable
                  onPress={() => pickImage(setFieldValue, setFieldTouched)}
                  style={tw`border border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center mt-2  gap-2 `}
                >
                  {values.image ? (
                    <Image
                      source={{ uri: values.image.uri }}
                      style={tw`h-32 w-32 rounded-3xl`}
                      resizeMode="cover"
                    />
                  ) : (
                    <SvgXml xml={IconUploadImage} />
                  )}
                  {errors.image && touched.image && !values.image ? (
                    <Text
                      style={tw`text-redDeep  font-DegularDisplayDemoRegular text-sm`}
                    >
                      {errors.image}
                    </Text>
                  ) : (
                    <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
                      {!errors.image && values.image ? "Uploaded" : "Upload"}{" "}
                      employee image
                    </Text>
                  )}

                  {!values.image && (
                    <TouchableOpacity
                      onPress={() => pickImage(setFieldValue, setFieldTouched)}
                      style={tw`bg-primary rounded-full w-48 h-10 justify-center items-center`}
                    >
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-white`}
                      >
                        Browse
                      </Text>
                    </TouchableOpacity>
                  )}
                </Pressable>

                <View style={tw`gap-1 mt-6 mb-3`}>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black  ml-2`}
                  >
                    Name
                  </Text>

                  <View
                    style={tw`border border-gray-300 rounded-full px-4 py-2 h-14`}
                  >
                    <TextInput
                      style={tw`flex-1 text-black`}
                      placeholder="Employee name hare"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      placeholderTextColor={"#535353"}
                    />
                  </View>
                  {errors.name && touched.name && (
                    <Text
                      style={tw`text-redDeep  font-DegularDisplayDemoRegular text-sm`}
                    >
                      {errors.name}
                    </Text>
                  )}
                </View>

                <View style={tw`gap-1 mt-6 mb-3`}>
                  <View
                    style={tw`border border-gray-300 rounded-full px-5 py-2 h-14 flex-row items-center gap-2`}
                  >
                    <SvgXml xml={IconPhoneGray} />
                    <TextInput
                      style={tw`flex-1 text-black`}
                      placeholder="Phone number"
                      placeholderTextColor={"#535353"}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      keyboardType="number-pad"
                    />
                  </View>
                  {errors.phone && touched.phone && (
                    <Text
                      style={tw`text-redDeep  font-DegularDisplayDemoRegular text-sm`}
                    >
                      {errors.phone}
                    </Text>
                  )}
                </View>

                <View style={tw`gap-1 mt-6 mb-3`}>
                  <View
                    style={tw`border border-gray-300 rounded-full px-5 py-2 h-14 flex-row items-center gap-2`}
                  >
                    <SvgXml xml={IconLocationGray} />
                    <TextInput
                      style={tw`flex-1 text-black`}
                      placeholder="Location"
                      value={values.location}
                      onChangeText={handleChange("location")}
                    />
                  </View>

                  {errors.location && touched.location && (
                    <Text
                      style={tw`text-redDeep  font-DegularDisplayDemoRegular text-sm`}
                    >
                      {errors.location}
                    </Text>
                  )}
                </View>

                {/*  =========== loading button   =========== */}
                <PrimaryButton
                  titleProps={isLoadingNewEmployee ? "Loading..." : "Add"}
                  onPress={handleSubmit}
                  contentStyle={tw`h-12 `}
                />
              </View>
            )}
          </Formik>

          {/* ============= Success Modal ============ */}
          <SuccessModal
            setModalVisible={setSuccessModal}
            modalVisible={successModalVisible}
            successImage={ImgSuccessGIF}
            modalTitle="New employee added"
          >
            <PrimaryButton
              contentStyle={tw`bg-redDeep`}
              titleProps="Go Back"
              onPress={() => router.back()}
            />
          </SuccessModal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Add_New_Employee;
