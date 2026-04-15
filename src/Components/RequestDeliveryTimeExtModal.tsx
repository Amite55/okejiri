import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";
import {
  useAcceptDeliveryTimeExtensionMutation,
  useDeclineDeliveryTimeExtensionMutation,
  useDeliveryTimeExtensionDetailsQuery,
} from "../redux/apiSlices/userProvider/bookingsSlices";

export default function RequestDeliveryTimeExtModal({
  ref,
  id,
  onClose,
  onAccepted,
}: any) {
  const snapPoint = useMemo(() => ["57%", "80%"], []);
  const {
    data: requestDeliveryTimeExt,
    isLoading: isLoadingRequestDeliveryTimeExt,
  } = useDeliveryTimeExtensionDetailsQuery(id);
  const [fetchAcceptTimeExt, { isLoading: isLoadingAcceptTimeExt }] =
    useAcceptDeliveryTimeExtensionMutation();
  const [fetchDeclineTimeExt, { isLoading: isLoadingDeclineTimeExt }] =
    useDeclineDeliveryTimeExtensionMutation();
  const timeExt = requestDeliveryTimeExt?.data;
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
        <View
          style={tw`flex-row items-center justify-between bg-primary px-4 py-1 rounded-t-xl`}
        >
          {/* Centered title */}
          <Text style={tw`text-white text-lg font-bold flex-1 text-center`}>
            Request for delivery time extension
          </Text>
          {/* Right close button */}
          <TouchableOpacity onPress={onClose} style={tw`p-2`}>
            <Text style={tw`text-white text-xl font-bold`}>✕</Text>
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView
          contentContainerStyle={tw`flex-1 bg-base_color  `}
        >
          {isLoadingRequestDeliveryTimeExt && (
            <ActivityIndicator size={"large"} color="#FF6600" />
          )}
          {!isLoadingRequestDeliveryTimeExt && (
            <View style={tw`px-4 py-6 gap-4`}>
              <View style={tw`gap-2`}>
                <Text style={tw`font-PoppinsMedium text-base `}>Time</Text>
                <View style={tw`border border-gray-300 py-4 px-4 rounded-full`}>
                  <Text style={tw`text-xl font-DegularDisplayDemoMedium`}>
                    {timeExt?.time} {timeExt?.time > 1 ? "hours" : "hour"}{" "}
                  </Text>
                </View>
              </View>
              <View style={tw`gap-2`}>
                <Text style={tw`font-PoppinsMedium text-base `}>Reason</Text>
                <View
                  style={tw`border border-gray-300 py-4 px-4 rounded-lg h-40`}
                >
                  <Text style={tw`text-xl font-DegularDisplayDemoMedium`}>
                    {timeExt?.reason}
                  </Text>
                </View>
              </View>
              {timeExt?.status === "Pending" && (
                <View style={tw`flex-row gap-2`}>
                  <TouchableOpacity
                    disabled={isLoadingDeclineTimeExt}
                    activeOpacity={0.7}
                    onPress={async () => {
                      try {
                        const response = await fetchDeclineTimeExt(id).unwrap();
                        if (response) {
                          router.push({
                            pathname: "/Toaster",
                            params: {
                              res: "Delivery time extension decline!",
                            },
                          });
                          onClose();
                        }
                      } catch (err: any) {
                        console.log(
                          "=== Delivery time extension Decline error ",
                          err,
                        );
                        router.push({
                          pathname: "/Toaster",
                          params: {
                            res:
                              err.message ||
                              "Delivery time extension Decline failed!",
                          },
                        });
                      }
                    }}
                    style={tw`px-4 py-2 justify-center items-center w-[48%] bg-redDeep rounded-full `}
                  >
                    <View style={tw``}>
                      {isLoadingDeclineTimeExt ? (
                        <ActivityIndicator size={"small"} color={"#fff"} />
                      ) : (
                        <Text
                          style={tw`text-center font-DegularDisplayDemoMedium text-xl text-white`}
                        >
                          Decline
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isLoadingAcceptTimeExt}
                    activeOpacity={0.7}
                    onPress={async () => {
                      try {
                        const response = await fetchAcceptTimeExt(id).unwrap();
                        if (response) {
                          router.push({
                            pathname: "/Toaster",
                            params: {
                              res: "Delivery time extension accepted",
                            },
                          });
                          onAccepted();
                        }
                      } catch (err: any) {
                        console.log(
                          " =========== submit accepted error ======= ",
                          err,
                        );
                        router.push({
                          pathname: "/Toaster",
                          params: {
                            res:
                              err.message ||
                              "Delivery time extension accepted Failed!",
                          },
                        });
                      }
                    }}
                    style={tw`px-4 py-2 justify-center items-center w-[48%] bg-[#319F43]  rounded-full`}
                  >
                    {isLoadingAcceptTimeExt ? (
                      <ActivityIndicator size={"small"} color={"#fff"} />
                    ) : (
                      <Text
                        style={tw`text-center font-DegularDisplayDemoMedium text-xl text-white`}
                      >
                        Accept
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
