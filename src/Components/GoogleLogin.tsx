import { IconGoogle } from "@/assets/icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import { useSocialLoginMutation } from "../redux/apiSlices/authSlices";

const GoogleLogin = ({ roll, providerTypes }: any) => {
  // ------------------------ api end point ---------------------
  const [socialLogin, { isLoading: isLoadingSocialLogin }] =
    useSocialLoginMutation();

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const googleResponse = await GoogleSignin.signIn();
      const user = googleResponse?.data?.user;
      if (!user) {
        router.push({
          pathname: "/Toaster",
          params: {
            res:
              googleResponse?.type === "cancelled"
                ? "You are cancelled your login request"
                : "Something went wrong",
          },
        });
        return;
      }
      // ================= prepare form data ===================
      // =================== convert image url to file ===================
      const imageUrl = user?.photo;
      const response = await fetch(imageUrl || "");
      const blob = await response.blob();
      const file = {
        uri: imageUrl,
        name: "profile.jpg",
        type: blob.type || "image/jpeg",
      };
      // =================== append form data ===================
      const formData = new FormData();
      formData.append("photo", file as any);
      formData.append("name", user?.givenName + " " + user?.familyName);
      formData.append("email", user?.email);
      formData.append("google_id", user?.id);
      formData.append("role", roll);
      if (roll === "PROVIDER") {
        formData.append("provider_type", providerTypes ? providerTypes : "");
      }
      // =================== social login api call ===================
      const res = await socialLogin(formData).unwrap();
      console.log("Google Login Response__________: ", res?.data);
    } catch (error: any) {
      console.log("Google Login Error__________: ", error);
    }
  }

  return (
    <TouchableOpacity
      onPress={onGoogleButtonPress}
      disabled={isLoadingSocialLogin}
      style={tw`w-14 h-14 bg-white rounded-full justify-center items-center `}
    >
      {isLoadingSocialLogin ? (
        <ActivityIndicator size="small" />
      ) : (
        <SvgXml xml={IconGoogle} />
      )}
    </TouchableOpacity>
  );
};

export default GoogleLogin;
