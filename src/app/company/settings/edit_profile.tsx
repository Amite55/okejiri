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
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

// Interface for form data
interface EditProfileFormData {
  name: string;
  phone: string;
  address: string;
}

// Interface for form validation errors
interface FormErrors {
  name?: {
    message?: string;
  };
  phone?: {
    message?: string;
  };
  address?: {
    message?: string;
  };
}
// Interface for component props
interface EditProfileProps {}

// Interface for BackTitleButton props
interface BackTitleButtonProps {
  pageName: string;
  onPress: () => void;
  titleTextStyle: string;
}

const Edit_Profile: React.FC<EditProfileProps> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editProfile] = useEditProfileMutation();
  const [editProfilePicture] = useEditProfilePictureMutation();
  const { data: userProfileInfo, isLoading, error } = useProfileQuery({});
  const [imageAsset, setImageAsset] =
    React.useState<ImagePicker.ImagePickerAsset | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<EditProfileFormData> = async (
    data: EditProfileFormData
  ): Promise<void> => {
    try {
      // Call your edit profile API with proper typing
      const result = await editProfile(data).unwrap();
      setModalVisible(true);
    } catch (error: unknown) {
      // You can add error handling UI here
    }
  };

  const handleModalClose = (): void => {
    setModalVisible(false);
    router.push("/company/settings/setting");
  };

  const handleBackPress = (): void => {
    router.back();
  };

  // Helper function to get border color based on errors
  const getBorderColor = (fieldName: keyof FormErrors): string => {
    return errors[fieldName] ? "border-red-500" : "border-gray-300";
  };

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
          params: { res: err?.message || "Something went wrong" || err },
        });
      }
    } else {
      console.log("❌ Image selection cancelled");
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5`}
      contentContainerStyle={tw`pb-6 justify-between flex-grow`}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <BackTitleButton
          pageName={"Edit profile"}
          onPress={handleBackPress}
          titleTextStyle={tw`text-xl`}
        />

        {/* Profile Image Section */}
        <View style={tw`relative justify-center items-center my-4`}>
          <Image
            style={tw`w-24 h-24 rounded-full`}
            source={userProfileInfo?.data?.avatar || imageAsset}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={tw`absolute right-38 -bottom-2 w-10 h-10 rounded-full bg-primary justify-center items-center`}
            accessibilityLabel="Change profile picture"
            accessibilityRole="button"
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

        {/* Edit Input Form */}
        <View style={tw`mt-4`}>
          {/* Full Name Input Field */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2 mb-2`}
          >
            Your full name
          </Text>
          <View
            style={tw`w-full h-14 rounded-full border ${getBorderColor(
              "name"
            )} px-4 justify-center mb-4`}
          >
            <Controller
              control={control}
              rules={{
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Full name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Full name must be less than 50 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Full name can only contain letters and spaces",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <TextInput
                  placeholder="John Smith"
                  placeholderTextColor="#535353"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={tw`flex-1 font-DegularDisplayDemoRegular text-base`}
                  accessibilityLabel="Full name input"
                  accessibilityHint="Enter your full name"
                />
              )}
              name="name"
            />
          </View>
          {errors.name && (
            <Text style={tw`text-red-500 text-sm ml-2 mb-2`}>
              {errors.name.message}
            </Text>
          )}

          {/* Contact Number Input Field */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2 mb-2`}
          >
            Contact Number
          </Text>
          <View
            style={tw`w-full h-14 rounded-full border ${getBorderColor(
              "phone"
            )} px-4 justify-center mb-4`}
          >
            <Controller
              control={control}
              rules={{
                required: "Contact number is required",
                pattern: {
                  value: /^\+?[\d\s-()]+$/,
                  message: "Please enter a valid contact number",
                },
                minLength: {
                  value: 10,
                  message: "Contact number must be at least 10 digits",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <TextInput
                  placeholder="+12121212112"
                  placeholderTextColor="#535353"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                  style={tw`flex-1 font-DegularDisplayDemoRegular text-base`}
                  accessibilityLabel="Contact number input"
                  accessibilityHint="Enter your contact number"
                />
              )}
              name="phone"
            />
          </View>
          {errors.phone && (
            <Text style={tw`text-red-500 text-sm ml-2 mb-2`}>
              {errors.phone.message}
            </Text>
          )}

          {/* address Input Field */}
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2 mb-2`}
          >
            address
          </Text>
          <View
            style={tw`w-full h-14 rounded-full border ${getBorderColor(
              "address"
            )} px-4 justify-center mb-4`}
          >
            <Controller
              control={control}
              rules={{
                required: "address is required",
                minLength: {
                  value: 2,
                  message: "address must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "address must be less than 100 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <TextInput
                  placeholder="Dhaka, Bangladesh"
                  placeholderTextColor="#535353"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={tw`flex-1 font-DegularDisplayDemoRegular text-base`}
                  accessibilityLabel="address input"
                  accessibilityHint="Enter your address"
                />
              )}
              name="address"
            />
          </View>
          {errors.address && (
            <Text style={tw`text-red-500 text-sm ml-2 mb-2`}>
              {errors.address.message}
            </Text>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <PrimaryButton
        onPress={handleSubmit(onSubmit)}
        titleProps={isLoading ? "Updating..." : "Submit"}
        contentStyle={tw`mt-4`}
      />

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
        statusBarTranslucent={true}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center px-5`}
        >
          <View
            style={tw`w-full bg-white p-6 rounded-2xl items-center shadow-lg max-w-sm`}
          >
            {/* Success Icon */}
            <Image
              style={tw`mt-4 mb-4 w-16 h-16`}
              source={ImgSuccessGIF}
              accessibilityLabel="Success animation"
            />

            {/* Success Message */}
            <Text
              style={tw`text-2xl font-DegularDisplayDemoBold text-gray-900 text-center mt-2`}
            >
              Success!
            </Text>
            <Text style={tw`text-base text-gray-600 text-center mt-2 mb-6`}>
              Your profile has been updated successfully.
            </Text>

            {/* Close Button */}
            <PrimaryButton
              onPress={handleModalClose}
              titleProps="Go Back"
              contentStyle={tw`w-full`}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Edit_Profile;
