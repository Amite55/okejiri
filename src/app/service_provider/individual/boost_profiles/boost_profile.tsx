import {
  IconActiveGreen,
  IconBookingYellow,
  IconBoostingWhite,
  IconCursorYellow,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { SvgXml } from "react-native-svg";

const Boost_sProfile = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1   px-5 bg-base_color`}
      contentContainerStyle={tw`pb-6 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton
          pageName={"Boost your profile"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />

        <Text
          style={tw`font-DegularDisplayDemoRegular text-xl text-black my-2`}
        >
          Current campaign
        </Text>
        <View
          style={tw`bg-white rounded-2xl p-5 flex-row justify-between items-center`}
        >
          <View style={tw`gap-2`}>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconActiveGreen} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-success600`}
              >
                Active
              </Text>
            </View>
            <Text
              style={tw`text-black  font-DegularDisplayDemoSemibold text-4xl`}
            >
              ₦ 200.00
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
                10-06-2025
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

        {/* ------------- progress ------------ */}
        <View style={tw`flex-row justify-between items-center my-4 gap-3 h-60`}>
          <View style={tw`flex-1 bg-white  rounded-2xl gap-2 p-4`}>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-lg text-black text-center`}
            >
              Days remaining
            </Text>
            <View style={tw`items-center justify-center`}>
              <Progress.Circle
                progress={0.6}
                size={100}
                thickness={10}
                color="#FF6600"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
                showsText={false}
              />

              {/* Custom Text Inside Circle */}
              <View style={tw`absolute items-center`}>
                <Text style={tw`text-black font-bold text-xl`}>10</Text>
                <Text style={tw`text-gray-500 text-sm`}>15 days</Text>
              </View>
            </View>

            <View style={tw`justify-center items-center gap-1`}>
              <Text style={tw`text-gray-500 text-sm`}>End date:</Text>
              <Text style={tw`text-black font-bold text-lg`}>25-06-2025</Text>
            </View>
          </View>

          <View style={tw`flex-1  gap-3`}>
            {/* -------------------- total click ------------ */}
            <View
              style={tw`flex-1 bg-white justify-center items-center  rounded-2xl gap-1 p-4`}
            >
              <SvgXml xml={IconCursorYellow} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg  text-gray-500`}
              >
                Total clicks
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-3xl text-black`}
              >
                5000
              </Text>
            </View>

            {/* ---------------Total bookings ----------------- */}

            <View
              style={tw`flex-1 bg-white justify-center items-center  rounded-2xl gap-1 p-4`}
            >
              <SvgXml xml={IconBookingYellow} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg  text-gray-500`}
              >
                Total bookings
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-3xl text-black`}
              >
                5000
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={tw`gap-2 `}>
        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Upgrade your boost for 30 days
          </Text>
          <Text style={tw`font-DegularDisplayDemoSemibold text-3xl text-black`}>
            ₦ 200.00
          </Text>
        </View>
        {/*  ------------- next button -------------------- */}
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
