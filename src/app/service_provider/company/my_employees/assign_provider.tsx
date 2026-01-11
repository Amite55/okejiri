import { IconSearch } from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useAssignEmployeeMutation,
  useLazyMyEmployeeQuery,
} from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

export default function Assign_Provider() {
  const { id } = useLocalSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [employees, setEmployees] = useState<any[]>([]);
  const [assignId, setAssignId] = useState<number | null>(null);

  // api
  const [fetchMyEmployee, { isFetching: isFetchingMyEmployee }] =
    useLazyMyEmployeeQuery();

  const [assignEmployee, { isLoading: isLoadingAssignEmployee }] =
    useAssignEmployeeMutation();

  // ================= load data =====================
  const loadEmployeeData = React.useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const res = await fetchMyEmployee({
          page: pageNum,
          per_page: 10,
          search: search,
          _timestamp: Date.now(),
        }).unwrap();
        const responseData = res?.data || {};
        const newData = responseData?.data || [];
        const currentPage = responseData?.current_page || 1;
        const lastPage = responseData?.last_page || currentPage;
        if (isRefresh) {
          setEmployees(newData);
          setPage(1);
        } else if (pageNum === 1) {
          setEmployees(newData);
        } else {
          setEmployees((prev) => [...prev, ...newData]);
        }
        setHasMore(pageNum < lastPage);
      } catch (error: any) {
        console.log(error, "data not fetch ----------->");
      }
    },
    [employees, search]
  );
  // ================= refresh
  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
    loadEmployeeData(1, true);
    setRefreshing(false);
  }, [loadEmployeeData]);

  // ================= load more
  const handleLoadMore = React.useCallback(async () => {
    if (hasMore && !isFetchingMyEmployee) {
      loadEmployeeData(page);
    }
  }, [hasMore, isFetchingMyEmployee, loadEmployeeData, page]);
  // ============== initial render ================
  useEffect(() => {
    loadEmployeeData(1, true);
  }, [assignEmployee, search]);

  // ================= handle assign========================
  const handleAssign = async (employee_id: number) => {
    try {
      await assignEmployee({
        employee_id,
        booking_id: Number(id),
      }).unwrap();
      setAssignId(employee_id);
    } catch (err) {
      Alert.alert("Assign Error");
      console.log("Assign employee error", err);
    }
  };

  // ================= render item
  const renderItem = ({ item }: any) => {
    const isAssign = assignId === item.id;
    const isDisable = assignId !== null && assignId !== item?.id;

    return (
      <View
        style={tw`flex-row justify-between items-center bg-white rounded-lg py-2 px-2`}
      >
        <View style={tw`flex-row gap-2 items-center`}>
          <Image
            style={tw`w-20 h-20 rounded-lg`}
            source={{ uri: item?.image }}
          />
          <View>
            <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>
              {item?.name}
            </Text>
            <Text>
              {item?.completed_booking_count}{" "}
              {item?.completed_booking_count > 1 ? "services" : "service"}{" "}
              completed
            </Text>
          </View>
        </View>

        <TouchableOpacity
          disabled={isDisable || isLoadingAssignEmployee || isAssign}
          onPress={() => handleAssign(item?.id)}
          style={[
            tw`w-20 h-10 rounded-xl bg-secondary justify-center items-center`,
            isAssign ? tw`bg-gray-400` : tw`bg-secondary`,
          ]}
        >
          {isLoadingAssignEmployee && isAssign ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={tw`text-lg font-DegularDisplayDemoMedium text-white`}>
              {isAssign ? "Assigned" : "Assign"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // ================= header
  const ListHeader = () => (
    <View>
      <BackTitleButton
        pageName="Assign Provider"
        onPress={() => router.back()}
        titleTextStyle={tw`text-3xl font-DegularDisplayDemoRegular`}
      />

      <View
        style={tw`w-full h-14 flex-row items-center px-4 gap-2 rounded-full border border-black/20 my-3`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput
          style={tw`flex-1 text-black`}
          placeholder="Search chats"
          placeholderTextColor="#535353"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black mb-2`}>
        Available providers
      </Text>
    </View>
  );

  return (
    <FlatList
      data={employees}
      keyExtractor={(item, index) =>
        item?.id ? item.id.toString() : `employee-${index}`
      }
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={tw`px-5 gap-3 pb-6 bg-base_color`}
      style={tw`bg-base_color flex-1 `}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListFooterComponent={
        hasMore ? <ActivityIndicator style={tw`my-4`} /> : null
      }
    />
  );
}
