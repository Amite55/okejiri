import {
  IconBookingConfirm,
  IconCross,
  IconFileUpload,
  IconIconCross,
  IconMessageWhite,
  IconOrderCancel,
  IconProfileBadge,
  IconReportBlack,
  IconReportBlue,
  IconStar,
  IconTick,
} from "@/assets/icons";
import {
  ImgCleaning,
  ImgMyBookingBanner,
  ImgOrderPending,
  ImgProfileImg,
} from "@/assets/images/image";
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

const reportingItem = [
  {
    id: 1,
    reportName: "Sexual content",
  },
  {
    id: 2,
    reportName: "Violent or repulsive content",
  },
  {
    id: 3,
    reportName: "Hateful or abusive content",
  },
  {
    id: 4,
    reportName: "Harassment or bullying",
  },
  {
    id: 5,
    reportName: "Harmful or dangerous acts",
  },
  {
    id: 6,
    reportName: "Misinformation",
  },
  {
    id: 7,
    reportName: "Child abuse",
  },
  {
    id: 8,
    reportName: "Promotes terrorism",
  },
  {
    id: 9,
    reportName: "Spam or misleading",
  },
  {
    id: 11,
    reportName: "Legal issue",
  },
  {
    id: 12,
    reportName: "Captions issue",
  },
];

