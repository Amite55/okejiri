import tw from "@/src/lib/tailwind";
import * as Font from "expo-font";
import { router, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { useProfileQuery } from "../redux/apiSlices/authSlices";

export default function Index() {
  // api end point ====================
  const { data: userProfileInfo, isLoading, error } = useProfileQuery({});

  React.useEffect(() => {
    const AppLoader = async () => {
      await Font.loadAsync({
        PoppinsBlack: require("@/assets/fonts/Poppins/Poppins-Black.ttf"),
        PoppinsBlackItalic: require("@/assets/fonts/Poppins/Poppins-BlackItalic.ttf"),
        PoppinsBold: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
        PoppinsBoldItalic: require("@/assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
        PoppinsExtraBold: require("@/assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
        PoppinsExtraBoldItalic: require("@/assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),
        PoppinsExtraLight: require("@/assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
        PoppinsExtraLightItalic: require("@/assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf"),
        PoppinsItalic: require("@/assets/fonts/Poppins/Poppins-Italic.ttf"),
        PoppinsLight: require("@/assets/fonts/Poppins/Poppins-Light.ttf"),
        PoppinsLightItalic: require("@/assets/fonts/Poppins/Poppins-LightItalic.ttf"),
        PoppinsMedium: require("@/assets/fonts/Poppins/Poppins-Medium.ttf"),
        PoppinsMediumItalic: require("@/assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
        PoppinsRegular: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsSemiBold: require("@/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
        PoppinsSemiBoldItalic: require("@/assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf"),
        PoppinsThin: require("@/assets/fonts/Poppins/Poppins-Thin.ttf"),
        PoppinsThinItalic: require("@/assets/fonts/Poppins/Poppins-ThinItalic.ttf"),

        // ------------------- fonts degular display --------------------------
        DegularDisplayBlack: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Black.otf"),
        DegularDisplayDemoBlackItalic: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-BlackItalic.otf"),
        DegularDisplayDemoBold: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Bold.otf"),
        DegularDisplayDemoBoldItalic: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-BoldItalic.otf"),
        DegularDisplayDemoItalic: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Italic.otf"),
        DegularDisplayDemoLight: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Light.otf"),
        DegularDisplayDemoLightItalic: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-LightItalic.otf"),
        DegularDisplayDemoMedium: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Medium.otf"),
        DegularDisplayDemoMediumItalic: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-MediumItalic.otf"),
        DegularDisplayDemoRegular: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Regular.otf"),
        DegularDisplayDemoSemibold: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Semibold.otf"),
        DegularDisplayDemoSemiboldItalic: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-SemiboldItalic.otf"),
        DegularDisplayDemoThin: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-Thin.otf"),
        DegularDisplayDemoThinItalic: require("@/assets/fonts/degular/fonnts.com-DegularDisplayDemo-ThinItalic.otf"),
      });
      // await SplashScreen.hideAsync();
    };
    AppLoader();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const redirect = async () => {
      try {
        const role = userProfileInfo?.data?.role;
        const kyc = userProfileInfo?.data?.kyc_status;
        const type = userProfileInfo?.data?.provider_type;

        if (!role) {
          router.replace("/chose_roll");
          return;
        }

        if (role === "USER") {
          router.replace("/company/(Tabs)");
          if (kyc === "Unverified") {
            setTimeout(() => {
              router.push("/kyc_completed_modal");
            }, 300);
          }
        }

        if (role === "PROVIDER") {
          if (type === "Individual") {
            router.replace("/service_provider/individual/(Tabs)/home");
            if (userProfileInfo?.data?.kyc_status === "Unverified") {
              setTimeout(() => {
                router.push("/kyc_completed_modal");
              }, 500);
            }
          } else if (type === "Company") {
            router.replace("/service_provider/company/home");
            if (userProfileInfo?.data?.kyc_status === "Unverified") {
              setTimeout(() => {
                router.push("/kyc_completed_modal");
              }, 500);
            }
          }
        }
      } catch (e) {
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    redirect();
  }, [isLoading]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-base_color`}>
        <View style={tw`flex-1 justify-center items-center gap-4`}>
          <Image
            style={tw`w-52 h-20`}
            resizeMode="contain"
            source={require("@/assets/images/splashScreen.png")}
          />
          <ActivityIndicator size={"large"} color={tw.color("yellow-500")} />
        </View>
      </View>
    </SafeAreaView>
  );
}
