import {
  IconChatsYellow,
  IconCopy,
  IconCross,
  IconCrossSolidRed,
  IconDisputes,
  IconOrderCancelModalIcon,
  IconPhoneGray,
  IconPlus,
  IconProfileBadge,
  IconReportBlack,
  IconStar,
  IconTick,
} from "@/assets/icons";
import LogoutModal from "@/src/Components/LogoutModal";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ReportData from "@/src/json/ReportData.json";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useOrderCancelMutation,
  useOrderDetailsQuery,
  useReportProviderMutation,
} from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import { PrimaryColor } from "@/utils/utils";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ReportBottomSheet } from "@/src/Components/ReportBottomSheet";
import NotificationSkeleton from "@/src/Components/skeletons/NotificationSkeleton";
import {
  useDeleteCartItemMutation,
  useGetCartItemQuery,
  useStoreDeleteCartItemMutation,
} from "@/src/redux/apiSlices/userProvider/cartSlices";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Booking_Service_Details = () => {
  const [cancelModalVisible, setCancelModalVisible] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [reportReason, setReportReason] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [reportDetails, setReportDetails] = useState<string>("");
  const [addToCartState, setAddToCartState] = useState<any>([]);
  const [loadingState, setLoadingState] = useState<number | null>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const { id } = useLocalSearchParams();
  const reportSheetRef = useRef<BottomSheetModal>(null);
  const deliveryModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    reportSheetRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    reportSheetRef.current?.dismiss();
  }, []);
  const handleOnDismiss = useCallback(() => {
    setReportDetails("");
    setSelectedReport("");
    setReportReason(false);
    setImages(null);
  }, []);

  // ---------------- api end point ----------------
  const {
    data: OrderDetailsData,
    isLoading: isOrderDetailsLoading,
    refetch,
  } = useOrderDetailsQuery(id, { skip: !id });

  const [cancelOrder] = useOrderCancelMutation();
  const [reportProvider, { isLoading: isReportLoading }] =
    useReportProviderMutation();
  const [deleteCartResponse] = useDeleteCartItemMutation();
  const { data: getAddToCartItem } = useGetCartItemQuery({});
  const [cartResponse] = useStoreDeleteCartItemMutation();

  // [================= handel report =================]
  const handleReport = async () => {
    if (!images?.length || !reportDetails) {
      router.push({
        pathname: `/Toaster`,
        params: { res: "Please fill all the fields" },
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("booking_id", OrderDetailsData?.data?.id);
      formData.append("provider_id", OrderDetailsData?.data?.provider?.id);
      formData.append("report_reason", selectedReport);
      formData.append("report_details", reportDetails);
      images.forEach((uri, index) => {
        formData.append("attachments[]", {
          uri,
          name: `attachment_${index}.jpg`,
          type: "image/jpeg",
        });
      });
      const response = await reportProvider(formData).unwrap();
      if (response) {
        handleOnDismiss();
        router.push({
          pathname: `/Toaster`,
          params: { res: response?.message || "Report sent successfully!" },
        });
      }
      handleCloseModalPress();
    } catch (error: any) {
      console.log(error, " report not sent to provider");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Failed to send report" },
      });
    }
  };

  // -------------------- cancel order function ----------------
  const handleCancelOrder = async () => {
    try {
      setCancelModalVisible(false);
      const res = await cancelOrder(id).unwrap();
      if (res) {
        router.push({
          pathname: "/Toaster",
          params: { res: res?.message || "Order Cancelled" },
        });
        setTimeout(() => {
          router.back();
        }, 1500);
      }
    } catch (error) {
      console.log(error, "this ___________________");
    }
  };
  // ================== delete all added item to render this screen ------------
  useEffect(() => {
    const readFunc = async () => {
      try {
        setAddToCartState([]);
        await deleteCartResponse({}).unwrap();
      } catch (error) {
        console.log(error, "not Delete all item !");
      }
    };
    readFunc();
  }, []);
  // -------------- sum price of add to cart ------------
  const cartReducePrice = getAddToCartItem?.data.reduce(
    (total: number, item: any) => total + Number(item?.package?.price || 0),
    0,
  );
  // --------------------------- add to cart function delete and add this same function use for add to cart   ----------------
  const handleDeleteStoreCartItem = async (packageId: number) => {
    try {
      setLoadingState(packageId);
      const response = await cartResponse({ package_id: packageId }).unwrap();
      if (response) {
        if (
          addToCartState?.some(
            (cartItem: { package_id: number }) =>
              cartItem?.package_id === packageId,
          )
        ) {
          setAddToCartState(
            addToCartState.filter(
              (cartItem: { package_id: number }) =>
                cartItem?.package_id !== packageId,
            ),
          );
        } else {
          setAddToCartState([...addToCartState, { package_id: packageId }]);
        }
        router.push({
          pathname: `/Toaster`,
          params: { res: response?.message || response },
        });
      }
    } catch (error: any) {
      console.log(error, "Delete Add to cart Warring !");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    } finally {
      setLoadingState(null);
    }
  };
  // ====================== picked report image from gallery =======================
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setImages(result.assets.map((item) => item.uri));
    }
  };
  // ---------------- check order time -----------------
  const thirtyMinutesInMs = 30 * 60 * 1000;
  const createdTimeMs = new Date(OrderDetailsData?.data?.created_at).getTime();
  const currentTimeMs = new Date().getTime();
  const timeDifferenceMs = currentTimeMs - createdTimeMs;

  // [----------------- refresh function ----------------]
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([refetch, OrderDetailsData]);
    } catch (error) {
      console.log(error, "refresh error");
    } finally {
      setRefreshing(false);
    }
  };
  // ===================== if is loading =====================
  if (isOrderDetailsLoading) {
    return <NotificationSkeleton />;
  }

  // ==================== handle reorder function ====================
  const handleBooking = async () => {
    const bookingData = {
      provider_id: OrderDetailsData?.data?.provider_id,
      booking_process:
        OrderDetailsData?.data?.booking_process === "instant"
          ? "Instant booking"
          : "Schedule booking",
      booking_type:
        OrderDetailsData?.data?.booking_type === "single" ? "Single" : "Group",
      price: cartReducePrice,
      ...(OrderDetailsData?.data?.booking_process === "schedule" && {
        schedule_date: OrderDetailsData?.data?.schedule_date,
        schedule_time_slot: OrderDetailsData?.data?.schedule_time_slot,
      }),
      ...(OrderDetailsData?.data?.booking_type === "group" && {
        number_of_people: OrderDetailsData?.data?.number_of_people,
      }),
    };
    try {
      // ========== navigate to next route ============== with come to edit check
      if (bookingData) {
        router.push({
          pathname: "/company/serviceBookings/billing_details",
          params: { bookingDetails: JSON.stringify(bookingData) },
        });
      }
    } catch (error) {
      console.log(error, "Booking fail --------");
    }
  };
  // ================ handle copy to phone number ===================
  const handleCopyToPhone = async (phone: any) => {
    try {
      await Clipboard.setStringAsync(phone);
      router.push({
        pathname: `/Toaster`,
        params: { res: "Phone number copied to clipboard" },
      });
    } catch (error: any) {
      router.push({
        pathname: `/Toaster`,
        params: {
          res: "Not copied",
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <GestureHandlerRootView style={tw`flex-1`}>
        <BottomSheetModalProvider>
          <View style={tw`flex-1`}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1  bg-base_color`}
              contentContainerStyle={tw`px-5 `}
            >
              <View style={tw``}>
                <BackTitleButton
                  pageName={"Previous services "}
                  onPress={() => router.back()}
                  titleTextStyle={tw`text-xl`}
                />

                {/* [======= provider profile info =======] */}
                <View style={tw`flex-row items-center py-3 gap-3`}>
                  {/* provider info — flex-1 */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/company/provider_profile",
                        params: {
                          provider_id: OrderDetailsData?.data?.provider?.id,
                        },
                      })
                    }
                    activeOpacity={0.8}
                    style={tw`flex-1 flex-row items-center gap-3`}
                  >
                    <Image
                      style={tw`w-12 h-12 rounded-full shrink-0`}
                      source={OrderDetailsData?.data?.provider?.avatar}
                      contentFit="cover"
                    />
                    <View style={tw`flex-1`}>
                      <View style={tw`flex-row gap-1 items-center`}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={tw`flex-1 font-DegularDisplayDemoRegular text-xl text-black`}
                        >
                          {OrderDetailsData?.data?.provider?.name}
                        </Text>
                        {OrderDetailsData?.data?.provider?.kyc_status ===
                          "Verified" && (
                          <SvgXml
                            width={15}
                            height={15}
                            xml={IconProfileBadge}
                          />
                        )}
                      </View>
                      <View
                        style={tw`flex-row items-center gap-1
`}
                      >
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-primary text-lg`}
                        >
                          {OrderDetailsData?.data?.provider?.ratings_avg_rating}
                        </Text>
                        <SvgXml xml={IconStar} />
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                        >
                          ({OrderDetailsData?.data?.provider?.ratings_count})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* message button — shrink-0 */}
                  {OrderDetailsData?.data?.status === "Pending" && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        router.push({
                          pathname: "/company/messaging",
                          params: {
                            receiverId: OrderDetailsData?.data?.provider?.id,
                            receiverName:
                              OrderDetailsData?.data?.provider?.name,
                            receiverImage:
                              OrderDetailsData?.data?.provider?.avatar,
                          },
                        })
                      }
                      style={tw`shrink-0 border border-gray-300 flex-row items-center rounded-2xl gap-2 px-2.5 h-12`}
                    >
                      <SvgXml xml={IconChatsYellow} />
                    </TouchableOpacity>
                  )}
                </View>

                {OrderDetailsData?.data?.status === "Pending" && (
                  <View
                    style={tw`flex-row  items-center justify-between px-2 py-3`}
                  >
                    <View style={tw`flex-row gap-3 items-center`}>
                      <SvgXml xml={IconPhoneGray} />
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-regularText  my-2`}
                      >
                        {OrderDetailsData?.data?.provider?.phone}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleCopyToPhone(
                          OrderDetailsData?.data?.provider?.phone,
                        );
                      }}
                      style={tw`p-2`}
                      activeOpacity={0.7}
                    >
                      <SvgXml width={24} height={24} xml={IconCopy} />
                    </TouchableOpacity>
                  </View>
                )}

                {OrderDetailsData?.data?.status === "Completed" && (
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-regularText text-center px-10 my-2`}
                  >
                    Your previous services with this provider will be shown
                    here.
                  </Text>
                )}
                {/* {==================== booking item ================ }*/}
                <View>
                  {OrderDetailsData?.data?.booking_items?.map((item: any) => {
                    const pkg = item.package;
                    return (
                      <Pressable
                        key={item?.id}
                        style={tw`flex-row justify-between items-center px-4 py-3 rounded-3xl bg-white mb-2`}
                      >
                        <View style={tw`flex-1`}>
                          <Text
                            numberOfLines={1}
                            style={tw`font-DegularDisplayDemoMedium text-lg text-black`}
                          >
                            {pkg?.title.split(" ").slice(0, 2).join(" ")}
                          </Text>

                          <Text
                            style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                          >
                            ₦ {pkg?.price}
                          </Text>

                          <Text
                            style={tw`font-DegularDisplayDemoMedium text-base text-regularText`}
                          >
                            Est. time : {item?.package?.delivery_time} hours
                          </Text>
                        </View>

                        <View style={tw`flex-row flex-none items-center gap-2`}>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedPackage(pkg);
                              deliveryModalRef.current?.present();
                            }}
                            activeOpacity={0.8}
                            style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
                          >
                            <Text style={tw`text-redWhite`}>See details</Text>
                          </TouchableOpacity>
                          {OrderDetailsData?.data?.status === "Completed" &&
                            (loadingState === pkg?.id ? (
                              <ActivityIndicator
                                size="large"
                                color={PrimaryColor}
                              />
                            ) : (
                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                  handleDeleteStoreCartItem(pkg?.id);
                                }}
                                style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
                              >
                                <SvgXml
                                  xml={
                                    addToCartState?.some(
                                      (cartItem: { package_id: number }) =>
                                        cartItem?.package_id === pkg?.id,
                                    )
                                      ? IconTick
                                      : IconPlus
                                  }
                                />
                              </TouchableOpacity>
                            ))}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>

                {/* ============== this message will show when user is new order ans pending order and service provider hasn’t responded yet */}
                {(OrderDetailsData?.data?.status === "New" ||
                  OrderDetailsData?.data?.status === "Pending") && (
                  <Text
                    style={tw`font-PoppinsMedium text-base text-regularText text-center mt-4`}
                  >
                    Service provider hasn’t responded yet. Please wait.
                  </Text>
                )}
                {/* ----------------- if this user is new order and when user need to cancel to after 20 minutes ---------------- */}
                {OrderDetailsData?.data?.status === "New" &&
                timeDifferenceMs >= thirtyMinutesInMs ? (
                  <PrimaryButton
                    onPress={() => setCancelModalVisible(true)}
                    IconFastProps={IconCrossSolidRed}
                    titleProps="Cancel order"
                    contentStyle={tw`bg-transparent border border-red-700 gap-1 h-12 mt-3`}
                    textStyle={tw`text-red-600`}
                  />
                ) : null}
                {OrderDetailsData?.data?.status === "Pending" && (
                  <View>
                    <PrimaryButton
                      IconFastProps={IconReportBlack}
                      titleProps="Report provider"
                      contentStyle={tw`bg-transparent border border-red-700 gap-1 h-12 mt-4`}
                      textStyle={tw`text-black`}
                      onPress={() => handlePresentModalPress()}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/company/dispute_process",
                          params: {
                            id: id,
                          },
                        })
                      }
                      style={tw`py-4 `}
                    >
                      <View style={tw`flex-row justify-center gap-2`}>
                        <SvgXml xml={IconDisputes} />
                        <Text
                          style={tw`text-center font-DegularDisplayDemoMedium text-xl text-black`}
                        >
                          Request for dispute
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {/* [=========================== details bottom sheet ====================================================] */}
              <BottomSheetModal
                ref={deliveryModalRef}
                snapPoints={["80%", "100%"]}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    pressBehavior="close"
                  />
                )}
                handleIndicatorStyle={{ display: "none" }}
                handleStyle={{ display: "none" }}
              >
                {/* header */}
                <View
                  style={[
                    tw`w-full flex-row justify-between items-center h-14 bg-primary px-4`,
                    { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                  ]}
                >
                  <Text />
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                  >
                    Service details
                  </Text>
                  <TouchableOpacity
                    onPress={() => deliveryModalRef.current?.close()}
                    style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
                  >
                    <SvgXml xml={IconCross} />
                  </TouchableOpacity>
                </View>

                {/* scrollable content */}
                <BottomSheetScrollView contentContainerStyle={tw`pb-6`}>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black text-center my-4`}
                  >
                    {selectedPackage?.title}
                  </Text>

                  <View style={tw`px-4 justify-center items-center`}>
                    <Image
                      contentFit="cover"
                      style={tw`w-full h-52 rounded-2xl`}
                      source={{
                        uri:
                          selectedPackage?.image ||
                          "https://via.placeholder.com/300x200.png",
                      }}
                    />
                  </View>

                  <View style={tw`px-4 my-6 gap-3`}>
                    {selectedPackage?.package_detail_items
                      ?.slice(0, 5)
                      .map((detail: any, index: number) => (
                        <View key={index} style={tw`flex-row gap-3`}>
                          <View
                            style={tw`w-2 h-2 rounded-full bg-black mt-2.5 shrink-0`}
                          />
                          <Text
                            style={tw`flex-1 font-DegularDisplayDemoRegular text-xl text-black`}
                          >
                            {detail?.item}
                          </Text>
                        </View>
                      ))}
                  </View>

                  <View style={tw`flex-row items-center gap-3 px-4`}>
                    <View
                      style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
                    >
                      <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
                        ₦ {selectedPackage?.price}
                      </Text>
                    </View>
                  </View>
                </BottomSheetScrollView>
              </BottomSheetModal>

              {/* ------------------- order cancel modal ------------------ */}
              <LogoutModal
                modalVisible={cancelModalVisible}
                setModalVisible={setCancelModalVisible}
                logoutIcon={IconOrderCancelModalIcon}
                buttonTitle="Yes"
                modalTitle="Are you sure you want to cancel this order?"
                // subTitle=""
                onPress={() => {
                  handleCancelOrder();
                }}
              />
            </ScrollView>
            {/* [------------- if this order complete then add to cart and tickmark show =============] */}
            {addToCartState?.length > 0 && (
              <View
                style={[
                  tw`absolute bottom-0 left-0 right-0 bg-white px-5 `,
                  {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 16,
                    elevation: 10,
                  },
                ]}
              >
                <View
                  style={tw`flex-row justify-between items-center h-28 px-5`}
                >
                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
                    >
                      ₦ {cartReducePrice?.toFixed(2)}
                    </Text>
                    <View style={tw`flex-row items-center gap-3`}>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                      >
                        {addToCartState?.length} service
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleBooking()}
                    // onPress={() =>
                    //   router.push(
                    //     "/company/previous_item_Book/previous_booking_confirmation"
                    //   )
                    // }
                    activeOpacity={0.8}
                    style={tw`w-28 h-12 justify-center items-center bg-primary rounded-lg`}
                  >
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-base text-white`}
                    >
                      Reorder
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {/* =================== Report details modal ===================== */}
          <ReportBottomSheet
            handleReportPress={handleReport}
            images={images}
            onClose={handleCloseModalPress}
            pickImages={pickImages}
            ref={reportSheetRef as React.RefObject<BottomSheetModal>}
            reportData={ReportData}
            isLoading={isReportLoading}
            reportDetails={reportDetails}
            setReportDetails={setReportDetails}
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
            reportReason={reportReason}
            setReportReason={setReportReason}
          />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

export default Booking_Service_Details;
