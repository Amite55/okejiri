import { IconProfileBadge, IconStar } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const ServiceCard = ({ item, onPress }: any) => {
  // console.log("item", item, "item");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={tw`relative flex-row items-center rounded-xl bg-white p-1.5 gap-4`}
      key={item?.Id}
    >
      {/* Image Section */}
      <Image
        contentFit="cover"
        style={tw`w-20 h-20 rounded-xl`}
        source={item?.image}
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
            {item?.service?.name}
          </Text>

          <Text
            style={tw`text-primary font-DegularDisplayDemoMedium text-lg flex-none`}
          >
            ₦{item?.price}
          </Text>
        </View>

        {/* Provider Name */}
        <View style={tw`flex-row items-center gap-2 mt-1`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-base text-darkWhite`}
          >
            {item?.provider?.name}
          </Text>
          {item.provider?.kyc_status === "Verified" ? (
            <SvgXml width={18} height={18} xml={IconProfileBadge} />
          ) : null}
        </View>

        {/* Ratings */}
        <View style={tw`flex-row items-center gap-1 mt-1`}>
          <SvgXml xml={IconStar} />
          <Text style={tw`font-DegularDisplayDemoMedium text-primary text-sm`}>
            {item?.provider?.ratings_avg_rating}
          </Text>
        </View>
      </View>

      {/* Service Name Tag */}
      <View
        style={[
          tw`absolute bottom-4 right-1 bg-primary -mr-1 -mb-4 w-24 h-9 justify-center items-center`,
          { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
        ]}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-sm text-white`}>
          {item?.service?.name?.length > 12
            ? `${item?.service?.name.slice(0, 12)}...`
            : item?.service?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
