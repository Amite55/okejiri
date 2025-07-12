import { IconCalender } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ServiceBooking = () => {
  const [isBookingSchedule, setIsBookingSchedule] = useState<boolean>(false);
  const [isGroup, setIsGroup] = useState<boolean>(false);
  return (
    <View style={tw`flex-1 px-5 bg-base_color`}>
      <BackTitleButton pageName={"Booking"} onPress={() => router.back()} />

      <View style={tw`flex-row justify-between items-center gap-4 my-5`}>
        <TouchableOpacity
          onPress={() => setIsBookingSchedule(false)}
          style={[
            tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
              !isBookingSchedule ? `bg-primary border-0` : `border-white200 `
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoRegular text-xl ${
                !isBookingSchedule ? `text-white` : `text-black`
              }`,
            ]}
          >
            Instant booking
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsBookingSchedule(true)}
          style={[
            tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
              isBookingSchedule ? `bg-primary  border-0` : `border-white200 `
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoRegular text-xl ${
                isBookingSchedule ? `text-white` : `text-black`
              }`,
            ]}
          >
            Schedule booking
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`border-b border-white200 my-4`} />

      <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black mb-4`}>
        Booking type
      </Text>
      <View style={tw`flex-row items-center gap-5`}>
        <TouchableOpacity
          onPress={() => setIsGroup(false)}
          style={[
            tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
              !isGroup ? `bg-primary  border-0` : `border-white200 `
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoRegular text-xl ${
                !isGroup ? `text-white` : `text-black`
              }`,
            ]}
          >
            Single
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsGroup(true)}
          style={[
            tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
              isGroup ? `bg-primary  border-0` : `border-white200 `
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoRegular text-xl ${
                isGroup ? `text-white` : `text-black`
              }`,
            ]}
          >
            Group
          </Text>
        </TouchableOpacity>
      </View>
      {/* ------------------------ ------------------------- */}
      {!isGroup ? (
        <View
          style={tw`flex-row justify-between items-center bg-white h-14 rounded-2xl px-5 mt-7`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium  text-2xl text-black`}>
            Cost:
          </Text>
          <Text
            style={tw`font-DegularDisplayDemoMedium  text-2xl text-primary`}
          >
            ₦10.00
          </Text>
        </View>
      ) : null}

      {/* *********************************************************** */}
      {isBookingSchedule ? (
        <Pressable
          style={tw`flex-row justify-between items-center bg-white h-14 rounded-2xl px-5 mt-7`}
        >
          Select date
          <Text style={tw`font-DegularDisplayDemoMedium  text-2xl text-black`}>
            Cost:
          </Text>
          <SvgXml xml={IconCalender} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default ServiceBooking;
