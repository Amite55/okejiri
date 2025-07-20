import { ImgManageDiscount } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Manage_Discounts = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={tw`flex-1`}
      >
        <View
          style={tw`flex-1 flex-grow justify-between pb-5 bg-base_color px-5`}
        >
          <View>
            <BackTitleButton
              pageName={"Bookings history"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-2xl`}
            />
            <View style={tw`justify-center items-center `}>
              <Image
                style={tw`w-72 h-64`}
                resizeMode="contain"
                source={ImgManageDiscount}
              />
            </View>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-regularText text-center my-2`}
            >
              This discount is for group bookings. When an user select your
              service and want group bookings then they will get this discount.
            </Text>
            <View style={tw``}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
              >
                Give discount for
              </Text>
              <View
                style={tw`border  border-gray-300 h-14 rounded-full px-4 flex-row justify-between items-center`}
              >
                <TextInput
                  style={tw`flex-1`}
                  //   placeholder="10"
                  defaultValue="10"
                  onChangeText={(newText) => console.log(newText)}
                  // value={}
                  textAlignVertical="top"
                />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                >
                  %
                </Text>
              </View>
            </View>
          </View>

          {/* ----------------------- submit password -------------- */}
          <PrimaryButton
            // onPress={() => handleSubmit()}
            onPress={() => router.push("/service_provider/individual/account")}
            titleProps="Save"
            // IconProps={IconRightArrow}
            contentStyle={tw`mt-4`}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Manage_Discounts;
