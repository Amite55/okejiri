import { IconCameraProfile, IconPlusBlackSmall } from "@/assets/icons";
import { ImgSuccessGIF } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ProviderProfileSkeleton from "@/src/Components/skeletons/ProviderProfileSkeleton";
import { useRoll } from "@/src/hooks/useRollHooks";
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
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

// Interface for form data
interface EditProfileFormData {
  name: string;
  phone: string;
  address: string;
}

// Interface for component props
interface EditProfileProps {}

const Edit_Profile: React.FC<EditProfileProps> = () => {
  const roll = useRoll();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [imageAsset, setImageAsset] =
    React.useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  // ---------------- api end point ----------------
  const [editProfile, { isLoading: isEditProfileLoading }] =
    useEditProfileMutation();
  const [editProfilePicture] = useEditProfilePictureMutation();
  const {
    data: userProfileInfo,
    isLoading: isprofileLoading,
    error,
  } = useProfileQuery({});

  useEffect(() => {
    if (userProfileInfo?.data) {
      const { name, phone, address, user_name } = userProfileInfo?.data;
      setUserName(user_name || "");
      setFullName(name || "");
      setPhoneNumber(phone || "");
      setAddress(address || "");
      setAbout(userProfileInfo?.data?.about || "");
    }
  }, [userProfileInfo]);

  // ------------- submit form handler -------------
  const onSubmit = async (): Promise<void> => {
    if (!fullName || !userName || !phoneNumber || !address) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please fill all the fields" },
      });
      return;
    }
    try {
      const formData = {
        name: fullName,
        user_name: userName,
        phone: phoneNumber,
        address: address,
        about: about,
      };
      if (userProfileInfo?.data?.role === "USER") {
        delete formData.about;
      }
      // Call your edit profile API with proper typing
      const result = await editProfile(formData).unwrap();
      if (result.status === "success") {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          router.back();
        }, 1000);
      }
    } catch (error: unknown) {
      // You can add error handling UI here
      console.log(error, "not update your profile------------->");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  const handleBackPress = (): void => {
    router.back();
  };
  // -------------------- image picker ---------------------
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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

  // console.log(userProfileInfo?.data?.name, "thi sis;alskdjf--------->");

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

  // loading skeleton =================================s>
  if (isprofileLoading) {
    return <ProviderProfileSkeleton />;
  }
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
          style={tw`flex-1 bg-base_color px-5`}
          contentContainerStyle={[
            tw`justify-between flex-grow bg-base_color`,
            isKeyboardVisible ? tw`pb-16` : tw`pb-1`,
          ]}
        >
          {/* <View style={tw`flex-1 `}> */}
          <View>
            <BackTitleButton
              pageName={"Edit profile"}
              onPress={handleBackPress}
              titleTextStyle={tw`text-xl`}
            />

            {/* Profile Image Section */}
            <View style={tw`flex-1 relative justify-center items-center my-4`}>
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
                style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center mb-4`}
              >
                <TextInput
                  placeholder="John Smith"
                  placeholderTextColor="#535353"
                  onChangeText={(text) => setFullName(text)}
                  value={fullName}
                  style={tw`flex-1 text-black font-DegularDisplayDemoRegular text-base`}
                  accessibilityLabel="Full name input"
                  accessibilityHint="Enter your full name"
                />
              </View>

              {/* Full Name Input Field */}
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2 mb-2`}
              >
                User name
              </Text>
              <View
                style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center mb-4`}
              >
                <TextInput
                  editable={
                    userProfileInfo?.data?.kyc_status === "Verified"
                      ? false
                      : true
                  }
                  placeholder="smith"
                  placeholderTextColor="#535353"
                  onChangeText={(text) => setUserName(text)}
                  value={userName}
                  style={[
                    tw`flex-1 font-DegularDisplayDemoRegular text-base`,
                    userProfileInfo?.data?.kyc_status === "Verified"
                      ? tw`text-gray-400`
                      : tw`text-black text-base`,
                  ]}
                  accessibilityLabel="Full name input"
                  accessibilityHint="Enter your full name"
                />
              </View>
              {/* Contact Number Input Field */}
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2 mb-2`}
              >
                Contact Number
              </Text>
              <View
                style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center mb-4`}
              >
                <TextInput
                  editable={
                    userProfileInfo?.data?.kyc_status === "Verified"
                      ? false
                      : true
                  }
                  placeholder="+12121212112"
                  placeholderTextColor="#535353"
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  keyboardType="phone-pad"
                  style={[
                    tw`flex-1 font-DegularDisplayDemoRegular text-base`,
                    userProfileInfo?.data?.kyc_status === "Verified"
                      ? tw`text-gray-400`
                      : tw`text-black text-base`,
                  ]}
                  accessibilityLabel="Contact number input"
                  accessibilityHint="Enter your contact number"
                />
              </View>
              {/* address Input Field */}
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2 mb-2`}
              >
                Address
              </Text>
              <View
                style={tw`w-full h-14 rounded-full border border-gray-300 px-4 justify-center mb-4`}
              >
                <TextInput
                  editable={
                    userProfileInfo?.data?.kyc_status === "Verified"
                      ? false
                      : true
                  }
                  placeholder="Dhaka, Bangladesh"
                  placeholderTextColor="#535353"
                  onChangeText={(text) => setAddress(text)}
                  value={address}
                  style={[
                    tw`flex-1 font-DegularDisplayDemoRegular text-base`,
                    userProfileInfo?.data?.kyc_status === "Verified"
                      ? tw`text-gray-400`
                      : tw`text-black text-base`,
                  ]}
                  accessibilityLabel="address input"
                  accessibilityHint="Enter your address"
                />
              </View>

              {userProfileInfo?.data?.role === "PROVIDER" && (
                <View>
                  {/* About You */}
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black ml-2`}
                  >
                    About you
                  </Text>
                  <TextInput
                    style={[
                      tw`border border-gray-300 h-36 rounded-2xl p-4 mt-2 px-4`,
                    ]}
                    multiline
                    numberOfLines={4}
                    placeholder="Write something about you..."
                    value={about}
                    onChangeText={(text) => setAbout(text)}
                    textAlignVertical="top"
                  />
                </View>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <PrimaryButton
            onPress={() => onSubmit()}
            titleProps={isEditProfileLoading ? "Updating..." : "Save Changes"}
            contentStyle={tw`mt-4`}
          />

          {/* Success Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
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
                {/* <PrimaryButton
              onPress={handleModalClose}
              titleProps="Go Back"
              contentStyle={tw`w-full`}
            /> */}
              </View>
            </View>
          </Modal>
          {/* </View> */}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Edit_Profile;
