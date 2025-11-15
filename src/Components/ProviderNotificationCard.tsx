import {
    IconCancel,
    IconDeliveryApproved,
    IconDispute,
    IconExtension,
    IconKYCComplete,
    IconNewOrder,
    IconProfileBadge,
    IconWaring,
    IconWithdrawalPending,
} from "@/assets/icons";
import { ImgCleaning } from "@/assets/images/image";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const iconMap = {
  new_order: IconNewOrder,
  delivery_request_approved: IconDeliveryApproved,
  complete_kyc: IconKYCComplete,
  warning: IconWaring,
  cancelled: IconCancel,
  new_dispute: IconDispute,
  withdrawal_request_pending: IconWithdrawalPending,
  delivery_extension: IconExtension,
};
const textColorMap = {
  new_order: "#FF6600",
  delivery_request_approved: "#008100",
  complete_kyc: "#9747FF",
  warning: "#FF3A00",
  cancelled: "#FF3A00",
  new_dispute: "#C88C00",
  withdrawal_request_pending: "#4285F4",
  delivery_extension: "#2577FF",
  delivery_request: "#4F52FF",
};

const ProviderNotificationCard = ({
  item,
  onPress,
  
 
}: {
  item: any;
  onPress: () => void;
  
 
}) => {

  console.log("============= item =========", JSON.stringify(item, null, 2));
  const Icon = iconMap[item?.data?.type];
  const textColor = textColorMap[item?.data?.type] || "#000000";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        tw`flex-row  items-center gap-2 rounded-2xl py-6 px-2 relative shadow-md`,
        item?.read_at ? tw`bg-white` : tw`bg-gray-200`,
      ]}
    >
      {/* ----------------------- notification icon ------------------------------ */}
      {Icon ? (
        <View
          style={tw`w-14 h-14 rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
        >
          <SvgXml xml={Icon} />
        </View>
      ) : (
        <Image
          style={tw`w-14 h-14 rounded-full border border-white`}
          source={ImgCleaning}
        />
      )}

      <View style={tw`flex-1`}>
        <Text
          numberOfLines={2}
          style={[
            tw`flex-1 font-DegularDisplayDemoMedium  text-xl mb-1`,
            { color: textColor },
          ]}
        >
          {item?.data?.title}
        </Text>
        {item.profile_name ? (
          <View style={tw`flex-row items-center gap-2`}>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-sm text-black`}
            >
              Jone don
            </Text>
            <SvgXml xml={IconProfileBadge} />
          </View>
        ) : (
          <Text
            style={tw`font-DegularDisplayDemoRegular text-sm text-gray-700`}
          >
            Tap to see details
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProviderNotificationCard;
