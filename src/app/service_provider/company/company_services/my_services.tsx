import { IconCross, IconDeleteRed, IconPlusYellow } from "@/assets/icons";
import { ImgEmptyService } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyMy_servicesQuery } from "@/src/redux/apiSlices/IndividualProvider/account/MyServices/myServicesSlicel";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import React, { JSX, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { WebView } from "react-native-webview";

const My_Services = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [services, setServices] = useState<any[]>([]);

  const [fetchMyServices, { isFetching }] = useLazyMy_servicesQuery();

  const handleCheckBox = (index: number) => {
    setSelectedIndex(index);
    setIsChecked((prev) => !prev);
  };

  // ======================== LOAD SERVICES ==========================
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
      console.log("❌ My Services fetch error:", err);
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

  // ======================== RENDER EACH ITEM ==========================
  const renderServiceItem = ({ item }: any) => {
    return (
      <View
        style={tw`relative justify-center items-center px-2`}
        key={item?.id}
      >
        <Image
          resizeMode="cover"
          style={tw`w-44 h-48 rounded-lg`}
          source={{ uri: item?.service?.image }}
        />
      </View>

      <View style={tw`flex-row justify-between items-center my-4`}>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          {item?.service?.name}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push("/service_provider/individual/my_services/edit_package")
          }
          style={tw`p-2`}
        >
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/service_provider/individual/my_services/my_service",
                params: { id: item.id },
              })
            }
            style={tw`flex-1 justify-center items-center`}
            activeOpacity={0.7}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-center text-xl text-white`}
            >
              {item?.service?.name}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={tw`bg-primary w-full h-14 rounded-full flex-row justify-between items-center px-4 my-2`}
      >
        <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
          Cost:
        </Text>
        <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
          ₦ 49.00
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

  // ======================== SERVICE SELECT MODAL ========================== //

  const setviceItem = [
    { id: 1, name: "Barbing" },
    { id: 2, name: "Cleaning" },
    { id: 3, name: "Cooking" },
    { id: 4, name: "Painting" },
    { id: 5, name: "Spa" },
    { id: 6, name: "Manicure" },
  ];

  return (
    <View style={tw`flex-1 bg-base_color`}>
      <FlatList
        data={services}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderServiceItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={tw`px-5 pb-10 items-center`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <BackTitleButton
              pageName="My services"
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />
            <View style={tw`items-end mb-2`}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={tw`w-12 h-11 rounded-lg bg-white justify-center items-center`}
              >
                <SvgXml xml={IconPlusYellow} />
              </TouchableOpacity>
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

      {/* ============= add new service modal ====================== */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={[
            { height: _HEIGHT },
            tw`justify-end items-end bg-black bg-opacity-15`,
          ]}
        >
          <Pressable
            style={[
              {
                height: _HEIGHT * 0.55,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
              tw`bg-gray-50`,
            ]}
          >
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-14 flex-grow justify-between`}
            >
              <View>
                <View
                  style={tw`w-full flex-row justify-between items-center h-14 bg-primary px-4 rounded-t-lg`}
                >
                  <Text style={tw`text-white text-xl`}>Add more services</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={tw`w-8 h-8 rounded-full bg-slate-200 justify-center items-center`}
                  >
                    <SvgXml xml={IconCross} />
                  </TouchableOpacity>
                </View>

                <View style={tw`mt-5 gap-2`}>
                  {setviceItem.map(
                    (item, index): JSX.Element => (
                      <View key={item.id}>
                        <Pressable
                          onPress={() => handleCheckBox(index)}
                          style={tw`flex-row items-center gap-2 px-5`}
                        >
                          <TouchableOpacity
                            onPress={() => handleCheckBox(index)}
                            style={tw.style(
                              `border w-5 h-5 justify-center items-center rounded-sm`,
                              selectedIndex === index
                                ? `bg-primary border-0`
                                : `bg-transparent`
                            )}
                          >
                            {selectedIndex === index && (
                              <Text style={tw`text-white text-sm`}>✔</Text>
                            )}
                          </TouchableOpacity>
                          <Text
                            style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                          >
                            {item.name}
                          </Text>
                        </Pressable>

                        <View style={tw`border-b border-gray-500 mt-2`} />
                      </View>
                    )
                  )}
                </View>
              </View>

              <View style={tw`px-4`}>
                <PrimaryButton titleProps="Add" />
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ========= delete confirm modal ============= */}
      <Modal
        animationType="none"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            <View style={tw`w-full m-4`}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                style={tw`flex-row justify-center items-center border border-black w-full p-1 rounded-lg gap-2 mb-2`}
              >
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-lg text-black`}
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

export default My_Service;
