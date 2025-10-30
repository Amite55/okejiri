import { IconDeleteWhite, IconProfileBadge } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useDisputeDetailsQuery } from "@/src/redux/apiSlices/userProvider/account/myDisputesSlices";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Disputes_Status = () => {
  const { id } = useLocalSearchParams();
  const {} = useDisputeDetailsQuery({ id });
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-6 justify-between flex-1 flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Dispute status"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />

        <View style={tw`justify-center items-center`}>
          <View
            style={tw`flex-row justify-center items-center h-14 w-36 gap-2 rounded-full bg-violet`}
          >
            <View style={tw`w-2 h-2 rounded-full bg-white`} />
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white`}>
              Pending
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-2`}
          >
            Provider
          </Text>
          <View style={tw`flex-row items-center gap-1 mb-5`}>
            <Image style={tw`w-12 h-12 rounded-full `} source={ImgProfileImg} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Profile Name
            </Text>
            <SvgXml xml={IconProfileBadge} />
          </View>

          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1`}
          >
            Reason
          </Text>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
          >
            Provider harassed me
          </Text>

          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1 mt-4`}
          >
            Explanation
          </Text>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
          >
            Lorem ipsum dolor sit amet consectetur. Id in tempor varius arcu
            aliquet habitasse tristique vitae sapien. Tincidunt purus morbi
            nascetur id. Aliquam risus magna eu diam aliquam faucibus duis.
            Vitae eu consectetur urna eget. Habitant at gravida cras eu gravida
            mauris pellentesque. Nunc rutrum nunc augue vitae dapibus hendrerit.
            In at id amet odio dui elit a. Integer ultrices ac ut eu non
            suspendisse ac aenean tristique. Amet at tempor sed neque sem
            egestas in.
          </Text>
        </View>
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => router.push("/company/(Tabs)")}
        titleProps="Delete dispute"
        IconProps={IconDeleteWhite}
        contentStyle={tw`mt-4 bg-redDeep`}
      />
    </ScrollView>
  );
};

export default Disputes_Status;
