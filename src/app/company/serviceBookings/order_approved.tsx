import { IconBackLeftArrow, IconBookingConfirm, IconProfileBadge, IconStar } from '@/assets/icons';
import tw from '@/src/lib/tailwind';
import { useOrderDetailsQuery } from '@/src/redux/apiSlices/userProvider/bookingsSlices';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function OrderApproved() {
    const { id } = useLocalSearchParams();

    const {
        data: orderDetailsData,
        isLoading: isLoadingOrderDetails,
        isError: isErrorOrderDetails,
        error: errorOrderDetails
    } = useOrderDetailsQuery(id);
    const orders = orderDetailsData?.data;
    // console.log(" ============ id ================= ", id)
    // console.log(" ================ Order details data ============ ", JSON.stringify(orders, null, 2))
    const firstBookingItem = orders?.booking_items?.[0];
    console.log(" ================== id ================ ", JSON.stringify(orders, null, 2))
    return (
        <View>
            <View>
                <Image source={orders?.booking_items?.[0].package?.image} style={tw`w-full h-50 `} />
                <View style={tw`absolute py-4 px-4`}>
                    <TouchableOpacity
                        onPress={()=> router.back()}
                        style={tw` bg-white p-5 rounded-full`}
                    >
                        <SvgXml xml={IconBackLeftArrow} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={tw`px-4 py-6 gap-2`}>
                <View>
                    <Text style={tw`text-black font-DegularDisplayDemoMedium text-2xl`}>{firstBookingItem?.package?.title}</Text>
                </View>
                <View style={tw`flex-row justify-between items-center py-2`}>
                    <TouchableOpacity onPress={()=> router.push({
                        pathname:"/company/provider_profile",
                        params:{
                            provider_id: orders?.provider?.id
                        }
                    })}>
                        <View style={tw`flex-row gap-2 items-center`}>
                            <View>
                                <Image source={orders?.provider?.avatar} style={tw`w-15 h-15 rounded-full`} />
                            </View>
                            <View style={tw``}>
                                <View style={tw`flex-row items-center gap-3`}>
                                    <Text style={tw`text-[#535353] font-DegularDisplayDemoRegular text-xl`}>{orders?.provider?.name}</Text>
                                    {orders?.provider?.kyc_status === "Verified" && <SvgXml xml={IconProfileBadge} />}
                                </View>
                                <View style={tw`flex-row gap-1 items-center`}>
                                    <SvgXml xml={IconStar} />
                                    <Text style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}>{orders?.provider?.ratings_avg_rating}</Text>
                                    <Text style={tw`text-[#535353] font-DegularDisplayDemoRegular text-lg`}>({orders?.provider?.ratings_count})</Text>
                                </View>

                            </View>

                        </View>
                    </TouchableOpacity>

                    <View >
                        <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-primary`}>₦ {orders?.price}</Text>
                    </View>

                </View>

                <View style={tw`items-center py-5 gap-2`}>
                    <SvgXml xml={IconBookingConfirm} />
                    <Text style={tw`text-black font-DegularDisplayDemoMedium text-2xl`}>Order Confirmed</Text>
                </View>
            </View>

        </View>
    )
}