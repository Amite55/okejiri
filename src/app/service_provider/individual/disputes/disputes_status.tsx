import {
  IconCrossWhite,
  IconRightArrowCornerPrimaryColor,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useDisputeDetailsQuery } from "@/src/redux/apiSlices/companyProvider/account/myDisputeSlice";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Disputes_Status = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { id } = useLocalSearchParams();
  const { data: disputeDetails, isLoading } = useDisputeDetailsQuery(id);

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

  const dispute = disputeDetails?.data || {};

  // ********** attachments from API **********
  const attachments = dispute?.attachments || [];

  // show only first three
  const visibleImages = attachments.slice(0, 3);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"Dispute status"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />

      {/* STATUS */}
      <View style={tw`justify-center items-center`}>
        <View
          style={tw`flex-row justify-center items-center h-14 w-36 gap-2 rounded-full bg-violet`}
        >
          <View style={tw`w-2 h-2 rounded-full bg-white`} />
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white`}>
            {dispute?.status || "Pending"}
          </Text>
        </View>
      </View>

      {/* REASON / EXPLANATION */}
      <View>
        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1 mt-4`}
        >
          Explanation
        </Text>
        <Text
          style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
        >
          {dispute?.details}
        </Text>
      </View>

      {/* FILES */}
      <Text
        style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1 mt-4`}
      >
        Files
      </Text>

      <View style={tw`flex-row items-center justify-center gap-2 relative`}>
        {visibleImages.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={tw`w-28 h-28 rounded-2xl`}
            resizeMode="cover"
          />
        ))}

        {/* If more than 3 */}
        {attachments.length > 3 && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`absolute top-0 w-28 h-28 bg-black bg-opacity-60 rounded-2xl right-2 justify-center items-center`}
          >
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              +{attachments.length - 3}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* See dispute */}
      <TouchableOpacity
        onPress={() =>
          router.push("/service_provider/individual/disputes/dispute_review")
        }
        style={tw`flex-row my-4 justify-end items-center gap-2`}
      >
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          See dispute
        </Text>
        <SvgXml xml={IconRightArrowCornerPrimaryColor} />
      </TouchableOpacity>

      {/* ---------- MODAL: ALL IMAGES ---------- */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={[
            { height: _HEIGHT },
            tw`justify-end items-end bg-black bg-opacity-15`,
          ]}
        >
          <Pressable
            style={[
              {
                height: _HEIGHT * 0.5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
              tw`bg-gray-50 w-full`,
            ]}
          >
            <View
              style={[
                tw`h-14 bg-primary flex-row justify-between items-center px-5`,
                {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              ]}
            >
              <View />
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
              >
                All files
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <SvgXml style={tw`p-3`} xml={IconCrossWhite} />
              </Pressable>
            </View>

            <FlatList
              data={attachments}
              numColumns={3}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={tw`justify-center items-center mt-3 px-2`}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={tw`w-28 h-28 rounded-xl m-1`}
                  resizeMode="cover"
                />
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Disputes_Status;
