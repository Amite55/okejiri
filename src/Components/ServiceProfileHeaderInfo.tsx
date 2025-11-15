import { IconLocation, IconNotificationDark } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import { useProfileQuery } from "../redux/apiSlices/authSlices";
import { useGetNotificationsQuery } from "../redux/apiSlices/notificationsSlices";

interface IProps {
  onPress?: () => void;
  onPressNotification?: () => void;
}

const ServiceProfileHeaderInfo = ({ onPress, onPressNotification }: IProps) => {
  // ================== api end point ==================
  const { data: userProfileInfo, isLoading, error } = useProfileQuery(
    {},
     { refetchOnMountOrArgChange: true }
  );
  const { data: notificationData, isLoading: isNotificationLoading } =
    useGetNotificationsQuery(1000);

  const notificationCounter =
    notificationData?.data?.unread_notifications_count;
  // console.log("======== notification counter ", notificationCounter)
  return (
    <View
      style={tw`py-3 flex-1 bg-base_color flex-row items-center justify-between `}
    >
      <Pressable
        onPress={onPress}
        style={tw`flex-row justify-start items-center  gap-4`}
      >
        <View style={tw` `}>
          <Image
            style={tw`w-14 h-14 rounded-full `}
            source={userProfileInfo?.data?.role === "PROVIDER" && userProfileInfo?.data?.provider_type === "Company" ?
              {uri: userProfileInfo?.data?.company?.company_logo}

              : { uri: userProfileInfo?.data?.avatar }}
            contentFit="contain"
          />
        </View>

        <View style={tw` items-start gap-1`}>
          <Text
            style={tw`font-DegularDisplayDemoSemibold flex-row items-center text-black text-xl`}
          >
            {userProfileInfo?.data?.role === "PROVIDER" && userProfileInfo?.data?.provider_type === "Company" ?
              userProfileInfo?.data?.company?.company_name

              : userProfileInfo?.data?.name}
          </Text>
          <View style={tw`flex-row justify-start items-center gap-1`}>
            <SvgXml xml={IconLocation} />
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={tw`font-DegularDisplayDemoRegular text-base text-black`}
            >
              {userProfileInfo?.data?.role === "PROVIDER" && userProfileInfo?.data?.provider_type === "Company" ?
                userProfileInfo?.data?.company?.company_location

                : userProfileInfo?.data?.address}
            </Text>
          </View>
        </View>
      </Pressable>

      <TouchableOpacity
        onPress={onPressNotification}
        style={tw`w-14 h-14 p-3 text-center bg-white rounded-full justify-center items-center`}
      >
        <SvgXml xml={IconNotificationDark} />
        {notificationCounter > 0 && (
          <View
            style={tw`absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center p-1`}
          >
            <Text style={tw`text-white text-xs font-bold`}>
              {notificationCounter > 9 ? "9+" : notificationCounter}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ServiceProfileHeaderInfo;
