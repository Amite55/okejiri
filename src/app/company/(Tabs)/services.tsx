import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ServicesData from "@/src/json/ServiceData.json";
import tw from "@/src/lib/tailwind";
import { BlurView } from "@react-native-community/blur";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const services = () => {
  const serviceItemRender = ({ item }) => {
    return (
      <View
        style={tw`relative justify-center items-center mx-2`}
        key={item?.id}
      >
        <Image
          resizeMode="cover"
          style={tw`w-44 h-48 rounded-lg `}
          source={{ uri: item?.image }}
        />

        <View
          style={tw`absolute bottom-2 justify-center items-center w-38 h-10 rounded-xl border border-white60 overflow-hidden`}
        >
          {/* Background Blur */}
          <BlurView
            style={tw`absolute inset-0`}
            blurType="dark"
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          />

          {/* Foreground content (Text) */}
          <TouchableOpacity
            style={tw`flex-1 justify-center items-center`}
            activeOpacity={0.7}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-center text-xl text-white`}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ----------- Header content ---------------------

  const serviceHeaderRender = () => {
    return (
      <View>
        <ServiceProfileHeaderInfo />
        <Text
          style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}
        >
          Service
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={ServicesData}
      renderItem={serviceItemRender}
      ListHeaderComponent={serviceHeaderRender}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponentStyle={tw`w-full`}
      contentContainerStyle={tw` flex-1 items-center px-5 gap-3 `}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default services;
