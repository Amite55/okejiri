import { IconLocation, IconRightArrow } from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import LocationAccessModal from "@/src/Components/LocationAccessModal";
import useLocation from "@/src/hooks/useLocation";
import { useProviderTypes } from "@/src/hooks/useProviderTypes";
import { useRoll } from "@/src/hooks/useRollHooks";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useCompletePersonalizationMutation } from "@/src/redux/apiSlices/personalizationSlice";
import { router } from "expo-router";
import React, { useState } from "react";
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

const Contact = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [isLatitude, setIsLatitude] = useState(null);
  const [isLongitude, setIsLongitude] = useState(null);
  const [locationModalVisible, setLocationModal] = useState(false);
  const roll = useRoll();
  const providerTypes = useProviderTypes();
  const { longitude, latitude, errorMsg } = useLocation();

  // ------------------------ api end point ---------------------
  const [information, { isLoading: isLoadingPersonalization }] =
    useCompletePersonalizationMutation();

  const handleLocation = () => {
    setIsLatitude(latitude);
    setIsLongitude(longitude);
    console.log(isLatitude, isLongitude, "add location  your location ");
  };

  const handlePersonalInfo = async () => {
    try {
      // -------------- validation ---------------------
      if (!phone || !address) {
        router.push({
          pathname: "/Toaster",
          params: { res: "Please fill all the fields" },
        });
        return;
      }
      const info = {
        phone,
        address,
        about,
        latitude: isLatitude ? isLatitude : null,
        longitude: isLongitude ? isLongitude : null,
        role: roll,
        provider_type: providerTypes ? providerTypes : " ",
      };
      if (roll === "USER") {
        delete info.about;
        delete info.provider_type;
        const res = await information(info).unwrap();
        if (res) {
          router.replace("/company/(Tabs)");
        }
      } else if (roll === "PROVIDER") {
        if (providerTypes === "Individual") {
          router.replace({
            pathname: "/auth/provide_service",
            params: { jsonContactInfo: JSON.stringify(info) },
          });
        } else if (providerTypes === "Company") {
          router.replace({
            pathname: "/auth/setup_business_profile",
            params: { jsonContactInfo: JSON.stringify(info) },
          });
        }
      }
    } catch (error) {
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={tw`flex-1 bg-base_color px-5`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-2 justify-between  flex-grow`}
        >
          <View>
            <BackTitleButton
              onPress={() => router.back()}
              pageName={"Sign up as a service user"}
              titleTextStyle={tw`text-lg`}
            />

            <View style={tw`justify-center items-center mb-12`}>
              <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
              <AuthComponents
                title="Enter your contact information"
                subTitle="Please enter your legal contact information so that users can find you faster."
              />
            </View>

            <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
              Contact Number
            </Text>
            <View
              style={tw`flex-row items-center gap-2 border h-12 rounded-full px-3 mb-4`}
            >
              <TextInput
                placeholderTextColor="#777777"
                style={tw`flex-1 text-base font-PoppinsMedium `}
                placeholder="Your number"
                onChangeText={(value) => setPhone(value)}
              />
            </View>
            <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
              Location
            </Text>
            <View
              style={tw`flex-row items-center gap-2 border h-12 rounded-full px-3 mb-4`}
            >
              <TextInput
                placeholderTextColor="#777777"
                style={tw`flex-1 text-base font-PoppinsMedium `}
                placeholder="Your location"
                onChangeText={(value) => setAddress(value)}
              />
            </View>

            <TouchableOpacity
              style={tw`flex-row items-center gap-2 justify-center`}
              onPress={() => handleLocation()}
            >
              <SvgXml xml={IconLocation} />
              <Text
                style={tw`text-secondary font-DegularDisplayDemoRegular text-center text-xl my-4`}
              >
                Use my current location
              </Text>
            </TouchableOpacity>

            {((roll === "PROVIDER" && providerTypes === "Company") ||
              providerTypes === "Individual") && (
              <View>
                <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
                  About you
                </Text>
                <View
                  style={tw`flex-row  gap-2 border h-52 rounded-3xl px-3 mb-4`}
                >
                  <TextInput
                    placeholderTextColor="#777777"
                    textAlignVertical="top"
                    style={tw`flex-1 text-base font-PoppinsMedium `}
                    placeholder="Write a bio about you"
                    onChangeText={(value) => setAbout(value)}
                  />
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={tw`bg-primary rounded-full my-2`}
            onPress={() => {
              handlePersonalInfo();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={tw`flex-row justify-center items-center gap-3 h-12`}>
                <ActivityIndicator size={"small"} color={tw.color("white")} />{" "}
                <Text
                  style={tw` text-center text-white text-base font-PoppinsBold`}
                >
                  Continue
                </Text>
              </View>
            ) : (
              <View style={tw`flex-row justify-center items-center gap-4 h-12`}>
                <Text
                  style={tw` text-center text-white text-base  font-PoppinsBold`}
                >
                  Continue
                </Text>
                <SvgXml xml={IconRightArrow} />
              </View>
            )}
          </TouchableOpacity>

          {/*  n================= access your current location allow ------------------------- */}

          <LocationAccessModal
            setLocationModalVisible={setLocationModal}
            locationModalVisible={locationModalVisible}
            onAllowPress={() => setLocationModal(false)}
            onDenyPress={() => setLocationModal(false)}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Contact;
