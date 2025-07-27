import { ImgBanner } from "@/assets/images/image";
import { _HEIGHT, _WIDTH } from "@/utils/utils";
import React from "react";
import { Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import tw from "../lib/tailwind";

const bannerData = [
  {
    id: 1,
    img: ImgBanner,
  },
  {
    id: 2,
    img: ImgBanner,
  },
  {
    id: 3,
    img: ImgBanner,
  },
  {
    id: 4,
    img: ImgBanner,
  },
];

const UserCarousel = () => {
  const progressValue = useSharedValue(0);
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
        source={item.img}
        resizeMode="cover"
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
        data={bannerData}
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
