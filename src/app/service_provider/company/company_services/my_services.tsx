import { IconDustBin, IconPlus } from "@/assets/icons";
import { ImgEmptyService } from "@/assets/images/image";
import AddServicesModal from "@/src/Components/AddServicesModal";
import ServiceCardSkeleton from "@/src/Components/skeletons/ServiceCardSkeleton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useDeleteMyServicesMutation } from "@/src/redux/apiSlices/companyProvider/account/services/servicesSlice";
import { useLazyMy_servicesQuery } from "@/src/redux/apiSlices/IndividualProvider/account/MyServices/myServicesSlicel";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

const My_Service = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  //  ==================================== API
  const [fetchMyServices, { isFetching, isLoading: isLoadingFetchMyService }] =
    useLazyMy_servicesQuery();
  const [
    deleteMyService,
    {
      data: deleteMyServiceData,
      isLoading: isLoadingMyService,
      isError: isErrorMyService,
    },
  ] = useDeleteMyServicesMutation();

  // =================================== API end;

  const [services, setServices] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { id } = useLocalSearchParams();
  // console.log(id, "id");

  // ======================== LOAD SERVICE PACKAGES ==========================
  const loadServices = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isFetching || loadingMore) && !isRefresh) return;
      if (!isRefresh) setLoadingMore(true);

      const res = await fetchMyServices(pageNum).unwrap();

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

  // // ======================== STRIPE CONNECT ==========================

  // ========================== Handler ====================================
  const handleServiceDelete = async (id: any) => {
    if (!id) return;

    try {
      const response = await deleteMyService(id).unwrap();
      if (response) {
        handleAddSuccess();
        router.push({
          pathname: "/Toaster",
          params: {
            res: "Service Deleted Successfully",
          },
        });
      }
    } catch (err) {
      console.log("error service delete !", err);
    }
  };

  const openSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleAddSuccess = () => {
    loadServices(1, true); // refresh after adding new service
  };

  // ======================== RENDER SERVICE ITEM ==========================
  const renderServiceItem = (item: any) => {
    return (
      <View style={tw` w-[48%] p-1`}>
        <View style={tw`rounded-2xl`}>
          <View>
            <Image
              source={{ uri: item?.service?.image }}
              style={tw`w-full h-50 rounded-2xl`}
            />
            {/* <Image source={{ uri: item.}} /> */}
          </View>

          <TouchableOpacity
            onPress={() => handleServiceDelete(item.id)}
            style={tw`p-2 bg-black/20 absolute right-3 top-3 rounded-lg`}
          >
            <SvgXml xml={IconDustBin} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname:
                  "/service_provider/company/company_services/my_service_package",
                params: {
                  id: item.service_id,
                },
              })
            }
            style={tw`absolute bottom-3 left-3 right-3 p-2 bg-black/20 rounded-full `}
          >
            <Text
              style={tw`text-center text-white  font-DegularDisplayDemoRegular text-base`}
            >
              {item?.service?.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (isLoadingFetchMyService) {
    return <ServiceCardSkeleton />;
  }

  // ======================== MAIN RETURN ==========================
  return (
    <View style={tw`flex-1 bg-base_color`}>
      <FlatList
        data={services}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => renderServiceItem(item)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        numColumns={2}
        columnWrapperStyle={tw`justify-between`}
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

            {/* <View style={tw`flex-row justify-between items-center mt-3`}>
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
            </View> */}
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
      <View style={tw`px-4`}>
        <TouchableOpacity
          onPress={openSheet}
          style={tw`flex-row bg-primary py-4 justify-center rounded-full w-full px-4 gap-2 items-center`}
        >
          {isLoadingFetchMyService ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <SvgXml xml={IconPlus} width={15} />
          )}
          <Text style={tw`text-white text-xl font-DegularDisplayDemoRegular`}>
            {isLoadingFetchMyService ? "Adding more" : "Add more"}
          </Text>
        </TouchableOpacity>
      </View>

      <AddServicesModal
        ref={bottomSheetRef}
        exsiting_service={services}
        onSuccess={handleAddSuccess}
      />
    </View>
  );
};

export default My_Service;
