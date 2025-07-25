import {
  IconCardProfile,
  IconLocation,
  IconMailYellow,
  IconPhoneYellow,
  IconProfileBadge,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Order_Details_Profile = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"New order"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
      />

      <View
        style={tw`bg-white h-56 rounded-xl justify-center items-center gap-2`}
      >
        <Image style={tw`w-24 h-24 rounded-full `} source={ImgProfileImg} />
        <View style={tw`flex-row items-center gap-2`}>
          <Text>Profile Name</Text>
          <SvgXml xml={IconProfileBadge} />
        </View>
      </View>

      {/* ------------------- user datails --------------- */}
      <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm gap-3 my-4`}>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          Booking details
        </Text>

        <View style={tw`flex-row gap-3 items-center`}>
          <SvgXml xml={IconCardProfile} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Abid Hasan
          </Text>
        </View>

        <View style={tw`flex-row gap-3 items-center`}>
          <SvgXml xml={IconMailYellow} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            example@gmail.com
          </Text>
        </View>

        <View style={tw`flex-row gap-3 items-center`}>
          <SvgXml xml={IconPhoneYellow} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            +65982365458
          </Text>
        </View>

        <View style={tw`flex-row gap-3 items-center`}>
          <SvgXml xml={IconLocation} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Location 1
          </Text>
        </View>
      </View>

      {/*  --------------------- Booking Details */}
      <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm gap-2 my-4`}>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          Booking details
        </Text>
        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            Date:
          </Text>
          <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
            05-02-2025
          </Text>
        </View>

        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            Booking Type:
          </Text>
          <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
            Single
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            Time selection:
          </Text>
          <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
            One time
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center `}>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            Time slot:
          </Text>
          <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
            02:00 PM - 04:00 PM
          </Text>
        </View>
      </View>

      {/*======================== Service Details ============ */}
      <View style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
        <Text style={tw`font-bold text-lg mb-2`}>Service title goes here.</Text>

        <View style={tw`ml-2 gap-2`}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            • Dusting of all surfaces
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            • Sweeping and mopping floors
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            • Trash removal
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            • Bathroom wipe-down
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            • Kitchen surface wipe-down
          </Text>
        </View>

        {/* Cost Section */}
        <View
          style={tw`bg-primary w-full h-14 rounded-full flex-row justify-between items-center px-4 my-2`}
        >
          <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
            Cost:{" "}
          </Text>
          <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
            {" "}
            ₦ 49.00
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          style={tw`flex-1 bg-red-500 py-4 rounded-full items-center mr-2`}
        >
          <Text style={tw`text-white font-DegularDisplayDemoMedium text-2xl `}>
            Reject
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 bg-success600 py-4 rounded-full items-center ml-2`}
        >
          <Text style={tw`text-white font-DegularDisplayDemoMedium text-2xl`}>
            Approve
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Order_Details_Profile;
