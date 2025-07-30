import { IconCameraProfile } from "@/assets/icons";
import { ImgCompanyLogo } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "Cleaning", value: "1" },
  { label: "Barbing", value: "2" },
  { label: "Cooking", value: "3" },
  { label: "Plumbing", value: "4" },
  { label: "Designing", value: "5" },
];

const Setup_Business_Profile = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1  bg-base_color`}
      contentContainerStyle={tw`pb-6 px-4 `}
    >
      <BackTitleButton
        pageName={"Setup your business profile"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />
      <View style={tw` justify-center items-center mt-4`}>
        <Image
          style={tw`relative w-24 h-24 rounded-full `}
          source={ImgCompanyLogo}
        />
        <TouchableOpacity
          style={tw`w-12 h-12 bg-primary rounded-full justify-center items-center absolute -bottom-4 right-33`}
        >
          <SvgXml xml={IconCameraProfile} />
        </TouchableOpacity>
      </View>

      <Text
        style={tw`font-DegularDisplayDemoMedium text-lg text-black text-center mt-6`}
      >
        Upload your business logo
      </Text>

      {/* --------------------- input from ---------------- */}

      <View style={tw` mb-8`}>
        {/*  ------------------ business name ------------------- */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-6`}
        >
          Business name
        </Text>
        <TextInput
          style={tw` rounded-full border border-gray-400 mt-2 text-base text-black px-4`}
          defaultValue="Okejiri Company"
        />

        {/*  --------- company location ------------- */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-3`}
        >
          Location
        </Text>
        <TextInput
          style={tw` rounded-full border border-gray-400 mt-2 text-base text-black px-4`}
          defaultValue="Dhaka, Bangladesh"
        />

        {/* ----------- company about --------------- */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-3`}
        >
          About your business
        </Text>
        <TextInput
          style={tw` rounded-3xl border border-gray-400 mt-2 text-base text-black px-4`}
          multiline
          numberOfLines={8}
          defaultValue="Lorem ipsum dolor sit amet consectetur. Volutpat neque in proin laoreet nulla malesuada vestibulum duis tristique. Purus diam consequat pharetra est urna. "
        />

        <MultiSelect
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dropdownData}
          maxHeight={300}
          labelField="label"
          dropdownPosition="top"
          valueField="value"
          //   multiple={true}
          placeholder={!isFocus ? "-select your services-" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item);
            // setIsFocus(false);
          }}
        />

        {/*  --------- company location ------------- */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-base ml-2 text-black mt-3`}
        >
          Number of employees
        </Text>
        <TextInput
          style={tw` rounded-full border border-gray-400 mt-2 text-base text-black px-4`}
          innputMode="numeric"
          keyboardType="numeric"
          defaultValue="20"
        />
      </View>

      <PrimaryButton
        onPress={() => router.push("/KYC_auth/id_card")}
        titleProps="Sign up"
      />
    </ScrollView>
  );
};

export default Setup_Business_Profile;

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
    marginTop: 15,
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
