import { IconRightArrow } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface BillingDetailsProps {
  address: string;
  contactNumber: any;
  email: string;
  name: string;
}

const BillingDetails = () => {
  const { bookingDetails } = useLocalSearchParams();
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const perseBookingDetails = JSON.parse(bookingDetails as any);

  // ------------------ api end point ----------------------
  const { data: userProfileInfo, isLoading, error } = useProfileQuery({});

  const handleSubmit = (values: BillingDetailsProps) => {
    try {
      const billingDetails = {
        ...perseBookingDetails,
        billing_name: values.name,
        billing_email: values.email,
        billing_contact: values.contactNumber,
        billing_address: values.address,
      };
      router.push({
        pathname: "/company/serviceBookings/booking_confirmation",
        params: { bookingInfoDetails: JSON.stringify(billingDetails) },
      });
    } catch (error) {
      console.log(error, "this is error ------------>");
    }
  };

  // ---------------- from formik validation ----------------
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.contactNumber) {
      errors.contactNumber = "Contact Number is required";
    }
    if (!values.address) {
      errors.address = "Address is required";
    }
    return errors;
  };

  // --------------------- dynamic keyboard avoiding view useEffect -------------------
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
  // ============ loading state ==================
  if (isLoading)
    return (
      <View style={tw`flex-1 bg-base_color justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={tw`flex-1 bg-base_color`}>
          <ScrollView
            style={tw`flex-1 `}
            contentContainerStyle={[
              tw`flex-grow px-5`,
              isKeyboardVisible && tw`pb-10`,
            ]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <BackTitleButton
              pageName={"Billing details"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />
            <Formik
              initialValues={{
                name: userProfileInfo?.data?.name || "",
                email: userProfileInfo?.data?.email || "",
                contactNumber: userProfileInfo?.data?.phone || "",
                address: userProfileInfo?.data?.address || "" || "",
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
              validate={validate}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                errors,
              }) => (
                <View style={tw`flex-1 justify-between flex-grow`}>
                  <View>
                    {/* [=================== user info form =================] */}
                    <View style={tw`gap-4 mt-4`}>
                      {/* ------------ name --------------- */}
                      <View style={tw`gap-2`}>
                        <Text
                          style={tw`font-PoppinsMedium text-base text-black ml-2`}
                        >
                          Your full name
                        </Text>
                        <View
                          style={tw`border border-gray-300 justify-center  w-full rounded-full h-14 px-4 `}
                        >
                          <TextInput
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            placeholder="Jone Doe"
                            placeholderTextColor={"#535353"}
                            style={tw`text-black font-DegularDisplayDemoMedium text-base`}
                          />
                        </View>
                        {touched.name && errors.name && (
                          <Text style={tw`text-red-500 ml-3  text-sm`}>
                            {errors.name}
                          </Text>
                        )}
                      </View>

                      {/* -------------- email ---------------- */}
                      <View style={tw`gap-2`}>
                        <Text
                          style={tw`font-PoppinsMedium text-base text-black ml-2`}
                        >
                          Email
                        </Text>
                        <View
                          style={tw`border border-gray-300 justify-center  w-full rounded-full h-14 px-4 `}
                        >
                          <TextInput
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            placeholder="example@gmail.com"
                            placeholderTextColor={"#535353"}
                            style={tw`text-black font-DegularDisplayDemoMedium text-base`}
                          />
                        </View>
                        {touched.email && errors.email && (
                          <Text style={tw`text-red-500 ml-3  text-sm`}>
                            {errors.email}
                          </Text>
                        )}
                      </View>

                      {/* ------------ contact number ================== */}
                      <View style={tw`gap-2`}>
                        <Text
                          style={tw`font-PoppinsMedium text-base text-black ml-2`}
                        >
                          Contact Number
                        </Text>
                        <View
                          style={tw`border border-gray-300 justify-center  w-full rounded-full h-14 px-4 `}
                        >
                          <TextInput
                            onChangeText={handleChange("contactNumber")}
                            onBlur={handleBlur("contactNumber")}
                            value={values.contactNumber}
                            placeholder="+2156985632"
                            placeholderTextColor={"#535353"}
                            style={tw`text-black font-DegularDisplayDemoMedium text-base`}
                          />
                        </View>
                        {touched.contactNumber && errors.contactNumber && (
                          <Text style={tw`text-red-500 ml-3 text-sm`}>
                            {errors.contactNumber}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* ---------- location ----------------- */}
                    <View
                      style={tw`flex-row justify-between items-center mt-6`}
                    >
                      <Text
                        style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                      >
                        Your location
                      </Text>
                    </View>

                    <View
                      style={tw`border border-gray-300 justify-center  w-full rounded-3xl  px-4 `}
                    >
                      <TextInput
                        onChangeText={handleChange("address")}
                        onBlur={handleBlur("address")}
                        value={values.address}
                        placeholder="Address"
                        textAlign="left"
                        textAlignVertical="top"
                        multiline={true}
                        numberOfLines={3}
                        style={tw`text-black font-DegularDisplayDemoMedium text-base h-20`}
                        placeholderTextColor={"#535353"}
                      />
                    </View>
                    {touched.address && errors.address && (
                      <Text style={tw`text-red-500 ml-3 py-2  text-sm`}>
                        {errors.address}
                      </Text>
                    )}
                  </View>

                  {/* ------------------------ next button ------------------ */}
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    titleProps="Next  2/4"
                    IconProps={IconRightArrow}
                    contentStyle={tw`mt-4`}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BillingDetails;
