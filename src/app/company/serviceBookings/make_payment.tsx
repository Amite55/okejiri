import {
  IconBalance,
  IconMaster,
  IconRightArrow,
  IconVisa,
} from "@/assets/icons";
import { ImgLoadingSuccess } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Make_Payment = () => {
  const [isMakePayment, setIsMakePayment] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
      contentContainerStyle={tw`pb-8 justify-between flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Payment"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />
        {/* ----------------- hare is make payment and not make payment ------------- */}

        <View
          style={[
            tw`border border-slate-300 rounded-full h-12 flex-row justify-between items-center my-7`,
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsMakePayment(false)}
            style={[
              tw`w-48 h-full rounded-full justify-center items-center`,
              !isMakePayment ? tw`bg-primary` : tw`bg-transparent`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-base`,
                !isMakePayment ? tw`text-white` : tw`text-regularText`,
              ]}
            >
              Use from balance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsMakePayment(true)}
            style={[
              tw`w-48 h-full rounded-full justify-center items-center`,
              isMakePayment ? tw`bg-primary` : tw`bg-transparent`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-base`,
                isMakePayment ? tw`text-white` : tw`text-regularText`,
              ]}
            >
              Make payment
            </Text>
          </TouchableOpacity>
        </View>

        {/* ----------------------- Use from balance -0----------------- */}

        {!isMakePayment && (
          <View style={tw`gap-3`}>
            <View
              style={tw`bg-white h-40 rounded-3xl flex-row justify-between items-center px-8`}
            >
              <View style={tw`gap-2`}>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                >
                  Available balance
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}
                >
                  ₦ 1000.50
                </Text>
              </View>

              <View
                style={tw`border border-primary w-24 h-24 rounded-full justify-center items-center`}
              >
                <SvgXml xml={IconBalance} />
              </View>
            </View>

            {/* --------------------- Cost -=----------------- */}

            <View
              style={tw`bg-white h-14 rounded-2xl flex-row justify-between items-center px-8`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Cost
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-primary`}
              >
                ₦50.00
              </Text>
            </View>

            {/* -------------------Remaining balance will be: ---------------------- */}
            <View
              style={tw`bg-white h-14 rounded-2xl flex-row justify-between items-center px-8`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Remaining balance will be:
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-primary`}
              >
                ₦950.50
              </Text>
            </View>
          </View>
        )}

        {/* ------------------- Make payment -------------------------- */}
        {isMakePayment && (
          <View style={tw` pt-3  `}>
            <Text style={tw`text-black font-DegularDisplayDemoBold text-2xl`}>
              Payment procedure
            </Text>

            <View style={tw`mt-6`}>
              <View style={tw`flex-row justify-between `}>
                <Text
                  style={tw`font-bold text-sm font-DegularDisplayDemoRegular`}
                >
                  Card Information
                </Text>
                <TouchableOpacity
                  style={tw`flex-row items-center gap-1`}
                ></TouchableOpacity>
              </View>

              <View style={tw`my-1`}>
                <View style={tw`border border-gray-300 rounded-lg p-3`}>
                  <View style={tw`flex-row justify-between items-center`}>
                    <TextInput
                      placeholder="card number"
                      keyboardType="numeric"
                      style={tw`text-lg flex-1`}
                    />
                    <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconVisa} />
                    <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconMaster} />
                  </View>
                </View>
                <View style={tw`flex-row mt-3`}>
                  <View
                    style={tw`flex-1 border border-gray-300 rounded-lg p-3 mr-2`}
                  >
                    <TextInput
                      placeholder="MM / YY"
                      keyboardType="numeric"
                      style={tw`text-lg`}
                    />
                  </View>
                  <View
                    style={tw`flex-1 border border-gray-300 rounded-lg p-3`}
                  >
                    <TextInput
                      placeholder="CVC"
                      keyboardType="numeric"
                      secureTextEntry
                      style={tw`text-lg`}
                    />
                  </View>
                </View>

                <Text style={tw`text-lg font-DegularDisplayDemoSemibold mt-5`}>
                  Billing address
                </Text>

                <View style={tw`mt-2`}></View>
                <View style={tw`border border-gray-300 rounded-lg p-3 mt-2`}>
                  <TextInput
                    placeholder="ZIP"
                    keyboardType="numeric"
                    style={tw`text-lg`}
                  />
                </View>
              </View>
            </View>
            {/*  ========== modal open ============ */}
          </View>
        )}
      </View>

      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() => setModalVisible(true)}
        titleProps="Next  3/4"
        IconProps={IconRightArrow}
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
                router.push("/company/(Tabs)");
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

export default Make_Payment;
