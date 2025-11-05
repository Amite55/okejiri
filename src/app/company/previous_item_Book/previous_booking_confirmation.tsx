import {
  IconCardProfile,
  IconCross,
  IconEditPen,
  IconEmailYellow,
  IconLocation,
  IconPhoneYellow,
  IconRightArrow,
  IconTick,
} from "@/assets/icons";
import { ImgCleaning, ImgProfileImg } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { _HEIGHT } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Previous_Booking_Confirmation = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { id } = useLocalSearchParams();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
      contentContainerStyle={tw`pb-8 justify-between flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Booking confirmation"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
        <TouchableOpacity
          // onPress={() =>
          // router.push(
          //   // `/company/previous_item_Book/previous_booking_confirmation/${id}`
          //   `/company/previous_item_Book/previous_booking_confirmation/${id}`
          // )
          // }
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
        </TouchableOpacity>

        {/* ------------------ see service details --------- button  */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={tw`flex-row justify-end items-center py-3 my-2`}
        >
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}>
            See service details
          </Text>
        </TouchableOpacity>

        {/* =============== user info details ================ */}

        <View style={tw`gap-3 `}>
          {/* ---------- user name -------------- */}
          <View
            style={tw`border border-gray-300 w-full h-14 rounded-full flex-row justify-between items-center px-4 gap-2`}
          >
            <SvgXml xml={IconCardProfile} />
            <TextInput defaultValue="Madhab Mozumder" style={tw`flex-1`} />
            <SvgXml xml={IconEditPen} />
          </View>

          {/* --------- user email ------------ */}
          <View
            style={tw`border border-gray-300 w-full h-14 rounded-full flex-row justify-between items-center px-4 gap-2`}
          >
            <SvgXml xml={IconEmailYellow} />
            <TextInput defaultValue="example@gmail.com" style={tw`flex-1`} />
            <SvgXml xml={IconEditPen} />
          </View>

          {/*  ------------- user mobile number ------------ */}
          <View
            style={tw`border border-gray-300 w-full h-14 rounded-full flex-row justify-between items-center px-4 gap-2`}
          >
            <SvgXml xml={IconPhoneYellow} />
            <TextInput defaultValue="0121212121" style={tw`flex-1`} />
            <SvgXml xml={IconEditPen} />
          </View>

          {/*  --------- user location ----------------- */}
          <View
            style={tw`border border-gray-300 w-full h-14 rounded-full flex-row justify-between items-center px-4 gap-2`}
          >
            <SvgXml xml={IconLocation} />
            <TextInput defaultValue="Location 1" style={tw`flex-1`} />
            <SvgXml xml={IconEditPen} />
          </View>
        </View>
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => router.push("/company/serviceBookings/make_payment")}
        titleProps="Reorder  1/2"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />

      {/* =================== see service details modal ===================== */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setModalVisible(false);
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
                onPress={() => setModalVisible(false)}
                style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
              >
                <SvgXml xml={IconCross} />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-20 `}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black text-center my-4`}
              >
                Room cleaning
              </Text>

              <View style={tw`px-4 justify-center items-center`}>
                <Image
                  resizeMode="cover"
                  style={tw`w-full h-52 rounded-2xl`}
                  source={ImgCleaning}
                />
              </View>

              <View style={tw`px-4 ml-3 my-6 gap-3`}>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row items-center gap-3 px-4`}>
                <TouchableOpacity
                  style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                  >
                    ₦ 49.00
                  </Text>
                </TouchableOpacity>
                <Pressable
                  // onPress={() => setTickMark(!tickmark)}
                  style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
                >
                  <SvgXml xml={IconTick} />
                </Pressable>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Previous_Booking_Confirmation;
