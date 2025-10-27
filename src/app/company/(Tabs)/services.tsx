import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import tw from "@/src/lib/tailwind";
import { useGetServicesQuery } from "@/src/redux/apiSlices/userProvider/servicesSlices";
import { BlurView } from "@react-native-community/blur";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const services = () => {
  const { data: getServicesData, isLoading } = useGetServicesQuery({});
  console.log("getServicesData", getServicesData, "getServicesData");
  // const { image, name } = getServicesData?.data.services;

  const serviceItemRender = ({ item }: any) => {
    return (
      <View
        style={tw`relative justify-center items-center px-2 `}
        key={item?.id}
      >
        <Image
          resizeMode="cover"
          style={tw`w-44 h-48 rounded-lg `}
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
            style={tw`flex-1 justify-center items-center`}
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

  // ----------- Header content -----------//

  const serviceHeaderRender = () => {
    return (
      <View>
        <ServiceProfileHeaderInfo
          onPress={() => router.push("/company/(Tabs)/profile")}
          onPressNotification={() =>
            router.push("/notification_Global/notifications")
          }
        />
        <Text
          style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}
        >
          Service
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-base_color mb-24`}>
      <FlatList
        data={getServicesData?.data.services}
        renderItem={serviceItemRender}
        ListHeaderComponent={serviceHeaderRender}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponentStyle={tw`w-full mb-3`}
        contentContainerStyle={tw`pt-2 items-center px-5 gap-3`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default services;
