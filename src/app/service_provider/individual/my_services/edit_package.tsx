import {
  IconDeleteRed,
  IconEditPenGreen,
  IconPlusYellow,
  IconResetImage,
  IconWatch,
} from "@/assets/icons";
import { ImgCleaning } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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

const Edit_Package = () => {
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
            pageName={"Edit package"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-2xl`}
          />

          {/* -------------- service image j------------------- */}

          <View style={tw`relative justify-center items-center`}>
            <Image style={tw`h-44 w-[98%] rounded-2xl`} source={ImgCleaning} />
            <TouchableOpacity style={tw`absolute right-4 top-2`}>
              <SvgXml xml={IconResetImage} />
            </TouchableOpacity>
          </View>

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
              placeholderTextColor={"#535353"}
              // value={}
              textAlignVertical="top"
            />
          </View>

          <View>
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
              Service details
            </Text>

            <View style={tw`border border-gray-300 rounded-3xl p-5 gap-3`}>
              <View style={tw`flex-row justify-between items-center`}>
                <TextInput
                  placeholder="Type hare"
                  placeholderTextColor={"#535353"}
                />
                <TouchableOpacity
                  style={tw`w-11 h-11 rounded-full border border-gray-300 justify-center items-center`}
                >
                  <SvgXml xml={IconPlusYellow} />
                </TouchableOpacity>
              </View>

              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <View style={tw`w-2 h-2 bg-black rounded-2xl`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>

                <TouchableOpacity style={tw`justify-center items-center`}>
                  <SvgXml xml={IconDeleteRed} />
                </TouchableOpacity>
              </View>

              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <View style={tw`w-2 h-2 bg-black rounded-2xl`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>

                <TouchableOpacity style={tw`justify-center items-center`}>
                  <SvgXml xml={IconDeleteRed} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`my-3`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-1 ml-2`}
              >
                Price
              </Text>
              <View
                style={tw`border  border-gray-300 h-14 rounded-full px-4 flex-row justify-between items-center`}
              >
                <TextInput
                  style={tw`flex-1`}
                  defaultValue="40.00"
                  //   placeholder="49.00"
                  onChangeText={(newText) => console.log(newText)}
                  placeholderTextColor={"#535353"}
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
              placeholder={!isFocus ? "2 hours" : "..."}
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
              style={tw`flex-1 flex-row justify-between px-5 items-center gap-2 border h-14 rounded-3xl border-gray-300`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <SvgXml xml={IconWatch} />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black `}
                >
                  12:00 PM
                </Text>
              </View>
              <SvgXml xml={IconEditPenGreen} />
            </TouchableOpacity>
            {/*  to time ------------------  */}
            <TouchableOpacity
              onPress={showTimepicker}
              style={tw`flex-1 flex-row justify-between px-5 items-center gap-2 border h-14 rounded-3xl border-gray-300`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <SvgXml xml={IconWatch} />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black `}
                >
                  02:00 PM
                </Text>
              </View>
              <SvgXml style={tw``} xml={IconEditPenGreen} />
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
            titleProps="Save changes"
            // IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Edit_Package;

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
    borderRadius: 30,
  },
});
