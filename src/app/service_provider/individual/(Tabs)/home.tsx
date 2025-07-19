import { IconBalance, IconSettingWhite } from "@/assets/icons";
import { ImgNew } from "@/assets/images/image";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "This week", value: "1" },
  { label: "This month", value: "2" },
  { label: "This year", value: "3" },
];

const Individual_Service_Provider_Index = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* header parts  */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/service_provider/individual/account")}
      />

      <View
        style={tw`h-52 bg-white rounded-2xl flex-row  justify-between px-6 py-4 mt-4`}
      >
        <View style={tw`my-4 gap-2`}>
          <View
            style={tw`w-16 h-16 rounded-full justify-center items-center border border-primary`}
          >
            <SvgXml xml={IconBalance} />
          </View>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Total earnings
          </Text>
          <Text style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}>
            ₦ 100,000
          </Text>
        </View>
        <View style={tw`w-44`}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "This week" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View>

      {/* -------------------- status ------------------------ */}
      <View>
        <View
          style={tw`relative flex-row gap-4 bg-redWhite h-20 items-center px-4 rounded-2xl`}
        >
          <SvgXml xml={IconSettingWhite} />
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              New order:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-3xl text-white`}
            >
              10
            </Text>
          </View>
          <View style={tw`absolute -top-2 right-1`}>
            <Image source={ImgNew} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Individual_Service_Provider_Index;

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
