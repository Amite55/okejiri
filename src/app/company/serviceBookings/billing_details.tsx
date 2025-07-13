import { IconLocation, IconRightArrow } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";

const BillingDetails = () => {
  return (
    <View style={tw`flex-1 justify-between flex-grow px-5 bg-base_color`}>
      <View>
        <BackTitleButton
          pageName={"Billing details"}
          onPress={() => router.back()}
        />
        {/* [=================== user info form =================] */}
        <View style={tw`gap-4 mt-4`}>
          {/* ------------ name --------------- */}
          <View style={tw`gap-2`}>
            <Text style={tw`font-PoppinsMedium text-base text-black ml-2`}>
              Your full name
            </Text>
            <View
              style={tw`border border-gray-300 justify-center  w-full rounded-full h-14 px-4 `}
            >
              <TextInput placeholder="Jone Doe" />
            </View>
          </View>

          {/* -------------- email ---------------- */}
          <View style={tw`gap-2`}>
            <Text style={tw`font-PoppinsMedium text-base text-black ml-2`}>
              Email
            </Text>
            <View
              style={tw`border border-gray-300 justify-center  w-full rounded-full h-14 px-4 `}
            >
              <TextInput placeholder="example@gmail.com" />
            </View>
          </View>

          {/* ------------ contact number ================== */}
          <View style={tw`gap-2`}>
            <Text style={tw`font-PoppinsMedium text-base text-black ml-2`}>
              Contact Number
            </Text>
            <View
              style={tw`border border-gray-300 justify-center  w-full rounded-full h-14 px-4 `}
            >
              <TextInput placeholder="+2156985632" />
            </View>
          </View>
        </View>

        {/* ---------- location ----------------- */}
        <View style={tw`flex-row justify-between items-center mt-6`}>
          <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
            Your location
          </Text>
          <Pressable>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary underline`}
            >
              Change
            </Text>
          </Pressable>
        </View>

        <View style={tw`justify-center p-5 bg-white rounded-xl mt-4`}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Rampura, Banasree, Block D, Road 8, House 8, Dhaka, Bangladesh.
          </Text>
        </View>

        <Pressable style={tw`flex-row justify-center items-center gap-3 my-8`}>
          <SvgXml xml={IconLocation} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}>
            Use my current location
          </Text>
        </Pressable>
      </View>

      {/* ------------------------ next button ------------------ */}
      <PrimaryButton
        // onPress={() => router.push("/company/serviceBookings/billing_details")}
        titleProps="Next  2/4"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />
    </View>
  );
};

export default BillingDetails;
