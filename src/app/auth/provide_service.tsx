import { IconQunsMark, IconRightArrow } from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "Cleaning", value: "1" },
  { label: "Barbing", value: "2" },
  { label: "Cooking", value: "3" },
  { label: "Plumbing", value: "4" },
  { label: "Designing", value: "5" },
];

const Provide_Service = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <ScrollView
      style={tw`flex-1 bg-base_color px-5`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`pb-2 justify-between  flex-grow`}
    >
      <View>
        <BackTitleButton
          onPress={() => router.back()}
          pageName={"Sign up as a service provider"}
          titleTextStyle={tw`text-xl`}
        />
        <View style={tw`justify-center items-center mb-12`}>
          <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
          <AuthComponents
            title="What kind of service you provide ?"
            subTitle="Please select a service that suits best with your work."
          />
        </View>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dropdownData}
          maxHeight={300}
          labelField="label"
          dropdownPosition="top"
          valueField="value"
          placeholder={!isFocus ? "Select service" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            router.push("/auth/ServiceRequestModal");
          }}
          style={tw`flex-row items-center gap-2 my-4 justify-center`}
        >
          <SvgXml xml={IconQunsMark} />
          <Text style={tw`font-DegularDisplayDemoRegular text-lg text-primary`}>
            Request to add service
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={tw`bg-primary rounded-full my-4`}
        // onPress={() => {
        //   handleRouting();
        // }}
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
              Sign up
            </Text>
            <SvgXml xml={IconRightArrow} />
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Provide_Service;

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
