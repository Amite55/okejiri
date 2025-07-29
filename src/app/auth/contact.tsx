import { IconLocation, IconRightArrow } from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import LocationAccessModal from "@/src/Components/LocationAccessModal";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Contact = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [locationModalVisible, setLocationModal] = useState(false);

  return (
    <ScrollView style={tw`flex-1 bg-base_color px-5`}>
      <BackTitleButton
        onPress={() => router.back()}
        pageName={"Sign up as a service user"}
        titleTextStyle={tw`text-2xl`}
      />

      <View style={tw`justify-center items-center mb-12`}>
        <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
        <AuthComponents
          title="Enter your contact information"
          subTitle="Please enter your legal contact information so that users can find you faster."
        />
      </View>
      <View>
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
            onChangeText={(value) => setNumber(value)}
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
            onChangeText={(value) => setLocation(value)}
          />
        </View>

        <TouchableOpacity
          style={tw`flex-row items-center gap-2 justify-center`}
          onPress={() => setLocationModal(true)}
        >
          <SvgXml xml={IconLocation} />
          <Text
            style={tw`text-secondary font-DegularDisplayDemoRegular text-center text-xl my-4`}
          >
            Use my current location
          </Text>
        </TouchableOpacity>
        <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
          About you
        </Text>
        <View style={tw`flex-row  gap-2 border h-52 rounded-3xl px-3 mb-4`}>
          <TextInput
            placeholderTextColor="#777777"
            textAlignVertical="top"
            style={tw`flex-1 text-base font-PoppinsMedium `}
            placeholder="Write a bio about you"
            onChangeText={(value) => setLocation(value)}
          />
        </View>

        <TouchableOpacity
          style={tw`bg-primary rounded-full my-4`}
          onPress={() => {
            router.replace("/KYC_auth/id_card");
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
            <View style={tw`flex-row justify-center items-center gap-4`}>
              <Text
                style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
              >
                Continue
              </Text>
              <SvgXml xml={IconRightArrow} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/*  n================= access your current location allow ------------------------- */}

      <LocationAccessModal
        setLocationModalVisible={setLocationModal}
        locationModalVisible={locationModalVisible}
        onAllowPress={() => setLocationModal(false)}
        onDenyPress={() => setLocationModal(false)}
      />
    </ScrollView>
  );
};

export default Contact;
