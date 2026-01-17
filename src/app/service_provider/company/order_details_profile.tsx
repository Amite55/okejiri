import {
  IconCardProfile,
  IconChatsYellow,
  IconDisputes,
  IconLocation,
  IconMailYellow,
  IconPhoneYellow,
  IconStar,
  IconWhiteDot,
} from "@/assets/icons";
import AcceptedModal from "@/src/Components/AcceptedModal";
import UserReviewCard from "@/src/Components/UserReviewCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import {
  useLazyOrderDetailsQuery,
  useOrderApproveMutation,
  useOrderRejectMutation,
  useRequestForDeliveryMutation,
} from "@/src/redux/apiSlices/companyProvider/orderSlices";
import { PrimaryColor } from "@/utils/utils";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Order_Details_Profile = () => {
  // screen state
  const [approvedModalShown, setApprovedModalShown] = useState(false);
  const { id } = useLocalSearchParams();

  const handleAssignPress = () => {
    setApprovedModalShown(false);
    setTimeout(() => {
      router.push({
        pathname: "/service_provider/company/my_employees/assign_provider",
        params: { id: id },
      });
    }, 200);
  };

  // api end point =====================
  const [
    fetchOrderItem,
    {
      data: fetchOrderData,
      isLoading: isLoadingFetchOrder,
      isFetching: isFetchingFetchOrder,
    },
  ] = useLazyOrderDetailsQuery();
  const [
    orderApprove,
    { isLoading: isLoadingOrderApprove, error: errorOrderApproved },
  ] = useOrderApproveMutation();
  const [
    requestForDelivery,
    { isLoading: isLoadingRequestForDelivery, error: errorRequestForDelivery },
  ] = useRequestForDeliveryMutation();
  const [orderRejected, { isLoading: isLoadingOrderRejected }] =
    useOrderRejectMutation();
  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery(
    {}
  );

  // api function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // api effect
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        await fetchOrderItem(id).unwrap();
      } catch (err) {
        console.error("Failed to fetch order details:", err);
      }
    };
    fetchData();
  }, [id]);
  const order = fetchOrderData?.data;

  // handlers: order approve handler =========
  const handleOrderApprove = async (orderId: any) => {
    if (!orderId) {
      return;
    }
    try {
      const res = await orderApprove(orderId).unwrap();
      if (res) {
        if (profileData?.data?.provider_type === "Company") {
          setApprovedModalShown(true);
        } else {
          router.push({
            pathname: "/Toaster",
            params: { res: res?.message || "Order approved" },
          });
        }
      }
    } catch (err) {
      Alert.alert("Order approve failed!");
      console.log("Order approve order failed ", err, " ", errorOrderApproved);
    }
  };
  // ---------------- delivery time extension request handler =========
  const handleRequestForDelivery = async (orderId: any) => {
    if (!orderId) return;
    try {
      const response = await requestForDelivery(orderId).unwrap();
      router.push({
        pathname: "/Toaster",
        params: { res: response?.message || "Request for delivery send" },
      });
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (err) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Delivery request send failed" },
      });
      console.log(
        "Extension order error  ",
        err,
        " error ",
        errorRequestForDelivery
      );
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

  // ===================== handle order reject =====================
  const handleOrderReject = async (orderId: any) => {
    try {
      const response = await orderRejected(orderId).unwrap();
      if (response) {
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message || "Order rejected" },
        });
      }
    } catch (error: any) {
      console.log(error, "Rejected not success !");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || "Order rejected failed" },
      });
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      {/* btn header */}
      <BackTitleButton
        pageName="Order Details"
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />
      {isLoadingFetchOrder && isFetchingFetchOrder && (
        <View>
          <ActivityIndicator size={"small"} color="#ff6600" />
        </View>
      )}
      {order && (
        <View>
          <View style={tw`flex-row justify-center items-center my-2`}>
            <View
              style={tw`flex-row py-1 px-6 justify-between items-center gap-2 rounded-full ${
                order?.status === "New"
                  ? "bg-primary"
                  : order?.status === "Pending"
                  ? "bg-violet"
                  : order?.status === "Cancelled"
                  ? "bg-[#FF3A00]"
                  : "bg-success600"
              }`}
            >
              <SvgXml xml={IconWhiteDot} />
              <Text
                style={tw`font-DegularDisplayDemoMedium text-lg pb-1 text-white`}
              >
                {order?.status === "New"
                  ? "New Order"
                  : order?.status || "updated"}
              </Text>
            </View>
          </View>

          <View
            style={tw`bg-white h-56 rounded-xl justify-center items-center gap-2`}
          >
            <Image
              style={tw`w-24 h-24 rounded-full `}
              source={{ uri: order?.user?.avatar }}
            />
            <View style={tw`flex-row items-center gap-2`}>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}
              >
                {order?.user?.name || "Unknown"}
              </Text>
            </View>
            <View
              style={tw`flex-row py-1 px-4 justify-between items-center gap-2 rounded-full ${
                order.user?.kyc_status === "In Review"
                  ? "bg-secondary"
                  : order?.status === "Verified"
                  ? "bg-violet"
                  : "bg-blueMagenta"
              }`}
            >
              <Text style={tw`font-PoppinsRegular text-sm text-white`}>
                {order?.user.kyc_status}
              </Text>
            </View>
          </View>
          {/* ------------------- message button --------------- */}
          {(order?.status === "New" || order?.status === "Pending") && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                router.push({
                  pathname: "/company/messaging",
                  params: {
                    receiverId: order?.user?.id,
                    receiverName: order?.user?.name,
                    receiverImage: order?.user?.avatar,
                  },
                })
              }
              style={tw`border border-gray-300 flex-row justify-center my-2 items-center rounded-2xl gap-2 px-2 h-11`}
            >
              <SvgXml xml={IconChatsYellow} />
              <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
                Message
              </Text>
            </TouchableOpacity>
          )}

          {/* ------------------- user datails --------------- */}
          <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm gap-3 my-4`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              User details
            </Text>

            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconCardProfile} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                {order?.user?.name || "Unknown"}
              </Text>
            </View>

            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconMailYellow} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                {order?.user?.email}
              </Text>
            </View>
            {/* TODO ask is phone number fetch from billing is right*/}
            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconPhoneYellow} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                {order?.user?.phone ? order.user.phone : order.billing.phone}
              </Text>
            </View>

            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconLocation} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                {order?.user?.address ? order.user.address : "N/A"}
              </Text>
            </View>
          </View>

          {/*  --------------------- Booking Details */}
          <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm gap-2 my-4`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              Booking details
            </Text>
            <View style={tw`flex-row justify-between items-center `}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Date:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-lg text-black`}>
                {formatDate(order?.billing?.created_at || "N/A")}
              </Text>
            </View>

            <View style={tw`flex-row justify-between items-center `}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Booking Type:
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoLight text-xl text-black capitalize`}
              >
                {order?.booking_type + " " || "N/A"}
              </Text>
            </View>
            <View style={tw`flex-row justify-between items-center `}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Time selection:
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoLight text-xl text-black capitalize`}
              >
                {order?.booking_process || "N/A"}
              </Text>
            </View>

            <View style={tw`flex-row justify-between items-center `}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Time slot:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
                {order?.booking_process === "instant"
                  ? "N/A"
                  : order?.schedule_time_slot}
              </Text>
            </View>
          </View>

          {/*======================== Service Details ============ */}
          <View style={tw` `}>
            {order.booking_items?.map((bookingItem: any) => {
              const packageItems =
                bookingItem.package?.package_detail_items || [];
              return (
                <View
                  key={bookingItem.id}
                  style={tw`bg-white rounded-2xl p-4 mb-4 gap-4`}
                >
                  <Text style={tw`font-bold text-lg mb-2`}>
                    {bookingItem.package?.title || "Service title goes here."}
                  </Text>

                  {/* Map package_detail_items */}
                  <View style={tw`ml-2 gap-2`}>
                    {packageItems.map((item: any) => (
                      <Text
                        key={item.id}
                        style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                      >
                        • {item.item}
                      </Text>
                    ))}
                  </View>

                  {/* Cost Section */}
                  <View
                    style={tw`bg-primary w-full h-10 rounded-full flex-row justify-between items-center px-4 my-2`}
                  >
                    <Text
                      style={tw`text-white font-DegularDisplayDemoMedium text-xl`}
                    >
                      Cost:{" "}
                    </Text>
                    <Text
                      style={tw`text-white font-DegularDisplayDemoMedium text-xl`}
                    >
                      ₦ {bookingItem.package?.price || "0.00"}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Action Buttons */}
          {/* active when New order type */}
          {order?.status === "New" && (
            <View style={tw`flex-row gap-3 justify-between`}>
              <TouchableOpacity
                onPress={() => handleOrderReject(order?.id)}
                activeOpacity={0.7}
                style={tw`flex-1 h-12 justify-center bg-red-500  rounded-full items-center `}
              >
                {isLoadingOrderRejected ? (
                  <ActivityIndicator size="small" color={PrimaryColor} />
                ) : (
                  <Text
                    style={tw`text-white font-DegularDisplayDemoMedium text-xl `}
                  >
                    Reject
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleOrderApprove(order?.id)}
                disabled={isLoadingOrderApprove}
                style={tw`flex-1 h-12 justify-center bg-success600 rounded-full items-center `}
              >
                {isLoadingOrderApprove ? (
                  <ActivityIndicator size="small" color={PrimaryColor} />
                ) : (
                  <Text
                    style={tw`text-white font-DegularDisplayDemoMedium text-xl`}
                  >
                    Approve
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* active when Pending order type */}
          {order.status === "Pending" && (
            <View style={tw`gap-4`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Assign Provider
              </Text>

              <View
                style={tw`flex-row justify-between w-full bg-white rounded-lg py-2 px-2`}
              >
                <View style={tw`flex-row gap-2 items-center `}>
                  <View style={tw``}>
                    <Image
                      style={tw`w-24 h-24 rounded-lg `}
                      source={{
                        uri:
                          order?.provider?.avatar ||
                          order?.provider?.company?.company_logo,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>
                      {order?.provider?.name}
                    </Text>
                    <View style={tw`flex-row gap-2 items-center`}>
                      <Text
                        style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
                      >
                        {order?.provider?.ratings_avg_rating}
                      </Text>
                      <SvgXml xml={IconStar} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={tw`gap-2`}>
                <Pressable
                  style={tw`h-12 flex-row justify-center items-center border border-black/20 rounded-full`}
                  onPress={() =>
                    router.push({
                      pathname:
                        "/service_provider/individual/my_services/delivery_extension",
                      params: {
                        id: order.id,
                      },
                    })
                  }
                >
                  <Text
                    style={tw`text-center font-DegularDisplayDemoMedium text-xl text-black`}
                  >
                    Extend delivery time
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleRequestForDelivery(order?.id)}
                  style={tw`h-12 flex-row justify-center items-center  bg-primary rounded-full`}
                >
                  {isLoadingRequestForDelivery ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={tw`text-center font-DegularDisplayDemoMedium text-xl text-white`}
                    >
                      Request for delivery
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/company/dispute_process",
                      params: {
                        id: order?.id,
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
                </Pressable>
              </View>
            </View>
          )}

          {/* active when Completed order type */}
          {order.status === "Completed" && (
            <View>
              <View style={tw`gap-4 py-2`}>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                >
                  Assign Provider
                </Text>

                <View
                  style={tw`flex-row justify-between w-full bg-white rounded-lg py-2 px-2`}
                >
                  <View style={tw`flex-row gap-2 items-center `}>
                    <View style={tw``}>
                      <Image
                        style={tw`w-24 h-24 rounded-lg `}
                        source={{
                          uri:
                            order?.provider?.avatar ||
                            order?.provider?.company?.company_logo,
                        }}
                      />
                    </View>
                    <View>
                      <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>
                        {order?.provider?.name}
                      </Text>
                      <View style={tw`flex-row gap-2 items-center`}>
                        <Text
                          style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
                        >
                          {order?.provider?.ratings_avg_rating}
                        </Text>
                        <SvgXml xml={IconStar} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={tw`gap-4`}>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                >
                  User Review
                </Text>
                {order?.review && order.review.length > 0 ? (
                  <FlatList
                    data={order.review}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={tw`gap-2 `}
                    renderItem={({ item }) => <UserReviewCard item={item} />}
                  />
                ) : (
                  <View>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      No reviews yet.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          <AcceptedModal
            visible={approvedModalShown}
            title="Request accepted"
            subtitle="Assign a available service provider"
            btnText="Assign"
            onPress={handleAssignPress}
            onClose={() => setApprovedModalShown(false)}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Order_Details_Profile;
