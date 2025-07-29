import { IconProfileBadge, IconStar } from "@/assets/icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IServiceCardProps {
  onPress?: () => void;
  item?: any;
  index?: number;
}

const ServiceCard = ({ item, index, onPress }: IServiceCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`relative flex-row  items-center rounded-xl bg-white p-1.5 gap-4 `}
      key={item?.Id}
    >
      <Image style={tw`w-20 h-20 rounded-2xl`} source={{ uri: item?.image }} />
      <View>
        <View style={tw`flex-row items-center gap-4`}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            {item?.title}
          </Text>
          <Text style={tw`text-primary font-DegularDisplayDemoMedium text-xl `}>
            ₦{item?.price}
          </Text>
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
          >
            {item?.profile_name}
          </Text>

          {item.badge ? <SvgXml xml={IconProfileBadge} /> : null}
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconStar} />
          <Text style={tw`font-DegularDisplayDemoMedium text-primary text-lg`}>
            (5.0)
          </Text>
        </View>
      </View>

      <View
        style={[
          tw`absolute bottom-4 right-1 bg-primary -mr-1 -mb-4 w-20 h-9 justify-center items-center`,
          { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
        ]}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-base text-white`}>
          {item?.type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
