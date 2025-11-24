import {
  IconCalender,
  IconMinus,
  IconPlusBlack,
  IconRightArrow,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetCartItemQuery } from "@/src/redux/apiSlices/userProvider/cartSlices";
import { useProviderProfileQuery } from "@/src/redux/apiSlices/userProvider/servicesSlices";
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

const ServiceBooking = () => {
  const { provider_id, cost } = useLocalSearchParams();
  const [isBookingSchedule, setIsBookingSchedule] =
    useState<string>("Instant booking");
  const [isGroup, setIsGroup] = useState<string>("Single");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
  const today = new Date().toISOString().split("T")[0];

  // ---------------- api end point call ----------------------
  const { data: getProviderProfile, isLoading } =
    useProviderProfileQuery(provider_id);
  const { data: getCartData, isLoading: isCartDataLoading } =
    useGetCartItemQuery({});

  const TimeThisItem = getCartData?.data[0]?.package?.available_time;

  // ================= check discount amount ================
  const decimalDiscountCost = Math.round(
    Number(getProviderProfile?.data?.discount)
  );
  const discountAmount = (Number(cost) * Number(decimalDiscountCost)) / 100;

  const finalCost = Number(cost) - discountAmount;

  const totalCost =
    isGroup === "Group" ? Number(finalCost) * numberOfPeople : Number(cost);

  // ================== handle next route ==================
  const handleNextRoute = () => {
    const bookingDetails = {
      provider_id: provider_id,
      booking_process: isBookingSchedule,
      booking_type: isGroup,
      price: totalCost,
      ...(isGroup === "Group" && { number_of_people: numberOfPeople }),
      ...(isBookingSchedule === "Schedule booking" && {
        schedule_date: !selectedDate ? today : selectedDate,
        schedule_time_slot: !selectedTime
          ? TimeThisItem[0].available_time_from +
            " - " +
            TimeThisItem[0].available_time_to
          : selectedTime,
      }),
    };
    // ========== navigate to next route ============== with come to edit check
    if (bookingDetails) {
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
      contentContainerStyle={tw`pb-2 justify-between flex-grow`}
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
        {getProviderProfile?.data?.discount > 0 && isGroup === "Group" ? (
          <View
            style={tw`justify-center items-center my-2 w-full rounded-full h-12 bg-green50`}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-darkGreen text-center`}
            >
              Get {decimalDiscountCost}% discount for group bookings
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
        {
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
              ₦ {Number(totalCost).toFixed(2)}
            </Text>
          </View>
        }

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
                onPress={() => {
                  setNumberOfPeople((prev) =>
                    prev > 2 ? Number(prev) - 1 : prev
                  );
                }}
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
                onPress={() => {
                  setNumberOfPeople((prev) => Number(prev) + 1);
                }}
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
              {getCartData?.data[0]?.package?.available_time?.length > 0 ? (
                TimeThisItem.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setSelectedTimeIndex(index);
                      setSelectedTime(
                        item?.available_time_from +
                          " - " +
                          item?.available_time_to
                      );
                    }}
                    key={item?.id}
                    style={[
                      tw`w-[48%] h-12 rounded-2xl border flex-row border-black200 justify-center items-center gap-2 ${
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
                      {item?.available_time_from}
                    </Text>
                    <Text
                      style={[
                        tw`text-white text-2xl font-DegularDisplayDemoSemibold ${
                          selectedTimeIndex === index
                            ? "text-white"
                            : "text-black"
                        }`,
                      ]}
                    >
                      -
                    </Text>
                    <Text
                      style={[
                        tw`font-DegularDisplayDemoRegular text-base ${
                          selectedTimeIndex === index
                            ? "text-white"
                            : "text-black"
                        }`,
                      ]}
                    >
                      {item?.available_time_to}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base items-center justify-center text-black`}
                >
                  No Time Available
                </Text>
              )}
            </View>
          </View>
        ) : null}

        {/* ===================================================================== */}
        {/* {isBookingSchedule === "Schedule booking" || isGroup === "Group" ? (
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
        ) : null} */}
      </View>
      {/* ----------------- next button ------------------- */}
      {isBookingSchedule === "Schedule booking" ? (
        !TimeThisItem ? (
          <PrimaryButton
            // onPress={() => handleNextRoute()}
            titleProps="Next  2/4"
            IconProps={IconRightArrow}
            contentStyle={tw`mt-4 bg-slate-300`}
          />
        ) : (
          <PrimaryButton
            onPress={() => handleNextRoute()}
            titleProps="Next  2/4"
            IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        )
      ) : (
        <PrimaryButton
          onPress={() => handleNextRoute()}
          titleProps="Next  1/4"
          IconProps={IconRightArrow}
          contentStyle={tw`mt-4`}
        />
      )}
    </ScrollView>
  );
};

export default ServiceBooking;
