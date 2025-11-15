import { IconCopy } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetMyReferralsQuery } from "@/src/redux/apiSlices/userProvider/account/referralFriendsSlices";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";

const Refer_Friend = () => {
  const { referCode } = useLocalSearchParams();
  // [------------------------- api end point -------------------------]
  const { data: getMyReferData } = useGetMyReferralsQuery({
    per_page: 10,
    page: 1,
  });

  // console.log(getMyReferData, "this my referdata ------------------");

  // [---------------------- copy to clipboard ----------------------]
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Copied to clipboard",
    });
  };

  const referrals = [1, 2, 3, 4, 5]; // later from API

  const renderReferralItem = ({ item, index }: any) => (
    <View
      key={index}
      style={tw`flex-row justify-between items-center p-5 bg-white rounded-xl mb-3`}
    >
      <View style={tw`flex-row items-center gap-3`}>
        <Image style={tw`w-16 h-16 rounded-full`} source={ImgProfileImg} />
        <View>
          <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
            Mark Benjamin
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            example@gmail.com
          </Text>
        </View>
      </View>
      <Text style={tw`font-DegularDisplayDemoMedium text-xl text-success600`}>
        ₦10.0
      </Text>
    </View>
  );

  return (
    <FlatList
      data={referrals}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderReferralItem}
      contentContainerStyle={tw`px-5 pb-10 bg-base_color`}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <BackTitleButton
            pageName={"Refer a friend"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />

          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-2`}
          >
            Your referral code
          </Text>

          <View
            style={tw`flex-row justify-between items-center bg-white rounded-full h-14 px-6 mt-2`}
          >
            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
              {referCode}
            </Text>
            <TouchableOpacity
              style={tw`p-2`}
              onPress={() => copyToClipboard(referCode as string)}
            >
              <SvgXml xml={IconCopy} />
            </TouchableOpacity>
          </View>

          {/* Copy link button */}
          {/* <TouchableOpacity
            style={tw`flex-row justify-center items-center gap-3 border border-gray-300 rounded-full mt-4 h-14 px-6`}
            onPress={() =>
              copyToClipboard("https://yourapp.com/referral/876049")
            }
          >
            <SvgXml xml={IconCopy} />
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
              Copy link
            </Text>
          </TouchableOpacity> */}

          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-10 mb-3`}
          >
            Your referrals
          </Text>
        </>
      }
      ListEmptyComponent={() => (
        <View style={tw`py-10 items-center`}>
          <Text style={tw`text-lg text-gray-600`}>
            You haven’t referred anyone yet.
          </Text>
        </View>
      )}
    />
  );
};

export default Refer_Friend;
