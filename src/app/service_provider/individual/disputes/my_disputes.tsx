import {
  IconPending,
  IconResolved,
  IconRightArrowCornerGray,
  IconUnderReview,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const DisputesData = [
  {
    id: 1,
    status: "Pending",
  },
  {
    id: 2,
    status: "Under review",
  },
  {
    id: 3,
    status: "Resolved",
  },
];

const My_Disputes = () => {
  // =========== render disputes item --------------------

  const DisputesRenderData = ({ item }: { item: any }) => {
    let statusIcon;

    if (item?.status === "Pending") {
      statusIcon = IconPending;
    } else if (item?.status === "Under review") {
      statusIcon = IconUnderReview;
    } else if (item?.status === "Resolved") {
      statusIcon = IconResolved;
    }

    return (
      <TouchableOpacity
        onPress={() =>
          router.push("/service_provider/individual/disputes/disputes_status")
        }
        style={[
          tw`  h-28 px-4 py-2 rounded-3xl w-full bg-white border-b border-red-400`,
        ]}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl mb-2`}>
          Provider harassed me
        </Text>
        <View style={tw`flex-row justify-between items-end  `}>
          <Text numberOfLines={2} style={tw`flex-1`}>
            Lorem ipsum dolor sit amet consectetur. Blandit pharetra adipiscing
            neque
          </Text>
          <SvgXml xml={IconRightArrowCornerGray} />
        </View>

        <TouchableOpacity style={tw`absolute -right-2 top-3 z-50`}>
          <SvgXml xml={statusIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={DisputesData}
      renderItem={DisputesRenderData}
      ListHeaderComponent={() => (
        <BackTitleButton
          pageName={"My disputes"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw` flex-1 bg-base_color px-5  gap-3 pb-10`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default My_Disputes;
