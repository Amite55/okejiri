import { IconPayCardWhite } from "@/assets/icons";
import { ImgBoostPlan } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "3 days", value: "1" },
  { label: "7 dayss", value: "2" },
  { label: "15 days", value: "3" },
  { label: "30 days", value: "4" },
];

const Boost_Profile_Plan = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1   px-5 bg-base_color`}
      contentContainerStyle={tw`pb-6 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton
          pageName={"Boost your profile"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />

        <View style={tw`justify-center items-center`}>
          <Image
            resizeMode="contain"
            style={tw`h-80 w-full`}
            source={ImgBoostPlan}
          />
        </View>

        <Text
          style={tw` font-DegularDisplayDemoMedium text-xl text-black text-center my-8`}
        >
          Boost your profile to increase the visibility within your location.
        </Text>

        <View style={tw`flex-row justify-center items-center my-14`}>
          <Text
            style={tw`font-DegularDisplayDemoSemibold text-4xl text-primary `}
          >
            ₦ 200.00
          </Text>
          <Text
            style={tw`font-DegularDisplayDemoRegular  text-xl text-primary`}
          >
            / month
          </Text>
        </View>

        {/*  ------------ dropdown section j----------------- */}
        <View style={tw``}>
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
          >
            Extend delivery time for
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "- Select -" : "..."}
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

      <View style={tw`gap-2 `}>
        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Upgrade your boost for 30 days
          </Text>
          <Text style={tw`font-DegularDisplayDemoSemibold text-3xl text-black`}>
            ₦ 200.00
          </Text>
        </View>
        {/*  ------------- next button -------------------- */}
        <PrimaryButton
          // onPress={() => {
          //   router.push(
          //     "/service_provider/individual/boost_profiles/boost_profile_plan"
          //   );
          // }}
          titleProps="Pay now "
          IconProps={IconPayCardWhite}
          contentStyle={tw`mt-4`}
        />
      </View>
    </ScrollView>
  );
};

export default Boost_Profile_Plan;

const styles = StyleSheet.create({
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
    minHeight: 200,
    maxHeight: 300,
    borderRadius: 20,
  },
});
