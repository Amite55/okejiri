import { IconCrossWhite, IconSettingsPrimary } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const ServiceRequestModal = () => {
  return (
    <Pressable
      style={tw`flex-1 justify-center items-center bg-black bg-opacity-15`}
    >
      <View style={tw`bg-white w-[90%]  rounded-2xl h-6/12 `}>
        <View
          style={[
            tw`flex-row items-center justify-between px-5 bg-primary h-12 `,
            { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
          ]}
        >
          <View />
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white`}>
            Request to add service
          </Text>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
            <SvgXml xml={IconCrossWhite} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={tw`flex-grow justify-between `}>
          <View>
            <View style={tw`justify-center items-center mt-4`}>
              <SvgXml xml={IconSettingsPrimary} />
            </View>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black text-center mt-4`}
            >
              What kind of service you want to add ?
            </Text>

            <TextInput
              style={tw`border border-gray-400 h-14 px-4 rounded-full mt-2 mx-4`}
              placeholder="Type here..."
            />
          </View>

          <View style={tw`px-4 pb-6`}>
            <PrimaryButton titleProps="Send request" />
          </View>
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default ServiceRequestModal;
