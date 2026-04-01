import { IconRightArrow, IconUploadImage } from "@/assets/icons";
import { ImgLoadingSuccess } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
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
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const Dispute_Appeal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [images, setImages] = useState<any>(null);
  const [explanation, setExplanation] = useState<string>("");
  const { id } = useLocalSearchParams();
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setImages(result.assets);
    }
  };

  const submitDispute = async () => {
    if (!id || !explanation || !images || images.length === 0) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please fill all the fields" },
      });
      return;
    }
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("dispute_id", String(id));
      formData.append("details", explanation);
      images.forEach((asset: any, index: number) => {
        const uri = asset.uri;
        const extension = uri?.split(".").pop()?.toLowerCase() || "jpg";
        const mimeType =
          asset.mimeType || (extension === "png" ? "image/png" : "image/jpeg");

        formData.append(`attachments[${index}]`, {
          uri,
          name: asset.fileName || `image_${index}.${extension}`,
          type: mimeType,
        } as any);
      });
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}/add-dispute-appeal`,
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        },
      );
      const data = await response.json();
      console.log(data, "this is response success");
      if (data?.status === "success") {
        router.push({
          pathname: "/Toaster",
          params: { res: data?.message || "Report sent successfully!" },
        });
        setTimeout(() => router.back(), 3000);
      }
    } catch (err: any) {
      console.log("error from dispute appeal--------->", err);
      router.push({
        pathname: "/Toaster",
        params: { res: "Dispute appeal processing failed" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 px-5 bg-base_color`}
          contentContainerStyle={[
            tw` justify-between flex-grow `,
            isKeyboardVisible ? tw`pb-10` : tw`pb-1`,
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
                  style={[styles.textArea, tw`text-black`]}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Type here"
                  onChangeText={setExplanation}
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
                  <PrimaryButton
                    onPress={pickImages}
                    titleProps={"Select files"}
                    contentStyle={tw`h-10 mt-3`}
                    textStyle={tw`text-white font-DegularDisplayDemoMedium text-lg `}
                  />
                ) : (
                  <View style={tw`w-full mt-3`}>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-center text-base text-green-600 mt-2 py-2`}
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
            loading={isLoading}
            titleProps={"Submit with Image"}
            contentStyle={tw`mt-4 h-12`}
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
