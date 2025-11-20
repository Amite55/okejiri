import {
  IconActiveGreen,
  IconBookingYellow,
  IconBoostingWhite,
  IconCursorYellow,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useBoostMyProfileGetQuery,
  useGetSettingQuery,
} from "@/src/redux/apiSlices/companyProvider/account/boostProfileSlice";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { SvgXml } from "react-native-svg";

const Boost_sProfile = () => {
  const { data, isLoading } = useBoostMyProfileGetQuery({});
  const { data: settingProfile, isLoading: settingProfileLoading } =
    useGetSettingQuery({});

  if (isLoading && settingProfileLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base_color`}>
        <ActivityIndicator size="large" color="#FF6600" />
        <Text style={tw`text-black mt-3 text-lg`}>Loading...</Text>
      </View>
    );
  }

  const boost = data?.data;

  const progress =
    boost?.number_of_days && boost?.days_remaining
      ? boost.days_remaining / boost.number_of_days
      : 0;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-1 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton
          pageName={"Boost your profile"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />

        <Text
          style={tw`font-DegularDisplayDemoRegular text-xl text-black my-2`}
        >
          Current campaign
        </Text>

        {/* ================= CURRENT CAMPAIGN CARD ================= */}
        {boost?.boosting_status === "No Boosting Found" ? (
          <View style={tw`justify-center items-center`}>
            <Text
              style={tw`text-center text-xl font-PoppinsSemiBold text-gray-500`}
            >
              {boost?.boosting_status}
            </Text>
          </View>
        ) : (
          <View
            style={tw`bg-white rounded-2xl p-5 flex-row justify-between items-center`}
          >
            <View style={tw`gap-2`}>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconActiveGreen} />
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-success600`}
                >
                  {boost?.boosting_status ?? "N/A"}
                </Text>
              </View>

              <Text
                style={tw`text-black font-DegularDisplayDemoSemibold text-4xl`}
              >
                ₦ {boost?.payment_amount ?? 0}
              </Text>

              <View style={tw`flex-row items-center gap-2`}>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                >
                  Starting date:
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                >
                  {boost?.started_date ?? "--"}
                </Text>
              </View>
            </View>

            <Pressable
              style={tw`w-16 h-10 rounded-3xl justify-center items-center bg-green50`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-success600`}
              >
                Paid
              </Text>
            </Pressable>
          </View>
        )}

        {/* ================= PROGRESS SECTION ================= */}
        {boost?.boosting_status === "No Boosting Found" ? null : (
          <View
            style={tw`flex-row justify-between items-center my-4 gap-3 h-60`}
          >
            <View style={tw`flex-1 bg-white rounded-2xl gap-2 p-4`}>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg text-black text-center`}
              >
                Days remaining
              </Text>

              <View style={tw`items-center justify-center`}>
                <Progress.Circle
                  progress={progress}
                  size={100}
                  thickness={10}
                  color="#FF6600"
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  animated={true}
                  showsText={false}
                />

                <View style={tw`absolute items-center`}>
                  <Text style={tw`text-black font-bold text-xl`}>
                    {boost?.days_remaining ?? 0}
                  </Text>
                  <Text style={tw`text-gray-500 text-sm`}>
                    {boost?.number_of_days ?? 0} days
                  </Text>
                </View>
              </View>

              <View style={tw`justify-center items-center gap-1`}>
                <Text style={tw`text-gray-500 text-sm`}>End date:</Text>
                <Text style={tw`text-black font-bold text-lg`}>
                  {boost?.ending_date ?? "--"}
                </Text>
              </View>
            </View>

            {/* ================= RIGHT SIDE CARDS ================= */}
            <View style={tw`flex-1 gap-3`}>
              {/* Total clicks */}
              <View
                style={tw`flex-1 bg-white justify-center items-center rounded-2xl gap-1 p-4`}
              >
                <SvgXml xml={IconCursorYellow} />
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-lg text-gray-500`}
                >
                  Total clicks
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoSemibold text-3xl text-black`}
                >
                  {boost?.total_click ?? 0}
                </Text>
              </View>

              {/* Total bookings */}
              <View
                style={tw`flex-1 bg-white justify-center items-center rounded-2xl gap-1 p-4`}
              >
                <SvgXml xml={IconBookingYellow} />
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-lg text-gray-500`}
                >
                  Total bookings
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoSemibold text-3xl text-black`}
                >
                  {boost?.total_bookings ?? 0}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* ================= FOOTER PLAN SECTION ================= */}
      <View style={tw`gap-2`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Upgrade your boost for 30 days
          </Text>
          <Text style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}>
            ₦ {settingProfile?.data?.thirty_day_boosting_price}
          </Text>
        </View>

        <PrimaryButton
          onPress={() => {
            router.push(
              "/service_provider/individual/boost_profiles/boost_profile_plan"
            );
          }}
          titleProps="Boost"
          IconProps={IconBoostingWhite}
          contentStyle={tw`mt-4`}
        />
      </View>
    </ScrollView>
  );
};

export default Boost_sProfile;
