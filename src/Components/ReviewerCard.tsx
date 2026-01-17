import { IconStar } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const ReviewerCard = (item: any) => {
  return (
    <View style={tw`bg-white shadow  w-80 h-72 rounded-lg p-6`}>
      <View style={tw`flex-row items-center gap-3`}>
        <Image
          contentFit="cover"
          style={tw`w-16 h-16 rounded-full `}
          source={item?.item?.item?.user?.avatar}
        />
        <View>
          <Text style={tw`font-DegularDisplayDemoSemibold text-lg text-black`}>
            {item?.item?.item?.user?.name}
          </Text>
          {/* rating */}
          <View style={tw`flex-row items-center gap-1`}>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconStar} />
            </View>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-base text-black`}
            >
              ({item?.item?.item?.rating})
            </Text>
          </View>
        </View>
      </View>
      <Text style={tw`font-DegularDisplayDemoRegular text-base text-black`}>
        {item?.item?.item?.review?.length > 190
          ? `${item?.item?.item?.review?.slice(0, 190)}...`
          : item?.item?.item?.review}
      </Text>
    </View>
  );
};

export default ReviewerCard;
