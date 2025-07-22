import { IconRightArrow, IconUploadImage } from "@/assets/icons";
import { ImgLoadingSuccess } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Dispute_Appeal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
      contentContainerStyle={tw`pb-4 justify-between flex-1 flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Appeal"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />
        <View style={tw`gap-3`}>
          {/*  ---------- message explanation --------------- */}

          <View style={tw``}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
            >
              Your explanation
            </Text>
            <TextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={4}
              placeholder="Type here"
              onChangeText={(newText) => console.log(newText)}
              // value={}
              textAlignVertical="top"
            />
          </View>

          {/* ------------------ Image upload ------------------ */}

          <Pressable
            style={tw`border-2 border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center   gap-2 `}
          >
            <SvgXml xml={IconUploadImage} />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl  text-black`}
            >
              Upload files
            </Text>
            <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
              Upload images or videos
            </Text>
            <TouchableOpacity
              style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-white`}
              >
                Browse
              </Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => setModalVisible(true)}
        titleProps="Submit"
        // IconProps={""}
        contentStyle={tw`mt-4`}
      />

      {/*  ========================== successful modal ======================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw` flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            {/* Check Icon */}
            <Image style={tw`mt-6 mb-2`} source={ImgLoadingSuccess} />

            {/* Success Message */}
            <Text
              style={tw`text-xl bg-secondary px-2 py-1 rounded-xl font-PoppinsRegular mt-3`}
            >
              In Review
            </Text>
            <Text style={tw`text-base text-gray-500 text-center mt-2`}>
              Your order has been placed.
            </Text>

            {/* Close Button */}
            <PrimaryButton
              onPress={() => {
                setModalVisible(false);
                router.push("/service_provider/individual/(Tabs)/home");
              }}
              titleProps="Go to home"
              IconProps={IconRightArrow}
              contentStyle={tw`mt-4`}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Dispute_Appeal;

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 350,
    maxHeight: 400,
    borderRadius: 30,
  },
});
