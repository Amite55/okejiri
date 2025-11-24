import { IconSearch } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useAssignEmployeeMutation,
  useLazyMyEmployeeQuery,
} from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

export default function Assign_Provider() {
  const { id } = useLocalSearchParams();
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [employees, setEmployees] = useState<any[]>([]);

  console.log("order id ", id);
  const [assignId, setAssignId] = useState<number | null>(null);

  // api state
  const [
    fetchMyEmployee,
    { isFetching: isFetchingMyEmployee, isLoading: isLoadingMyEmployee },
  ] = useLazyMyEmployeeQuery();

  const [
    assignEmployee,
    {
      isLoading: isLoadingAssignEmployee,
      isError: isErrorAssignEmployee,
      error: errorAssignEmployee,
    },
  ] = useAssignEmployeeMutation();
  // api effect

  // useEffect(() => {
  //   console.log("================= my employee ======= ", JSON.stringify(myEmployessData?.data?.data, null, 2))
  //   console.log("error ", isErrorMyEmployees)
  //   console.log("error message", error)

  // }, [myEmployessData])

  // api handler
  const handleAssign = async (employee_id: number) => {
    try {
      const requestBody = { employee_id, booking_id: Number(id) };
      // console.log("======== Req body ", requestBody);
      const response = await assignEmployee(requestBody).unwrap();
      // console.log("=========  response ", response);
      setAssignId(employee_id);
    } catch (err: any) {
      Alert.alert("Assign Error");
      console.log(
        "Assign employee error ",
        err,
        " error ",
        errorAssignEmployee
      );
    }
  };

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
  };

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

  // const employee = myEmployessData?.data?.data || [];

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      {/* btn header */}

      <BackTitleButton
        pageName="Assign Provider"
        onPress={() => router.back()}
        titleTextStyle={tw`text-3xl font-DegularDisplayDemoRegular`}
      />

      <View
        style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2 rounded-full border border-black/20   my-3`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput
          style={tw`flex-1 text-black`}
          placeholder="Search chats"
          placeholderTextColor={"#535353"}
        />
      </View>

      <View>
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          Available providers
        </Text>

        <View style={tw`gap-2 py-2`}>
          {employees.map((item: any, index: any) => {
            const isAssign = assignId === item.id;
            const isDisable = assignId !== null && assignId !== item.id;
            return (
              <View
                key={index}
                style={tw`flex-row justify-between items-center w-full bg-white rounded-lg py-2 px-2`}
              >
                <View style={tw`flex-row gap-2 items-center `}>
                  <View style={tw``}>
                    <Image
                      style={tw`w-24 h-24 rounded-lg `}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View>
                    <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>
                      {item.name}
                    </Text>
                    <View style={tw`flex-row gap-2 items-center`}>
                      <Text>
                        {item.completed_booking_count}{" "}
                        {item.completed_booking_count > 1
                          ? "services"
                          : "service"}{" "}
                        completed
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    disabled={isDisable}
                    onPress={() => handleAssign(item.id)}
                    style={tw`w-25 py-3 rounded-2xl  bg-secondary justify-center items-center `}
                  >
                    <Text
                      style={tw`text-xl font-DegularDisplayDemoMedium text-white`}
                    >
                      {isAssign ? "Assigned" : "Assign"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
