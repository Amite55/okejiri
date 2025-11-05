import { IconErow, IconStar } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const BookingCard = ({ item, onPress }: any) => {
  console.log("relative", item, "relative");
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={tw`relative flex-row items-center rounded-xl bg-white p-3 gap-4`}
      // key={item?.service_id}
    >
      {/* Image Section */}
      <Image
        contentFit="cover"
        style={tw`w-20 h-20 rounded-xl`}
        source={item?.provider?.avatar}
      />

      {/* Text Content Section */}
      <View style={tw`flex-1`}>
        {/* Title + Price */}
        <View style={tw`flex-row items-center justify-between`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`flex-1 font-DegularDisplayDemoRegular text-lg text-black pr-2`}
          >
            {item?.booking_items_count == 1 ? "package" : "packages"}
            {item?.booking_items_count}
          </Text>
          <Text
            style={tw`text-black1000 font-DegularDisplayDemoMedium text-lg flex-none`}
          >
            ₦ {item?.price}
          </Text>
        </View>

        {/* Provider Name */}
        <View style={tw`flex-row items-center gap-2 mt-1`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-lg text-darkWhite`}
          >
            {item?.provider?.name || "No Provider"}
          </Text>
        </View>

        {/* Ratings */}
        <View style={tw`flex-row justify-between items-center gap-1 mt-1`}>
          <View style={tw`flex-row items-center justify-center`}>
            <SvgXml xml={IconStar} />
            <Text
              style={tw`font-DegularDisplayDemoMedium text-primary text-sm`}
            >
              {item?.provider?.ratings_avg_rating}
            </Text>
          </View>

          {/* <View>
            <View
              style={tw` bg-primary  w-28 h-7 justify-center rounded-full items-center`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-sm text-white`}
              ></Text>
            </View>
          </View> */}
          <SvgXml xml={IconErow} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
