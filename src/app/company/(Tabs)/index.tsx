import { IconRightArrowCornerPrimaryColor, IconSearch } from "@/assets/icons";
import ServiceCard from "@/src/Components/ServiceCard";

import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ShortDataTitle from "@/src/Components/ShortDataTitle";
import UserCarousel from "@/src/Components/UserCarousel";
import CleaningData from "@/src/json/CleaningData.json";
import tw from "@/src/lib/tailwind";
import {
  useServiceNearbyQuery,
  useServicesQuery,
} from "@/src/redux/apiSlices/userProvider/homeSlices";
import { BlurView } from "@react-native-community/blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Company_Home_Index = () => {
  // ------------------ api end point ------------------
  const { data: serviceNearbyData, isLoading: serviceNearbyLoading } =
    useServiceNearbyQuery({});
  const {
    data: servicesData,
    isLoading: servicesLoading,
    error,
  } = useServicesQuery({});
  // console.log(servicesData?.data?.services, "this is servicesData");
  console.log(serviceNearbyData?.data, "this is near by service with data");

  const serviceItemRender = ({ item }) => {
    return (
      <View style={tw`relative justify-center items-center`} key={item?.id}>
        <Image
          contentFit="cover"
          style={tw`w-44 h-40 rounded-lg `}
          source={{ uri: item?.image }}
        />

        <View
          style={[
            tw`absolute bottom-2 justify-center items-center w-38 h-10 rounded-xl border border-white60 overflow-hidden`,
            Platform.OS === "android" && tw`bg-white bg-opacity-20`,
          ]}
        >
          {/* Background Blur */}
          {Platform.OS === "ios" && (
            <BlurView
              style={tw`absolute inset-0`}
              blurType="dark"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />
          )}

          {/* Foreground content (Text) */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/company/serviceNearbyHistory",
                params: { categoryService: "true" },
              })
            }
            style={[tw`flex-1 justify-center items-center `]}
            activeOpacity={0.7}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-center text-xl text-white`}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* header parts  */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/company/(Tabs)/profile")}
        onPressNotification={() =>
          router.push("/notification_Global/notifications")
        }
      />
      {/* ======================= search bar -=-o--------------------------- */}
      <View
        style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2 bg-white rounded-full my-3`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput
          placeholder="Search service"
          placeholderTextColor={"#535353"}
        />
      </View>
      {/* ======================== benner section start hare ==================== */}
      <View style={tw`flex-1 justify-center items-center `}>
        <UserCarousel />
      </View>

      {/* ================== services =================== */}
      <View style={tw``}>
        <ShortDataTitle
          FastTitle="Service"
          IconTitle="See all"
          Icon={IconRightArrowCornerPrimaryColor}
          SeeMorePathPress={() => router.push("/company/(Tabs)/services")}
        />

        <FlatList
          data={servicesData?.data?.services}
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
        <ShortDataTitle
          FastTitle="Service Near by you"
          IconTitle="See all"
          Icon={IconRightArrowCornerPrimaryColor}
          SeeMorePathPress={() => router.push("/company/serviceNearbyHistory")}
        />

        <View style={tw`gap-3 mt-3`}>
          {CleaningData?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            CleaningData.slice(0, 3).map((item, index) => (
              <ServiceCard
                key={index}
                item={item}
                index={index}
                onPress={() => router.push("/company/serviceDetails")}
              />
            ))
          )}
        </View>
      </View>
      {/* ------------------ order history -------------------------- */}
      <View>
        <ShortDataTitle
          FastTitle="Order History"
          IconTitle="See all"
          Icon={IconRightArrowCornerPrimaryColor}
          SeeMorePathPress={() => router.push("/company/bookingsHistory")}
        />

        <View style={tw`gap-3 mt-3`}>
          {CleaningData?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            CleaningData.slice(0, 2).map((item, index) => (
              <ServiceCard
                key={index}
                item={item}
                index={index}
                onPress={() => router.push("/company/serviceDetails")}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Company_Home_Index;
