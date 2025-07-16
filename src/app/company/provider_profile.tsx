import {
  IconMessageWhite,
  IconProfileBadge,
  IconReportBlack,
} from "@/assets/icons";
import { ImgCleaning, ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const Provider_Profile = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1  `}
      contentContainerStyle={tw`pb-28 flex-1 bg-base_color`}
    >
      <BackTitleButton
        pageName={"Provider profile"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
        contentStyle={tw`px-5`}
      />

      <View style={tw`relative justify-center items-center mt-2`}>
        <Image style={tw`w-full h-52 `} source={ImgCleaning} />
        <View style={tw`justify-center items-center absolute -bottom-28 `}>
          <Image
            style={tw`w-24 h-24 rounded-full   border-2 border-white`}
            source={ImgProfileImg}
          />
          {/*  profile name ----------- */}
          <View style={tw`justify-center items-center my-1`}>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`font-DegularDisplayDemoRegular text-2xl`}>
                Profile name
              </Text>
              <SvgXml xml={IconProfileBadge} />
            </View>
            <View style={tw`flex-row items-center `}>
              <StarRating
                starSize={18}
                color="#FF6600"
                rating={5}
                onChange={() => {}}
              />
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-regularText`}
              >
                (100)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ----------------------------- report and message =---------------------- */}

      <View>
        <TouchableOpacity>
          <SvgXml xml={IconReportBlack} />
          <Text>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <SvgXml xml={IconMessageWhite} />
          <Text>Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Provider_Profile;
