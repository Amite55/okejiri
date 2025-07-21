import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "1 hours", value: "1" },
  { label: "2 hours", value: "2" },
  { label: "3 hours", value: "3" },
  { label: "6 hours", value: "4" },
];

const Delivery_Extension = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={tw`flex-1`}
      >
        <View
          style={tw`flex-1 flex-grow justify-between pb-5 bg-base_color px-5`}
        >
          <View>
            <BackTitleButton
              pageName={"Delivery extension"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-2xl`}
            />

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
                placeholder={!isFocus ? "Select time" : "..."}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <View style={tw``}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
              >
                Service details
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
          </View>

          {/* ----------------------- submit password -------------- */}
          <PrimaryButton
            // onPress={() => handleSubmit()}
            onPress={() =>
              router.push("/service_provider/individual/my_services/my_service")
            }
            titleProps="Send request"
            // IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Delivery_Extension;

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
