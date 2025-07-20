import { IconUploadImage } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "Provider harassed me", value: "1" },
  { label: "Service was poorly done", value: "2" },
  { label: "My property was stolen", value: "3" },
  { label: "Others", value: "4" },
];

const Dispute_Process = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-28 justify-between flex-1 flex-grow`}
    >
      <BackTitleButton
        pageName={"Dispute process"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
      />
      <View style={tw`gap-3`}>
        {/*  ------------ dropdown section j----------------- */}
        <View style={tw``}>
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
          >
            Reason
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "- select -" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        {/*  ---------- message explanation --------------- */}

        <View style={tw`p-3`}>
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
          >
            Your explanation
          </Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
            placeholder="Type here"
            onChangeText={(newText) => console.log(newText)}
            // value={}
            textAlignVertical="top"
          />
        </View>

        {/* ------------------ Image upload ------------------ */}

        <Pressable
          style={tw`border-2 border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center   gap-2 `}
        >
          <SvgXml xml={IconUploadImage} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl  text-black`}>
            Upload files
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
            Upload images or videos
          </Text>
          <TouchableOpacity
            style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
          >
            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-white`}>
              Browse
            </Text>
          </TouchableOpacity>
        </Pressable>
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => router.push("/company/(Tabs)")}
        titleProps="Submit"
        // IconProps={""}
        contentStyle={tw`mt-4`}
      />
    </ScrollView>
  );
};

export default Dispute_Process;

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
