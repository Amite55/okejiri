import {
  IconBalance,
  IconCompleteOrder,
  IconMultipleUserBlack,
  IconNewOrderPrimary,
  IconPendingBlue,
  IconRightArrowCornerPrimaryColor
} from "@/assets/icons";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import ShortDataTitle from "@/src/Components/ShortDataTitle";
import TransactionsCard from "@/src/Components/TransactionsCard";
import UserCard from "@/src/Components/UserCard";
import tw from "@/src/lib/tailwind";
import { useHomeDataQuery, useRecentOrderQuery, useRecentTransactionsQuery } from "@/src/redux/apiSlices/companyProvider/homeSlices";
import { useLazyOrderDetailsQuery } from "@/src/redux/apiSlices/companyProvider/orderSlices";
import { _WIDTH } from "@/utils/utils";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "This week", value: "this_week" },
  { label: "This month", value: "this_month" },
  { label: "This year", value: "this_year" },
];

const Home_Index_Company = () => {




  const [value, setValue] = useState("this_week");
  const [isFocus, setIsFocus] = useState(false);


  // data fetch - START
  const { data: homeData, isLoading: homeDataLoading } = useHomeDataQuery(value);

  const { data: recentOrder, isLoading: recentOrderLoading } = useRecentOrderQuery("New");
  const { data: recentTransaction, isLoading: recentTransactionLoading } = useRecentTransactionsQuery({});
  // const recentOrder = recentOrderData?.data?.data.slice(0,3) || [];

  const [fetchOrderItem] = useLazyOrderDetailsQuery();


  // if()
  // console.log("++++++++++ recent order data =================== ", recentOrder);
  // console.log("++++++++++ recent transaction order data inside =================== ", recentTransaction?.data.data);
  // data fetch - END


  // state for fetch data;
  const formateDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    const parts = date.toLocaleDateString("en-US", options).split(" ");
    // console.log(date.toLocaleDateString("en-US", options))
    const formatted = `${parts[0]} ${parts[1]} ${parts[2].split(",")[0]} ${parts[3]}`;
    return formatted;
  }

  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (recentOrder?.data?.data?.length) {
      const fetchDescriptions = async () => {
        for (const item of recentOrder.data.data) {
          try {
            const response = await fetchOrderItem(item.id).unwrap();
            const count = response?.data?.provider?.provider_services?.length ?? 0;
            setDescriptions(prev => ({ ...prev, [item.id]: `${count} ${count === 1 ? "service" : "services"}` }));
          } catch (err) {
            setDescriptions(prev => ({ ...prev, [item.id]: "N/A" }));
          }
        }
      };
      fetchDescriptions();
    }
  }, [recentOrder]);



  // return: ==========================
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* header parts  */}
      <ServiceProfileHeaderInfo
        onPress={() => router.push("/service_provider/company/(Tabs)/account")}
        onPressNotification={() =>
          router.push({
            pathname: "/notification_Global/notifications",
            params: {
              provider_type: "company"
            }
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

      {/* ---------------- total employee ------------------- */}

      <View style={tw`flex-row gap-3 flex-1 my-4`}>
        {/*  ---------- total employee -------------- */}
        <View
          style={tw`flex-1 border border-gray-300 rounded-2xl h-40 p-5 gap-2`}
        >
          <View style={tw` justify-between items-center`}>
            <View />
            <SvgXml xml={IconMultipleUserBlack} />

          </View>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-base text-regularText text-center`}
          >
            Total employee
          </Text>

          <Text
            style={tw`font-DegularDisplayDemoMedium text-4xl text-black text-center `}
          >
            {homeData?.data?.total_employee ?? 0}
          </Text>
        </View>

        {/*  ---------- total active  employee -------------- */}
        {/* <View
          style={tw`flex-1 border border-gray-300 rounded-2xl h-40 p-5 gap-2`}
        >
          <View style={tw`flex-row justify-between items-center`}>
            <View />
            <SvgXml xml={IconMultipleUserBlack} />
            <SvgXml xml={IconRightCornerArrow} />
          </View>
          <View style={tw`flex-row items-center gap-2 justify-center `}>
            <View style={tw`w-2 h-2  rounded-full bg-success600`} />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-base text-regularText text-center`}
            >
              Total employee
            </Text>
          </View>

          <Text
            style={tw`font-DegularDisplayDemoMedium text-4xl text-black text-center `}
          >
            {homeData?.data?.total_employee ?? 0}
          </Text>
        </View> */}
      </View>

      {/* ------------ new order and regrading order -------------- */}
      <View style={tw`gap-4`}>
        {/* -------------- new order ------------- */}
        <View style={tw`relative `}>
          <SvgXml xml={IconNewOrderPrimary} width={_WIDTH - _WIDTH * 0.09} />
          <View style={tw`absolute top-6 left-30 justify-center items-center`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white `}>
              New order
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-4xl text-white`}
            >
              {homeData?.data?.new_order ?? 0}
            </Text>
          </View>
        </View>

        {/* -------------- pending order ------------- */}
        <View style={tw`relative `}>
          <SvgXml xml={IconPendingBlue} width={_WIDTH - _WIDTH * 0.09} />
          <View style={tw`absolute top-6 left-30 justify-center items-center`}>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-white`}>
              Pending order
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-4xl text-white`}
            >
              {homeData?.data?.pending_order ?? 0}
            </Text>
          </View>
        </View>

        {/* -------------- complete  order ------------- */}
        <View style={tw`relative `}>
          <SvgXml xml={IconCompleteOrder} width={_WIDTH - _WIDTH * 0.09} />
          <View style={tw`absolute top-6 left-30 justify-center items-center`}>
            <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-white`}>
              Completed order
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-4xl text-white`}
            >
              {homeData?.data?.completed_order ?? 0}
            </Text>
          </View>
        </View>
      </View>

      {/*  -------------- see resent order ---------------*/}

      <ShortDataTitle
        FastTitle="Recent orders"
        IconTitle="See all"
        Icon={IconRightArrowCornerPrimaryColor}
        SeeMorePathPress={() =>
          router.push("/service_provider/company/(Tabs)/order")
        }
      />
      {/*  resent order */}
      <View style={tw`gap-3 my-4`}>
        {recentOrder?.data?.data.slice(0, 3).map((item: any, index: any) => {

          return (
            <UserCard
              key={index}
              ProfileName={item.user.name}
              isProfileBadge={item.user.kyc_status === "Verified" ? true : false}
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
                profileBadge={item.sender.kyc_status === "Verified" ? true : false}
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

export default Home_Index_Company;

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
