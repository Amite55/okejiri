import { IconUploadImage } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useAddDisputeMutation } from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
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
  fileName?: string;
  type?: string;
}

const Dispute_Process: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [image, setImage] = useState<ImageAsset | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [addDispute, { isLoading }] = useAddDisputeMutation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const pickImage = async (): Promise<void> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0] as any);
      console.log("Selected Image:", result.assets[0].uri);
    }
  };

  const handleDispute = async (): Promise<void> => {
    // Validation
    if (!reason) {
      Alert.alert("Error", "Please select a reason for the dispute");
      return;
    }

    if (!explanation.trim()) {
      Alert.alert("Error", "Please provide an explanation");
      return;
    }

    try {
      const formData = new FormData();

      // Append the dispute data - FIXED: Use correct field names
      formData.append("reason", reason);
      formData.append("details", explanation);
      formData.append("booking_id", id);

      // FIXED: Simplified image upload - remove array complexity
      if (image) {
        // Get proper file extension and MIME type
        const fileExtension =
          image.uri.split(".").pop()?.toLowerCase() || "jpg";
        const mimeType = getMimeType(fileExtension);
        const fileName =
          image.fileName || `dispute_${Date.now()}.${fileExtension}`;

        // Append single file - let backend handle array conversion if needed
        formData.append("attachments", {
          uri: image.uri,
          type: mimeType,
          name: fileName,
        } as any);
      }

      console.log("FormData prepared for submission");

      // Call the mutation with FormData
      const response = await addDispute(formData).unwrap();

      console.log("Dispute submitted successfully:", response);
      Alert.alert("Success", "Your dispute has been submitted successfully");

      // Navigate back
      router.back();
    } catch (error: any) {
      console.error("Full error object:", error);

      // More detailed error handling
      if (error.status === 500) {
        Alert.alert(
          "Server Error",
          "There was a problem with the server. Please try again later."
        );
      } else if (error.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        Alert.alert("Validation Error", errorMessages.join("\n"));
      } else if (error.data?.message) {
        Alert.alert("Error", error.data.message);
      } else if (error.status === "FETCH_ERROR") {
        Alert.alert(
          "Network Error",
          "Please check your internet connection and try again."
        );
      } else {
        Alert.alert("Error", "Failed to submit dispute. Please try again.");
      }
    }
  };

  // Helper function to get MIME type
  const getMimeType = (extension: string): string => {
    const mimeTypes: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    };
    return mimeTypes[extension] || "image/jpeg";
  };

  // Alternative method without image if server keeps failing
  const handleDisputeWithoutImage = async (): Promise<void> => {
    if (!reason || !explanation.trim()) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("reason", reason);
      formData.append("details", explanation);
      formData.append("booking_id", id as string);

      // Don't send any image
      console.log("Submitting without image");

      const response = await addDispute(formData).unwrap();
      console.log("Dispute submitted successfully without image:", response);
      Alert.alert("Success", "Your dispute has been submitted successfully");
      router.back();
    } catch (error: any) {
      console.error("Error without image:", error);
      Alert.alert("Error", "Please try without uploading an image");
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-base_color`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 px-5`}
        contentContainerStyle={tw`pb-28`}
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
            <TouchableOpacity
              style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
              onPress={pickImage}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-white`}
              >
                Browse
              </Text>
            </TouchableOpacity>
            {image && (
              <Text
                style={tw`font-DegularDisplayDemoRegular text-sm text-green-600 mt-2`}
              >
                Image selected: {image?.fileName || "image"}
              </Text>
            )}
          </Pressable>
        </View>

        {/* ------------- submit buttons -------------------- */}
        <View style={tw`mt-8 gap-3`}>
          <PrimaryButton
            onPress={handleDispute}
            titleProps={isLoading ? "Submitting..." : "Submit with Image"}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
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
