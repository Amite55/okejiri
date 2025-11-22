import { ImgSuccessKYC } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import { useProviderTypes } from "@/src/hooks/useProviderTypes";
import { useRoll } from "@/src/hooks/useRollHooks";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Success_Screen = () => {
  const roll = useRoll();
  const providerTypes = useProviderTypes();

  const {
    data: userProfileInfo,
    isLoading,
    error,
  } = useProfileQuery({}, { refetchOnMountOrArgChange: true });

  const handleRouting = () => {
    if (roll === "USER") {
      router.push("/company/(Tabs)");
      setTimeout(() => {
        router.push("/kyc_completed_modal");
      }, 500);
    } else if (roll === "PROVIDER") {
      if (providerTypes === "Individual") {
        router.push("/service_provider/individual/(Tabs)/home");
      } else if (providerTypes === "Company") {
        router.push("/service_provider/company/home");
      }
    }
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-4 justify-between flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"KYC process"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
        <View style={tw`justify-center items-center mt-10`}>
          <Image
            resizeMode="contain"
            style={tw`w-40  h-36 rounded-2xl `}
            source={ImgSuccessKYC}
          />

          <Text
            style={tw`font-DegularDisplayDemoSemibold text-4xl text-blue-950 mt-3`}
          >
            {userProfileInfo?.data?.role === "PROVIDER" &&
            userProfileInfo?.data?.provider_type === "Company"
              ? userProfileInfo?.data?.company?.company_name
              : userProfileInfo?.data?.name}
          </Text>

          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-blue-950`}
          >
            {userProfileInfo?.data?.email}
          </Text>
          <View
            style={tw`w-32 h-8 rounded-xl bg-secondary justify-center items-center mt-2`}
          >
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-white `}
            >
              In Review
            </Text>
          </View>
        </View>

        <View style={tw`p-5 bg-white rounded-2xl gap-2 my-6`}>
          <Text
            style={tw`font-DegularDisplayDemoSemibold text-3xl  text-blue-950`}
          >
            Your application is in review
          </Text>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-blue-950`}>
            Review time: 48 hours
          </Text>
        </View>
      </View>

      <View>
        <PrimaryButton
          onPress={() => {
            handleRouting();
          }}
          //   onPress={() => setModalVisible(true)}
          titleProps="Go to home  "
          contentStyle={tw`mt-4 bg-transparent border border-blue-950`}
          textStyle={tw`text-primary`}
        />
      </View>
    </ScrollView>
  );
};

export default Success_Screen;
