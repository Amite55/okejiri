import { IconEditPen, IconPlus } from "@/assets/icons";
import { ImgEmptyService } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import {
  useCreateSubAccountMutation,
  useGetBanksQuery,
} from "@/src/redux/apiSlices/flutterwaveSlice";
import { useLazyMy_service_packagesQuery } from "@/src/redux/apiSlices/IndividualProvider/account/MyServices/myServicesSlicel";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

const My_Service_Package = () => {
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);

  // ----------- api end point -----------------------
  const [createSubAccount, { isLoading: isLoadingCreateConnectAccount }] =
    useCreateSubAccountMutation();
  const { data: userProfileInfo, isLoading: isProfileLoading } =
    useProfileQuery({});
  const { data: getBankData, isLoading: isLoadingGetBankData } =
    useGetBanksQuery({});
  const [fetchMyServicePackages, { isFetching }] =
    useLazyMy_service_packagesQuery();

  // ====================== state =========================
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [bankNumber, setBankNumber] = useState<string>("");
  const [bankCode, setBankCode] = useState<string>("");
  const [services, setServices] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { id } = useLocalSearchParams();

  const handleModalOpen = useCallback(async () => {
    BottomSheetModalRef.current?.present();
  }, []);
  const handleModalClose = useCallback(() => {
    BottomSheetModalRef.current?.dismiss();
  }, []);

  // ======================== LOAD SERVICE PACKAGES ==========================
  const loadServices = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isFetching || loadingMore) && !isRefresh) return;
      if (!isRefresh) setLoadingMore(true);

      const res = await fetchMyServicePackages({
        pageNum,
        service_id: id,
      }).unwrap();

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
      console.log(" My Service Package", err);
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
  // ================= initial render ==========================
  useEffect(() => {
    loadServices(1, true);
  }, []);

  // ================== new sub account create ========================
  const handleCreateSubAccount = async () => {
    try {
      const payload = {
        account_number: bankNumber,
        bank_code: bankCode,
      };
      const res = await createSubAccount(payload).unwrap();
      console.log(res, "this is account submmition response ----------->");
      if (res?.data?.status === "success") {
        setBankCode("");
        setBankNumber("");
        router.push({
          pathname: "/Toaster",
          params: {
            res: "Bank account connected successfully",
          },
        });
        setTimeout(() => {
          handleModalClose();
        }, 1500);
      } else {
        router.push({
          pathname: "/Toaster",
          params: {
            res:
              res?.error?.message ||
              res?.message ||
              res?.data?.message ||
              "Account creation failed",
          },
        });
      }
    } catch (error: any) {
      console.log(error, "Account Create not success ------------>");
      router.push({
        pathname: "/Toaster",
        params: {
          message: error?.message || "Account creation failed",
        },
      });
    }
  };

  // ======================== RENDER SERVICE ITEM ==========================
  const renderServiceItem = ({ item }: any) => {
    return (
      <View style={tw`bg-white p-4 rounded-2xl mb-4`}>
        {/* Image */}
        <View style={tw`justify-center items-center`}>
          <Image
            style={tw`h-44 w-[98%] rounded-2xl`}
            source={item?.image}
            contentFit="cover"
          />
        </View>

        {/* Title + Edit */}
        <View style={tw`flex-row justify-between items-center my-4`}>
          <View style={tw`w-[90%]`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              {item?.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname:
                  "/service_provider/company/company_services/edit_package",
                params: {
                  id: item.id,
                },
              })
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
              <View key={index} style={tw`flex-row items-center gap-2 w-[88%]`}>
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
          style={tw`flex-row justify-between items-center px-3 my-3 py-2`}
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
  };

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // ======================== MAIN RETURN ==========================
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android keyboard behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={tw`flex-1 bg-base_color`}>
          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderServiceItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={tw`px-5 pb-10`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View>
                <BackTitleButton
                  pageName="My services packages"
                  onPress={() => router.back()}
                  titleTextStyle={tw`text-xl`}
                />

                <View
                  style={tw`flex-row justify-between items-center mt-3 py-2`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                  >
                    {services.length} services
                  </Text>

                  {userProfileInfo?.data?.flutter_numeric_id ? (
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname:
                            "/service_provider/company/company_services/add_package",
                          params: {
                            id: id,
                          },
                        })
                      }
                      style={tw`flex-row justify-center items-center gap-2 px-6 py-2 bg-primary rounded-full`}
                    >
                      <SvgXml xml={IconPlus} width={10} />
                      {isProfileLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text
                          style={tw`font-PoppinsRegular text-sm text-white`}
                        >
                          Add more
                        </Text>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={isLoadingGetBankData}
                      onPress={handleModalOpen}
                      activeOpacity={0.8}
                      style={tw`flex-row justify-center items-center gap-2 w-32 h-10 bg-primary rounded-full`}
                    >
                      {isLoadingGetBankData ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text
                          style={tw`font-DegularDisplayDemoMedium text-lg text-white`}
                        >
                          Connect
                        </Text>
                      )}
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
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                >
                  Please add a service to see them here.
                </Text>
              </View>
            )}
          />

          {/* ======================== bottom tab ========================== */}

          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={BottomSheetModalRef}
              snapPoints={["98%"]}
              containerStyle={tw`bg-gray-700 bg-opacity-20`}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  appearsOnIndex={0}
                  disappearsOnIndex={-1}
                  pressBehavior="close"
                />
              )}
            >
              <BottomSheetScrollView
                contentContainerStyle={tw` px-4  flex-grow justify-between bg-base`}
              >
                <View style={tw`flex-1 py-4`}>
                  <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`font-DegularDisplayDemoSemibold text-2xl `}>
                      Connect with Your Bank
                    </Text>
                    <TouchableOpacity
                      style={tw`p-2`}
                      onPress={handleModalClose}
                      activeOpacity={0.6}
                    >
                      <Text
                        style={tw`font-DegularDisplayDemoBold text-xl text-red-600 `}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* =========== main content ========== */}
                  <Text style={tw`font-DegularDisplayDemoBold text-lg mt-3`}>
                    Network Code
                  </Text>
                  <View style={tw` h-14 rounded-lg  mt-1`}>
                    <Dropdown
                      style={tw.style(`h-14 rounded-lg px-4 bg-white border`)}
                      placeholderStyle={tw`text-sm text-black`}
                      selectedTextStyle={tw`text-base text-black`}
                      containerStyle={tw`bg-white rounded-lg`}
                      itemTextStyle={tw`text-black`}
                      activeColor="#fff"
                      placeholder="Choose Network Code"
                      data={getBankData?.data}
                      dropdownPosition="bottom"
                      maxHeight={300}
                      labelField="name"
                      valueField="code"
                      value={bankCode}
                      onChange={(item) => {
                        setBankCode(item?.code);
                      }}
                      renderItem={(item) => {
                        return (
                          <View style={tw`p-2 bg-slate-300  rounded-lg mt-1`}>
                            <Text style={tw`text-black  `}>{item?.name}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>

                  {/* ==================== input ================  */}
                  <Text style={tw`font-DegularDisplayDemoBold text-lg mt-3`}>
                    Account Number
                  </Text>
                  <View style={tw` h-16`}>
                    <TextInput
                      keyboardType="number-pad"
                      style={tw`flex-1 text-black text-lg font-DegularDisplayDemoMedium border border-gray-300 rounded-lg px-4 py-2  mt-1 bg-stone-50`}
                      placeholder="Account Number"
                      placeholderTextColor={"#535353"}
                      onChangeText={(value: any) => setBankNumber(value)}
                      value={bankNumber}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleCreateSubAccount}
                  disabled={isLoadingCreateConnectAccount}
                  activeOpacity={0.8}
                  style={[
                    tw`flex-row justify-center items-center gap-2  h-12 bg-primary rounded-full`,
                    isKeyboardVisible && tw`mb-12`,
                  ]}
                >
                  {isLoadingCreateConnectAccount ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-lg text-white`}
                    >
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>
              </BottomSheetScrollView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default My_Service_Package;
