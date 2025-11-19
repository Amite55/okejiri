



import { IconratingRatedStar, IconratingUnratedStar, IconSuccess } from '@/assets/icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { useOrderDetailsQuery } from '../redux/apiSlices/companyProvider/orderSlices';
import { useRatingMutation } from '../redux/apiSlices/userProvider/account/clickProviderORRatingSlices';

export default function FeedbackModel({ ref, id, onClose, onSubmit }: any) {
    // const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ["90%", "100%"], [])
    const [reviewText, setReviewText] = useState("");

    // // ========================= API ======================== //
    const { data: orderDetailsData, isLoading: isLoadingOrderDetails, isError: isErrorOrderDetails } = useOrderDetailsQuery(id);
    const [fetchRatting, { isLoading: isLoadingRatting, isError: isErrorRatting, error: errorRatting }] = useRatingMutation();

    const orders = orderDetailsData?.data;
    const booking_id = orders?.booking_items?.[0].booking_id;
    const provider_id = orders?.provider?.id
    const [rating, setRating] = useState(0);
    const handleChangeRating = (index: number) => {
        setRating(index + 1)
    }

    const ratingsStatus = ["Poor", "Good", "Better", "Best", "Excellent"];
    const [selectedRatingsStatus, setSelectedRatingsStatus] = useState<string | null>(null);

    const primaryColor = "#FFB300"; // Your primary color
    const grayColor = "#BDBDBD";    // Default gray

    const handleSubmit = async () => {

        if (!rating || reviewText.length === 0) {
            router.push({
                pathname: "/Toaster",
                params: {
                    res: "Fillup required fields!"
                }
            })
            return;
        }
        const requestBody = {
            booking_id,
            provider_id,
            rating,
            review: reviewText
        }
        try {
            const response = await fetchRatting(requestBody).unwrap();
            if (response) {

                router.push({
                    pathname: "/Toaster",
                    params: {
                        res: "Submit ratting successful"
                    }
                })
                onClose();
            }
        }
        catch (err) {
            console.log(" ==== submit ratting error === ", err)

            router.push({
                pathname: "/Toaster",
                params: {
                    res: "Submit ratting failed"
                }
            })

        }
        // console.log(" ========== request body ============== ", requestBody)

    };

    // const { data: orderDetailsData, isLoading: isLoadingOrderDetails, isError: isErrorOrderDetails } = useOrderDetailsQuery(id)
    // const [deliveryTime, setDeliveryTime] = useState("");

    // const orders = orderDetailsData?.data;
    // console.log(" ============ id ================= ", id)
    // console.log(" ================ Order details data ============ ", JSON.stringify(orderDetailsData, null, 2))
    // const firstBookingItem = orders?.booking_items?.[0];


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
                        Feedback
                    </Text>

                    {/* Right close button */}
                    <TouchableOpacity onPress={onClose} style={tw`p-2`}>
                        <Text style={tw`text-white text-xl font-bold`}>✕</Text>
                    </TouchableOpacity>
                </View>

                <BottomSheetScrollView
                    contentContainerStyle={tw`flex-grow bg-base_color  `}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                    keyboardBehavior="interactive"

                    enableAutomaticScroll={true}                     // ⭐ instant scroll with keyboard
                    automaticallyAdjustKeyboardInsets={true}         // ⭐ removes delay on iOS/Android
                >
                    <View>
                        <View style={tw`items-center py-6 gap-3`}>
                            <SvgXml xml={IconSuccess} />
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>Delivery request accepted</Text>
                            <Text style={tw`font-DegularDisplayDemoSemibold text-2xl text-black`}>₦ {orders?.price}</Text>
                        </View>
                        <View style={tw`bg-gray-400 w-full h-[0.2]`} />

                        <View style={tw`items-center py-6 gap-3`}>
                            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>Share your experience with John Doe</Text>

                            <View style={tw`flex-row  items-center gap-6 py-4`}>
                                {[...Array(5)].map((_, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleChangeRating(index)}
                                    >
                                        <View>
                                            {index < rating ? <SvgXml xml={IconratingRatedStar} /> : <SvgXml xml={IconratingUnratedStar} />}
                                        </View>
                                    </TouchableOpacity>
                                ))

                                }
                            </View>

                            <View style={tw`items-center `}>
                                <View style={tw`gap-2 flex-row flex-wrap justify-center`}>
                                    {ratingsStatus.map((item) => {
                                        const isSelected = selectedRatingsStatus === item;

                                        return (
                                            <TouchableOpacity
                                                key={item}
                                                onPress={() => setSelectedRatingsStatus(item)}
                                                style={tw`px-8 py-4 rounded-full ${isSelected ? "bg-primary" : "border border-gray-400"}`}
                                            >
                                                <Text
                                                    style={{
                                                        color: isSelected ? "white" : "black",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                            <View style={tw`w-full px-6 py-2`}>
                                {/* <BottomSheetTextInput value='Write a review'/> */}
                                <BottomSheetTextInput
                                    placeholder="Write a review"
                                    multiline={true}
                                    style={tw`h-35 w-full bg-white px-4 rounded-xl`}
                                    textAlignVertical="top"
                                    onChangeText={setReviewText}
                                    value={reviewText}
                                />
                            </View>

                        </View>
                        <View style={tw`px-6`}>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={tw`bg-primary py-4 rounded-full`}
                            >
                                <Text style={tw`text-center text-white font-DegularDisplayDemoMedium text-xl`}>Done</Text>
                            </TouchableOpacity>
                        </View>



                    </View>




                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}