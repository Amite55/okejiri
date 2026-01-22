import { IconRightArrowCornerPrimaryColor } from "@/assets/icons";
import BookingCard from "@/src/Components/BookingCard";
import ServiceCard from "@/src/Components/ServiceCard";

import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ShortDataTitle from "@/src/Components/ShortDataTitle";
import UserHomeSkeleton from "@/src/Components/skeletons/UserHomeSkeleton";
import UserCarousel from "@/src/Components/UserCarousel";
import { useCheckLocation } from "@/src/hooks/useLocation";
import CleaningData from "@/src/json/CleaningData.json";
import tw from "@/src/lib/tailwind";
import { useUpdateLatLongMutation } from "@/src/redux/apiSlices/authSlices";
import { useBookingsHistoryQuery } from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import {
  useServiceNearbyQuery,
  useServicesQuery,
} from "@/src/redux/apiSlices/userProvider/homeSlices";
import { BlurView } from "@react-native-community/blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Company_Home_Index = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { getLocation, loading: locationLoading } = useCheckLocation();

  // ------------------ api end point ------------------
  const {
    data: serviceNearbyData,
    isLoading: serviceNearbyLoading,
    refetch: nearByServiceRefetch,
  } = useServiceNearbyQuery({ per_page: 10, page: 1 });
  const {
    data: servicesData,
    isLoading: servicesLoading,
    refetch: serviceRefetch,
  } = useServicesQuery({});
  const {
    data: getMyServiceBookingsData,
    isLoading: isMyServiceBookingsLoading,
    refetch: refetchBookingsHistory,
  } = useBookingsHistoryQuery({ page: 1, per_page: 10 });
  const [updateLatLong, { isLoading: isUpdateLatLongLoading }] =
    useUpdateLatLongMutation();

  // ================location update when render this screen ==================
  const handleLocation = async () => {
    const newLocation = await getLocation();
    if (newLocation?.latitude && newLocation?.longitude) {
      const response = await updateLatLong({
        latitude: newLocation?.latitude,
        longitude: newLocation?.longitude,
      }).unwrap();
      if (response) {
        console.log("updated");
      }
    } else {
      router.push({
        pathname: "/Toaster",
        params: { res: "Failed to get location" },
      });
    }
  };
  // ===============location update when render this screen ==================
  useEffect(() => {
    handleLocation();
  }, []);

  const serviceItemRender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/company/categoryByService",
            params: { categoryService: item?.name, service_id: item?.id },
          })
        }
        activeOpacity={0.7}
        style={tw`relative justify-center items-center`}
        key={item?.id}
      >
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
                pathname: "/company/categoryByService",
                params: { categoryService: item?.name, service_id: item?.id },
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
      </TouchableOpacity>
    );
  };
  // ================ this is skeleton loader ===================
  if (servicesLoading || serviceNearbyLoading || isMyServiceBookingsLoading) {
    return <UserHomeSkeleton />;
  }

  // [----------------- refresh function ----------------]
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([nearByServiceRefetch(), serviceRefetch()]);
    } catch (error) {
      console.log(error, "refresh error");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
          router.push("/company/userNotifications/userNotification")
        }
      />
      {/* ======================= search bar -=-o--------------------------- */}
      {/* <View
        style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2 bg-white rounded-full my-3`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput
          placeholder="Search service"
          placeholderTextColor={"#535353"}
        />
      </View> */}

      {/* ======================== benner section start hare ==================== */}
      <View style={tw`flex-1 justify-center items-center  pt-2`}>
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
            <View>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue200 text-center`}
              >
                No services nearby yet
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-sm text-deepBlue100 text-center`}
              >
                Okejiri has not reached this area for now, but we&apos;re
                expanding fast
              </Text>
            </View>
          ) : (
            serviceNearbyData?.data?.data.map((item, index) => (
              <ServiceCard
                key={index}
                item={item}
                index={index}
                onPress={() =>
                  router.push({
                    pathname: "/company/serviceDetails",
                    params: { id: item?.id },
                  })
                }
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
          {getMyServiceBookingsData?.data?.data?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            getMyServiceBookingsData?.data?.data.map((item, index) => (
              <BookingCard
                key={item?.id}
                item={item}
                index={item?.id}
                onPress={() =>
                  router.push({
                    pathname: "/company/booking_service_details",
                    params: { id: item?.id },
                  })
                }
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Company_Home_Index;
