import {
  IconEditPenBlack,
  IconPhotoGallery,
  IconRightArrow,
} from "@/assets/icons";
import { ImgLogo, ImgTakeSelfieImage } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const KYC_Confirmation = () => {
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
          <Image resizeMode="contain" style={tw`w-44 h-14 `} source={ImgLogo} />
          <Text
            style={tw`font-DegularDisplayDemoSemibold text-3xl text-primary text-center my-6`}
          >
            Confirm your informations
          </Text>
          <Image
            resizeMode="cover"
            style={tw`w-40  h-36 rounded-2xl `}
            source={ImgTakeSelfieImage}
          />
        </View>

        <View style={tw`my-4 gap-4`}>
          <View
            style={tw`border border-gray-300 rounded-full h-14 flex-row justify-between items-center px-4`}
          >
            <TextInput style={tw`flex-1`} defaultValue="Cleaning" />
            <TouchableOpacity>
              <SvgXml xml={IconEditPenBlack} />
            </TouchableOpacity>
          </View>

          <View
            style={tw`px-4 border-2 border-dashed border-gray-300 rounded-sm h-14 flex-row justify-between items-center gap-2`}
          >
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconPhotoGallery} />
              <View>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                >
                  Id card front side
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                >
                  5.2 MB
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <SvgXml xml={IconEditPenBlack} />
            </TouchableOpacity>
          </View>

          <View
            style={tw`px-4 border-2 border-dashed border-gray-300 rounded-sm h-14 flex-row justify-between items-center gap-2`}
          >
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconPhotoGallery} />
              <View>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                >
                  Id card back side
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                >
                  5.2 MB
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <SvgXml xml={IconEditPenBlack} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*  */}

      <View>
        <PrimaryButton
          onPress={() => router.push("/KYC_auth/success_screen")}
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
