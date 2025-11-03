import { IconDelete, IconDeleteWhite, IconProfileBadge } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import DeleteModal from "@/src/Components/deleteModal";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useDisputeDeleteMutation,
  useDisputeDetailsQuery,
} from "@/src/redux/apiSlices/userProvider/account/myDisputesSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Disputes_Status = () => {
  const { id } = useLocalSearchParams();
  const { data: DisputeDetails, isLoading } = useDisputeDetailsQuery(id);
  const [disputeDelete] = useDisputeDeleteMutation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#" />
        <Text style={tw`text-gray-600 text-base mt-3 font-poppins`}>
          Loading dispute details...
        </Text>
      </View>
    );
  }
  console.log("DisputeDetails", DisputeDetails, "DisputeDetails");
  const handelDeleted = async () => {
    const res = await disputeDelete(id).unwrap();
    // console.log(res);
  };

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
              {DisputeDetails?.data?.status}
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-2`}
          >
            {DisputeDetails?.data.raised_by_role}
          </Text>
          <View style={tw`flex-row items-center gap-1 mb-5`}>
            <Image style={tw`w-12 h-12 rounded-full `} source={ImgProfileImg} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              {DisputeDetails?.data?.opposite_party?.name}
            </Text>
            <SvgXml xml={IconProfileBadge} />
          </View>

          <Text
            style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1`}
          >
            {DisputeDetails?.data?.reason}
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
            {DisputeDetails?.data?.details}
          </Text>
        </View>
      </View>
      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => setModalVisible(true)}
        titleProps="Delete dispute"
        IconProps={IconDeleteWhite}
        contentStyle={tw`mt-4 bg-redDeep`}
      />
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteIcon={IconDelete}
        buttonTitle="Yes, Log out"
        modalTitle="Are you sure you want to delete this dispute?"
        onPress={() => {
          handelDeleted();
        }}
      />
    </ScrollView>
  );
};

export default Disputes_Status;
