import { ImgManageDiscount } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useManage_discountseMutation } from "@/src/redux/apiSlices/IndividualProvider/account/manageDiscountsSlice";
import { router } from "expo-router";
import React, { useState } from "react";
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
  const [manage_discountse, { isLoading }] = useManage_discountseMutation();
  const [discountAmount, setDiscountAmount] = useState("10");

  const handleSubmit = async () => {
    try {
      const res = await manage_discountse({
        discount_amount: Number(discountAmount),
      }).unwrap();

      console.log(res?.message);
      console.log(res?.message);
      if (res.status === "success") {
        router.push({
          pathname: "/Toaster",
          params: { res: res?.message },
        });
      }
      router.back();
    } catch (error: any) {
      router.push({
        pathname: "/Toaster",
        params: { res: error.massage || "Add discount error!" },
      });
    }
  };

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
              titleTextStyle={tw`text-xl`}
            />
            <View style={tw`justify-center items-center`}>
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
            <View>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
              >
                Give discount for
              </Text>
              <View
                style={tw`border border-gray-300 h-14 rounded-full px-4 flex-row justify-between items-center`}
              >
                <TextInput
                  style={tw`flex-1`}
                  keyboardType="numeric"
                  value={discountAmount}
                  onChangeText={setDiscountAmount}
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

          {/* ----------------------- submit button -------------- */}
          <PrimaryButton
            onPress={handleSubmit}
            titleProps={isLoading ? "Saving..." : "Save"}
            contentStyle={tw`mt-4`}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Manage_Discounts;
