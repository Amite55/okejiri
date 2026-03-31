import { IconProfileBadge } from "@/assets/icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import {
  useAcceptDeliveryRequestMutation,
  useDeclineDeliveryRequestMutation,
  useOrderDetailsQuery,
} from "../redux/apiSlices/userProvider/bookingsSlices";

export default function RequestForDeliveryModal({
  ref,
  id,
  onClose,
  onAccepted,
}: any) {
  const snapPoint = useMemo(() => ["70%", "100%"], []);

  const { data: orderDetailsData, isLoading: isLoadingOrderDetails } =
    useOrderDetailsQuery(id);
  const [acceptDeliveryRequest, { isLoading: isLoadingAcceptDeliveryRequest }] =
    useAcceptDeliveryRequestMutation();
  const [
    declineDeliveryRequest,
    { isLoading: isLoadingDeclineDeliveryRequest },
  ] = useDeclineDeliveryRequestMutation();

  const orders = orderDetailsData?.data;

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoint}
        containerStyle={tw`bg-black/10 flex-1`}
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
          style={tw`flex-row items-center justify-between bg-primary px-4 py-3 rounded-t-xl`}
        >
          <View style={tw`w-8`} />
          <Text style={tw`text-white text-lg font-bold flex-1 text-center`}>
            Request for delivery
          </Text>
          <TouchableOpacity onPress={onClose} style={tw`w-8 items-end`}>
            <Text style={tw`text-white text-xl font-bold`}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* loading */}
        {isLoadingOrderDetails && (
          <View style={tw`py-4 items-center`}>
            <ActivityIndicator size="large" color="#FF6600" />
          </View>
        )}

        {/* scrollable content */}
        <BottomSheetScrollView contentContainerStyle={tw` px-4 py-4 pb-6`}>
          {/* cover image */}
          <Image
            source={orders?.booking_items?.[0]?.package?.image}
            style={tw`w-full h-44 rounded-3xl`}
            contentFit="cover"
          />

          {/* provider row */}
          <View style={tw`flex-row justify-between items-center mt-3 gap-2`}>
            <View style={tw`flex-row items-center gap-2 flex-1`}>
              <Image
                source={orders?.provider?.avatar}
                style={tw`w-12 h-12 rounded-full shrink-0`}
                contentFit="cover"
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tw`flex-1 font-DegularDisplayDemoSemibold text-lg text-black`}
              >
                {orders?.provider?.name}
              </Text>
              {orders?.provider?.kyc_status && (
                <SvgXml xml={IconProfileBadge} />
              )}
            </View>
            {/* price — shrink-0 so it never gets squeezed */}
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-primary shrink-0`}
            >
              ₦ {orders?.price}
            </Text>
          </View>

          {/* package info */}
          <View style={tw`mt-4`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-primary`}
            >
              Basic
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black mt-1`}
            >
              {orders?.booking_items?.[0]?.package?.title}
            </Text>
            {orders?.booking_items?.[0]?.package?.package_detail_items?.map(
              (item: any) => (
                <Text
                  key={item?.id}
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black mt-0.5`}
                >
                  • {item?.item}
                </Text>
              ),
            )}
          </View>

          {/* action buttons — inside scroll so they stay below content */}
          {orders?.status === "Pending" && (
            <View style={tw`flex-row gap-3 mt-6`}>
              {/* decline */}
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const response = await declineDeliveryRequest(id).unwrap();
                    if (response) {
                      router.push({
                        pathname: "/Toaster",
                        params: { res: "Delivery Request Declined!" },
                      });
                      onClose();
                    }
                  } catch {
                    router.push({
                      pathname: "/Toaster",
                      params: { res: "Delivery Request Decline failed!" },
                    });
                  }
                }}
                style={tw`flex-1 bg-redDeep py-2 rounded-full flex-row items-center justify-center gap-2`}
              >
                {isLoadingDeclineDeliveryRequest ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                  >
                    Decline
                  </Text>
                )}
              </TouchableOpacity>

              {/* accept */}
              <TouchableOpacity
                disabled={isLoadingAcceptDeliveryRequest}
                activeOpacity={0.7}
                onPress={async () => {
                  try {
                    const response = await acceptDeliveryRequest(id).unwrap();
                    if (response) onAccepted();
                  } catch {
                    router.push({
                      pathname: "/Toaster",
                      params: { res: "Request Delivery accepted Failed!" },
                    });
                  }
                }}
                style={tw`flex-1 bg-[#319F43] py-2 rounded-full flex-row justify-center items-center gap-2`}
              >
                {isLoadingAcceptDeliveryRequest ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                  >
                    Accept
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
