import {
  IconBackLeftArrow,
  IconChatsYellow,
  IconCopy,
  IconCross,
  IconCrossSolidRed,
  IconDisputes,
  IconFileUpload,
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
import { _HEIGHT, PrimaryColor } from "@/utils/utils";
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
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelModalVisible, setCancelModalVisible] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [reportReason, setReportReason] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [reportDetails, setReportDetails] = useState<string>("");
  const [addToCartState, setAddToCartState] = useState([]);
  const [loadingState, setLoadingState] = useState<number | null>(null);
  const [images, setImages] = useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const { id } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleOnDismiss = useCallback(() => {
    setReportDetails("");
    setSelectedReport("");
    setReportReason(false);
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
  const [deleteCartResponse, { isLoading: deleteCartLoading }] =
    useDeleteCartItemMutation();
  const { data: getAddToCartItem, isLoading: getAddToCartLoading } =
    useGetCartItemQuery({});
  const [cartResponse, { isLoading: isCartLoading }] =
    useStoreDeleteCartItemMutation();

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
      // ✅ Append normal fields first
      formData.append("booking_id", OrderDetailsData?.data?.id);
      formData.append("provider_id", OrderDetailsData?.data?.provider?.id);
      formData.append("report_reason", selectedReport);
      formData.append("report_details", reportDetails);
      // ✅ Append multiple images properly
      images.forEach((uri, index) => {
        formData.append("attachments[]", {
          uri,
          name: `attachment_${index}.jpg`,
          type: "image/jpeg",
        });
      });
      // ✅ Send request via RTK Query mutation ===============
      const response = await reportProvider(formData).unwrap();
      if (response) {
        router.push({
          pathname: `/Toaster`,
          params: { res: response?.message || "Report sent successfully!" },
        });
      }
      handleCloseModalPress();
      router.push({
        pathname: `/Toaster`,
        params: { res: response?.message || "Report sent successfully!" },
      });
    } catch (error) {
      console.log(error, "❌ report not sent to provider");
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
        }, 1000);
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
    } catch (error) {
      console.log(error, "Delete Add to cart Warring !");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    } finally {
      setLoadingState(null);
    }
  };

  // {==================== image pickers with expo image picker  ====================}
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
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
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
                <View style={tw`flex-row flex-1 py-3`}>
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
                    // disabled
                    style={tw`flex-1 flex-row items-center gap-3`}
                  >
                    <Image
                      style={tw`w-11 h-11 rounded-full`}
                      source={OrderDetailsData?.data?.provider?.avatar}
                      contentFit="contain"
                    />
                    <View>
                      <View style={tw`flex-row gap-1 items-center`}>
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-base text-black`}
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
                      <View style={tw`flex-row items-center gap-1`}>
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-primary text-lg `}
                        >
                          {OrderDetailsData?.data?.provider?.ratings_avg_rating}
                        </Text>
                        <View style={tw`flex-row items-center gap-2`}>
                          <SvgXml xml={IconStar} />
                        </View>
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                        >
                          ({OrderDetailsData?.data?.provider?.ratings_count})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* --------------  message button ---------------- */}
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
                      style={tw`border border-gray-300 flex-row items-center rounded-2xl gap-2 px-2 h-11`}
                    >
                      <SvgXml xml={IconChatsYellow} />
                      <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
                        Message
                      </Text>
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
                  {OrderDetailsData?.data?.booking_items?.map((item) => {
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
                              setModalVisible(true);
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
                    style={tw`font-PoppinsMedium text-lg text-regularText text-center mt-4`}
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

              {/* Service Details Modal (Dynamic) */}
              <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={tw`flex-1 justify-end bg-black bg-opacity-15`}
                >
                  <Pressable
                    style={[
                      tw`bg-gray-50`,
                      {
                        height: _HEIGHT * 0.65,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      },
                    ]}
                  >
                    <View
                      style={[
                        tw`w-full flex-row justify-between items-center h-14 bg-primary px-4`,
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
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={tw`pb-20`}
                    >
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

                      <View style={tw`px-4 ml-3 my-6 gap-3`}>
                        {selectedPackage?.package_detail_items
                          ?.slice(0, 5)
                          .map((detail: any, index: number) => (
                            <View
                              key={index}
                              style={tw`flex-row items-center gap-3`}
                            >
                              <View style={tw`w-2 h-2 bg-black`} />
                              <Text
                                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                              >
                                {detail?.item}
                              </Text>
                            </View>
                          ))}
                      </View>

                      <View style={tw`flex-row items-center gap-3 px-4`}>
                        <TouchableOpacity
                          style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
                        >
                          <Text
                            style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                          >
                            ₦ {selectedPackage?.price}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </Pressable>
                </Pressable>
              </Modal>

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
          {/* =================== see Report details modal ===================== */}
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
                            activeOpacity={0.6}
                            onPress={() => pickImages()}
                            style={tw`flex-row items-center justify-center gap-3`}
                          >
                            <SvgXml xml={IconFileUpload} />
                            {images ? (
                              <Text
                                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                              >
                                You have selected {images.length} files
                              </Text>
                            ) : (
                              <Text
                                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                              >
                                Upload files
                              </Text>
                            )}
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

                          {isReportLoading ? (
                            <ActivityIndicator size="small" color="blue" />
                          ) : (
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
                          )}
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
                              // setSelectedIndex(index);
                              setSelectedReport(item.reportName);
                            }}
                            key={item.id}
                            style={tw`flex-row gap-3 items-center rounded-none`}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                // setSelectedIndex(index);
                                setSelectedReport(item.reportName);
                              }}
                              style={tw.style(
                                `border w-5 h-5  justify-center items-center rounded-full`,
                                selectedReport === item.reportName
                                  ? `bg-primary border-white`
                                  : `bg-transparent`,
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

                        {selectedReport ? (
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

export default Booking_Service_Details;
