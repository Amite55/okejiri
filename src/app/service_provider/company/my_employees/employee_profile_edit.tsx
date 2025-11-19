import { IconLocationGray, IconPhoneGray, IconProfileImageEdit } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import SuccessModal from "@/src/Components/SuccessModal";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useEditEmployeeMutation, useEmployeeDetailsQuery } from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,

  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "User", value: "1" },
  { label: "Service Provider", value: "2" },
];

const Employee_Profile_Edit = () => {
  const { id } = useLocalSearchParams();

  // ========================== API 
  const { data: employeeDetailsData, isLoading: isLoadingEmployeeDetails, isError: isErrorEmployeeDetails } = useEmployeeDetailsQuery(id)
  const employee = employeeDetailsData?.data;

  const [editEmployee, { isLoading: isLoadingEditEmployee }] = useEditEmployeeMutation();
  // console.log(" ==================== employee details =============== ", JSON.stringify(employeeDetailsData, null, 2))



  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [successModalVisible, setSuccessModal] = useState<boolean>(false);



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
      errors.location = "Location is required"
    }
    return errors;
  }

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
      const fileExt = uriParts[uriParts.length - 1]; // e.g., "jpeg", "png"

      // Set name dynamically: user + timestamp + extension
      const fileName = `employee_${Date.now()}.${fileExt}`;

      // Set MIME type dynamically
      const fileType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;
      // console.log(" picker uri ======== ", picked?.uri)
      // console.log(" file name ========== ", fileName);
      // console.log(" type ================", fileType)
      // Set Formik field
      setFieldValue("image", {
        uri: picked.uri,
        name: fileName,
        type: fileType,
      });
      setFieldTouched("image", true);
    }
  };





  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-base_color`}
      behavior={Platform.OS === "ios" ? "padding" : "position"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -120}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss} accessible={false}
      >

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-grow px-5`}
          contentContainerStyle={tw`pb-6 gap-6`}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <BackTitleButton
              pageName={"Edit employee"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            // contentStyle={tw`px-5`}
            />

            <Formik
              enableReinitialize={true}
              initialValues={{
                image: employee?.image ? { uri: employee?.image, name: "existing.jpg", type: "image/jpeg" } : null,
                name: employee?.name ?? "",
                phone: employee?.phone ?? "",
                location: employee?.location ?? ""
              }}
              // validate={validation}
              onSubmit={async (values) => {
                // console.log("=========== Final ", JSON.stringify(values, null, 2));
                try {
                  const formData = new FormData();

                  formData.append("image", {
                    uri: (values.image as any).uri,
                    name: (values.image as any).name || "photo.jpg",
                    type: (values.image as any).type || "image/jpeg"
                  } as any);


                  // if (values.name !== employee.name) {
                  formData.append("name", values.name);

                  formData.append("location", values.location);

                  formData.append("phone", values.phone);


                  formData.append("_method", "PUT");
                  console.log("=========== Final ", JSON.stringify(formData, null, 2));

                  const response = await editEmployee({ id: id, formData: formData }).unwrap();

                  if (response) {
                    setSuccessModal(true);
                  }
                } catch (err) {
                  console.log("Error form submited", err, " api error: ", isErrorEmployeeDetails);
                }



              }}
            >
              {({ handleChange, handleSubmit, errors, touched, setFieldValue, values, setFieldTouched }) => (
                <View

                >
                  {/* <Pressable
                    onPress={() => pickImage(setFieldValue, setFieldTouched)}
                    style={tw`border border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center mt-2  gap-2 `}
                  >
                    {values.image ? (
                      <Image
                        source={{ uri: values.image.uri }}
                        style={tw`h-32 w-32 rounded-3xl`}
                        resizeMode="cover"
                      />
                    ) :
                      <SvgXml xml={IconUploadImage} />
                    }
                    {errors.image && touched.image && !values.image ?
                      <Text style={tw`text-redDeep  font-DegularDisplayDemoRegular text-lg`}>
                        {errors.image}
                      </Text> :
                      <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
                        {!errors.image && values.image ? "Uploaded" : "Upload"} employee image
                      </Text>
                    }

                    {!values.image &&
                      <TouchableOpacity
                        onPress={() => pickImage(setFieldValue, setFieldTouched)}
                        style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
                      >
                        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-white`}>
                          Browse
                        </Text>
                      </TouchableOpacity>
                    }
                  </Pressable> */}
                  <View style={tw`bg-white  py-10 flex-row justify-center rounded-2xl`}>
                    <View>
                      <Image source={values.image?.uri} contentFit="cover" style={tw`rounded-full w-25 h-25`} />
                    </View>
                    <TouchableOpacity
                      onPress={() => pickImage(setFieldValue, setFieldTouched)}
                      style={tw`absolute w-full  items-end right-3 top-3`}
                    >
                      <View >
                        <SvgXml xml={IconProfileImageEdit} />
                      </View>
                    </TouchableOpacity>

                  </View>


                  <View style={tw`gap-1 mt-6 mb-3`}>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black  ml-2`}
                    >
                      Name
                    </Text>

                    <View style={tw`border border-gray-300 rounded-full px-4 py-2 h-14`}>
                      <TextInput
                        style={tw`flex-1`}
                        placeholder="Employee name hare"
                        value={values.name}
                        onChangeText={handleChange("name")}
                        placeholderTextColor={"#535353"}
                      />
                    </View>
                    {errors.name && touched.name && (
                      <Text style={tw`text-redDeep  font-DegularDisplayDemoRegular text-lg`}>
                        {errors.name}
                      </Text>
                    )

                    }
                  </View>


                  <View style={tw`gap-1 mt-6 mb-3`}>
                    <View
                      style={tw`border border-gray-300 rounded-full px-5 py-2 h-14 flex-row items-center gap-2`}
                    >
                      <SvgXml xml={IconPhoneGray} />
                      <TextInput
                        style={tw`flex-1`}
                        placeholder="Phone number"
                        placeholderTextColor={"#535353"}
                        value={values.phone}
                        onChangeText={handleChange("phone")}
                        keyboardType="number-pad"
                      />
                    </View>
                    {errors.phone && touched.phone && (
                      <Text style={tw`text-redDeep  font-DegularDisplayDemoRegular text-lg`}>
                        {errors.phone}
                      </Text>
                    )

                    }
                  </View>


                  <View style={tw`gap-1 mt-6 mb-3`}>
                    <View
                      style={tw`border border-gray-300 rounded-full px-5 py-2 h-14 flex-row items-center gap-2`}
                    >
                      <SvgXml xml={IconLocationGray} />
                      <TextInput
                        style={tw`flex-1`}
                        placeholder="Location"
                        value={values.location}
                        onChangeText={handleChange("location")}
                      />
                    </View>

                    {errors.location && touched.location && (
                      <Text style={tw`text-redDeep  font-DegularDisplayDemoRegular text-lg`}>
                        {errors.location}
                      </Text>
                    )

                    }
                  </View>
                  {isLoadingEditEmployee &&
                    <ActivityIndicator size={"large"} color={"#FF6600"} />
                  }
                  <PrimaryButton titleProps="Save changes" onPress={handleSubmit} />
                </View>
              )}



            </Formik>
          </View>

          {/* ---------------- primary button ---------------- */}

          {/* <PrimaryButton
            titleProps="Save changes"
            onPress={() => setSuccessModal(true)}
          /> */}

          <SuccessModal
            setModalVisible={setSuccessModal}
            modalVisible={successModalVisible}
            successImage={ImgSuccessGIF}
            modalTitle="Changes Employee Info"
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

export default Employee_Profile_Edit;

// ------------ dropdown Style --------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
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
