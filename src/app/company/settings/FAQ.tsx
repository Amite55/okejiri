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
  const [qnsOne, setQnsOne] = useState<boolean>(false);
  const [qnsTwo, setQnsTwo] = useState<boolean>(false);

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
        titleTextStyle={tw`text-xl`}
      />

      <View style={tw`justify-center items-center -mt-10`}>
        <Image source={ImgFAQ} />
      </View>
      <View style={tw`justify-center items-center`}>
        <View
          style={tw`w-full h-16 justify-center items-center bg-white rounded-full`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            Frequently Asked Questions (FAQ)
          </Text>
        </View>
      </View>

      {/* -=-------------------- FAq ---------------- */}

      <View style={tw`mt-10 gap-3`}>
        <TouchableOpacity
          onPress={() => setQnsOne(!qnsOne)}
          style={tw`flex-row justify-between items-center bg-white h-14 rounded-full px-6`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-base text-black`}>
            Question 1
          </Text>
          <SvgXml xml={qnsOne ? IconUpArrow : IconDownArrow} />
        </TouchableOpacity>

        <Collapsible collapsed={!qnsOne}>
          <Text
            style={tw` px-5 py-4 text-black rounded-lg font-PoppinsRegular text-sm`}
          >
            Placing an order is easy! Simply browse through our categories, add
            items to your cart, and proceed to checkout. Select your delivery
            address, choose a payment method, and confirm your order. We’ll take
            care of the rest!
          </Text>
        </Collapsible>

        {/* -=----------------------------Question 1 --------------- */}

        <TouchableOpacity
          onPress={() => setQnsTwo(!qnsTwo)}
          style={tw`flex-row justify-between items-center bg-white h-14 rounded-full px-6`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-base text-black`}>
            Question 2
          </Text>
          <SvgXml xml={qnsTwo ? IconUpArrow : IconDownArrow} />
        </TouchableOpacity>

        <Collapsible collapsed={!qnsTwo}>
          <Text
            style={tw` px-5 py-4 text-black rounded-lg font-PoppinsRegular text-sm`}
          >
            Placing an order is easy! Simply browse through our categories, add
            items to your cart, and proceed to checkout. Select your delivery
            address, choose a payment method, and confirm your order. We’ll take
            care of the rest!
          </Text>
        </Collapsible>
      </View>
    </ScrollView>
  );
};

export default FAQ;
