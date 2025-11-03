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
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SvgXml } from "react-native-svg";
// ========================= booking time slot data =========================
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
  const { cameFromEdit, provider_id, cost } = useLocalSearchParams();
  const [isBookingSchedule, setIsBookingSchedule] =
    useState<string>("Instant booking");
  const [isGroup, setIsGroup] = useState<string>("Single");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
  const today = new Date().toISOString().split("T")[0];

  const handleNextRoute = () => {
    const bookingDetails = {
      provider_id: provider_id,
      booking_process: isBookingSchedule,
      booking_type: isGroup,
      price: cost,
      ...(isGroup === "Group" && { number_of_people: numberOfPeople }),
      ...(isBookingSchedule === "Schedule booking" && {
        schedule_date: !selectedDate ? today : selectedDate,
        schedule_time_slot: !selectedTime
          ? bookingTimeData[0].time
          : selectedTime,
      }),
    };
    console.log(bookingDetails, "this is booking details ---------------->");

    // ========== navigate to next route ============== with come to edit check
    if (cameFromEdit) {
      router.push("/company/serviceBookings/booking_confirmation");
    } else {
      router.push({
        pathname: "/company/serviceBookings/billing_details",
        params: { bookingDetails: JSON.stringify(bookingDetails) },
      });
    }
  };

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
          titleTextStyle={tw`text-xl`}
        />

        <View style={tw`flex-row justify-between items-center gap-4 my-5`}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsBookingSchedule("Instant booking")}
            style={[
              tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
                isBookingSchedule === "Instant booking"
                  ? `bg-primary border-0`
                  : `border-white200 `
              }`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-xl ${
                  isBookingSchedule === "Instant booking"
                    ? `text-white`
                    : `text-black`
                }`,
              ]}
            >
              Instant booking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsBookingSchedule("Schedule booking")}
            style={[
              tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
                isBookingSchedule === "Schedule booking"
                  ? `bg-primary  border-0`
                  : `border-white200 `
              }`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-xl ${
                  isBookingSchedule === "Schedule booking"
                    ? `text-white`
                    : `text-black`
                }`,
              ]}
            >
              Schedule booking
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`border-b border-white200 my-4`} />

        {isGroup === "Group" ? (
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
            activeOpacity={0.8}
            onPress={() => setIsGroup("Single")}
            style={[
              tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
                isGroup === "Single"
                  ? `bg-primary  border-0`
                  : `border-white200 `
              }`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-xl ${
                  isGroup === "Single" ? `text-white` : `text-black`
                }`,
              ]}
            >
              Single
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsGroup("Group")}
            style={[
              tw`border  rounded-2xl h-12 flex-1 justify-center items-center font-DegularDisplayDemoRegular text-xl ${
                isGroup === "Group"
                  ? `bg-primary  border-0`
                  : `border-white200 `
              }`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-xl ${
                  isGroup === "Group" ? `text-white` : `text-black`
                }`,
              ]}
            >
              Group
            </Text>
          </TouchableOpacity>
        </View>
        {/* ------------------------ ------------------------- */}
        {isBookingSchedule === "Schedule booking" || isGroup === "Single" ? (
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
              ₦ {cost}
            </Text>
          </View>
        ) : null}

        {isGroup === "Group" ? (
          <View style={tw`justify-center items-center my-5`}>
            <Text
              style={tw`text-black my-4 text-center font-DegularDisplayDemoMedium text-2xl`}
            >
              Number of people
            </Text>
            <View style={tw`flex-row justify-center items-center gap-7 mt-2`}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  numberOfPeople > 2 && setNumberOfPeople(numberOfPeople - 1)
                }
                style={tw`w-16 h-16 rounded-full justify-center items-center bg-white`}
              >
                <SvgXml xml={IconMinus} />
              </TouchableOpacity>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
              >
                {numberOfPeople}
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setNumberOfPeople(numberOfPeople + 1)}
                style={tw`w-16 h-16 rounded-full justify-center items-center bg-white`}
              >
                <SvgXml xml={IconPlusBlack} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* *********************************************************** */}
        {isBookingSchedule === "Schedule booking" ? (
          <View>
            {/* ======================= this is date slot ================ */}
            <Pressable
              disabled
              style={tw`flex-row  gap-3  items-center  h-14 rounded-2xl  mt-5 `}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium  text-2xl text-black`}
              >
                Select date
              </Text>
              <SvgXml xml={IconCalender} />
            </Pressable>

            <Calendar
              style={tw` p-2 rounded-3xl gap-2 text-black`}
              theme={{
                calendarBackground: "#fff",
                textSectionTitleColor: "#111",
                selectedDayBackgroundColor: "#183E9F",
                selectedDayTextColor: "#fff",
                todayTextColor: "white",
                todayBackgroundColor: "orange",
                dayTextColor: "#111",
                textDisabledColor: "#A4A4A4",
                arrowColor: "orange",
                monthTextColor: "#111",
              }}
              defa
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
              current={today}
              minDate={today}
            />

            {/* ======================== this is time slot ================ */}

            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black mt-5 mb-2`}
            >
              Select time slot
            </Text>
            <View style={tw`flex-row flex-wrap justify-between gap-3`}>
              {bookingTimeData.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedTimeIndex(index);
                    setSelectedTime(item?.time);
                  }}
                  key={item?.id}
                  style={[
                    tw`w-[48%] h-12 rounded-2xl border border-black200 justify-center items-center ${
                      selectedTimeIndex === index
                        ? "bg-primary border-0"
                        : "bg-transparent"
                    }`,
                  ]}
                >
                  <Text
                    style={[
                      tw`font-DegularDisplayDemoRegular text-base ${
                        selectedTimeIndex === index
                          ? "text-white"
                          : "text-black"
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
        {isBookingSchedule === "Schedule booking" || isGroup === "Group" ? (
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
        onPress={() => handleNextRoute()}
        titleProps="Next  1/4"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />
    </ScrollView>
  );
};

export default ServiceBooking;
