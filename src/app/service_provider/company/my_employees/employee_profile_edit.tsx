import { IconLocationGray, IconPhoneGray, IconReplace } from "@/assets/icons";
import { ImgProfileImg, ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import SuccessModal from "@/src/Components/SuccessModal";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
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
  { label: "User", value: "1" },
  { label: "Service Provider", value: "2" },
];

const Employee_Profile_Edit = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [successModalVisible, setSuccessModal] = useState<boolean>(false);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-4 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton
          pageName={"Edit employee"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
          // contentStyle={tw`px-5`}
        />

        <View
          style={tw`relative bg-white h-48 rounded-xl justify-center items-center gap-2`}
        >
          <Image style={tw`w-24 h-24 rounded-full `} source={ImgProfileImg} />

          <TouchableOpacity
            style={tw`absolute top-4 right-4 border border-deepBlue200 p-2 rounded-md`}
          >
            <SvgXml xml={IconReplace} />
          </TouchableOpacity>
        </View>

        {/* ----------- employee name ------------ */}

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
              onChangeText={(value) => console.log(value)}
            />
          </View>
        </View>

        {/*  ------------ dropdown section j----------------- */}
        <View style={tw``}>
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black  ml-2`}
          >
            Role
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "- select roll-" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        {/*  ---------------- Phone number -------------- */}

        <View style={tw`gap-1 mt-6 mb-3`}>
          <View
            style={tw`border border-gray-300 rounded-full px-5 py-2 h-14 flex-row items-center gap-2`}
          >
            <SvgXml xml={IconPhoneGray} />
            <TextInput
              style={tw`flex-1`}
              placeholder="Phone number"
              onChangeText={(value) => console.log(value)}
            />
          </View>
        </View>

        {/* ------------------ location -------------- */}
        <View style={tw`gap-1 mt-6 mb-3`}>
          <View
            style={tw`border border-gray-300 rounded-full px-5 py-2 h-14 flex-row items-center gap-2`}
          >
            <SvgXml xml={IconLocationGray} />
            <TextInput
              style={tw`flex-1`}
              placeholder="Location"
              onChangeText={(value) => console.log(value)}
            />
          </View>
        </View>
      </View>

      {/* ---------------- primary button ---------------- */}

      <PrimaryButton
        titleProps="Save changes"
        onPress={() => setSuccessModal(true)}
      />

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
