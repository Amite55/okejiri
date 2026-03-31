import {
  IconCompleteKycNotification,
  IconCompleteKYCTick,
  IconDeleteWhite,
  IconDeliveryApprovedNotification,
  IconExtension,
  IconNewDisputeNotification,
  IconNewOrderNotification,
  IconNotification,
  IconOrderRejectedNotification,
  IconPayoutRequestNotification,
  IconProfileBadge,
  IconRequestForDelivery,
  IconWaringNotification,
} from "@/assets/icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { helpers } from "../lib/helpers";
import tw from "../lib/tailwind";

const iconMap = {
  payout_request: IconPayoutRequestNotification,
  order_rejected: IconOrderRejectedNotification,
  new_order: IconNewOrderNotification,
  delivery_request_approved: IconDeliveryApprovedNotification,
  delivery_request_decline: IconOrderRejectedNotification,
  complete_kyc: IconCompleteKycNotification,
  order_cancelled: IconOrderRejectedNotification,
  new_dispute: IconNewDisputeNotification,
  warning: IconWaringNotification,
  order_approved: IconDeliveryApprovedNotification,
  new_report: IconWaringNotification,
  delivery_request_sent: IconRequestForDelivery,
  extend_delivery_time: IconExtension,
  accept_extend_delivery_time: IconDeliveryApprovedNotification,
  report: IconWaringNotification,
  kyc_reject: IconWaringNotification,
  kyc_approved: IconCompleteKYCTick,
};
const textColorMap = {
  payout_request: "#4285F4",
  order_rejected: "#FF3A00",
  new_order: "#FF6600",
  delivery_request_approved: "#008100",
  delivery_request_decline: "#FF3A00",
  complete_kyc: "#9747FF",
  order_cancelled: "#FF3A00",
  new_dispute: "#C88C00",
  warning: "#FF3A00",
  order_approved: "#008100",
  new_report: "#FF3A00",
  delivery_request_sent: "#4285F4",
  extend_delivery_time: "#2577FF",
  accept_extend_delivery_time: "#008100",
  report: "#FF3A00",
  kyc_approved: "#008100",
  kyc_reject: "#FF3A00",
};

interface Props {
  item: any;
  onPress: () => void;
  onDelete?: () => void;
  deleteLoading?: boolean;
}
interface RightActionProps {
  onDelete: () => void;
  deleteLoading?: boolean;
}

// ================= card right action ==================

const RightAction = ({ onDelete, deleteLoading }: RightActionProps) => {
  return (
    <TouchableOpacity
      onPress={onDelete}
      disabled={deleteLoading}
      activeOpacity={0.8}
      style={tw`bg-red-500 w-20 justify-center items-center rounded-2xl ml-2`}
    >
      {deleteLoading ? (
        <ActivityIndicator size={"small"} color="#fff" />
      ) : (
        <SvgXml xml={IconDeleteWhite} />
      )}
      <Text style={tw`text-white text-xs mt-1`}>Delete</Text>
    </TouchableOpacity>
  );
};

const ProviderNotificationCard = ({
  item,
  onPress,
  onDelete,
  deleteLoading,
}: Props) => {
  type NotificationType = keyof typeof iconMap;
  const type = item?.data?.data?.type as NotificationType;
  const Icon = iconMap[type];
  const textColor = textColorMap[type] || "#000000";

  return (
    <Swipeable
      renderRightActions={() => RightAction({ onDelete, deleteLoading })}
      overshootRight={false}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          tw`flex-row  items-center justify-between rounded-2xl py-3  px-2 relative shadow`,
          item?.read_at ? tw`bg-white` : tw`bg-gray-200`,
        ]}
      >
        <View style={tw`flex-row items-center gap-3 flex-1`}>
          {/* ----------------------- notification icon ------------------------------ */}
          <View
            style={tw`w-14 h-14 rounded-full border  border-white   bg-base_color justify-center items-center`}
          >
            <SvgXml xml={Icon ? Icon : IconNotification} />
          </View>

          <View style={tw`flex-1`}>
            <Text
              numberOfLines={2}
              ellipsizeMode="clip"
              style={[
                tw`flex-1 font-DegularDisplayDemoMedium  text-xl`,
                { color: textColor },
              ]}
            >
              {item?.data?.title}
            </Text>
            {item?.data?.provider?.name ? (
              <View style={tw`flex-row items-center gap-1`}>
                <Text
                  style={tw`font-DegularDisplayDemoSemibold text-base text-black`}
                >
                  {item?.data?.provider?.name || item?.data?.user?.name}
                </Text>
                {item?.data?.provider?.kyc_status === "Verified" ||
                item?.data?.user?.kyc_status === "Verified" ? (
                  <SvgXml xml={IconProfileBadge} />
                ) : null}
              </View>
            ) : (
              <Text
                style={tw`font-DegularDisplayDemoRegular text-sm text-gray-700`}
              >
                Tap to see details
              </Text>
            )}
            <Text style={tw`text-xs text-gray-500`}>
              {helpers.formatDateTime(item?.created_at)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default React.memo(ProviderNotificationCard);