const My_Booking = () => {
  const params = useLocalSearchParams();
  console.log(
    params.status,
    "this is search params ----------------------> my booking screen "
  );
  const [ReportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [cancelModalVisible, setCancelModalVisible] = useState<boolean>(false);
  const [serviceDetailsModalVisible, setServiceDetailsModalVisible] =
    useState<boolean>(false);
  const [reportReason, setReportReason] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color  `}
      contentContainerStyle={tw`pb-6`}
    >
      {/* ----------------- banner ------------------- */}
      <View style={tw`relative`}>
        <Image
          resizeMode="cover"
          style={tw`w-full h-36`}
          source={ImgMyBookingBanner}
        />

        <BackTitleButton
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
          contentStyle={tw`absolute top-0 px-4`}
        />
      </View>

      {/* ------------------------- service provider profile -------------------- */}

      <View style={tw`flex-row justify-between items-center px-5 my-6 flex-1`}>
        <TouchableOpacity
          onPress={() => router.push("/company/provider_profile")}
          style={tw`flex-1 flex-row items-center gap-3`}
        >
          <Image style={tw`w-11 h-11 rounded-full`} source={ImgProfileImg} />
          <View>
            <View style={tw`flex-row gap-2 items-center`}>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Profile name
              </Text>
              <SvgXml xml={IconProfileBadge} />
            </View>
            <View style={tw`flex-row items-center gap-1`}>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-primary text-xl`}
              >
                5.0
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconStar} />
              </View>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
              >
                (500)
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-primary`}>
          ₦50.00
        </Text>
      </View>

      {/* -------------------- if user booking is pending show down the component ------------------- */}
      {params.status === "booking_request_pending" && (
        <View>
          <View style={tw`gap-2 px-5 my-4`}>
            {[1, 2, 3].map((item, index) => (
              <Pressable
                key={index}
                style={tw`flex-row justify-between items-center  px-4 py-3 rounded-2xl bg-white`}
              >
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                  >
                    House cleaning
                  </Text>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                  >
                    ₦ 49.00
                  </Text>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-lg text-regularText`}
                  >
                    Est. time : 30 mins
                  </Text>
                </View>

                <View style={tw`flex-row items-center gap-4`}>
                  <TouchableOpacity
                    onPress={() => setServiceDetailsModalVisible(true)}
                    style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
                  >
                    <Text style={tw``}>See details</Text>
                  </TouchableOpacity>

                  <View
                    style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
                  >
                    <SvgXml xml={IconTick} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          <View style={tw`justify-center items-center`}>
            <Image style={tw`w-36 h-36`} source={ImgOrderPending} />
          </View>
          <Text
            style={tw`flex-1 font-DegularDisplayDemoMedium text-2xl text-black text-center px-5 my-3`}
          >
            Service provider hasn’t responded yet
          </Text>

          <View style={tw`px-5 gap-3`}>
            <PrimaryButton
              titleProps="Cancel order"
              IconFastProps={IconIconCross}
              contentStyle={tw`bg-transparent border border-primary`}
              textStyle={tw`text-primary `}
              onPress={() => setCancelModalVisible(true)}
            />
            <PrimaryButton
              titleProps="Report provider"
              IconFastProps={IconReportBlack}
              contentStyle={tw`bg-transparent border border-primary`}
              textStyle={tw`text-black `}
              onPress={() => setReportModalVisible(true)}
            />
          </View>
        </View>
      )}

      {/*  ---------------------- if user booking request accepted service provider end to show this component ----------- */}

      {params.status === "booking_request_approved" && (
        <View style={tw`px-5`}>
          <TouchableOpacity
            onPress={() => router.push("/company/serviceDetails")}
          >
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary text-center`}
            >
              See service details
            </Text>
          </TouchableOpacity>

          {/*  confirm icon */}

          <View style={tw`justify-center items-center mt-6`}>
            <SvgXml xml={IconBookingConfirm} />
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              Order confirmed
            </Text>
          </View>

          <View style={tw`my-4 gap-3`}>
            <PrimaryButton
              IconFastProps={IconMessageWhite}
              titleProps="Message"
              onPress={() => router.push("/company/messaging")}
            />
            <PrimaryButton
              IconFastProps={IconReportBlue}
              titleProps="Report provider"
              textStyle={tw`text-blue-700`}
              contentStyle={tw` border border-blue-400 bg-transparent`}
              onPress={() => setReportModalVisible(true)}
            />
          </View>
        </View>
      )}

      {/* =================== see Report details modal ===================== */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          setReportModalVisible(!ReportModalVisible);
        }}
        visible={ReportModalVisible}
        onDismiss={() => setReportModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setReportModalVisible(false);
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
                Report provider
              </Text>
              <TouchableOpacity
                onPress={() => setReportModalVisible(false)}
                style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
              >
                <SvgXml xml={IconCross} />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-20 flex-1 bg-base_color`}
            >
              {reportReason ? (
                <View style={tw`px-6 mt-6 flex-1`}>
                  {/*  issue details ----------------- */}
                  <View style={tw``}>
                    <TextInput
                      style={[
                        tw`text-black`,
                        {
                          borderWidth: 1,
                          borderColor: "gray",
                          paddingVertical: 18,
                          paddingHorizontal: 20,
                          minHeight: 280,
                          maxHeight: 400,
                          borderRadius: 30,
                        },
                      ]}
                      multiline={true}
                      numberOfLines={4}
                      placeholder="Describe your issue..."
                      onChangeText={(newText) => console.log(newText)}
                      // value={}
                      textAlignVertical="top"
                    />

                    <View style={tw`flex-row justify-end items-center my-1`}>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                      >
                        1/1000
                      </Text>
                    </View>

                    {/*  ------------ file uplod ----------------- */}
                    <View
                      style={tw`h-12 rounded-xl border justify-center items-center border-gray-300`}
                    >
                      <TouchableOpacity
                        style={tw`flex-row items-center justify-center gap-3`}
                      >
                        <SvgXml xml={IconFileUpload} />
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                        >
                          Upload files
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/*  ----------- next button -------------- */}

                    <View
                      style={tw`flex-row justify-end items-center gap-6 mt-6`}
                    >
                      <TouchableOpacity
                        onPress={() => setReportModalVisible(false)}
                      >
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-2xl text-black p-2`}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={tw`p-2`}
                        // onPress={() => setReportReason(true)}
                      >
                        <Text
                          style={tw`font-DegularDisplayDemoMedium text-primary text-2xl `}
                        >
                          Report
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                // --------------------------------  selected reason text-----------------
                <View style={tw`px-6 gap-3 mt-6`}>
                  {reportingItem.map((item, index) => (
                    <Pressable
                      onPress={() => setSelectedIndex(index)}
                      key={item.id}
                      style={tw`flex-row gap-3 items-center rounded-none`}
                    >
                      <TouchableOpacity
                        onPress={() => setSelectedIndex(index)}
                        style={tw.style(
                          `border w-5 h-5  justify-center items-center rounded-full`,
                          selectedIndex === index
                            ? `bg-primary border-white`
                            : `bg-transparent`
                        )}
                      ></TouchableOpacity>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                      >
                        {item.reportName}
                      </Text>
                    </Pressable>
                  ))}

                  {/*  ----------- next button -------------- */}

                  <View style={tw`flex-row justify-end items-center gap-6`}>
                    <TouchableOpacity
                      onPress={() => setReportModalVisible(false)}
                    >
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-2xl text-black p-2`}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    {selectedIndex ? (
                      <TouchableOpacity
                        style={tw`p-2`}
                        onPress={() => setReportReason(true)}
                      >
                        <Text
                          style={tw`font-DegularDisplayDemoMedium text-primary text-2xl `}
                        >
                          Next
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text
                        style={tw`font-DegularDisplayDemoMedium text-regularText text-2xl p-2`}
                      >
                        Next
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ------------------------------- cancel modal ---------------------------------- */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          setCancelModalVisible(!cancelModalVisible);
        }}
        visible={cancelModalVisible}
        onDismiss={() => setCancelModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setCancelModalVisible(false);
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
                height: _HEIGHT * 0.45,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
              tw`bg-gray-50 `,
            ]}
          >
            <View
              style={[
                tw`w-full flex-row justify-between items-center h-14  bg-redDeep px-4`,
                { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
              ]}
            >
              <Text></Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
              >
                Cancel order
              </Text>
              <TouchableOpacity
                onPress={() => setCancelModalVisible(false)}
                style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
              >
                <SvgXml xml={IconCross} />
              </TouchableOpacity>
            </View>
            <View style={tw`pb-20 flex-1 bg-base_color`}>
              <View style={tw`justify-center items-center my-6`}>
                <SvgXml xml={IconOrderCancel} />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black text-center`}
                >
                  You are going to cancel this order
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-regularText text-center mt-3`}
                >
                  After canceling you cannon find this service on bookings page.
                  For reorder you have to book this service from beginning.
                </Text>
              </View>

              {/*  --------- button ---------- */}

              <View
                style={tw` px-5 flex-1 flex-row justify-between items-center gap-4`}
              >
                <TouchableOpacity
                  style={tw`flex-1 border border-gray-300  h-14 rounded-full justify-center items-center`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`flex-1 border border-gray-300 bg-redDeep h-14 rounded-full justify-center items-center`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                  >
                    Yes, confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* =================== see service details modal ===================== */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          setServiceDetailsModalVisible(!serviceDetailsModalVisible);
        }}
        visible={serviceDetailsModalVisible}
        onDismiss={() => setServiceDetailsModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setServiceDetailsModalVisible(false);
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
                onPress={() => setServiceDetailsModalVisible(false)}
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
                  disabled
                  style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                  >
                    ₦ 49.00
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled
                  style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
                >
                  <SvgXml xml={IconTick} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default My_Booking;
