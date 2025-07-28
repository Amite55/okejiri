import { IconMostResentGray } from "@/assets/icons";
import ServiceCard from "@/src/Components/ServiceCard";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import CleaningData from "@/src/json/CleaningData.json";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
const bookings = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* ================== profile header component =========== */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/company/(Tabs)/profile")}
        onPressNotification={() =>
          router.push("/notification_Global/notifications")
        }
      />

      <Text style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}>
        My Bookings
      </Text>
      <View style={tw`gap-3`}>
        {/* --------------------------------- My Bookings item ------------------------ */}

        {CleaningData?.length === 0 ? (
          <Text
            style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
          >
            Your ServiCe No Data
          </Text>
        ) : (
          CleaningData.slice(0, 3).map((item, index) => (
            <ServiceCard
              key={index}
              item={item}
              index={index}
              onPress={() =>
                router.push({
                  pathname: "/company/my_booking",
                  params: { status: "booking_request_pending" },
                })
              }
            />
          ))
        )}
      </View>

      <View style={tw`mt-6`}>
        <View style={tw`flex-row justify-start items-center gap-3  mt-3`}>
          <SvgXml xml={IconMostResentGray} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Bookings history
          </Text>
        </View>

        {/* =============== booked service item =============== */}
        <View style={tw`gap-3 mt-3`}>
          {CleaningData?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            CleaningData.slice(0, 5).map((item, index) => (
              <ServiceCard
                key={index}
                item={item}
                index={index}
                onPress={() => router.push("/company/booking_service_details")}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default bookings;
