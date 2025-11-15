import { IconEditPen, IconPlus } from "@/assets/icons";
import { ImgEmptyService } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { useLazyMy_service_packagesQuery } from "@/src/redux/apiSlices/IndividualProvider/account/MyServices/myServicesSlicel";
import { useCreateConnectAccountMutation } from "@/src/redux/apiSlices/stripeSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { WebView } from "react-native-webview";

const My_Service_Package = () => {
  const { data: userProfileInfo } = useProfileQuery({});
  const { stripe_account_id, stripe_payouts_enabled } =
    userProfileInfo?.data || {};

  const [createConnectAccount] = useCreateConnectAccountMutation();
  const [fetchMyServicePackages, { isFetching }] =
    useLazyMy_service_packagesQuery();

  const [OnboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { id } = useLocalSearchParams();
  console.log(id, "id");

  // ======================== LOAD SERVICE PACKAGES ==========================
  const loadServices = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isFetching || loadingMore) && !isRefresh) return;
      if (!isRefresh) setLoadingMore(true);

      const res = await fetchMyServicePackages({ pageNum, id }).unwrap();
      console.log(res, "respos...........");

      const responseData = res?.data || {};
      const newData = responseData?.data || [];
      const currentPage = responseData?.current_page || 1;
      const lastPage = responseData?.last_page || currentPage;

      if (isRefresh) {
        setServices(newData);
      } else {
        const existingIds = new Set(services.map((s) => s.id));
        const uniqueNew = newData.filter((s: any) => !existingIds.has(s.id));
        setServices((prev) => [...prev, ...uniqueNew]);
      }

      setHasMore(newData.length > 0 && currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (err) {
      console.log("❌ My Service Packages fetch error:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // ======================== REFRESH ==========================
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadServices(1, true);
  };

  // ======================== LOAD MORE ==========================
  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetching) {
      loadServices(page);
    }
  };

  useEffect(() => {
    loadServices(1, true);
  }, []);

  // ======================== STRIPE CONNECT ==========================
  const handelCannact = async () => {
    const formData = new FormData();
    formData.append("country", "NG");
    formData.append("return_url", "https://translate?success=true");
    formData.append("refresh_url", "https://translate?success=false");

    try {
      const res = await createConnectAccount(formData);
      setOnboardingUrl(res.data.data.onboarding_url);
    } catch (error) {
      console.log("Stripe connect error:", error);
    }
  };

  // ======================== RENDER SERVICE ITEM ==========================
  const renderServiceItem = ({ item }: any) => (
    <View style={tw`bg-white p-4 rounded-2xl mb-4`}>
      {/* Image */}
      <View style={tw`justify-center items-center`}>
        <Image
          style={tw`h-44 w-[98%] rounded-2xl`}
          source={{ uri: item?.image }}
        />
      </View>

      {/* Title + Edit */}
      <View style={tw`flex-row justify-between items-center my-4`}>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          {item?.title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push("/service_provider/individual/my_services/edit_package")
          }
          style={tw`p-2`}
        >
          <SvgXml xml={IconEditPen} />
        </TouchableOpacity>
      </View>

      {/* Package Detail Items */}
      {item?.package_detail_items?.length > 0 && (
        <View style={tw`pl-8 gap-2`}>
          {item.package_detail_items.map((detail: any, index: number) => (
            <View key={index} style={tw`flex-row items-center gap-2`}>
              <View style={tw`w-2 h-2 bg-black`} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-black text-xl`}
              >
                {detail?.item}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Delivery Time */}
      <TouchableOpacity
        onPress={() =>
          router.push(
            "/service_provider/individual/my_services/delivery_extension"
          )
        }
        style={tw`flex-row justify-between items-center px-3 my-3`}
      >
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          Expected delivery time
        </Text>
        <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
          {item?.delivery_time} hours
        </Text>
      </TouchableOpacity>

      {/* Price */}
      <View
        style={tw`bg-primary w-full h-14 rounded-full flex-row justify-between items-center px-4 my-2`}
      >
        <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
          Cost:
        </Text>
        <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
          ₦ {item?.price}
        </Text>
      </View>
    </View>
  );

  // ======================== WEBVIEW ==========================
  if (OnboardingUrl) {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: OnboardingUrl }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#000" style={tw`mt-10`} />
          )}
          onError={(e) => {
            console.log("WebView error:", e.nativeEvent);
            setOnboardingUrl(null);
          }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }

  // ======================== MAIN RETURN ==========================
  return (
    <View style={tw`flex-1 bg-base_color`}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderServiceItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={tw`px-5 pb-10`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <BackTitleButton
              pageName="My services"
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />

            <View style={tw`flex-row justify-between items-center mt-3`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
              >
                {services.length} services
              </Text>

              {stripe_account_id && stripe_payouts_enabled === 1 ? (
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
              ) : (
                <TouchableOpacity
                  onPress={handelCannact}
                  style={tw`flex-row justify-center items-center gap-2 w-40 h-14 bg-primary rounded-full`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                  >
                    Connect
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ListFooterComponent={
          loadingMore ? (
            <View style={tw`mt-4 mb-8 justify-center items-center`}>
              <ActivityIndicator size="small" color="#000" />
              <Text style={tw`mt-2 text-gray-500`}>Loading more...</Text>
            </View>
          ) : !hasMore && services.length > 0 ? (
            <Text style={tw`text-gray-500 text-center my-4 text-lg`}>
              No more services
            </Text>
          ) : null
        }
        ListEmptyComponent={() => (
          <View style={tw`flex-1 justify-center items-center gap-3`}>
            <Image style={tw`w-full h-80`} source={ImgEmptyService} />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-3xl text-black`}
            >
              Nothing to show here
            </Text>
            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
              Please add a service to see them here.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default My_Service_Package;
