import {
  IconCross,
  IconExtension,
  IconKYC,
  IconProfileBadge,
  IconRequestList,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const NotificationIndex = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
    >
      <BackTitleButton
        pageName={"Notifications"}
        onPress={() => router.back()}
      />

      <View style={tw`flex-1 gap-3`}>
        {/* ------------------ notification item ----------------------- */}
        <Pressable
          style={tw`flex-row  items-center gap-5 bg-white rounded-3xl h-36 px-5 relative shadow-md`}
        >
          <View
            style={tw`w-16 h-16 rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
          >
            <SvgXml xml={IconRequestList} />
          </View>
          <View>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-success600  text-2xl mb-2`}
            >
              Request approved
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
              >
                Jone don
              </Text>
              <SvgXml xml={IconProfileBadge} />
            </View>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}
            >
              Today 10.00 AM
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}
            >
              Tap to see details
            </Text>
          </View>
          <View
            style={[
              tw`bg-primary absolute  bottom-0 right-0 w-20 h-9 justify-center items-center`,
              { borderTopLeftRadius: 12, borderBottomRightRadius: 12 },
            ]}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-base text-white`}
            >
              Cleaning
            </Text>
          </View>
        </Pressable>

        {/* ===================================================================== */}

        <Pressable
          style={tw`flex-row  items-center gap-5 bg-white rounded-3xl h-36 px-5  shadow-md`}
        >
          <View
            style={tw`w-16 h-16 rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
          >
            <SvgXml xml={IconKYC} />
          </View>
          <View style={tw`flex-1`}>
            <Text
              numberOfLines={3}
              style={tw`font-DegularDisplayDemoMedium text-violet  text-xl`}
            >
              Complete your KYC to access all the features.
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}
            >
              Tap to continue
            </Text>
          </View>
        </Pressable>

        {/* ===================================================================== */}

        <Pressable
          style={tw`flex-row  items-center gap-5 bg-white rounded-3xl h-36 px-5 relative shadow-md`}
        >
          <View
            style={tw`w-16 h-16 rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
          >
            <SvgXml xml={IconExtension} />
          </View>
          <View style={tw`flex-1`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-violet  text-xl `}
            >
              Request for delivery time extension.
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
              >
                Jone don
              </Text>
              <SvgXml xml={IconProfileBadge} />
            </View>

            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}
            >
              Tap to see details
            </Text>
          </View>
          <View
            style={[
              tw`bg-primary absolute  bottom-0 right-0 w-20 h-9 justify-center items-center`,
              { borderTopLeftRadius: 12, borderBottomRightRadius: 12 },
            ]}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-base text-white`}
            >
              Cleaning
            </Text>
          </View>
        </Pressable>

        {/* ===================================================================== */}

        <Pressable
          style={tw`flex-row  items-center gap-5 bg-white rounded-3xl h-36 px-5 relative shadow-md`}
        >
          <View
            style={tw` rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
          >
            <Image
              style={tw`w-16 h-16 rounded-full`}
              source={{
                uri: "https://i.ibb.co/ccJz4bbP/abc71fad0a0aeda5d1ea54f229be04ed43bac43b.jpg",
              }}
            />
          </View>
          <View style={tw`flex-1`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-violet  text-xl `}
            >
              Requested for delivery
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
              >
                Jone don
              </Text>
              <SvgXml xml={IconProfileBadge} />
            </View>

            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}
            >
              Tap to see details
            </Text>
          </View>
          <View
            style={[
              tw`bg-primary absolute  bottom-0 right-0 w-20 h-9 justify-center items-center`,
              { borderTopLeftRadius: 12, borderBottomRightRadius: 12 },
            ]}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-base text-white`}
            >
              Cleaning
            </Text>
          </View>
        </Pressable>

        {/* ===================================================================== */}

        <Pressable
          style={tw`flex-row  items-center gap-5 bg-white rounded-3xl h-36 px-5  shadow-md`}
        >
          <View
            style={tw`w-16 h-16  rounded-full border-2  border-white shadow-xl shadow-slate-900 bg-base_color justify-center items-center`}
          >
            <SvgXml xml={IconCross} />
          </View>
          <View style={tw`flex-1`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-danger600  text-xl `}
            >
              Booking cancelled
            </Text>

            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-gray-700`}
            >
              Tap to view the reason
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default NotificationIndex;
