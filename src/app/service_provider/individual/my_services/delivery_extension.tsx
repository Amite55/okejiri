import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useRequestExtendDeliveryTimeMutation } from "@/src/redux/apiSlices/companyProvider/orderSlices";
import { router, useLocalSearchParams } from "expo-router";
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
  const { id } = useLocalSearchParams();
  // console.log("Delivery extension === order id ", id);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [reason, setReason] = useState("");

  // api
  const [
    deliveryExtension,
    {
      data: deliveryExtensionData,
      isLoading: isLoadingDeliveryExtension,
      isError: isErrorDeliveryExtension,
      error: errorDeliveryExtension,
    },
  ] = useRequestExtendDeliveryTimeMutation();

  const handleRequest = async () => {
    // console.log("press================")
    if (value && reason.trim().length > 3) {
      try {
        const requestBody = {
          time: Number(value),
          reason,
          booking_id: Number(id),
        };
        // console.log("=========== requestbody ======= ", requestBody);
        const response = await deliveryExtension(requestBody).unwrap();
        // console.log("========== Response ======== ", response);

        // if (response.status === "success") {
        router.push({
          pathname: "/Toaster",
          params: {
            res: response?.message || "Delivery extension request send",
          },
        });
        setTimeout(() => {
          router.back();
        }, 2000);
        // }
      } catch (err) {
        router.push({
          pathname: "/Toaster",
          params: { res: "Delivery extension request send failed" },
        });
        console.log(
          "Extension order error  ",
          err,
          " error ",
          errorDeliveryExtension
        );
        setTimeout(() => {
          router.back();
        }, 2000);
      }
    } else {
      router.push({
        pathname: "/Toaster",
        params: { res: "Fillup all fields" },
      });
      // console.log("Extension order  ", err, " error ", errorDeliveryExtension)
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

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
              titleTextStyle={tw`text-xl`}
            />

            {/*  ------------ dropdown section j----------------- */}
            <View style={tw`py-2`}>
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
                Reason
              </Text>
              <TextInput
                style={[styles.textArea, tw`text-black`]}
                multiline={true}
                numberOfLines={4}
                placeholder="Write a valid reason for extension"
                onChangeText={setReason}
                // value={}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* ----------------------- submit password -------------- */}
          <PrimaryButton
            // onPress={() => handleSubmit()}
            onPress={handleRequest}
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
