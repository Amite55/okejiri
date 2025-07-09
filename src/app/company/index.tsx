import {
  IconLocation,
  IconNotificationDark,
  IconRightArrowCornerPrimaryColor,
  IconSearch,
} from "@/assets/icons";
import { ImgBanner, ImgProfileImg } from "@/assets/images/image";
import CleaningData from "@/src/json/CleaningData.json";
import ServicesData from "@/src/json/ServiceData.json";
import tw from "@/src/lib/tailwind";
import { BlurView } from "expo-blur";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const Company_Home_Index = () => {
  const serviceItemRender = ({ item }) => {
    return (
      <View style={tw`relative justify-center items-center`} key={item?.id}>
        <Image
          resizeMode="cover"
          style={tw`w-44 h-48 rounded-lg `}
          source={{ uri: item?.image }}
        />

        <TouchableOpacity
          style={tw`absolute bottom-2   justify-center items-center  right-1 w-38 rounded-xl text-center h-10 border border-white `}
        >
          <BlurView
            style={tw`w-38 rounded-xl text-center h-10 justify-center items-center`}
            blurType="light"
            blurAmount={10}
          >
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white`}>
              {item?.name}
            </Text>
          </BlurView>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={tw`flex-1 bg-base_color px-5`}>
      {/* header parts  */}
      <View style={tw`py-4 flex-row items-center justify-between `}>
        <View style={tw`flex-row justify-start items-center  gap-4`}>
          <View style={tw` `}>
            <Image style={tw`w-16 h-16 rounded-full `} source={ImgProfileImg} />
          </View>
          <View>
            <View style={tw` items-start gap-2`}>
              <Text
                style={tw`font-DegularDisplayDemoBold flex-row items-center text-black text-2xl`}
              >
                John Doe,
              </Text>
              <View style={tw`flex-row justify-start items-center gap-1`}>
                <SvgXml xml={IconLocation} />
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                >
                  Dhaka, Bangladesh
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          // onPress={() => router.push("/(notification)/notification")}
          style={tw`w-18 h-16 p-3 text-center bg-white rounded-3xl justify-center items-center`}
        >
          <SvgXml xml={IconNotificationDark} />
        </TouchableOpacity>
      </View>

      {/* ======================= search bar -=-o--------------------------- */}
      <View
        style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2 bg-white rounded-full my-2`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput placeholder="Search service" />
      </View>

      {/* ======================== benner section start hare ==================== */}
      <View style={tw`flex-1 justify-center items-center `}>
        <Image
          style={tw`w-[97%] h-36 rounded-xl`}
          resizeMode="cover"
          source={ImgBanner}
        />
      </View>

      {/* ================== services =================== */}
      <View style={tw``}>
        <View style={tw`flex-row justify-between items-center mt-6 `}>
          <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}>
            Service
          </Text>
          <TouchableOpacity
            style={tw`border border-primary rounded-full w-28 h-11 flex-row justify-between items-center px-4`}
          >
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}
            >
              See all
            </Text>
            <SvgXml xml={IconRightArrowCornerPrimaryColor} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={ServicesData}
          renderItem={serviceItemRender}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={tw`mt-4 pl-4 gap-3 `}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* ===================== service nearby you ===================== */}

      <View>
        <View style={tw`flex-row justify-between items-center mt-6 `}>
          <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}>
            Services nearby you
          </Text>
          <TouchableOpacity
            style={tw`border border-primary rounded-full w-28 h-11 flex-row justify-between items-center px-4`}
          >
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}
            >
              See all
            </Text>
            <SvgXml xml={IconRightArrowCornerPrimaryColor} />
          </TouchableOpacity>
        </View>

        <View style={tw`gap-3`}>
          {CleaningData?.length === 0 ? (
            <Text>Your ServiCe No Data</Text>
          ) : (
            CleaningData.map((item) => (
              <Pressable
                style={tw`flex-row justify-between items-center rounded-xl bg-white p-1.5`}
                key={item?.Id}
              >
                <Image
                  style={tw`w-20 h-20 rounded-2xl`}
                  source={{ uri: item?.image }}
                />
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    {item?.title}
                  </Text>
                  <View>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
                    >
                      {item?.profile_name}
                    </Text>
                  </View>
                  <StarRating
                    starSize={24}
                    rating={item?.rating || 0}
                    onChange={() => {}}
                  />
                </View>
                <View style={tw`justify-between gap-3`}>
                  <Text>₦{item?.price}</Text>
                  <View
                    style={tw`bg-primary w-20 h-9 justify-center items-center rounded-lg`}
                  >
                    <Text>{item?.type}</Text>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Company_Home_Index;
