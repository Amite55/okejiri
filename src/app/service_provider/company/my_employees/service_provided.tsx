import { IconProfileBadge, IconStar } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const providedServicesData = [
  {
    id: 1,
    status: "Pending",
  },
  {
    id: 2,
    status: "Completed",
  },
  {
    id: 3,
    status: "Pending",
  },
  {
    id: 4,
    status: "Completed",
  },
  {
    id: 5,
    status: "Completed",
  },
  {
    id: 6,
    status: "Completed",
  },
  {
    id: 7,
    status: "Pending",
  },
];

const renderServiceProvided = ({ item }) => {
  let statusStyle = "";

  if (item.status === "Pending") {
    statusStyle = "bg-blue-500";
  } else if (item.status === "Completed") {
    statusStyle = "bg-green-600";
  }

  return (
    <TouchableOpacity
      style={tw`flex-row justify-between bg-white px-2 py-3 rounded-xl`}
    >
      <View style={tw`flex-1 flex-row gap-3`}>
        <Image style={tw`w-20 h-20 rounded-xl`} source={ImgProfileImg} />
        <View>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Service title goes here
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-regularText text-xl`}
            >
              Provider Name
            </Text>
            <SvgXml xml={IconProfileBadge} />
          </View>
          <View style={tw`flex-row items-center`}>
            <SvgXml xml={IconStar} />
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-primary`}
            >
              5.0
            </Text>
          </View>
        </View>
      </View>

      <View style={tw`items-end gap-2`}>
        <Text
          style={tw`flex-1 font-DegularDisplayDemoMedium text-xl text-primary`}
        >
          ₦10.50
        </Text>
        <View
          style={[
            tw`flex-1 px-2 py-0.5 rounded-lg justify-center items-center  ${statusStyle}`,
          ]}
        >
          <Text style={tw`font-DegularDisplayDemoRegular text-base text-white`}>
            {item?.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Service_Provided = () => {
  const {id} = useLocalSearchParams();

  console.log(" =========================== employee id ===================== ", id);
  
  return (
    <FlatList
      style={tw`flex-1 bg-base_color`}
      contentContainerStyle={tw`px-5 gap-3 pb-4`}
      data={providedServicesData}
      keyExtractor={(i) => i.id.toLocaleString()}
      renderItem={renderServiceProvided}
      ListHeaderComponent={() => (
        <BackTitleButton
          pageName={"Employee details"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
          // contentStyle={tw`px-5`}
        />
      )}
    />
  );
};

export default Service_Provided;
