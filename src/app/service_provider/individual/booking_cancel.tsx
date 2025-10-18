import { ImgBookingCancel } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Booking_Cancel = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"Booking cancelled"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          resizeMode="contain"
          style={tw`w-full h-72`}
          source={ImgBookingCancel}
        />
      </View>
      <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-4`}>
        Reason
      </Text>
      <View style={tw`my-3`}>
        <Text style={tw`font-DegularDisplayDemoRegular text-lg`}>
          Lorem ipsum dolor sit amet consectetur. Et iaculis suspendisse at
          tortor. Leo massa ut mus vitae facilisis quis vestibulum. Urna nec
          pretium imperdiet duis ut amet iaculis amet. Egestas non tempus et
          nulla est eu elementum vestibulum et. Tristique bibendum sagittis
          habitasse pulvinar egestas tristique nunc eu. Felis lacus morbi
          sagittis enim metus amet tincidunt sed malesuada. Tristique a id
          blandit nullam scelerisque lobortis facilisi in. Pharetra ullamcorper
          placerat lacus lectus fermentum facilisi tempor urna. Pellentesque
          volutpat ultrices nibh blandit vitae odio blandit massa ut. Turpis
          commodo etiam mi pretium pretium quis ultrices facilisis. Aliquet
          egestas arcu a volutpat cras id.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Booking_Cancel;
