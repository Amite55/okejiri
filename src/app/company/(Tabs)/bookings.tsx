import { IconMostResentGray, IconProfileBadge } from "@/assets/icons";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import CleaningData from "@/src/json/CleaningData.json";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
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
          CleaningData.slice(0, 3).map((item) => (
            <Pressable
              style={tw`flex-row  justify-between items-center rounded-xl bg-white p-1.5`}
              key={item?.Id}
            >
              <Image
                style={tw`w-20 h-20 rounded-2xl`}
                source={{ uri: item?.image }}
              />
              <View>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                >
                  {item?.title}
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
                  >
                    {item?.profile_name}
                  </Text>

                  {item.badge ? <SvgXml xml={IconProfileBadge} /> : null}
                </View>
                <Text
                  style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
                >
                  ₦{item?.price}
                </Text>
              </View>

              <View
                style={[
                  tw`bg-primary -mr-1 -mb-14 bottom-0 w-20 h-9 justify-center items-center`,
                  { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
                ]}
              >
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-base text-white`}
                >
                  {item?.type}
                </Text>
              </View>
            </Pressable>
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

        {/* =============== boooking item =============== */}
        <View style={tw`gap-3 mt-3`}>
          {CleaningData?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            CleaningData.slice(0, 5).map((item) => (
              <Pressable
                style={tw`flex-row justify-between items-center rounded-xl bg-white p-1.5`}
                key={item?.Id}
              >
                <Image
                  style={tw`w-20 h-20 rounded-2xl`}
                  source={{ uri: item?.image }}
                />
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    {item?.title}
                  </Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
                    >
                      {item?.profile_name}
                    </Text>

                    {item.badge ? <SvgXml xml={IconProfileBadge} /> : null}
                  </View>
                  <StarRating
                    color="#FF6600"
                    starSize={24}
                    rating={item?.rating || 0}
                    onChange={() => {}}
                  />
                </View>
                <View style={tw`justify-between gap-3`}>
                  <Text
                    style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
                  >
                    ₦{item?.price}
                  </Text>
                  <View
                    style={[
                      tw`bg-primary -mr-1 -mb-4 w-20 h-9 justify-center items-center`,
                      { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
                    ]}
                  >
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-base text-white`}
                    >
                      {item?.type}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default bookings;
