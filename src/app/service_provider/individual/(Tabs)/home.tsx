import {
  IconBalance,
  IconDate,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
  IconSettingWhite,
} from "@/assets/icons";
import {
  ImgComplete,
  ImgNew,
  ImgPending,
  ImgProfileImg,
} from "@/assets/images/image";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ShortDataTitle from "@/src/Components/ShortDataTitle";
import tw from "@/src/lib/tailwind";
import { useHomeProviderQuery } from "@/src/redux/apiSlices/IndividualProvider/homeSlices";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value --------------------//
const dropdownData = [
  { label: "This week", value: "1" },
  { label: "This month", value: "2" },
  { label: "This year", value: "3" },
];

const Individual_Service_Provider_Index = () => {
  const { data: homeProviderData, isLoading } = useHomeProviderQuery({});
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  console.log("homeProviderData", homeProviderData);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* ----------------------- Profile header parts --------------  */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/service_provider/individual/account")}
        onPressNotification={() =>
          router.push("/notification_Global/notifications")
        }
      />

      <View
        style={tw`h-52 bg-white rounded-2xl flex-row  justify-between px-6 py-4 mt-4`}
      >
        <View style={tw`my-4 gap-2`}>
          <View
            style={tw`w-16 h-16 rounded-full justify-center items-center border border-primary`}
          >
            <SvgXml xml={IconBalance} />
          </View>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Total earnings
          </Text>
          <Text style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}>
            ₦ 100,000
          </Text>
        </View>
        <View style={tw`w-44`}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "This week" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View>

      {/* -------------------- status ------------------------ */}
      <View style={tw`gap-4 mt-8`}>
        <View
          style={tw`relative flex-row gap-4 bg-primary h-20 items-center px-4 rounded-2xl`}
        >
          <SvgXml xml={IconSettingWhite} />
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              New order:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-3xl text-white`}
            >
              10
            </Text>
          </View>
          <View style={tw`absolute -top-2 right-1`}>
            <Image source={ImgNew} />
          </View>
        </View>

        <View
          style={tw`relative flex-row gap-4 bg-violet h-20 items-center px-4 rounded-2xl`}
        >
          <SvgXml xml={IconSettingWhite} />
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              Pending order:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-3xl text-white`}
            >
              10
            </Text>
          </View>
          <View style={tw`absolute -top-2 right-1`}>
            <Image source={ImgPending} />
          </View>
        </View>

        <View
          style={tw`relative flex-row gap-4 bg-success600 h-20 items-center px-4 rounded-2xl`}
        >
          <SvgXml xml={IconSettingWhite} />
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              Completed order:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-3xl text-white`}
            >
              10
            </Text>
          </View>
          <View style={tw`absolute -top-2 right-1`}>
            <Image source={ImgComplete} />
          </View>
        </View>
      </View>

      {/* -------------Recent orders--------------- */}

      <ShortDataTitle
        FastTitle="Recent orders"
        IconTitle="See all"
        Icon={IconRightArrowCornerPrimaryColor}
        SeeMorePathPress={() =>
          router.push("/service_provider/individual/(Tabs)/order")
        }
      />

      <View style={tw`gap-3 mt-4`}>
        {[1, 2, 3, 4].map((index) => {
          return (
            <Pressable
              onPress={() =>
                router.push(
                  "/service_provider/individual/order_details_profile"
                )
              }
              style={tw`h-32 px-5 rounded-2xl bg-white flex-row justify-between items-center`}
              key={index}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Image
                  style={tw`w-16 h-16 rounded-full `}
                  source={ImgProfileImg}
                />
                <View style={tw`gap-1.5`}>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Text>Profile Name</Text>
                    <SvgXml xml={IconProfileBadge} />
                  </View>
                  <Text>Service title goes here</Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconDate} />
                    <Text>Mon, June 2</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={tw`w-12 h-12 rounded-2xl border border-primary justify-center items-center `}
              >
                <SvgXml xml={IconRightArrowCornerPrimaryColor} />
              </TouchableOpacity>
            </Pressable>
          );
        })}
      </View>

      {/* ------------------------ Recent transactions ----------------- */}
      <View style={tw`mt-4`}>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          Recent transactions
        </Text>
        <View style={tw`gap-6 my-4`}>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => {
            return (
              <View
                key={index}
                style={tw`flex-row items-center justify-between`}
              >
                <View style={tw`flex-row items-center gap-4`}>
                  <SvgXml xml={IconRightArrowCornerPrimaryColor} />
                  <View>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                    >
                      Service title goes here
                    </Text>
                    <View style={tw`flex-row gap-2 items-center `}>
                      <Text
                        style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
                      >
                        Jhon Doe
                      </Text>
                      <SvgXml xml={IconProfileBadge} />
                    </View>
                  </View>
                </View>

                <Text
                  style={tw`font-DegularDisplayDemoMedium text-primary  text-2xl `}
                >
                  ₦200.00
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Individual_Service_Provider_Index;

// ------------ dropdown Style --------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 350,
    maxHeight: 400,
    borderRadius: 30,
  },
});
