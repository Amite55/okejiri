import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";

interface AssignedEmployeeProps {
  image: string;
  name: string;
  phone: string;
  location: string;
}

const AssignedEmployee = ({
  image,
  name,
  phone,
  location,
}: AssignedEmployeeProps) => {
  return (
    <View
      style={tw`flex-row justify-between w-full bg-white rounded-lg py-2 px-2`}
    >
      <View style={tw`flex-1 flex-row gap-2 items-center `}>
        <View style={tw``}>
          <Image style={tw`w-20 h-20 rounded-lg `} source={image} />
        </View>
        <View style={tw`flex-1`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`flex-shrink font-DegularDisplayDemoMedium text-xl`}
          >
            {name}
          </Text>
          <Text style={tw`text-sm text-gray-600 `}>{phone}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={tw` flex-shrink text-sm text-gray-600 `}
          >
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AssignedEmployee;
