import { IconCameraProfile, IconPlusBlackSmall } from "@/assets/icons";
import { ImgProfileImg, ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
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
  { label: "Cleaning", value: "1" },
  { label: "Barbing", value: "2" },
  { label: "Cooking", value: "3" },
  { label: "Plumbing", value: "4" },
];

const Edit_Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6 justify-between flex-grow`}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <BackTitleButton
          pageName={"Edit profile"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />

        <View style={tw`relative justify-center items-center`}>
          <Image style={tw`w-24 h-24 rounded-full`} source={ImgProfileImg} />
          <TouchableOpacity
            style={tw`absolute  right-38 -bottom-2 w-12 h-12 rounded-full bg-primary justify-center items-center`}
          >
            <SvgXml xml={IconCameraProfile} />
            <Pressable
              style={tw`absolute right-0 bottom-0 w-4 h-4 rounded-full bg-white justify-center items-center`}
            >
              <SvgXml fontSize={10} xml={IconPlusBlackSmall} />
            </Pressable>
          </TouchableOpacity>
        </View>
        {/*  ------------- edit input form ------------------- */}
        <View>
          {/* ---------------- full name input filled ---------------- */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            Your full name
          </Text>
          <View
            style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center my-2`}
          >
            <TextInput placeholder="John Smith" />
          </View>

          {/* -------------- contact number ------------------- */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            Contact Number
          </Text>
          <View
            style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center my-2`}
          >
            <TextInput
              placeholder="+12121212112"
              placeholderTextColor={"#535353"}
            />
          </View>

          {/*  ----------- address and location ------------------  */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            Location
          </Text>
          <View
            style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center my-2`}
          >
            <TextInput
              placeholder="Dhaka, Bangladesh"
              placeholderTextColor={"#535353"}
            />
          </View>

          {/*  ----------- About you ------------------  */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            About you
          </Text>

          <TextInput
            style={[styles.textArea, tw`border border-gray-300`]}
            multiline={true}
            numberOfLines={4}
            // placeholder="Type here"
            defaultValue="Lorem ipsum dolor sit amet consectetur. Volutpat neque in proin laoreet nulla malesuada vestibulum duis tristique. Purus diam consequat pharetra est urna. "
            onChangeText={(newText) => console.log(newText)}
            // value={}
            textAlignVertical="top"
          />
        </View>

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
              dropdownPosition="top"
              valueField="value"
              placeholder={!isFocus ? "Cleaning" : "..."}
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
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => setModalVisible(true)}
        titleProps="Save changes"
        // IconProps={""}
        contentStyle={tw`mt-4`}
      />

      {/*  ========================== successful modal ======================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw` flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            {/* Check Icon */}
            <Image style={tw`mt-6 mb-2`} source={ImgSuccessGIF} />

            {/* Success Message */}
            <Text style={tw`text-4xl font-DegularDisplayDemoBold mt-3`}>
              Success!
            </Text>
            <Text style={tw`text-base text-gray-500 text-center mt-2`}>
              Your Profile Updated.
            </Text>

            {/*  ------------- next button -------------------- */}
            <PrimaryButton
              onPress={() => {
                setModalVisible(false);
                router.push("/service_provider/individual/settings/setting");
              }}
              titleProps="Save changes"
              // IconProps={""}
              contentStyle={tw`mt-4`}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Edit_Profile;

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,

    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 180,
    maxHeight: 200,
    borderRadius: 30,
  },

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
});
