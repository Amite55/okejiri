
import { IconStar } from '@/assets/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from '../lib/tailwind'

export default function UserReviewCard({ item }: { item: any }) {
    return (
        <View style={tw`bg-white px-4 py-2 w-72 rounded-2xl `}>
            <View style={tw`flex-row items-center gap-3`}>
                <View>
                    <Image source={{ uri: item.user.avatar }} style={tw`w-10 h-10`} />
                </View>
                <View>
                    <Text style={tw`font-DegularDisplayDemoMedium text-base`}>{item.user.name}</Text>
                    <View style={tw`flex-row gap-2 items-center`}>
                        <Text style={tw`text-primary font-DegularDisplayDemoMedium text-base`}>{item.rating}</Text>
                        <SvgXml xml={IconStar} />
                    </View>
                </View>

            </View>
            <View>
                <Text style={tw`font-DegularDisplayDemoRegular text-base`}>{item.review}</Text>
            </View>

        </View>
    )
}