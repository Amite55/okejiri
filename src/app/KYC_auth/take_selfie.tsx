import { IconCameraYellow, IconRightArrow } from "@/assets/icons";
import {
  ImgLogo,
  ImgTakeSelfie,
  ImgTakeSelfieImage,
} from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Take_Selfie = () => {
  const [isDisable, setIsDisable] = useState<boolean>(false);
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
            resizeMode="contain"
            style={tw`w-44 h-14 mb-8`}
            source={ImgLogo}
          />

          {isDisable ? (
            <Image
              resizeMode="cover"
              style={tw`w-40  h-36 rounded-2xl `}
              source={ImgTakeSelfieImage}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={tw`w-72 h-36`}
              source={ImgTakeSelfie}
            />
          )}
        </View>

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

      {/*  */}

      <View>
        {isDisable ? (
          <PrimaryButton
            onPress={() => router.push("/KYC_auth/KYC_confirmation")}
            //   onPress={() => setModalVisible(true)}
            titleProps="Next "
            IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        ) : (
          <>
            <PrimaryButton
              // onPress={() => handleSubmit()}
              //   onPress={() => setModalVisible(true)}
              titleProps="Take photo "
              IconProps={IconCameraYellow}
              contentStyle={tw`mt-4 bg-transparent border border-gray-400`}
              textStyle={tw`text-primary`}
            />
            <PrimaryButton
              // onPress={() => router.push("/KYC_auth/take_selfie")}
              onPress={() => setIsDisable(true)}
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
