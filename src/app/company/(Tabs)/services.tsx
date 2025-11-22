import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ServicePageSkeleton from "@/src/Components/skeletons/ServicePageSkeleton ";
import tw from "@/src/lib/tailwind";
import { useServicesQuery } from "@/src/redux/apiSlices/userProvider/homeSlices";

import { BlurView } from "@react-native-community/blur";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Services = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  // ------------------ api end point ------------------
  const {
    data: getServicesData,
    isLoading: servicesLoading,
    refetch: serviceRefetch,
    error,
  } = useServicesQuery({});

  if (servicesLoading) {
    return <ServicePageSkeleton />;
  }

  // [----------------- refresh function ----------------]
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([getServicesData, serviceRefetch]);
    } catch (error) {
      console.log(error, "refresh error");
    } finally {
      setRefreshing(false);
    }
  };

  const serviceItemRender = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/company/categoryByService",
            params: { categoryService: item?.name, service_id: item?.id },
          })
        }
        activeOpacity={0.7}
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
                pathname: "/company/categoryByService",
                params: { categoryService: item?.name, service_id: item?.id },
              })
            }
            style={tw`flex-1 justify-center items-center`}
            // activeOpacity={0.6}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-center text-xl text-white`}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // ----------- Header content -----------//

  const serviceHeaderRender = () => {
    return (
      <View>
        <ServiceProfileHeaderInfo
          onPress={() => router.push("/company/(Tabs)/profile")}
          onPressNotification={() =>
            router.push("/company/userNotifications/userNotification")
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
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={getServicesData?.data.services}
      renderItem={serviceItemRender}
      ListHeaderComponent={serviceHeaderRender}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponentStyle={tw`w-full mb-3`}
      contentContainerStyle={tw`pt-1 items-center px-5 gap-3 pb-30 bg-base_color`}
      style={tw`flex-1 bg-base_color`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Services;
