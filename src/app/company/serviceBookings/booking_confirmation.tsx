import {
  IconCardProfile,
  IconCross,
  IconEditPen,
  IconLocation,
  IconMailYellow,
  IconPhoneYellow,
  IconPlusYellow,
  IconRightArrow,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Booking_Confirmation = () => {
  const [editInfoModalVisible, setEditInfoModalVisible] =
    useState<boolean>(false);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
      contentContainerStyle={tw`pb-8 justify-between flex-grow`}
    >
      <View style={tw``}>
        <BackTitleButton
          pageName={"Booking confirmation"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />

        {/*  ---------- single item  ------------  */}

        <Pressable
          //   onPress={() => router.push("/company/serviceDetails")}
          style={tw`flex-row justify-between items-center rounded-xl bg-white mt-2 p-1.5`}
        >
          <View style={tw`flex-row gap-3 items-center`}>
            <Image style={tw`w-20 h-20 rounded-2xl`} source={ImgProfileImg} />
            <View>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Room cleaning
              </Text>

              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
              >
                Est. time : 30 mins
              </Text>
            </View>
          </View>

          <View style={tw`justify-between gap-3`}>
            <Text
              style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
            >
              ₦ 49.00
            </Text>
            <View
              style={[
                tw`bg-primary -mr-2 -mb-4 w-20 h-9 justify-center items-center`,
                { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
              ]}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-white`}
              >
                Cleaning
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={tw`flex-row items-center justify-end my-4`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-secondary `}
          >
            See package details
          </Text>
        </View>

        {/* ============== personal info ---------------------------------------- */}

        <View style={tw`bg-white rounded-2xl px-7 py-5`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
            >
              Personal details
            </Text>
            <TouchableOpacity onPress={() => setEditInfoModalVisible(true)}>
              <SvgXml xml={IconEditPen} />
            </TouchableOpacity>
          </View>

          <View style={tw` mt-7 gap-3`}>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconCardProfile} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                Madhob Mozumder
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconMailYellow} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                example@gmail.com
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconPhoneYellow} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                +65982365458
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconLocation} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                Location 1
              </Text>
            </View>
          </View>
        </View>

        {/*  -------------- booking details -------------------  */}

        <View style={tw`bg-white rounded-2xl px-7 py-5 mt-3`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
            >
              Booking details
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/company/serviceBookings/serviceBooking",
                  params: { cameFromEdit: "true" },
                })
              }
            >
              <SvgXml xml={IconEditPen} />
            </TouchableOpacity>
          </View>

          <View style={tw`mt-7 gap-3`}>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Time selection:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                Scheduled
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Booking Type:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                Scheduled
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Date:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                05-02-2025
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Time slot:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                02:00 PM - 04:00 PM
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/company/(Tabs)/services")}
          style={tw`flex-row justify-end items-center gap-2 mt-6`}
        >
          <SvgXml xml={IconPlusYellow} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}>
            Add more service
          </Text>
        </TouchableOpacity>
      </View>
      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => router.push("/company/serviceBookings/make_payment")}
        titleProps="Next  3/4"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />

      {/* =================== edit user info  details modal ===================== */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          setEditInfoModalVisible(!editInfoModalVisible);
        }}
        visible={editInfoModalVisible}
        onDismiss={() => setEditInfoModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setEditInfoModalVisible(false);
          }}
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
                Service details
              </Text>
              <TouchableOpacity
                onPress={() => setEditInfoModalVisible(false)}
                style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
              >
                <SvgXml xml={IconCross} />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-20 px-5 flex-grow justify-between `}
            >
              <View style={tw`my-4 gap-3`}>
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-base text-black ml-2`}
                  >
                    Name
                  </Text>
                  <TextInput
                    defaultValue="Jon doe"
                    style={tw`border border-gray-300 h-12 rounded-full px-4`}
                  />
                </View>

                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-base text-black ml-2`}
                  >
                    Email
                  </Text>
                  <TextInput
                    defaultValue="example@gmail.com"
                    keyboardType="email-address"
                    style={tw`border border-gray-300 h-12 rounded-full px-4`}
                  />
                </View>

                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-base text-black ml-2`}
                  >
                    Contact Number
                  </Text>
                  <TextInput
                    defaultValue="+2156985632"
                    style={tw`border border-gray-300 h-12 rounded-full px-4`}
                  />
                </View>

                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-base text-black ml-2`}
                  >
                    Location
                  </Text>
                  <TextInput
                    defaultValue="Location"
                    style={tw`border border-gray-300 h-12 rounded-full px-4`}
                  />
                </View>
              </View>

              <PrimaryButton titleProps="Save" />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Booking_Confirmation;
