import {
  IconBalance,
  IconRightArrowCornerPrimaryColor,
  IconSettingWhite,
} from "@/assets/icons";
import { ImgComplete, ImgNew, ImgPending } from "@/assets/images/image";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ShortDataTitle from "@/src/Components/ShortDataTitle";
import TransactionsCard from "@/src/Components/TransactionsCard";
import UserCard from "@/src/Components/UserCard";
import tw from "@/src/lib/tailwind";
import { useHomeDataQuery } from "@/src/redux/apiSlices/companyProvider/homeSlices";
import { useLazyOrderDetailsQuery } from "@/src/redux/apiSlices/companyProvider/orderSlices";
import {
  useRecentOrderQuery,
  useRecentTransactionsQuery,
} from "@/src/redux/apiSlices/IndividualProvider/homeSlices";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value --------------------//
const dropdownData = [
  { label: "This week", value: "1" },
  { label: "This month", value: "2" },
  { label: "This year", value: "3" },
];

const Individual_Service_Provider_Index = () => {
  const [value, setValue] = useState("this_week");
  const [isFocus, setIsFocus] = useState(false);

  // data fetch - START
  const { data: homeData, isLoading: homeDataLoading } =
    useHomeDataQuery(value);

  const { data: recentOrder, isLoading: recentOrderLoading } =
    useRecentOrderQuery("New");
  const { data: recentTransaction, isLoading: recentTransactionLoading } =
    useRecentTransactionsQuery({});
  // const recentOrder = recentOrderData?.data?.data.slice(0,3) || [];

  const [fetchOrderItem] = useLazyOrderDetailsQuery();

  // if()
  // console.log("++++++++++ recent order data =================== ", recentOrder);
  // console.log("++++++++++ recent transaction order data inside =================== ", recentTransaction?.data.data);
  // data fetch - END

  // state for fetch data;
  const formateDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const parts = date.toLocaleDateString("en-US", options as any).split(" ");
    // console.log(date.toLocaleDateString("en-US", options))
    const formatted = `${parts[0]} ${parts[1]} ${parts[2].split(",")[0]} ${parts[3]
      }`;
    return formatted;
  };

  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    if (recentOrder?.data?.data?.length) {
      const fetchDescriptions = async () => {
        for (const item of recentOrder.data.data) {
          try {
            const response = await fetchOrderItem(item.id).unwrap();
            const count =
              response?.data?.provider?.provider_services?.length ?? 0;
            setDescriptions((prev) => ({
              ...prev,
              [item.id]: `${count} ${count === 1 ? "service" : "services"}`,
            }));
          } catch (err) {
            setDescriptions((prev) => ({ ...prev, [item.id]: "N/A" }));
          }
        }
      };
      fetchDescriptions();
    }
  }, [recentOrder]);

  // console.log(" ===================== transaction ================ ", JSON.stringify(recentTransaction?.data?.data, null, 2))
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* ----------------------- Profile header parts --------------  */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/service_provider/individual/account")}
        onPressNotification={() =>
          router.push({
            pathname: "/notification_Global/notifications",
            params: {
              provider_type: "individual",
            },
          })
        }
      />

      <View
        style={tw`h-52 bg-white rounded-2xl flex-row  justify-between px-6 py-4 mt-4`}
      >
        <View style={tw`my-4 gap-2`}>
          <View
            style={tw`w-16 h-16 rounded-full justify-center items-center border border-primary`}
          >
            <SvgXml xml={IconBalance} />
          </View>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Total earnings
          </Text>
          <Text style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}>
            ₦ {homeData?.data?.total_earnings ?? 0}
          </Text>
        </View>
        <View style={tw`w-44`}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "This week" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View>

      {/* -------------------- status ------------------------ */}
      <View style={tw`gap-4 mt-8`}>
        <View
          style={tw`relative flex-row gap-4 bg-primary h-20 items-center px-4 rounded-2xl`}
        >
          <SvgXml xml={IconSettingWhite} />
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              New order:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-3xl text-white`}
            >
              {homeData?.data?.new_order ?? 0}
            </Text>
          </View>
          <View style={tw`absolute -top-2 right-1`}>
            <Image source={ImgNew} />
          </View>
        </View>

        <View
          style={tw`relative flex-row gap-4 bg-violet h-20 items-center px-4 rounded-2xl`}
        >
          <SvgXml xml={IconSettingWhite} />
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              Pending order:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-3xl text-white`}
            >
              {homeData?.data?.pending_order ?? 0}
            </Text>
          </View>
          <View style={tw`absolute -top-2 right-1`}>
            <Image source={ImgPending} />
          </View>
        </View>

        <View
          style={tw`relative flex-row gap-4 bg-success600 h-20 items-center px-4 rounded-2xl`}
        >
          <SvgXml xml={IconSettingWhite} />
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              Completed order:
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-3xl text-white`}
            >
              {homeData?.data?.completed_order ?? 0}
            </Text>
          </View>
          <View style={tw`absolute -top-2 right-1`}>
            <Image source={ImgComplete} />
          </View>
        </View>
      </View>

      {/* -------------Recent orders--------------- */}

      <ShortDataTitle
        FastTitle="Recent orders"
        IconTitle="See all"
        Icon={IconRightArrowCornerPrimaryColor}
        SeeMorePathPress={() =>
          router.push("/service_provider/individual/(Tabs)/order")
        }
      />
      {/* recent order  */}
      <View style={tw`gap-3 my-4`}>
        {recentOrder?.data?.data.slice(0, 3).map((item: any, index: any) => {
          return (
            <UserCard
              key={index}
              ProfileName={item.user.name}
              isProfileBadge={
                item.user.kyc_status === "Verified" ? true : false
              }
              Date={formateDate(item.created_at)}
              Description={descriptions[item.id]}
              ImgProfileImg={item.user.avatar}
              onPress={() => router.push({
                pathname: "/service_provider/company/order_details_profile",
                params: {
                  id: item.id
                }
              })}
            />
          );
        })}
      </View>

      {/* ------------------------ Recent transactions ----------------- */}
      <View style={tw`mt-4`}>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          Recent transactions
        </Text>

        <View style={tw`gap-6 my-4`}>
          {recentTransaction?.data.data.map((item: any, index: any) => {
            return (
              <TransactionsCard
                key={index}
                price={item.amount}
                profileBadge={
                  item.sender.kyc_status === "Verified" ? true : false
                }
                type={item.direction}
                varient={item.transaction_type}
                title="Service title goes here"
                transactionIcon={IconRightArrowCornerPrimaryColor}
                userName={item.sender.name}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Individual_Service_Provider_Index;

// ------------ dropdown Style --------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 350,
    maxHeight: 400,
    borderRadius: 30,
  },
});
