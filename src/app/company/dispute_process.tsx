import { IconUploadImage } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useAddDisputeMutation } from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
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
interface DropdownItem {
  label: string;
  value: string;
}

const dropdownData: DropdownItem[] = [
  { label: "Provider harassed me", value: "1" },
  { label: "Service was poorly done", value: "2" },
  { label: "My property was stolen", value: "3" },
  { label: "Others", value: "4" },
];

interface ImageAsset {
  uri: string;
  filename?: string;
  type?: string;
}

const Dispute_Process: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [images, setImages] = useState<any>(null);
  const [explanation, setExplanation] = useState<string>("");
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id, "thi is id --------------------->");

  //    ============== api end point -------------------------
  const [addDispute, { isLoading, isError, error }] = useAddDisputeMutation();

  // =================== sei na image picker --------------->
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImages(result.assets.map((item) => item.uri));
    }
  };

  const submitDispute = async () => {
    // ------------ check all field required  --------------
    if (!id || !reason || !explanation || !images) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please fill all the fields" },
      });
      return;
    }
    try {
      let formData = new FormData();
      formData.append("booking_id", id);
      formData.append("reason", reason);
      formData.append("details", explanation);
      // ✅ Append multiple images properly
      images.forEach((uri: any, index: any) => {
        formData.append("attachments[]", {
          uri,
          name: `attachment_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });
      const response = await addDispute(formData).unwrap();
      if (response) {
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message || "Report sent successfully!" },
        });
        setTimeout(() => {
          router.back();
        }, 3000);
      }
    } catch (err: any) {
      console.log("error ", err, " isError ", isError, " error ", error);
      router.push({
        pathname: "/Toaster",
        params: { res: err?.message || err },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === "ios" ? "padding" : "position"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -120}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`px-5 bg-base_color`}
          contentContainerStyle={tw`pb-1 justify-between flex-grow  bg-base_color`}
        >
          <View>
            <BackTitleButton
              pageName={"Dispute process"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />
            <View style={tw`gap-3 mt-4 `}>
              {/* ------------ dropdown section ------------------ */}
              <View>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
                >
                  Reason
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "#3b82f6" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dropdownData}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "- select -" : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item: DropdownItem) => {
                    setValue(item.value);
                    setIsFocus(false);
                    setReason(item.label);
                  }}
                  itemTextStyle={styles.itemTextStyle}
                />
              </View>

              {/* ---------- message explanation --------------- */}
              <View>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
                >
                  Your explanation
                </Text>
                <TextInput
                  style={styles.textArea}
                  multiline={true}
                  numberOfLines={8}
                  placeholder="Type here"
                  placeholderTextColor={"#535353"}
                  onChangeText={setExplanation}
                  value={explanation}
                  textAlignVertical="top"
                />
              </View>

              {/* ------------------ Image upload ------------------ */}
              <Pressable
                style={tw`border-2 border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center gap-2`}
              >
                <SvgXml xml={IconUploadImage} />
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                >
                  Upload files
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-lg text-gray-600`}
                >
                  Upload images or videos
                </Text>
                {!images || images.length === 0 ? (
                  <TouchableOpacity
                    style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
                    onPress={pickImages}
                  >
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-xl text-white`}
                    >
                      Browse
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={tw`w-full mt-3 justify-center items-center`}>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-lg text-green-600  `}
                    >
                      {images?.length}{" "}
                      {images?.length === 1
                        ? "file selected"
                        : "files selected"}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          {/* ------------- submit buttons -------------------- */}
          <PrimaryButton
            onPress={() => submitDispute()}
            titleProps={isLoading ? "Submitting..." : "Submit with Image"}
            contentStyle={tw`mt-10`}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Dispute_Process;

// ------------ Styles --------------------
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#535353",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  itemTextStyle: {
    fontSize: 16,
    color: "black",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 200,
    borderRadius: 30,
    fontSize: 16,
    backgroundColor: "white",
    textAlignVertical: "top",
  },
});
