import {
  IconCameraYellow,
  IconRightArrow,
  IconUploadImage,
} from "@/assets/icons";
import { ImgCard, ImgLogo } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Id_Card = () => {
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
          titleTextStyle={tw`text-2xl`}
        />
        <View style={tw`justify-center items-center mt-14`}>
          <Image
            resizeMode="contain"
            style={tw`w-44 h-14 mb-8`}
            source={ImgLogo}
          />
          <Image resizeMode="contain" style={tw`w-60 h-36`} source={ImgCard} />
        </View>

        <Text
          style={tw`font-DegularDisplayDemoSemibold text-3xl text-primary text-center mt-8`}
        >
          Upload both side of your ID card
        </Text>

        <View style={tw`my-4 gap-4`}>
          <TouchableOpacity
            style={tw`border-2 border-dashed border-gray-300 rounded-sm h-14 flex-row justify-center items-center gap-2`}
          >
            <SvgXml xml={IconUploadImage} />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-base text-black`}
            >
              Upload front side of drag & drop here
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`border-2 border-dashed border-gray-300 rounded-sm h-14 flex-row justify-center items-center gap-2`}
          >
            <SvgXml xml={IconUploadImage} />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-base text-black`}
            >
              Upload back side of drag & drop here
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*  */}

      <View>
        {isDisable ? (
          <PrimaryButton
            onPress={() => router.push("/KYC_auth/take_selfie")}
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

export default Id_Card;
