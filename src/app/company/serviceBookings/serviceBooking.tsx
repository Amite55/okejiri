import {
  IconCalender,
  IconMinus,
  IconPlusBlack,
  IconRightArrow,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const bookingTimeData = [
  {
    id: 1,
    time: "10:00 AM - 12:00 AM",
  },
  {
    id: 2,
    time: "12:00 AM - 02:00 PM",
  },
  {
    id: 3,
    time: "02:00 PM - 04:00 PM",
  },
  {
    id: 4,
    time: "04:00 PM - 06:00 PM",
  },
];

const ServiceBooking = () => {
  const [isBookingSchedule, setIsBookingSchedule] = useState<boolean>(false);
  const [isGroup, setIsGroup] = useState<boolean>(false);

  const [selectedTime, setSelectedTime] = useState<number>(0);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
      contentContainerStyle={tw`pb-8 justify-between flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Booking"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />

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

        {isGroup ? (
          <View
            style={tw`justify-center items-center my-2 w-full rounded-full h-12 bg-green50`}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-darkGreen text-center`}
            >
              Get 10% discount for group bookings
            </Text>
          </View>
        ) : null}

        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-black mb-4`}
        >
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
        {isBookingSchedule || !isGroup ? (
          <View
            style={tw`flex-row justify-between items-center bg-white h-14 rounded-2xl px-5 mt-7`}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium  text-2xl text-black`}
            >
              Cost:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoMedium  text-2xl text-primary`}
            >
              ₦10.00
            </Text>
          </View>
        ) : null}

        {isGroup ? (
          <View style={tw`justify-center items-center my-5`}>
            <Text
              style={tw`text-black my-4 text-center font-DegularDisplayDemoMedium text-2xl`}
            >
              Number of people
            </Text>
            <View style={tw`flex-row justify-center items-center gap-7 mt-2`}>
              <TouchableOpacity
                style={tw`w-16 h-16 rounded-full justify-center items-center bg-white`}
              >
                <SvgXml xml={IconMinus} />
              </TouchableOpacity>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
              >
                0
              </Text>
              <TouchableOpacity
                style={tw`w-16 h-16 rounded-full justify-center items-center bg-white`}
              >
                <SvgXml xml={IconPlusBlack} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* *********************************************************** */}
        {isBookingSchedule ? (
          <View>
            <Pressable
              style={tw`flex-row justify-between items-center bg-white h-14 rounded-2xl px-5 mt-7 `}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium  text-2xl text-black`}
              >
                Select date
              </Text>
              <SvgXml xml={IconCalender} />
            </Pressable>

            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black mt-5 mb-2`}
            >
              Select time slot
            </Text>
            <View style={tw`flex-row flex-wrap justify-between gap-3`}>
              {bookingTimeData.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedTime(index)}
                  key={item?.id}
                  style={[
                    tw`w-[48%] h-12 rounded-2xl border border-black200 justify-center items-center ${
                      selectedTime === index
                        ? "bg-primary border-0"
                        : "bg-transparent"
                    }`,
                  ]}
                >
                  <Text
                    style={[
                      tw`font-DegularDisplayDemoRegular text-xl ${
                        selectedTime === index ? "text-white" : "text-black"
                      }`,
                    ]}
                  >
                    {item?.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}

        {/* ===================================================================== */}
        {isBookingSchedule || isGroup ? (
          <View
            style={tw`flex-row justify-between items-center bg-white h-14 rounded-2xl px-5 mt-4`}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium  text-2xl text-black`}
            >
              Cost:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoMedium  text-2xl text-primary`}
            >
              ₦20.00
            </Text>
          </View>
        ) : null}
      </View>
      {/* ----------------- next button ------------------- */}

      <PrimaryButton
        onPress={() => router.push("/company/serviceBookings/billing_details")}
        titleProps="Next  1/4"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />
    </ScrollView>
  );
};

export default ServiceBooking;
