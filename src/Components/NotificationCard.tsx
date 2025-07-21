import { IconProfileBadge, IconRequestList } from "@/assets/icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const NotificationCard = () => {
  return (
    <TouchableOpacity
      style={tw`flex-row  items-center gap-5 bg-white rounded-3xl h-36 px-5 relative shadow-md`}
    >
      <View
        style={tw`w-16 h-16 rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
      >
        <SvgXml xml={IconRequestList} />
      </View>
      <View>
        <Text
          style={tw`font-DegularDisplayDemoMedium text-success600  text-2xl mb-2`}
        >
          Request approved
        </Text>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}>
            Jone don
          </Text>
          <SvgXml xml={IconProfileBadge} />
        </View>
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}>
          Today 10.00 AM
        </Text>
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}>
          Tap to see details
        </Text>
      </View>
      <View
        style={[
          tw`bg-primary absolute  bottom-0 right-0 w-20 h-9 justify-center items-center`,
          { borderTopLeftRadius: 12, borderBottomRightRadius: 12 },
        ]}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-base text-white`}>
          Cleaning
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
