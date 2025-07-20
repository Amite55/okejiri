import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import MasonryList from "@react-native-seoul/masonry-list";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  IconCross,
  IconDeleteRed,
  IconPlus,
  IconSwapGreen,
  IconThreeWhite,
} from "@/assets/icons";
import {
  ImgportfolioFive,
  ImgportfolioFour,
  ImgportfolioOne,
  ImgportfolioSeven,
  ImgportfolioSix,
  ImgportfolioThree,
  ImgportfolioTwo,
} from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import { SvgXml } from "react-native-svg";

const imageData = [
  { id: "1", image: ImgportfolioOne },
  { id: "2", image: ImgportfolioTwo },
  { id: "3", image: ImgportfolioThree },
  { id: "4", image: ImgportfolioFour },
  { id: "5", image: ImgportfolioFive },
  { id: "6", image: ImgportfolioSix },
  { id: "7", image: ImgportfolioSeven },
];

const Portfolio = () => {
  const [selectModalVisible, setSelectModalVisible] = React.useState(false);

  return (
    <View style={tw`flex-1 bg-base_color px-3 pb-2`}>
      <MasonryList
        data={imageData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <BackTitleButton
            pageName="Portfolio"
            onPress={() => router.back()}
            titleTextStyle={tw`text-2xl`}
          />
        }
        ListFooterComponent={
          <PrimaryButton
            // onPress={() => router.push("/company/(Tabs)")}
            titleProps="Send"
            IconProps={IconPlus}
            contentStyle={tw`mt-4`}
          />
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3 `}
        style={tw`pt-2`}
        renderItem={({ item }) => (
          <View style={tw`relative mb-3 px-1`}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={[
                tw`w-full rounded-2xl`,
                { height: Math.random() * 90 + 220 }, // random height between 180-240
              ]}
            />
            <TouchableOpacity
              onPress={() => setSelectModalVisible(true)}
              style={tw`absolute top-3 right-3 justify-center items-center w-10 h-10 rounded-full border border-white`}
            >
              <SvgXml xml={IconThreeWhite} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/*  ------------- next button -------------------- */}

      {/* ========= selected modal ============= */}
      <Modal
        animationType="none"
        transparent={true}
        visible={selectModalVisible}
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            <View style={tw`w-full flex-row justify-between items-center`}>
              <Text style={tw`text-2xl font-bold mt-3`}>Select one</Text>
              <Pressable
                style={tw`p-3`}
                onPress={() => setSelectModalVisible(false)}
              >
                <SvgXml xml={IconCross} />
              </Pressable>
            </View>

            <View style={tw`w-full m-4`}>
              <TouchableOpacity
                // onPress={() => {
                //   setSelectModalVisible(false);
                //   setTimeout(() => {
                //     imagePickSwap();
                //   }, 300);
                // }}
                style={tw`flex-row justify-center items-center border border-[#0063E580] w-full p-1 rounded-lg gap-2 mb-2`}
              >
                <SvgXml xml={IconSwapGreen} />
                <Text>Swap image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={handlePhotoDelete}
                style={tw`flex-row justify-center items-center border border-[#C47575] w-full p-1 rounded-lg gap-2`}
              >
                <SvgXml xml={IconDeleteRed} />
                <Text>Delete image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Portfolio;
