import { IconRightArrow } from "@/assets/icons";
import { ImgSuccessKYC } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Success_Screen = () => {
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
        <View style={tw`justify-center items-center mt-10`}>
          <Image
            resizeMode="contain"
            style={tw`w-40  h-36 rounded-2xl `}
            source={ImgSuccessKYC}
          />

          <Text
            style={tw`font-DegularDisplayDemoSemibold text-4xl text-blue-950 mt-3`}
          >
            John Smith
          </Text>

          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-blue-950`}
          >
            example@gmail.com
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
          <Text
            style={tw`font-DegularDisplayDemoRegular text-base text-blue-950`}
          >
            Thank you for sharing the info. You'll get an email once we're done
            reviewing.
          </Text>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-blue-950`}>
            Review time: 48 hours
          </Text>
        </View>
      </View>

      {/*  */}

      <View>
        <PrimaryButton
          onPress={() => router.push("/service_provider/individual/home")}
          //   onPress={() => setModalVisible(true)}
          titleProps="Go to home  "
          IconProps={IconRightArrow}
          contentStyle={tw`mt-4 bg-transparent border border-blue-950`}
          textStyle={tw`text-primary`}
        />
      </View>
    </ScrollView>
  );
};

export default Success_Screen;
