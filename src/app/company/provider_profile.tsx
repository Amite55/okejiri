import {
  IconBackLeftArrow,
  IconEmailGray,
  IconFileUpload,
  IconLocationGray,
  IconPhoneGray,
  IconProfileBadge,
  IconStar,
} from "@/assets/icons";
import { ImgCleaning } from "@/assets/images/image";
import ReviewerCard from "@/src/Components/ReviewerCard";
import ServiceCard from "@/src/Components/ServiceCard";
import ProviderProfileSkeleton from "@/src/Components/skeletons/ProviderProfileSkeleton";
import ReportData from "@/src/json/ReportData.json";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useGetProviderReviewsQuery,
  useGetProviderServicesQuery,
  useProviderProfileQuery,
} from "@/src/redux/apiSlices/userProvider/servicesSlices";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Provider_Profile = () => {
  const { provider_id } = useLocalSearchParams();
  const [reportReason, setReportReason] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [reportDetails, setReportDetails] = useState<string>("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleOnDismiss = useCallback(() => {
    // modal close হলে সব state reset হবে
    setReportDetails("");
    setSelectedIndex(null);
    setSelectedReport("");
    setReportReason(false);
  }, []);

  // ============================== api end point ============================1
  const {
    data: getProviderProfileDataDetails,
    isLoading: isProviderProfileDataLoading,
    refetch: refetchProviderProfileData,
  } = useProviderProfileQuery(provider_id);
  const {
    data: getProvidedServicesData,
    isLoading: isProvidedServicesDataLoading,
  } = useGetProviderServicesQuery(getProviderProfileDataDetails?.data?.id);
  const {
    data: getProvidedReviewsData,
    isLoading: isProvidedReviewsDataLoading,
  } = useGetProviderReviewsQuery(getProviderProfileDataDetails?.data?.id);

  if (
    isProviderProfileDataLoading ||
    isProvidedServicesDataLoading ||
    isProvidedReviewsDataLoading
  ) {
    return <ProviderProfileSkeleton />;
  }

  const handleReport = () => {
    try {
      const reportData = {
        booking_id: 1212,
        provider_id: 1212,
        report_reason: selectedReport,
        report_details: reportDetails,
        attachments: [],
      };
      console.log(reportData, "report data to be sent");
    } catch (error) {
      console.log(error, "report not send this provider?");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <GestureHandlerRootView style={tw`flex-1`}>
        <BottomSheetModalProvider>
          <View style={tw`flex-1`}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1  `}
              contentContainerStyle={tw`pb-6  bg-base_color`}
            >
              <BackTitleButton
                pageName={"Provider profile"}
                onPress={() => router.back()}
                titleTextStyle={tw`text-xl`}
                contentStyle={tw`px-4`}
              />

              <View style={tw`relative justify-center items-center mt-2`}>
                <Image style={tw`w-full h-52 `} source={ImgCleaning} />
                <View
                  style={tw`justify-center items-center absolute -bottom-28 `}
                >
                  <Image
                    contentFit="contain"
                    style={tw`w-24 h-24 rounded-full   border-2 border-white`}
                    source={getProviderProfileDataDetails?.data?.avatar}
                  />
                  {/*  profile name ----------- */}
                  <View style={tw`justify-center items-center my-1`}>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-DegularDisplayDemoRegular text-xl`}>
                        {getProviderProfileDataDetails?.data?.name}
                      </Text>
                      {getProviderProfileDataDetails?.data?.kyc_status ===
                        "Verified" && <SvgXml xml={IconProfileBadge} />}
                    </View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-primary text-lg `}
                      >
                        {
                          getProviderProfileDataDetails?.data
                            ?.ratings_avg_rating
                        }
                      </Text>
                      <View style={tw`flex-row items-center gap-2`}>
                        <SvgXml xml={IconStar} />
                      </View>
                      <Text
                        style={tw`font-DegularDisplayDemoMedium text-base text-regularText`}
                      >
                        ({getProviderProfileDataDetails?.data?.ratings_count})
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* ----------------------------- report and message =---------------------- */}

              {/*  ---------- provider details info  ----------------- */}
              <View
                style={tw`border border-gray-300  mx-4 my-5 justify-center h-40 rounded-lg gap-2 p-3 mt-32`}
              >
                <View style={tw`flex-row gap-2 items-center`}>
                  <SvgXml xml={IconEmailGray} />
                  <Text
                    numberOfLines={2}
                    style={tw`flex-1 font-DegularDisplayDemoRegular text-lg text-black`}
                  >
                    {getProviderProfileDataDetails?.data?.email}
                  </Text>
                </View>
                <View style={tw`flex-row gap-3 items-center`}>
                  <SvgXml xml={IconPhoneGray} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                  >
                    {getProviderProfileDataDetails?.data?.phone}
                  </Text>
                </View>
                <View style={tw`flex-row gap-2 items-start`}>
                  <SvgXml xml={IconLocationGray} />
                  <Text
                    style={tw` flex-1 font-DegularDisplayDemoRegular text-base text-black`}
                  >
                    {getProviderProfileDataDetails?.data?.address
                      ? getProviderProfileDataDetails?.data?.address.length > 45
                        ? getProviderProfileDataDetails?.data?.address.slice(
                            0,
                            45
                          ) + "..."
                        : getProviderProfileDataDetails?.data?.address
                      : "N/A"}
                  </Text>
                </View>
              </View>

              <View style={tw`px-5`}>
                {/* =========== provider Service by ================= */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
                >
                  Service By
                </Text>

                <View style={tw`pb-4 pl-6`}>
                  {getProviderProfileDataDetails?.data?.provider_services
                    .length > 0 ? (
                    getProviderProfileDataDetails?.data?.provider_services?.map(
                      (item: any) => {
                        return (
                          <View
                            key={item?.id}
                            style={tw`flex-row gap-2 items-center `}
                          >
                            <View
                              style={tw`w-1.5 h-1.5 rounded-full bg-black`}
                            />
                            <Text
                              style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                            >
                              {item?.service?.name}
                            </Text>
                          </View>
                        );
                      }
                    )
                  ) : (
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                    >
                      No Service by this provider
                    </Text>
                  )}
                </View>

                {/* --------------------- about us --------------------- */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                >
                  About
                </Text>

                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                >
                  {getProviderProfileDataDetails?.data?.about}
                </Text>
              </View>

              {/* ---------------- provider Services =-=---------- */}

              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-6 px-5`}
              >
                Services
              </Text>

              <View style={tw`gap-3 mt-4 px-5`}>
                {getProvidedServicesData?.data?.length > 0 ? (
                  getProvidedServicesData?.data?.map((item: any) => {
                    return (
                      <ServiceCard
                        key={item.id}
                        item={item}
                        index={item.id}
                        onPress={() =>
                          router.push({
                            pathname: "/company/serviceDetails",
                            params: { service_id: item?.id },
                          })
                        }
                      />
                    );
                  })
                ) : (
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                  >
                    No Service by this provider
                  </Text>
                )}
              </View>

              {/* ============================== review profile j================================= */}

              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black px-5 mt-6`}
              >
                Reviews
              </Text>
              <FlatList
                data={getProvidedReviewsData?.data}
                renderItem={(item) => <ReviewerCard item={item} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={tw`mt-3 px-4 gap-3 pb-4 `}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </ScrollView>

            {/* =================== see Report details modal ===================== */}
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            onDismiss={handleOnDismiss}
            snapPoints={["70%"]}
            enableDynamicSizing={false}
            index={0}
            containerStyle={tw`bg-gray-500 bg-opacity-20`}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
              />
            )}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <BottomSheetScrollView>
                <View
                  style={[
                    tw`flex-1 flex-row justify-center items-center h-14  bg-primary px-4`,
                    { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                  ]}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                  >
                    Service details
                  </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {reportReason ? (
                    <View style={tw`px-6 mt-4 `}>
                      {/*  issue details ----------------- */}
                      <View style={tw``}>
                        {/* -------- back button -------- */}
                        <TouchableOpacity
                          onPress={() => setReportReason(false)}
                          style={tw`w-10 h-10 mb-4 border justify-center items-center rounded-full`}
                        >
                          <SvgXml xml={IconBackLeftArrow} />
                        </TouchableOpacity>
                        <TextInput
                          style={[
                            tw`text-black`,
                            {
                              borderWidth: 1,
                              borderColor: "gray",
                              paddingVertical: 18,
                              paddingHorizontal: 20,

                              minHeight: 200,
                              maxHeight: 400,
                              borderRadius: 30,
                            },
                          ]}
                          multiline={true}
                          numberOfLines={4}
                          placeholder="Describe your issue..."
                          onChangeText={(newText) => setReportDetails(newText)}
                          // value={}
                          textAlignVertical="top"
                        />

                        <View
                          style={tw`flex-row justify-end items-center py-1`}
                        >
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
                            onPress={() => handleCloseModalPress()}
                          >
                            <Text
                              style={tw`font-DegularDisplayDemoRegular text-2xl text-black p-2`}
                            >
                              Cancel
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={tw`p-2`}
                            onPress={() => handleReport()}
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
                    <View style={tw`flex-1 px-6`}>
                      <View style={tw` gap-3 mt-6`}>
                        {ReportData.map((item, index) => (
                          <Pressable
                            onPress={() => {
                              setSelectedIndex(index);
                              setSelectedReport(item.reportName);
                            }}
                            key={item.id}
                            style={tw`flex-row gap-3 items-center rounded-none`}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedIndex(index);
                                setSelectedReport(item.reportName);
                              }}
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
                      </View>

                      {/*  ----------- next button -------------- */}
                      <View style={tw`flex-row justify-end items-center gap-6`}>
                        <TouchableOpacity
                          onPress={() => handleCloseModalPress()}
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
              </BottomSheetScrollView>
            </TouchableWithoutFeedback>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

export default Provider_Profile;
