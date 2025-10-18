import { IconEditPen, IconPlus } from "@/assets/icons";
import { ImgCleaning, ImgEmptyService } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const CleaningData = [
  {
    id: 1,
    name: "a",
  },
  {
    id: 2,
    name: "a",
  },
  {
    id: 3,
    name: "a",
  },
  {
    id: 4,
    name: "a",
  },
  {
    id: 5,
    name: "a",
  },
];

const My_Service = () => {
  const serviceItemRender = () => {
    return (
      <View style={tw`bg-white p-4 rounded-2xl`}>
        <View style={tw`justify-center items-center`}>
          <Image style={tw`h-44 w-[98%] rounded-2xl`} source={ImgCleaning} />
        </View>

        <View style={tw`flex-row justify-between items-center my-4`}>
          <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
            Service title goes here.
          </Text>
          <TouchableOpacity
            onPress={() =>
              router.push(
                "/service_provider/individual/my_services/edit_package"
              )
            }
            style={tw`p-2`}
          >
            <SvgXml xml={IconEditPen} />
          </TouchableOpacity>
        </View>

        {/* -------- detailing ---------- */}

        <View style={tw`pl-8 gap-2`}>
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-2 h-2 bg-black`} />
            <Text style={tw`font-DegularDisplayDemoRegular text-black text-xl`}>
              Dusting of all surfaces
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-2 h-2 bg-black`} />
            <Text style={tw`font-DegularDisplayDemoRegular text-black text-xl`}>
              Sweeping and mopping floors
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-2 h-2 bg-black`} />
            <Text style={tw`font-DegularDisplayDemoRegular text-black text-xl`}>
              Trash removal
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-2 h-2 bg-black`} />
            <Text style={tw`font-DegularDisplayDemoRegular text-black text-xl`}>
              Bathroom wipe-down
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-2 h-2 bg-black`} />
            <Text style={tw`font-DegularDisplayDemoRegular text-black text-xl`}>
              Kitchen surface wipe-down
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/service_provider/individual/my_services/delivery_extension"
            )
          }
          style={tw`flex-row justify-between items-center px-3 my-3`}
        >
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black `}>
            Expected delivery time
          </Text>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black `}>
            2 hours
          </Text>
        </TouchableOpacity>

        {/* Cost Section */}
        <View
          style={tw`bg-primary w-full h-14 rounded-full flex-row justify-between items-center px-4 my-2`}
        >
          <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
            Cost:{" "}
          </Text>
          <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
            {" "}
            ₦ 49.00
          </Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={CleaningData}
      renderItem={serviceItemRender}
      ListHeaderComponent={() => (
        <View>
          <BackTitleButton
            pageName={"My services"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />
          <View style={tw`flex-row justify-between items-center mt-2 `}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              3 services
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push(
                  "/service_provider/individual/my_services/add_package"
                )
              }
              style={tw`flex-row justify-center items-center gap-2 w-40 h-14 bg-primary rounded-full`}
            >
              <SvgXml xml={IconPlus} />
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
              >
                Add more
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`px-5  gap-4 `}
      style={tw`flex-1 bg-base_color`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={tw`flex-1 justify-center items-center gap-3`}>
          <Image style={tw`w-full h-80`} source={ImgEmptyService} />
          <Text style={tw`font-DegularDisplayDemoRegular text-3xl text-black`}>
            Nothing to show here
          </Text>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl to-black`}>
            Please add a service to see them here.
          </Text>
        </View>
      )}
    />
  );
};

export default My_Service;
