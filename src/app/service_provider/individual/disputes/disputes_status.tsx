import {
  IconCrossWhite,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
} from "@/assets/icons";
import {
  ImgDisputeFour,
  ImgDisputeThree,
  ImgDisputeTwo,
  ImgDisputFive,
  ImgDisputOne,
  ImgDisputSix,
  ImgProfileImg,
} from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const disputeGallary = [
    {
      id: 1,
      image: ImgDisputOne,
    },
    {
      id: 2,
      image: ImgDisputeTwo,
    },
    {
      id: 3,
      image: ImgDisputeFour,
    },
    {
      id: 4,
      image: ImgDisputeThree,
    },
    {
      id: 5,
      image: ImgDisputFive,
    },
    {
      id: 6,
      image: ImgDisputSix,
    },
  ];
  const visibleImages = disputeGallary.slice(0, 3);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"Dispute status"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
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
          nascetur id. Aliquam risus magna eu diam aliquam faucibus duis. Vitae
          eu consectetur urna eget. Habitant at gravida cras eu gravida mauris
          pellentesque. Nunc rutrum nunc augue vitae dapibus hendrerit. In at id
          amet odio dui elit a. Integer ultrices ac ut eu non suspendisse ac
          aenean tristique. Amet at tempor sed neque sem egestas in.
        </Text>
      </View>
      <Text
        style={tw`font-DegularDisplayDemoMedium text-2xl text-redWhite mb-1 mt-4`}
      >
        Files
      </Text>
      <View style={tw`flex-row gap-2 relative`}>
        {visibleImages.map((img, index) => (
          <Image
            key={index}
            source={img.image}
            style={tw`w-32 h-32 rounded-2xl`}
            resizeMode="cover"
          />
        ))}

        {/* ------------ when image length up to three --------------------- */}

        {disputeGallary.length > 3 && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`absolute top-0 w-32 h-32 bg-black opacity-50 rounded-2xl right-2 justify-center items-center`}
          >
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              + {disputeGallary.length}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={tw`flex-row my-4 justify-end items-center gap-2`}
      >
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          See dispute
        </Text>
        <SvgXml xml={IconRightArrowCornerPrimaryColor} />
      </TouchableOpacity>

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
            tw`justify-end items-end bg-black bg-opacity-15  `,
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
                All files
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <SvgXml style={tw`p-3`} xml={IconCrossWhite} />
              </Pressable>
            </View>
            <FlatList
              data={disputeGallary}
              numColumns={3}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={tw`justify-center items-center mt-3 `}
              renderItem={({ item }) => (
                <Image
                  source={item.image}
                  style={tw`w-32 h-32 rounded-xl m-1`}
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
