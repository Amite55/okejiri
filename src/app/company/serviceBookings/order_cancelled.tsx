import { IconBookingCancelled } from '@/assets/icons';
import BackTitleButton from '@/src/lib/HeaderButtons/BackTitleButton';
import tw from '@/src/lib/tailwind';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function OrderCancel() {
    const { title, sub_title, reason } = useLocalSearchParams();
    return (
        <View style={tw`flex-1 bg-base_color px-2`}>
            <BackTitleButton
                pageName="Booking cancelled"
                onPress={() => router.back()}
                titleTextStyle={tw`text-xl`}
            />
            <View style={tw`items-center`}>
                <SvgXml xml={IconBookingCancelled} />
                <View style={tw`items-center py-6`}>
                    <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>Booking cancelled from admin</Text>
                    <Text style={tw`font-DegularDisplayDemoRegular text-lg text-[#4D4D4D]`}>You will get your refund within 24 hours</Text>
                </View>

            </View>
            <View style={tw`px-4`}>
                <Text style={tw`font-DegularDisplayDemoMedium text-xl`} >Reason</Text>
                <View style={tw`py-6`}>
                    <Text style={tw`font-DegularDisplayDemoRegular text-xl`}>{reason}</Text>
                </View>
            </View>
        </View>
    )
}