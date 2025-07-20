import { IconUploadImage, IconWatch } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "1 hours", value: "1" },
  { label: "2 hours", value: "2" },
  { label: "3 hours", value: "3" },
  { label: "6 hours", value: "4" },
];

const Add_Package = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  //    ---------------- date picker -----------

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={tw`flex-1`}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 bg-base_color `}
          contentContainerStyle={tw`pb-6 px-5 `}
        >
          <BackTitleButton
            pageName={"Bookings history"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-2xl`}
          />

          {/* ------------------ Image upload ------------------ */}

          <Pressable
            style={tw`border-2 border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center gap-2  `}
          >
            <SvgXml xml={IconUploadImage} />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl  text-black`}
            >
              Upload files
            </Text>
            <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
              Upload images or videos
            </Text>
            <TouchableOpacity
              style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-white`}
              >
                Browse
              </Text>
            </TouchableOpacity>
          </Pressable>

          {/*  ---------- message explanation --------------- */}

          <View style={tw`my-3`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
            >
              Service title
            </Text>
            <TextInput
              textAlign="left"
              style={tw`border border-gray-300 h-14 rounded-full px-4 justify-center items-center`}
              placeholder="Service title goes here"
              onChangeText={(newText) => console.log(newText)}
              // value={}
              textAlignVertical="top"
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

          <View style={tw``}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
            >
              Price
            </Text>
            <View
              style={tw`border  border-gray-300 h-14 rounded-full px-4 flex-row justify-between items-center`}
            >
              <TextInput
                style={tw`flex-1`}
                placeholder="Service title goes here"
                onChangeText={(newText) => console.log(newText)}
                // value={}
                textAlignVertical="top"
              />
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
              >
                ₦{" "}
              </Text>
            </View>
          </View>

          {/* ------------------- selected delivery hour -------------- */}
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
              placeholder={!isFocus ? "Delivery time" : "..."}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          {/*  -------------- from time and to time ---------------- */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2 mt-4`}
          >
            Available time
          </Text>
          <View style={tw`flex-row items-center gap-3`}>
            {/*  from time ------- */}
            <TouchableOpacity
              onPress={showTimepicker}
              style={tw`flex-1 flex-row justify-center items-center gap-2 border h-14 rounded-3xl border-gray-300`}
            >
              <SvgXml xml={IconWatch} />
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black `}
              >
                From
              </Text>
            </TouchableOpacity>
            {/*  to time  */}
            <TouchableOpacity
              onPress={showTimepicker}
              style={tw`flex-1 flex-row justify-center items-center gap-2 border h-14 rounded-3xl border-gray-300`}
            >
              <SvgXml xml={IconWatch} />
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black `}
              >
                To
              </Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          {/* ----------------------- submit password -------------- */}
          <PrimaryButton
            // onPress={() => handleSubmit()}
            onPress={() =>
              router.push("/service_provider/individual/my_services/my_service")
            }
            titleProps="Add"
            // IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Add_Package;

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
    minHeight: 100,
    maxHeight: 150,
    borderRadius: 20,
  },
});
