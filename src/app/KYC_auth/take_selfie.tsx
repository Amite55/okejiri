import { IconCameraYellow, IconRightArrow } from "@/assets/icons";
import { ImgLogo, ImgTakeSelfie } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Take_Selfie = () => {
  const { selfiePhotoUri, fastPhotoUri, secondPhotoUri } =
    useLocalSearchParams();
  console.log(fastPhotoUri, "\n", secondPhotoUri);
  const selfiePhotoURIPerse = selfiePhotoUri && JSON.parse(selfiePhotoUri);

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
          <Image
            contentFit="contain"
            style={tw`w-44 h-14 mb-8`}
            source={ImgLogo}
          />

          {selfiePhotoUri ? (
            <Image
              contentFit="cover"
              style={tw`w-40 h-40 rounded-2xl `}
              source={selfiePhotoURIPerse}
            />
          ) : (
            <View>
              <Image
                contentFit="contain"
                style={tw`w-72 h-36`}
                source={ImgTakeSelfie}
              />
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-3xl text-primary text-center mt-8`}
              >
                Take a selfie
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg text-black text-center`}
              >
                We will match your face with your ID card
              </Text>
            </View>
          )}
        </View>
      </View>

      <View>
        {selfiePhotoUri ? (
          <PrimaryButton
            onPress={() =>
              router.push({
                pathname: "/KYC_auth/KYC_confirmation",
                params: {
                  selfiePhotoUri,
                  fastPhotoUri,
                  secondPhotoUri,
                },
              })
            }
            //   onPress={() => setModalVisible(true)}
            titleProps="Next "
            IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        ) : (
          <>
            <PrimaryButton
              onPress={() =>
                router.push({
                  pathname: "/KYC_auth/takeSelfieCamera",
                  params: {
                    fastPhotoUri,
                    secondPhotoUri,
                  },
                })
              }
              titleProps="Take photo "
              IconProps={IconCameraYellow}
              contentStyle={tw`mt-4 bg-transparent border border-gray-400`}
              textStyle={tw`text-primary`}
            />
            <PrimaryButton
              titleProps="Next "
              IconProps={IconRightArrow}
              contentStyle={tw`mt-4 bg-slate-400`}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Take_Selfie;
