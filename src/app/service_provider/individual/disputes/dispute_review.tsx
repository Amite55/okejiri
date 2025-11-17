import { IconCrossWhite, IconProfileBadge } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useDisputeDetailsQuery } from "@/src/redux/apiSlices/companyProvider/account/myDisputeSlice";
import { _HEIGHT } from "@/utils/utils";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Dispute_Review = () => {
  // =========================================== API ======================================== //
  // disput
  const { id } = useLocalSearchParams();

  const {
    data: disputeReviewData,
    isLoading: isLoadingDisputeReview,
    isError: isErrorDisputeReview,
  } = useDisputeDetailsQuery(id);

  console.log("======== dispute id ============== ", id);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const disputeGallary = disputeReviewData?.data?.attachments || [];
  const visibleImages = disputeGallary.slice(0, 3);
  const item = disputeReviewData?.data;

  console.log(
    "===================> dispute review details === ",
    JSON.stringify(item, null, 2)
  );
  console.log(
    "===================> dispute attachments details === ",
    JSON.stringify(visibleImages, null, 2)
  );

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"Dispute review"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      />
      {/* <Image 
        source={{uri: "http://103.186.20.114:8005/uploads/disputes/176293922557c7be9d8326.webp"}}
        style={tw`h-20 w-15`}
      /> */}
      <View style={tw`mt-4`}>
        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-2`}
        >
          User
        </Text>
        <View style={tw`flex-row items-center gap-1 mb-5`}>
          <Image
            style={tw`w-12 h-12 rounded-full `}
            source={{ uri: item?.opposite_party?.avatar }}
          />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
            {item?.opposite_party?.name}
          </Text>
          {item?.opposite_party?.kyc_status === "Verified" ? (
            <SvgXml xml={IconProfileBadge} />
          ) : null}
        </View>

        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1`}
        >
          Reason
        </Text>
        <Text
          style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
        >
          {item?.reason}
        </Text>

        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1 mt-4`}
        >
          Explanation
        </Text>
        <Text
          style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
        >
          {item?.details}
        </Text>
      </View>
      <Text
        style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1 mt-4`}
      >
        Files
      </Text>
      <View
        style={tw`flex-row gap-2 relative justify-center items-center mb-6`}
      >
        {visibleImages &&
          visibleImages?.map((img: string, index: any) => {
            console.log("==== img ===== ", img);
            return (
              <Image
                key={index}
                source={{ uri: img }}
                style={tw`w-30 h-30 rounded-2xl`}
                // resizeMode="cover"
                contentFit="cover"
              />
            );
          })}

        {/* ------------ when image length up to three --------------------- */}

        {disputeGallary?.length > 3 && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`absolute top-0 w-28 h-28 bg-black bg-opacity-50 rounded-2xl right-0 justify-center items-center`}
          >
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              + {disputeGallary?.length}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ---------- appeal button -----------  */}
      <PrimaryButton
        onPress={() =>
          router.push({
            pathname: "/service_provider/individual/disputes/dispute_appeal",
            params: {
              id: id,
            },
          })
        }
        contentStyle={tw`bg-primary `}
        textStyle={tw`text-white font-DegularDisplayDemoMedium text-xl`}
        titleProps="Submit your appeal"
      />

      {/* ============= Photo gallary ====================== */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
          style={[
            {
              height: _HEIGHT,
            },
            tw`justify-end items-end bg-black bg-opacity-15 `,
          ]}
        >
          <Pressable
            style={[
              {
                height: _HEIGHT * 0.5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
              tw`bg-gray-50 w-full  `,
            ]}
          >
            <View
              style={[
                tw`h-14 bg-primary flex-row justify-between items-center px-5 `,
                {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              ]}
            >
              <View />
              <Text
                style={tw`font-DegularDisplayDemoMedium  text-xl text-white`}
              >
                All files alkjhflaksjdh
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <SvgXml style={tw`p-3`} xml={IconCrossWhite} />
              </Pressable>
            </View>
            <FlatList
              data={disputeGallary}
              numColumns={3}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={tw`justify-center items-center mt-3 px-2`}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={tw`w-30 h-30 rounded-xl m-1 `}
                  contentFit="cover"
                />
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Dispute_Review;
