import { IconCopy } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";

const Refer_Friend = () => {
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Copy",
    });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1  `}
      contentContainerStyle={tw`pb-6 px-5 bg-base_color`}
    >
      <BackTitleButton
        pageName={"Refer a friend"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-2`}>
        Your referral code
      </Text>

      <View
        style={tw`flex-row justify-between items-center bg-white rounded-full h-14 px-6`}
      >
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          876049
        </Text>
        <TouchableOpacity
          style={tw`p-2`}
          onPress={() => copyToClipboard("876049")}
        >
          <SvgXml xml={IconCopy} />
        </TouchableOpacity>
      </View>

      {/* ----------------------------- copy link ----------------- */}
      <TouchableOpacity
        style={tw`flex-row justify-center items-center gap-3 border border-gray-300 rounded-full mt-4 h-14 px-6`}
      >
        <SvgXml xml={IconCopy} />
        <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
          Copy link
        </Text>
      </TouchableOpacity>

      <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-10`}>
        Your referrals
      </Text>

      <View style={tw`gap-3 my-4`}>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <View
              key={index}
              style={tw`flex-row justify-between items-center p-5 bg-white rounded-xl`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Image
                  style={tw`w-16 h-16 rounded-full `}
                  source={ImgProfileImg}
                />
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                  >
                    Mark benjamin
                  </Text>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    example@gmail.com
                  </Text>
                </View>
              </View>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-success600`}
              >
                ₦10.0
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Refer_Friend;
