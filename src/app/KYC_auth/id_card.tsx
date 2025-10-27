import { IconRightArrow, IconUploadImage } from "@/assets/icons";
import { ImgCard, ImgLogo } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Id_Card = () => {
  const { fastPhotoUri, secondPhotoUri } = useLocalSearchParams();
  const fastPhotoURIPerse = fastPhotoUri && JSON.parse(fastPhotoUri);
  const secondPhotoURIPerse = secondPhotoUri && JSON.parse(secondPhotoUri);

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

          <Image contentFit="contain" style={tw`w-60 h-36`} source={ImgCard} />
        </View>
        {/* ----------------------------- is open camera ---------------------- */}

        <Text
          style={tw`font-DegularDisplayDemoSemibold text-3xl text-primary text-center mt-8`}
        >
          Upload both side of your ID card
        </Text>

        <View style={tw`my-4 gap-4`}>
          {!fastPhotoUri && !secondPhotoUri && (
            <TouchableOpacity
              onPress={() => router.push("/KYC_auth/camera")}
              style={tw`border-2 border-dashed border-gray-300 rounded-sm h-14 flex-row justify-center items-center gap-2`}
            >
              <SvgXml xml={IconUploadImage} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-base text-black`}
              >
                Upload front side and back side ID card
              </Text>
            </TouchableOpacity>
          )}

          {/* ------------------------ if this is not null image ---------------- */}
          <View style={tw`justify-center items-center`}>
            {fastPhotoUri && secondPhotoUri && (
              <View style={tw`gap-4`}>
                <Image
                  source={fastPhotoURIPerse}
                  style={tw`w-64 h-36 rounded-xl border border-dotted border-primary`}
                  contentFit="cover"
                />
                <Image
                  source={secondPhotoURIPerse}
                  style={tw`w-64 h-36 rounded-xl border border-dotted border-primary`}
                  contentFit="cover"
                />
              </View>
            )}
          </View>
        </View>
      </View>

      {/*  */}
      <View>
        {fastPhotoUri && secondPhotoUri ? (
          <PrimaryButton
            onPress={() =>
              router.push({
                pathname: "/KYC_auth/take_selfie",
                params: {
                  fastPhotoUri: fastPhotoUri,
                  secondPhotoUri: secondPhotoUri,
                },
              })
            }
            titleProps="Next"
            IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        ) : (
          <PrimaryButton
            titleProps="Next "
            IconProps={IconRightArrow}
            contentStyle={tw`mt-4 bg-slate-400`}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Id_Card;
