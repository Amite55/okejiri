import { IconPlus, IconRightCornerArrowWhite } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyMyEmployeeQuery } from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";

const My_Employee = () => {
  // =================================== screen state =========================== //

  // ================================ API
  // const {data: myEmployeeData, isLoading: isLoadingMyEmployee, isError: isErrorMyEmployee} = useMyEmployeeQuery()
  const [fetchMyEmployee, { isFetching: isFetchingMyEmployee, isLoading: isLoadingMyEmployee }] = useLazyMyEmployeeQuery();
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [employees, setEmployees] = useState<any[]>([]);


  //  ====================================== effect



  // ========================================= handlers
  const loadEmployeeData = async (page = 1, isRefresh = false) => {
    try {
      if ((isFetchingMyEmployee || loadingMore) && !isRefresh) {
        return;
      }
      if (!isRefresh) {
        setLoadingMore(true);
      }
      const response = await fetchMyEmployee(page).unwrap();
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
  }

  // console.log("===================== Employeee ========================= ", JSON.stringify(employees!, null, 2))

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
  }, []);





  return (
    <View
      style={tw`flex-1 bg-base_color`}
    >
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}

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
                Total: {employees.length} {employees.length > 1 ? "employees" : "employee"}
              </Text>

              <TouchableOpacity
                style={tw`bg-primary px-6 py-2 flex-row gap-2 rounded-xl items-center`}
                onPress={()=> router.push("/service_provider/company/my_employees/add_new_employee")}
              >
                <SvgXml xml={IconPlus} width={12} />
                <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white`}>Add</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}

        renderItem={({ item }) => (
          <View>
            <Pressable
              onPress={() =>
                router.push(
                  "/service_provider/company/my_employees/employees_details"
                )
              }
              key={item}
              style={tw`relative bg-white flex-row items-center gap-4 p-2 rounded-lg`}
            >
              <Image style={tw`w-24 h-24 rounded-xl`} source={{ uri: item?.image }} />
              <View>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                >
                  {item.name}
                </Text>




                <Text
                  style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                >
                  {item?.completed_booking_count} {item?.completed_booking_count > 1 ? "services" : "service"} completed
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/service_provider/company/my_employees/employees_details",
                    params: {
                      id: item.id
                    }
                  }
                    
                  )
                }
                style={tw`absolute right-2 top-2 w-11 h-11 rounded-2xl bg-secondary justify-center items-center`}
              >
                <SvgXml xml={IconRightCornerArrowWhite} />
              </TouchableOpacity>
            </Pressable>
          </View>
        )}

      />
      {/* <BackTitleButton
        pageName={"My employees"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      // contentStyle={tw`px-5`}
      />

      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`font-DegularDisplayDemoRegular text-black text-xl`}>
          Total : 200 employees
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push(
              "/service_provider/company/my_employees/add_new_employee"
            )
          }
          style={tw`bg-primary w-36 h-14 flex-row justify-center items-center rounded-xl gap-2`}
        >
          <SvgXml xml={IconPlus} />
          <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center justify-between gap-3 mt-8`}>
        <View
          style={tw`flex-1 flex-row justify-between items-center bg-deepBlue50 h-12 rounded-2xl px-5`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-4 h-4 rounded-full bg-deepBlue200`} />
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              100
            </Text>
          </View>
          <SvgXml xml={IconRightArrowCornerGray} />
        </View>

        <View
          style={tw`flex-1 flex-row justify-between items-center bg-white h-12 rounded-2xl px-5`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-4 h-4 rounded-full bg-success600`} />
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              150
            </Text>
          </View>
          <SvgXml xml={IconRightArrowCornerGray} />
        </View>
      </View>

      <View style={tw`gap-2 my-5`}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Pressable
            onPress={() =>
              router.push(
                "/service_provider/company/my_employees/employees_details"
              )
            }
            key={item}
            style={tw`relative bg-white flex-row items-center gap-4 p-2 rounded-lg`}
          >
            <Image style={tw`w-24 h-24 rounded-xl`} source={ImgProfileImg} />
            <View>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Mark Jukerburg
              </Text>

              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-2.5 h-2.5 rounded-full bg-success600`} />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-regularText`}
                >
                  Cleaner
                </Text>
              </View>

              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
              >
                30 service completed
              </Text>
            </View>

            <TouchableOpacity
              style={tw`absolute right-1 top-1 w-11 h-11 rounded-2xl bg-secondary justify-center items-center`}
            >
              <SvgXml xml={IconRightCornerArrowWhite} />
            </TouchableOpacity>
          </Pressable>
        ))}
      </View> */}
    </View>
  );
};

export default My_Employee;
