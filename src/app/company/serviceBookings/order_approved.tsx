import {
  IconBackLeftArrow,
  IconBookingConfirm,
  IconMessageWhite,
  IconProfileBadge,
  IconReportBlue,
  IconStar,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import { ReportBottomSheet } from "@/src/Components/ReportBottomSheet";
import NotificationSkeleton from "@/src/Components/skeletons/NotificationSkeleton";
import { useDynamicBack } from "@/src/hooks/useDynamicBack";
import { useProviderType } from "@/src/hooks/useProviderType";
import { useRoll } from "@/src/hooks/useRollHooks";
import ReportData from "@/src/json/ReportData.json";
import tw from "@/src/lib/tailwind";
import {
  useOrderDetailsQuery,
  useReportProviderMutation,
} from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

export default function OrderApproved() {
  const { id } = useLocalSearchParams();
  const [reportReason, setReportReason] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [reportDetails, setReportDetails] = useState<string>("");
  const [images, setImages] = useState<string[] | null>(null);
  const reportSheetRef = useRef<BottomSheetModal>(null);

  const handleCloseModalPress = useCallback(() => {
    reportSheetRef.current?.dismiss();
  }, []);
  // ============== hooks ==================
  const roll = useRoll() || "";
  const providerType = useProviderType();

  const handleOnDismiss = useCallback(() => {
    setReportDetails("");
    setSelectedReport("");
    setReportReason(false);
    setImages(null);
  }, []);

  // =========== call dynamic touting hooks ------------
  const handleBack = useDynamicBack(roll, providerType);
  // ==================== api end point =================
  const { data: orderDetailsData, isLoading: isLoadingOrderDetails } =
    useOrderDetailsQuery(id);
  const [reportProvider, { isLoading: isReportLoading }] =
    useReportProviderMutation();

  const orders = orderDetailsData?.data;
  const firstBookingItem = orders?.booking_items?.[0];

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
      formData.append("booking_id", orderDetailsData?.data?.id);
      formData.append("provider_id", orderDetailsData?.data?.provider?.id);
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
      reportSheetRef.current?.dismiss();
    } catch (error: any) {
      console.log(error, " report not sent to provider");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Failed to send report" },
      });
    }
  };

  // =================== report image picker =================
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

  // ================ loading state =================
  if (isLoadingOrderDetails || !id) {
    return <NotificationSkeleton />;
  }
  return (
    <BottomSheetModalProvider>
      <ScrollView style={tw`bg-base_color `}>
        <View style={tw` flex-1`}>
          <View>
            <Image
              source={orders?.booking_items?.[0].package?.image}
              style={tw`w-full h-50 `}
            />
            <View style={tw`absolute py-4 px-4`}>
              <TouchableOpacity
                onPress={() => {
                  handleBack();
                }}
                style={tw` bg-white p-5 rounded-full`}
              >
                <SvgXml xml={IconBackLeftArrow} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`px-4 py-6 gap-2`}>
            <View>
              <Text
                style={tw`text-black font-DegularDisplayDemoMedium text-2xl`}
              >
                {firstBookingItem?.package?.title}
              </Text>
            </View>
            <View style={tw`flex-row justify-between items-center py-2 gap-3`}>
              {/* provider info — flex-1 so it takes available space */}
              <TouchableOpacity
                style={tw`flex-1`}
                onPress={() =>
                  router.push({
                    pathname: "/company/provider_profile",
                    params: { provider_id: orders?.provider?.id },
                  })
                }
              >
                <View style={tw`flex-row gap-2 items-center`}>
                  <Image
                    source={orders?.provider?.avatar}
                    style={tw`w-15 h-15 rounded-full shrink-0`}
                  />
                  <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={tw`flex-1 text-[#535353] font-DegularDisplayDemoRegular text-xl`}
                      >
                        {orders?.provider?.name}
                      </Text>
                      {orders?.provider?.kyc_status === "Verified" && (
                        <SvgXml xml={IconProfileBadge} />
                      )}
                    </View>
                    <View style={tw`flex-row gap-1 items-center`}>
                      <SvgXml xml={IconStar} />
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}
                      >
                        {orders?.provider?.ratings_avg_rating}
                      </Text>
                      <Text
                        style={tw`text-[#535353] font-DegularDisplayDemoRegular text-lg`}
                      >
                        ({orders?.provider?.ratings_count})
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {/* price — shrink-0 so it never gets squeezed */}
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-primary shrink-0`}
              >
                ₦{orders?.price}
              </Text>
            </View>

            <View style={tw`items-center py-5 gap-2`}>
              <SvgXml xml={IconBookingConfirm} />
              <Text
                style={tw`text-black font-DegularDisplayDemoMedium text-2xl`}
              >
                Order Confirmed
              </Text>
            </View>

            <View style={tw`my-4 gap-3`}>
              <PrimaryButton
                IconFastProps={IconMessageWhite}
                titleProps="Message"
                onPress={() =>
                  router.push({
                    pathname: "/company/messaging",
                    params: {
                      receiverId: orderDetailsData?.data?.provider?.id,
                      receiverName: orderDetailsData?.data?.provider?.name,
                      receiverImage: orderDetailsData?.data?.provider?.avatar,
                    },
                  })
                }
                contentStyle={tw`h-12`}
              />
              <PrimaryButton
                IconFastProps={IconReportBlue}
                titleProps="Report provider"
                textStyle={tw`text-blue-700`}
                contentStyle={tw` h-12 border border-blue-400 bg-transparent`}
                onPress={() => reportSheetRef.current?.present()}
              />
            </View>
          </View>
        </View>
      </ScrollView>

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
  );
}
