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
  View
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

  //    ============== api end point -------------------------
  const [addDispute, { isLoading, }] = useAddDisputeMutation();
// =================== sei na image picker --------------->
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 1,
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
        params: { res: "Please fill all the fields" }
      })
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
        });
      });
      const response = await addDispute(formData).unwrap();
      console.log(response, "thi this new form dtaa------------->")
      if (response) {
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message || "Report sent successfully!" },
        })
        setTimeout(() => {
          router.back()
        }, 1000);
      }
    } catch (err: any) {
      console.error("Full error object: ----------------------->", err,);
    }
  };



  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === "ios" ? "padding" : "position"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -120}
    >
      <TouchableWithoutFeedback
         onPress={Keyboard.dismiss} accessible={false}
      >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-grow px-5`}
        contentContainerStyle={tw`pb-6`}
        keyboardShouldPersistTaps="handled"
      >
        <BackTitleButton
          pageName={"Dispute process"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
        <View style={tw`gap-3 mt-4`}>
          {/* ------------ dropdown section ------------------ */}
          <View>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
            >
              Reason
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "#3b82f6" }]}
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
            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
              Upload files
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-lg text-gray-600`}
            >
              Upload images or videos
            </Text>
            {(!images || images.length === 0) ? <TouchableOpacity
              style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
              onPress={pickImages}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-white`}
              >
                Browse
              </Text>
            </TouchableOpacity>
              :
              (
                <View style={tw`w-full mt-3`}>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-sm text-green-600 mt-2 py-2`}
                  >
                    {images.length} {images.length === 1 ? "file selected" : "files selected"}
                  </Text>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {images.map((img, index) => (
                      <View key={index} style={tw`flex-row`}>

                        <Text numberOfLines={1} ellipsizeMode="clip" style={tw`text-xs text-gray-400`}>
                          {img.filename}
                        </Text>
                      </View>
                    ))

                    }
                  </ScrollView>
                </View>

              )
            }

          </Pressable>
        </View>

        {/* ------------- submit buttons -------------------- */}
        <View style={tw`mt-8 gap-3`}>
          <PrimaryButton
            onPress={() => submitDispute()}
            titleProps={isLoading ? "Submitting..." : "Submit with Image"}
          // disabled={isLoading}
          />
        </View>
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
