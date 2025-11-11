

import { IconSearch } from '@/assets/icons'
import BackTitleButton from '@/src/lib/HeaderButtons/BackTitleButton'
import tw from '@/src/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'

export default function Assign_Provider() {
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
        pageName="Assign Provider"
        onPress={() => router.back()}
        titleTextStyle={tw`text-3xl font-DegularDisplayDemoRegular`}
      />

      <View
        style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2  rounded-full my-3`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput
          style={tw`flex-1`}
          placeholder="Search chats"
          placeholderTextColor={"#535353"}
        />
      </View>
    </ScrollView>
  )
}