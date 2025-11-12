import { IconCameraProfile, IconPlusBlackSmall } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useEditProfileMutation,
  useEditProfilePictureMutation,
  useProfileQuery,
} from "@/src/redux/apiSlices/authSlices";
import { useServicesQuery } from "@/src/redux/apiSlices/userProvider/homeSlices";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
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

// ---------------------------------------------------

const Edit_Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageAsset, setImageAsset] =
    React.useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);

  const [editProfilePicture] = useEditProfilePictureMutation();
  const { data: userProfileInfo } = useProfileQuery({});
  const [editProfile] = useEditProfileMutation();
  const { data: services } = useServicesQuery({});

  // --- React Hook Form setup ---
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userProfileInfo?.data?.name || "",
      address: userProfileInfo?.data?.address || "",
      phone: userProfileInfo?.data?.phone || "",
      about: userProfileInfo?.data?.about || "",
    },
  });

  // --- Image Upload Handler ---
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImageAsset(selectedImage);

      const form = new FormData();
      const filename =
        selectedImage.fileName ??
        selectedImage.uri.split("/").pop() ??
        `photo_${Date.now()}.jpg`;

      const extMatch = /\.(\w+)$/.exec(filename);
      const mime = extMatch ? `image/${extMatch[1]}` : "image/jpeg";

      form.append("photo", {
        uri: selectedImage.uri,
        name: filename,
        type: mime,
      } as any);

      try {
        const response = await editProfilePicture(form).unwrap();
        if (response.status === "success") {
          router.push({
            pathname: "/Toaster",
            params: { res: response?.message },
          });
        }
      } catch (err: any) {
        router.push({
          pathname: "/Toaster",
          params: { res: err?.errors?.photo },
        });
      }
    }
  };

  // --- Form Submit Handler ---
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("about", data.about);
    selectedServices.forEach((id, index) => {
      formData.append(`service_id[${index}]`, selectedServices as any);
    });
    selectedServices.forEach((id, index) => {
      formData.append(`service_id[${index}]`, id);
    });
    try {
      const response = await editProfile(formData).unwrap();
      if (response.status === "success") {
        setModalVisible(true);
      }
    } catch (error) {
      console.log("❌ Edit Profile Error:", error);
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6 justify-between flex-grow`}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <BackTitleButton
          pageName={"Edit profile"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />

        {/* ------------- Profile Picture Section ------------- */}
        <View style={tw`relative justify-center items-center`}>
          <Image
            style={tw`w-24 h-24 rounded-full`}
            source={imageAsset || userProfileInfo?.data?.avatar}
          />
          <TouchableOpacity
            style={tw`absolute  right-38 -bottom-2 w-12 h-12 rounded-full bg-primary justify-center items-center`}
            onPress={pickImage}
          >
            <SvgXml xml={IconCameraProfile} />
            <Pressable
              style={tw`absolute right-0 bottom-0 w-4 h-4 rounded-full bg-white justify-center items-center`}
            >
              <SvgXml fontSize={10} xml={IconPlusBlackSmall} />
            </Pressable>
          </TouchableOpacity>
        </View>

        {/* ------------- Form Section ------------- */}
        <View>
          {/* Full Name */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            Your full name
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View
                style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center my-2`}
              >
                <TextInput
                  placeholder="John Smith"
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />

          {/* Contact Number */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            Contact Number
          </Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <View
                style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center my-2`}
              >
                <TextInput
                  placeholder="+12121212112"
                  placeholderTextColor={"#535353"}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />

          {/* Address */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            Location
          </Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <View
                style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center my-2`}
              >
                <TextInput
                  placeholder="Dhaka, Bangladesh"
                  placeholderTextColor={"#535353"}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />

          {/* About You */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
          >
            About you
          </Text>
          <Controller
            control={control}
            name="about"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.textArea, tw`border border-gray-300`]}
                multiline
                numberOfLines={4}
                placeholder="Write something about you..."
                value={value}
                onChangeText={onChange}
                textAlignVertical="top"
              />
            )}
          />

          {/* Dropdown (Services) */}
          <View style={tw`mt-5`}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={services?.data?.services || []}
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={!isFocus ? "Select Service" : "..."}
              value={selectedServices[0]}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setSelectedServices(item.id);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
      </View>

      {/* ------------- Submit Button ------------- */}
      <PrimaryButton
        onPress={handleSubmit(onSubmit)}
        titleProps="Save changes"
        contentStyle={tw`mt-4`}
      />

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            <Image style={tw`mt-6 mb-2`} source={ImgSuccessGIF} />
            <Text style={tw`text-4xl font-DegularDisplayDemoBold mt-3`}>
              Success!
            </Text>
            <Text style={tw`text-base text-gray-500 text-center mt-2`}>
              Your Profile Updated.
            </Text>
            <PrimaryButton
              onPress={() => {
                setModalVisible(false);
                router.push("/service_provider/individual/settings/setting");
              }}
              titleProps="Go back"
              contentStyle={tw`mt-4`}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Edit_Profile;

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 180,
    maxHeight: 200,
    borderRadius: 30,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
});
