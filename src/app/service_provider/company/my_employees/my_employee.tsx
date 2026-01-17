import { IconDeleteRed, IconPlus } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useDeleteEmployeeMutation,
  useLazyMyEmployeeQuery,
} from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const My_Employee = () => {
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [employees, setEmployees] = useState<any[]>([]);

  // ================================ API
  const [
    fetchMyEmployee,
    { isFetching: isFetchingMyEmployee, isLoading: isLoadingMyEmployee },
  ] = useLazyMyEmployeeQuery();

  const [deleteEmployee, { isLoading: isLoadingDeleteEmployee }] =
    useDeleteEmployeeMutation();

  // ========================================= loadEmployeeData =----------------
  const loadEmployeeData = async (page = 1, isRefresh = false) => {
    try {
      if ((isFetchingMyEmployee || loadingMore) && !isRefresh) {
        return;
      }
      if (!isRefresh) {
        setLoadingMore(true);
      }
      const response = await fetchMyEmployee({
        page: 1,
        per_page: 10,
        search: "",
        _timestamp: Date.now(),
      }).unwrap();
      const responseData = response?.data || [];
      const newData = responseData?.data || [];
      const current_page = responseData?.current_page || 1;
      const lastPage = responseData?.last_page || current_page;
      if (isRefresh) {
        setEmployees(newData);
      } else {
        const existingIds = new Set(employees.map((s) => s.id));
        const uniqueNew = newData.filter((s: any) => !existingIds.has(s.id));
        setEmployees((prev) => [...prev, ...uniqueNew]);
      }
      setHasMore(newData.length > 0 && current_page < lastPage);
      setPage(current_page + 1);
    } catch (err) {
      console.log("Services fetch error: ", err);
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
    loadEmployeeData(1, true);
  };
  // ======================== LOAD MORE ==========================
  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetchingMyEmployee) {
      loadEmployeeData(page);
    }
  };
  useEffect(() => {
    loadEmployeeData(1, true);
  }, [fetchMyEmployee]);

  return (
    <View style={tw`flex-1 bg-base_color`}>
      <FlatList
        windowSize={10}
        data={employees}
        keyExtractor={(item, index) => `${item?.id}_${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={tw`px-5 pb-10 gap-2 rounded-lg`}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <BackTitleButton
              pageName="My employees"
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />
            <View style={tw`px-2 flex-row items-center justify-between py-2`}>
              <Text style={tw`font-DegularDisplayDemoRegular text-xl`}>
                Total: {employees.length}{" "}
                {employees.length > 1 ? "employees" : "employee"}
              </Text>

              <TouchableOpacity
                style={tw`bg-primary px-6 py-2 flex-row gap-2 rounded-xl items-center`}
                onPress={() =>
                  router.push(
                    "/service_provider/company/my_employees/add_new_employee"
                  )
                }
              >
                <SvgXml xml={IconPlus} width={12} />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname:
                      "/service_provider/company/my_employees/employees_details",
                    params: {
                      id: item?.id,
                    },
                  })
                }
                key={`${item?.id}_${index}`}
                style={tw` bg-white flex-row justify-between items-center gap-4 py-2 px-3 rounded-lg`}
              >
                <View style={tw`flex-row gap-2 items-center`}>
                  <Image
                    style={tw`w-24 h-24 rounded-xl`}
                    source={item?.image}
                    contentFit="cover"
                  />
                  <View>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                    >
                      {item?.completed_booking_count}{" "}
                      {item?.completed_booking_count > 1
                        ? "services"
                        : "service"}{" "}
                      completed
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const response = await deleteEmployee(
                          Number(item?.id)
                        ).unwrap();
                        if (response) {
                          router.push({
                            pathname: "/Toaster",
                            params: {
                              res: "Removed Employee successful!",
                            },
                          });
                        }
                      } catch (err: any) {
                        console.log("Employee deleted error ", err),
                          router.push({
                            pathname: "/Toaster",
                            params: {
                              res:
                                err?.message ||
                                err ||
                                "Removed Employee failed!",
                            },
                          });
                      }
                    }}
                    style={tw` w-11 h-11 rounded-2xl bg-gray-200 justify-center items-center z-10`}
                  >
                    <SvgXml xml={IconDeleteRed} />
                  </TouchableOpacity>
                </View>
              </Pressable>
            </View>
          );
        }}
        // footer item and empty item.
        ListFooterComponent={
          loadingMore ? (
            <View style={tw`mt-4 mb-8 justify-center items-center`}>
              <ActivityIndicator size="small" color="#000" />
              <Text style={tw`mt-2 text-gray-500`}>Loading more...</Text>
            </View>
          ) : !hasMore && employees.length > 0 ? (
            <Text
              style={tw`text-gray-500 text-center my-4 text-base font-PoppinsMedium`}
            >
              End of list
            </Text>
          ) : null
        }
        ListEmptyComponent={() => (
          <View style={tw`flex-1 justify-center items-center gap-3`}>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-2xl text-gray-500`}
            >
              Your employee list is empty
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default My_Employee;
