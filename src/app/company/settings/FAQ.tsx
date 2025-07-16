import { IconDownArrow, IconUpArrow } from "@/assets/icons";
import { ImgFAQ } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { SvgXml } from "react-native-svg";

const FAQ = () => {
  const [qnsOne, setQnsTwo] = useState<boolean>(false);
  const [qnsThree, setQnsThree] = useState<boolean>(false);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
      //   keyboardShouldPersistTaps="handled"
    >
      <BackTitleButton
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
      />

      <View style={tw`justify-center items-center -mt-10`}>
        <Image source={ImgFAQ} />
      </View>
      <View style={tw`justify-center items-center`}>
        <View
          style={tw`w-[90%] h-16 justify-center items-center bg-white rounded-full`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            Frequently Asked Questions (FAQ)
          </Text>
        </View>
      </View>

      {/* -=-------------------- FAq ---------------- */}

      <View>
        <Text style={tw`font-PoppinsSemiBold text-sm text-black`}>
          1. How do I place an order?
        </Text>
        <TouchableOpacity
          //   onPress={() => setPleaseOrder(!pleaseOrder)}
          style={tw`w-8 h-8 justify-center items-center bg-white rounded-full shadow-lg`}
        >
          {qnsOne && <SvgXml xml={qnsOne ? IconUpArrow : IconDownArrow} />}
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={qnsOne}>
        <Text
          style={tw` px-5 py-4 bg-white rounded-lg font-PoppinsRegular text-sm`}
        >
          Placing an order is easy! Simply browse through our categories, add
          items to your cart, and proceed to checkout. Select your delivery
          address, choose a payment method, and confirm your order. We’ll take
          care of the rest!
        </Text>
      </Collapsible>
    </ScrollView>
  );
};

export default FAQ;
