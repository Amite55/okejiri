import { IconCross, IconLocation, IconRightArrow } from "@/assets/icons";
import LocationAccessModal from "@/src/Components/LocationAccessModal";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const BillingDetails = () => {
  const [changeLocationModalVisible, setChangeLocationModalVisible] =
    useState<boolean>(false);

  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  return (
    <View style={tw`flex-1 justify-between flex-grow px-5 bg-base_color`}>
      <View>
        <BackTitleButton
          pageName={"Billing details"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
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
              <TextInput
                placeholder="Jone Doe"
                placeholderTextColor={"#535353"}
              />
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
              <TextInput
                placeholder="example@gmail.com"
                placeholderTextColor={"#535353"}
              />
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
              <TextInput
                placeholder="+2156985632"
                placeholderTextColor={"#535353"}
              />
            </View>
          </View>
        </View>

        {/* ---------- location ----------------- */}
        <View style={tw`flex-row justify-between items-center mt-6`}>
          <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
            Your location
          </Text>
          <TouchableOpacity onPress={() => setChangeLocationModalVisible(true)}>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary underline`}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`justify-center p-5 bg-white rounded-xl mt-4`}>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Rampura, Banasree, Block D, Road 8, House 8, Dhaka, Bangladesh.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setLocationModalVisible(true)}
          style={tw`flex-row justify-center items-center gap-3 my-8`}
        >
          <SvgXml xml={IconLocation} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}>
            Use my current location
          </Text>
        </TouchableOpacity>
      </View>

      {/* ------------------------ next button ------------------ */}
      <PrimaryButton
        onPress={() =>
          router.push("/company/serviceBookings/booking_confirmation")
        }
        titleProps="Next  2/4"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />

      {/* =================== edit user info  details modal ===================== */}
      <Modal
        animationType="slide"
        transparent
        // onRequestClose={() => {
        //   setChangeLocationModalVisible(!changeLocationModalVisible);
        // }}
        visible={changeLocationModalVisible}
        // onDismiss={() => setChangeLocationModalVisible(false)}
      >
        <Pressable
          // onPress={() => {
          //   setChangeLocationModalVisible(false);
          // }}
          style={[
            {
              height: _HEIGHT,
            },
            tw`justify-end items-end bg-black bg-opacity-15  `,
          ]}
        >
          <Pressable
            style={[
              {
                height: _HEIGHT * 0.65,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
              tw`bg-gray-50 `,
            ]}
          >
            <View
              style={[
                tw`w-full flex-row justify-between items-center h-14  bg-primary px-4`,
                { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
              ]}
            >
              <Text></Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
              >
                Change address
              </Text>
              <TouchableOpacity
                onPress={() => setChangeLocationModalVisible(false)}
                style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
              >
                <SvgXml xml={IconCross} />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-16 px-5 flex-grow justify-between items-center`}
            >
              <View style={tw``}>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black   my-4`}
                >
                  Type your address here
                </Text>
                <View
                  style={tw`border border-gray-200 bg-white h-60 rounded-2xl `}
                >
                  <TextInput
                    verticalAlign="top"
                    multiline
                    style={tw` p-4`}
                    defaultValue="Rampura, Banasree, Block D, Road 8, House 8, Dhaka, Bangladesh."
                    onChangeText={(i) => console.log(i)}
                  />
                </View>
              </View>

              <PrimaryButton titleProps="Save address" />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ----------------- location access modal view ---------------- */}

      <LocationAccessModal
        setLocationModalVisible={setLocationModalVisible}
        locationModalVisible={locationModalVisible}
        onAllowPress={() => setLocationModalVisible(false)}
        onDenyPress={() => setLocationModalVisible(false)}
      />
    </View>
  );
};

export default BillingDetails;
