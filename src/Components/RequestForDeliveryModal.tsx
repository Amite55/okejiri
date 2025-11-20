



import { IconProfileBadge } from '@/assets/icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { useAcceptDeliveryRequestMutation, useDeclineDeliveryRequestMutation, useOrderDetailsQuery } from '../redux/apiSlices/userProvider/bookingsSlices';

export default function RequestForDeliveryModal({ ref, id, onClose, onAccepted }: any) {
    // const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ["90%", "100%"], [])

    // ========================= API ======================== //
    const {
        data: orderDetailsData,
        isLoading: isLoadingOrderDetails,
        isError: isErrorOrderDetails
    } = useOrderDetailsQuery(id);

    const [acceptDeliveryRequest,
        {
            isLoading: isLoadingAcceptDeliveryRequest,
            isError: isErrorAcceptDeliveryRequest,
            error: errorAcceptDeliveryRequest
        }] = useAcceptDeliveryRequestMutation();
    const [declineDeliveryRequest, {
        isLoading: isLoadingDeclineDeliveryRequest,
        isError: isErrorDeclineDeliveryRequest,
        error: errorDeclineDeliveryRequest
    }] = useDeclineDeliveryRequestMutation();


    const [deliveryTime, setDeliveryTime] = useState("");

    const orders = orderDetailsData?.data;
    // console.log(" ============ id ================= ", id)
    // console.log(" ================ Order details data ============ ", JSON.stringify(orders, null, 2))
    const firstBookingItem = orders?.booking_items?.[0];


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
                // handleHeight={0}
                handleIndicatorStyle={{ display: "none" }}
                handleStyle={{ display: "none" }}
            // handleStyle={{height: 0}}
            // ind
            >
                <View style={tw`flex-row items-center justify-between bg-primary px-4 py-1 rounded-t-xl`}>
                    {/* Left back button */}


                    {/* Centered title */}
                    <Text style={tw`text-white text-lg font-bold flex-1 text-center`}>
                        Request for delivery
                    </Text>

                    {/* Right close button */}
                    <TouchableOpacity onPress={onClose} style={tw`p-2`}>
                        <Text style={tw`text-white text-xl font-bold`}>✕</Text>
                    </TouchableOpacity>
                </View>

                <BottomSheetScrollView contentContainerStyle={tw`flex-1 bg-base_color  `}>
                    <View style={tw`px-4 py-4 rounded-3xl gap-3`}>
                        <Image source={orders?.booking_items?.[0].package?.image} style={tw`w-full h-30 rounded-3xl`} />

                        <View style={tw`flex-row justify-between items-center `}>
                            <View style={tw`flex-row items-center gap-3`}>
                                <Image source={orders?.provider?.avatar} style={tw`w-15 h-15 rounded-full`} />
                                <Text style={tw`font-DegularDisplayDemoSemiBold text-lg`}>{orders?.provider?.name}</Text>
                                {orders?.provider?.kyc_status && <SvgXml xml={IconProfileBadge} />}
                            </View>
                            <View>
                                <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-primary`}>₦ {orders?.price}</Text>
                            </View>
                        </View>

                        <View style={tw`py-2`}>
                            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-primary`}>Basic</Text>
                        </View>

                        <View>
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>
                                {orders?.booking_items?.[0].package?.title}
                            </Text>
                            {orders?.booking_items?.[0].package?.package_detail_items.map((item: any) => (
                                <Text
                                    key={item.id}
                                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                                >
                                    • {item.item}
                                </Text>
                            ))}
                        </View>
                    </View>
                    {orders?.status === "Pending" &&
                        <View style={tw`flex-row gap-2`}>
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        const response = await declineDeliveryRequest(id).unwrap();
                                        if (response) {
                                            router.push({
                                                pathname: "/Toaster",
                                                params: {
                                                    res: "Delivery Request Decline done!"
                                                }
                                            })
                                            onClose();
                                        }
                                    }
                                    catch (err) {
                                        console.log("=== Delivery Request Decline error ", err)
                                        router.push({
                                            pathname: "/Toaster",
                                            params: {
                                                res: "Delivery Request Decline failed!"
                                            }
                                        })
                                    }


                                }}
                                style={tw`px-4 py-6 w-[48%]`}>
                                <View style={tw`bg-redDeep py-4 rounded-full`}>
                                    <Text style={tw`text-center font-DegularDisplayDemoMedium text-xl text-white`}>Decline</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        // ***** TODO : Backend should enable stripe connect account

                                        // "errors": "Your destination account needs to have at least one 
                                        // of the following capabilities enabled: transfers, crypto_transfers, 
                                        // legacy_payments", "message": "The request could not be processed due 
                                        // to an error.", "status": "error", "status_code": 400
                                        const response = await acceptDeliveryRequest(id).unwrap();
                                        if (response) {
                                            onAccepted();
                                        }
                                    } catch (err) {
                                        console.log(" =========== submit accepted error ======= ", err);
                                        router.push({
                                            pathname: "/Toaster",
                                            params: {
                                                res: "Request Delivery accepted Failed!"
                                            }
                                        })
                                    }


                                }}
                                style={tw`px-4 py-6 w-[48%]`}>
                                <View style={tw`bg-[#319F43] py-4 rounded-full`}>
                                    <Text style={tw`text-center font-DegularDisplayDemoMedium text-xl text-white`}>Accept</Text>
                                </View>

                            </TouchableOpacity>

                        </View>
                    }





                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}