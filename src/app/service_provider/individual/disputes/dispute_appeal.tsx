import { IconRightArrow, IconUploadImage } from "@/assets/icons";
import { ImgLoadingSuccess } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useAddDisputeAppealMutation } from "@/src/redux/apiSlices/companyProvider/account/myDisputeSlice";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
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
import { SvgXml } from "react-native-svg";

import * as ImagePicker from "expo-image-picker";

const Dispute_Appeal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [images, setImages] = useState<any>(null);
  const [explanation, setExplanation] = useState<string>("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  // =========== API ==================== //
  const [addAppealDispute, { isLoading }] = useAddDisputeAppealMutation();

  //  ===================== Image picker ================= //
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

    if (!id || !explanation || !images) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please fill all the fields" },
      });
      return;
    }

    try {
      let formData = new FormData();
      formData.append("dispute_id", id);

      formData.append("details", explanation);
      // ✅ Append multiple images properly
      images.forEach((uri: any, index: any) => {
        formData.append("attachments[]", {
          uri,
          name: `attachment_${index}.jpg`,
          type: "image/jpeg",
        });
      });
      const response = await addAppealDispute(formData).unwrap();
      if (response) {
        setModalVisible(true);
      } else {
        router.push({
          pathname: "/Toaster",
          params: {
            res: "An appeal has already been submitted for this disputed",
          },
        });
        setTimeout(() => {
          router.back();
        }, 1500);
      }
    } catch (err: any) {
      console.error("Full error object: ----------------------->", err);
      router.push({
        pathname: "/Toaster",
        params: { res: err.message || "Failed to submit" },
      });
    }
  };

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 px-5 bg-base_color`}
          contentContainerStyle={[
            tw` justify-between flex-grow `,
            isKeyboardVisible ? tw`pb-10` : tw`pb-0`,
          ]}
        >
          <View>
            <BackTitleButton
              pageName={"Appeal"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />
            <View style={tw`gap-3`}>
              {/*  ---------- message explanation --------------- */}

              <View style={tw``}>
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
                  onChangeText={setExplanation}
                  // value={}
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
                  <View style={tw`w-full mt-3`}>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-sm text-green-600 mt-2 py-2`}
                    >
                      {images.length}{" "}
                      {images.length === 1 ? "file selected" : "files selected"}
                    </Text>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {images.map((img, index) => (
                        <View key={index} style={tw`flex-row`}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="clip"
                            style={tw`text-xs text-gray-400`}
                          >
                            {img.filename}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          {/*  ------------- next button -------------------- */}
          <PrimaryButton
            onPress={() => submitDispute()}
            titleProps={isLoading ? "Submitting..." : "Submit with Image"}
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
                <Image style={tw`mt-6 mb-2`} source={ImgLoadingSuccess} />

                {/* Success Message */}
                <Text
                  style={tw`text-xl bg-secondary px-2 py-1 rounded-xl font-PoppinsRegular mt-3`}
                >
                  In Review
                </Text>
                <Text style={tw`text-base text-gray-500 text-center mt-2`}>
                  Your dispute appeal has been placed.
                </Text>

                {/* Close Button */}
                <PrimaryButton
                  onPress={() => {
                    setModalVisible(false);
                    router.back();
                  }}
                  titleProps="Go to home"
                  IconProps={IconRightArrow}
                  contentStyle={tw`mt-4`}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Dispute_Appeal;

const styles = StyleSheet.create({
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
