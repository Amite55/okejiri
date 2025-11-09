import { IconDownArrow, IconUpArrow } from "@/assets/icons";
import { ImgFAQ } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetFAQQuery } from "@/src/redux/apiSlices/userProvider/account/settingsSlices";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { SvgXml } from "react-native-svg";

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { data, isLoading, isError } = useGetFAQQuery({});

  const faqs = data?.data || [];

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base_color`}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={tw`mt-3 text-lg text-black`}>Loading FAQs...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base_color`}>
        <Text style={tw`text-lg text-red-600`}>Failed to load FAQs 😔</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
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

      {/* ------------------ Dynamic FAQ List ------------------ */}
      <View style={tw`mt-10 gap-3`}>
        {faqs.length > 0 ? (
          faqs.map((item: any) => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => setOpenId(openId === item.id ? null : item.id)}
                style={tw`flex-row justify-between items-center bg-white h-14 rounded-full px-6`}
              >
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-base text-black`}
                >
                  {item.question}
                </Text>
                <SvgXml
                  xml={openId === item.id ? IconUpArrow : IconDownArrow}
                />
              </TouchableOpacity>

              <Collapsible collapsed={openId !== item.id}>
                <Text
                  style={tw`px-5 py-4 text-black rounded-lg font-PoppinsRegular text-sm`}
                >
                  {item.answer}
                </Text>
              </Collapsible>
            </View>
          ))
        ) : (
          <Text style={tw`text-center text-lg text-gray-500 mt-6`}>
            No FAQs available
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default FAQ;
