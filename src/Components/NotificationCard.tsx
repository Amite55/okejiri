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
  request_approved: IconDeliveryApproved,
  KYC_complete: IconKYCComplete,
  warning: IconWaring,
  cancelled: IconCancel,
  new_dispute: IconDispute,
  withdrawal_request_pending: IconWithdrawalPending,
  delivery_extension: IconExtension,
};
const textColorMap = {
  new_order: "#FF6600",
  request_approved: "#008100",
  KYC_complete: "#9747FF",
  warning: "#FF3A00",
  cancelled: "#FF3A00",
  new_dispute: "#C88C00",
  withdrawal_request_pending: "#4285F4",
  delivery_extension: "#2577FF",
  delivery_request: "#4F52FF",
};

const NotificationCard = ({ item }) => {
  const Icon = iconMap[item.icon];
  const textColor = textColorMap[item.type] || "#000000";
  return (
    <TouchableOpacity
      style={tw`flex-row  items-center gap-5 bg-white rounded-3xl py-4 px-5 relative shadow-md`}
    >
      {/* ----------------------- notification icon ------------------------------ */}
      {Icon ? (
        <View
          style={tw`w-16 h-16 rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
        >
          <SvgXml xml={Icon} />
        </View>
      ) : (
        <Image
          style={tw`w-16 h-16 rounded-full border border-white`}
          source={ImgCleaning}
        />
      )}

      <View style={tw`flex-1`}>
        <Text
          numberOfLines={2}
          style={[
            tw`flex-1 font-DegularDisplayDemoMedium text-success600  text-2xl mb-2`,
            { color: textColor },
          ]}
        >
          {item?.notification_title}
        </Text>
        {item.profile_name ? (
          <View style={tw`flex-row items-center gap-2`}>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
            >
              Jone don
            </Text>
            <SvgXml xml={IconProfileBadge} />
          </View>
        ) : (
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}
          >
            Tap to see details
          </Text>
        )}
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
