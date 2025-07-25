import {
  IconPlus,
  IconRightArrowCornerGray,
  IconRightCornerArrowWhite,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const My_Employee = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"My employees"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-2xl`}
        // contentStyle={tw`px-5`}
      />

      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`font-DegularDisplayDemoRegular text-black text-xl`}>
          Total : 200 employees
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push(
              "/service_provider/company/my_employees/add_new_employee"
            )
          }
          style={tw`bg-primary w-36 h-14 flex-row justify-center items-center rounded-xl gap-2`}
        >
          <SvgXml xml={IconPlus} />
          <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center justify-between gap-3 mt-8`}>
        <View
          style={tw`flex-1 flex-row justify-between items-center bg-deepBlue50 h-12 rounded-2xl px-5`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-4 h-4 rounded-full bg-deepBlue200`} />
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              100
            </Text>
          </View>
          <SvgXml xml={IconRightArrowCornerGray} />
        </View>

        <View
          style={tw`flex-1 flex-row justify-between items-center bg-white h-12 rounded-2xl px-5`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-4 h-4 rounded-full bg-success600`} />
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              150
            </Text>
          </View>
          <SvgXml xml={IconRightArrowCornerGray} />
        </View>
      </View>

      <View style={tw`gap-2 my-5`}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Pressable
            onPress={() =>
              router.push(
                "/service_provider/company/my_employees/employees_details"
              )
            }
            key={item}
            style={tw`relative bg-white flex-row items-center gap-4 p-2 rounded-lg`}
          >
            <Image style={tw`w-24 h-24 rounded-xl`} source={ImgProfileImg} />
            <View>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Mark Jukerburg
              </Text>

              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-2.5 h-2.5 rounded-full bg-success600`} />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-regularText`}
                >
                  Cleaner
                </Text>
              </View>

              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
              >
                30 service completed
              </Text>
            </View>

            <TouchableOpacity
              style={tw`absolute right-1 top-1 w-11 h-11 rounded-2xl bg-secondary justify-center items-center`}
            >
              <SvgXml xml={IconRightCornerArrowWhite} />
            </TouchableOpacity>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default My_Employee;
