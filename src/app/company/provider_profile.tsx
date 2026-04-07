import {
  IconEmailGray,
  IconLocationGray,
  IconPhoneGray,
  IconProfileBadge,
  IconStar,
} from "@/assets/icons";
import { ImgCleaning } from "@/assets/images/image";
import ReviewerCard from "@/src/Components/ReviewerCard";
import ServiceCard from "@/src/Components/ServiceCard";
import ProviderProfileSkeleton from "@/src/Components/skeletons/ProviderProfileSkeleton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useClickProviderMutation } from "@/src/redux/apiSlices/userProvider/account/clickProviderORRatingSlices";
import {
  useGetProviderReviewsQuery,
  useGetProviderServicesQuery,
  useProviderProfileQuery,
} from "@/src/redux/apiSlices/userProvider/servicesSlices";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Provider_Profile = () => {
  const { provider_id } = useLocalSearchParams();

  // ============================== api end point ============================1
  const {
    data: getProviderProfileDataDetails,
    isLoading: isProviderProfileDataLoading,
  } = useProviderProfileQuery(provider_id);
  const {
    data: getProvidedServicesData,
    isLoading: isProvidedServicesDataLoading,
  } = useGetProviderServicesQuery(getProviderProfileDataDetails?.data?.id);
  const {
    data: getProvidedReviewsData,
    isLoading: isProvidedReviewsDataLoading,
  } = useGetProviderReviewsQuery(getProviderProfileDataDetails?.data?.id);
  const [clickProfile] = useClickProviderMutation();

  console.log(
    getProviderProfileDataDetails?.data?.is_boosted,
    "provider profile data==================>",
  );
  // ==========  call when provider profile is boost ===================
  useEffect(() => {
    if (!getProviderProfileDataDetails?.data?.is_boosted) return;
    const isBoostHandler = async () => {
      try {
        await clickProfile(provider_id).unwrap();
      } catch (error: any) {
        console.log(error, "you api called but some error !");
      }
    };

    isBoostHandler();
  }, [getProviderProfileDataDetails?.data?.is_boosted, provider_id]);

  if (
    isProviderProfileDataLoading ||
    isProvidedServicesDataLoading ||
    isProvidedReviewsDataLoading
  ) {
    return <ProviderProfileSkeleton />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <GestureHandlerRootView style={tw`flex-1`}>
        <BottomSheetModalProvider>
          <View style={tw`flex-1`}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1  `}
              contentContainerStyle={tw`pb-6  bg-base_color`}
            >
              <BackTitleButton
                pageName={"Provider profile kj"}
                onPress={() => router.back()}
                titleTextStyle={tw`text-xl`}
                contentStyle={tw`px-4`}
              />

              <View style={tw`relative justify-center items-center mt-2`}>
                <Image style={tw`w-full h-52 `} source={ImgCleaning} />
                <View
                  style={tw`justify-center items-center absolute -bottom-28 `}
                >
                  <Image
                    contentFit="contain"
                    style={tw`w-24 h-24 rounded-full   border-2 border-white`}
                    source={getProviderProfileDataDetails?.data?.avatar}
                  />
                  {/*  profile name ----------- */}
                  <View style={tw`justify-center items-center my-1`}>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-DegularDisplayDemoRegular text-xl`}>
                        {getProviderProfileDataDetails?.data?.name}
                      </Text>
                      {getProviderProfileDataDetails?.data?.kyc_status ===
                        "Verified" && <SvgXml xml={IconProfileBadge} />}
                    </View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-primary text-lg `}
                      >
                        {
                          getProviderProfileDataDetails?.data
                            ?.ratings_avg_rating
                        }
                      </Text>
                      <View style={tw`flex-row items-center gap-2`}>
                        <SvgXml xml={IconStar} />
                      </View>
                      <Text
                        style={tw`font-DegularDisplayDemoMedium text-base text-regularText`}
                      >
                        ({getProviderProfileDataDetails?.data?.ratings_count})
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/*  ---------- provider details info  ----------------- */}
              <View
                style={tw`border border-gray-300  mx-4 my-5 justify-center h-40 rounded-lg gap-2 p-3 mt-32`}
              >
                <View style={tw`flex-row gap-2 items-center`}>
                  <SvgXml xml={IconEmailGray} />
                  <Text
                    numberOfLines={2}
                    style={tw`flex-1 font-DegularDisplayDemoRegular text-lg text-black`}
                  >
                    {getProviderProfileDataDetails?.data?.email}
                  </Text>
                </View>
                <View style={tw`flex-row gap-3 items-center`}>
                  <SvgXml xml={IconPhoneGray} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                  >
                    {getProviderProfileDataDetails?.data?.phone}
                  </Text>
                </View>
                <View style={tw`flex-row gap-2 items-start`}>
                  <SvgXml xml={IconLocationGray} />
                  <Text
                    style={tw` flex-1 font-DegularDisplayDemoRegular text-base text-black`}
                  >
                    {getProviderProfileDataDetails?.data?.address
                      ? getProviderProfileDataDetails?.data?.address.length > 45
                        ? getProviderProfileDataDetails?.data?.address.slice(
                            0,
                            45,
                          ) + "..."
                        : getProviderProfileDataDetails?.data?.address
                      : "N/A"}
                  </Text>
                </View>
              </View>

              <View style={tw`px-5`}>
                {/* =========== provider Service by ================= */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
                >
                  Service By
                </Text>

                <View style={tw`pb-4 pl-6`}>
                  {getProviderProfileDataDetails?.data?.provider_services
                    .length > 0 ? (
                    getProviderProfileDataDetails?.data?.provider_services?.map(
                      (item: any) => {
                        return (
                          <View
                            key={item?.id}
                            style={tw`flex-row gap-2 items-center `}
                          >
                            <View
                              style={tw`w-1.5 h-1.5 rounded-full bg-black`}
                            />
                            <Text
                              style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                            >
                              {item?.service?.name}
                            </Text>
                          </View>
                        );
                      },
                    )
                  ) : (
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                    >
                      No Service by this provider
                    </Text>
                  )}
                </View>

                {/* --------------------- about us --------------------- */}
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                >
                  About
                </Text>

                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                >
                  {getProviderProfileDataDetails?.data?.about}
                </Text>
              </View>

              {/* ---------------- provider Services =-=---------- */}

              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-6 px-5`}
              >
                Services
              </Text>

              <View style={tw`gap-3 mt-4 px-5`}>
                {getProvidedServicesData?.data?.length > 0 ? (
                  getProvidedServicesData?.data?.map((item: any) => {
                    return (
                      <ServiceCard
                        key={item.id}
                        item={item}
                        index={item.id}
                        onPress={() =>
                          router.push({
                            pathname: "/company/serviceDetails",
                            params: { id: item?.id },
                          })
                        }
                      />
                    );
                  })
                ) : (
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                  >
                    No Service by this provider
                  </Text>
                )}
              </View>

              {/* ============================== review profile j================================= */}
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black px-5 mt-6`}
              >
                Reviews
              </Text>
              <FlatList
                data={getProvidedReviewsData?.data}
                renderItem={(item) => <ReviewerCard item={item} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={tw`mt-3 px-4 gap-3 pb-4 `}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

export default Provider_Profile;
