import { _HEIGHT, _WIDTH } from "@/utils/utils";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import tw from "../lib/tailwind";
import { usePromotionsQuery } from "../redux/apiSlices/userProvider/homeSlices";

const UserCarousel = () => {
  // =========== api end point ===========
  const { data, error } = usePromotionsQuery({});

  const renderItem = ({ item }) => (
    <View
      style={{
        width: _WIDTH * 1,
        height: _HEIGHT * 0.19,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Image
        source={item.image}
        contentFit="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );

  return (
    <View
      id="carousel-component"
      dataSet={{ kind: "basic-layouts", name: "parallax" }}
      style={tw`w-full justify-center items-center flex-1 `}
    >
      <Carousel
        autoPlay
        autoPlayInterval={2000}
        data={data?.data?.data}
        height={_HEIGHT * 0.18}
        width={_WIDTH}
        loop
        pagingEnabled
        snapEnabled
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UserCarousel;
