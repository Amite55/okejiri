import { IconEditPenBlack, IconRightArrow } from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import { useProviderTypes } from "@/src/hooks/useProviderTypes";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useCompleteKYCMutation } from "@/src/redux/apiSlices/personalizationSlice";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const KYC_Confirmation = () => {
  const { fastPhotoUri, secondPhotoUri, selfiePhotoUri } =
    useLocalSearchParams();
  const providerTypes = useProviderTypes();
  const selfiePhotoUriPerse = selfiePhotoUri && JSON.parse(selfiePhotoUri);
  const fastPhotoUriPerse = fastPhotoUri && JSON.parse(fastPhotoUri);
  const secondPhotoUriPerse = secondPhotoUri && JSON.parse(secondPhotoUri);

  // ================= api end point =================
  const [sendKYC] = useCompleteKYCMutation();

  const handleSubmitKYCProcess = async () => {
    try {
      const formData = new FormData();

      formData.append("id_card_front", {
        uri: fastPhotoUriPerse,
        name: "id_card_front.jpg",
        type: "image/jpeg",
      } as any);

      formData.append("id_card_back", {
        uri: secondPhotoUriPerse,
        name: "id_card_back.jpg",
        type: "image/jpeg",
      } as any);

      formData.append("selfie", {
        uri: selfiePhotoUriPerse,
        name: "selfie.jpg",
        type: "image/jpeg",
      } as any);

      const response = await sendKYC(formData).unwrap();
      if (response) {
        router.push("/KYC_auth/success_screen");
      }
    } catch (error) {
      console.log(error, "this server error-------->");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    }
  };

  console.log(
    fastPhotoUriPerse,
    "\n",
    secondPhotoUriPerse,
    "\n",
    selfiePhotoUriPerse
  );

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
        <View style={tw`justify-center items-center mt-14`}>
          <Image contentFit="contain" style={tw`w-44 h-14 `} source={ImgLogo} />
          <Text
            style={tw`font-DegularDisplayDemoSemibold text-3xl text-primary text-center my-6`}
          >
            Confirm your informations
          </Text>
          <Image
            contentFit="cover"
            style={tw`w-40  h-36 rounded-2xl border border-dotted border-primary`}
            source={selfiePhotoUriPerse}
          />
        </View>

        <View style={tw`my-4 gap-4`}>
          {providerTypes && (
            <View
              style={tw`border border-gray-300 rounded-full h-14 flex-row justify-between items-center px-4`}
            >
              <TextInput style={tw`flex-1`} placeholder="Provider type" />
              <TouchableOpacity>
                <SvgXml xml={IconEditPenBlack} />
              </TouchableOpacity>
            </View>
          )}

          <View style={tw`gap-4 justify-center items-center`}>
            <Image
              source={fastPhotoUriPerse}
              style={tw`w-64 h-36 rounded-xl border border-dotted border-primary`}
              contentFit="cover"
            />
            <Image
              source={secondPhotoUriPerse}
              style={tw`w-64 h-36 rounded-xl border border-dotted border-primary`}
              contentFit="cover"
            />
          </View>
        </View>
      </View>

      {/*  */}

      <View>
        <PrimaryButton
          onPress={() => {
            handleSubmitKYCProcess();
          }}
          //   onPress={() => setModalVisible(true)}
          titleProps="Submit  "
          IconProps={IconRightArrow}
          contentStyle={tw`mt-4`}
        />
      </View>
    </ScrollView>
  );
};

export default KYC_Confirmation;
