import UserCard from "@/src/Components/UserCard";
import tw from "@/src/lib/tailwind";
import {
  useGetAllProviderOrdersQuery,
  useLazyGetProviderOrdersQuery,
  useLazyOrderDetailsQuery,
} from "@/src/redux/apiSlices/companyProvider/orderSlices";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const Order = () => {
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isPending, setIspending] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [isOnTime, setIsOnTime] = useState<boolean>(true);
  const [isInstant, setInstant] = useState<boolean>(false);
  const [status, setStatus] = useState<"New" | "Pending" | "Completed">("New");
  const [bookingProcess, setBookingProcess] = useState<"instant" | "schedule">(
    "instant"
  );

  // state for fetch data;
  const formateDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const parts = date.toLocaleDateString("en-US", options).split(" ");
    // console.log(date.toLocaleDateString("en-US", options))
    const formatted = `${parts[0]} ${parts[1]} ${parts[2].split(",")[0]} ${
      parts[3]
    }`;
    return formatted;
  };

  // API State

  // API START

  const [
    fetchOrderItems,
    {
      data: fetchOrderItemsData,
      isLoading: isLoadingfetchOrderItems,
      isFetching: isFetchingOrderItems,
      error: isErrorFetchOrderItems,
    },
  ] = useLazyGetProviderOrdersQuery();

  const [fetchOrderItem] = useLazyOrderDetailsQuery();
  const {
    data: allProvderOrdersDetail,
    isLoading: isLoadingAllProvderOrdersDetail,
    isError: isErrorAllProvderOrdersDetail,
  } = useGetAllProviderOrdersQuery({});

  const orders = allProvderOrdersDetail?.data?.data || [];
  const { instantCount, scheduleCount } = useMemo(() => {
    const filtered = orders.filter((value: any) => value.status === status);
    const instant = filtered.filter(
      (value: any) => value.booking_process === "instant"
    ).length;
    const schedule = filtered.filter(
      (value: any) => value.booking_process === "schedule"
    ).length;
    return { instantCount: instant, scheduleCount: schedule };
  }, [orders, status]);

  useEffect(() => {
    fetchOrderItems({ status, booking_process: bookingProcess });
    // console.log("fetch item screen render ===================== ", fetchOrderItemsData?.data?.data)
  }, []);

  useEffect(() => {
    fetchOrderItems({ status: status, booking_process: bookingProcess });
    // console.log("fetch item refetch ===================== ", fetchOrderItemsData?.data?.data)
  }, [status, bookingProcess]);

  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    if (fetchOrderItemsData?.data?.data?.length) {
      const fetchDescriptions = async () => {
        for (const item of fetchOrderItemsData.data.data) {
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
  }, [fetchOrderItemsData]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      <Text
        style={tw`text-center font-DegularDisplayDemoRegular text-3xl my-4`}
      >
        Orders
      </Text>

      {/* ------------ order status --------------- */}

      <View
        style={tw`flex-row justify-center items-center flex-1 border rounded-xl border-gray-300 h-12`}
      >
        <Pressable
          onPress={() => {
            setStatus("New");
            setBookingProcess("instant");
          }}
          style={[
            tw`flex-1 justify-center items-center h-12  rounded-xl ${
              status === "New" ? `bg-primary` : `bg-transparent`
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoMedium text-xl ${
                status === "New" ? `text-white` : `text-black`
              } `,
            ]}
          >
            New
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setStatus("Pending");
            setBookingProcess("instant");
          }}
          style={[
            tw`flex-1 justify-center h-12 items-center   rounded-xl ${
              status === "Pending" ? `bg-violet` : `bg-transparent`
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoMedium text-xl  ${
                status === "Pending" ? `text-white` : `text-black`
              } `,
            ]}
          >
            Pending
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setStatus("Completed");
            setBookingProcess("instant");
          }}
          style={[
            tw`flex-1 justify-center h-12 items-center   rounded-xl ${
              status === "Completed" ? `bg-success600` : `bg-transparent`
            } `,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoMedium text-xl ${
                status === "Completed" ? `text-white` : `text-black`
              } `,
            ]}
          >
            Completed
          </Text>
        </Pressable>
      </View>
      {/* ---------------------- on time and instant --------------- */}
      <View
        style={tw`flex-row gap-8  my-9
        `}
      >
        <Pressable
          onPress={() => {
            setBookingProcess("instant");
          }}
          style={[tw`gap-1`]}
        >
          <Text style={[tw`font-DegularDisplayDemoMedium text-xl text-black`]}>
            Instant ({isLoadingAllProvderOrdersDetail ? "..." : instantCount})
          </Text>
          {bookingProcess === "instant" ? (
            <View style={tw`border-b-4 border-primary shadow-2xl `} />
          ) : null}
        </Pressable>
        <Pressable
          onPress={() => {
            setBookingProcess("schedule");
          }}
          style={[tw`gap-1`]}
        >
          <Text style={[tw`font-DegularDisplayDemoMedium text-xl text-black`]}>
            Schedule ({isLoadingAllProvderOrdersDetail ? "..." : scheduleCount})
          </Text>
          {bookingProcess === "schedule" ? (
            <View style={tw`border-b-4 border-primary shadow-2xl `} />
          ) : null}
        </Pressable>
      </View>

      {/* -------------- order content ---------------- */}
      {(isLoadingfetchOrderItems || isFetchingOrderItems) && (
        <ActivityIndicator style={tw`mt-10`} size="large" color="#FF6600" />
      )}
      {/* Empty state */}
      {!isLoadingfetchOrderItems &&
        !isFetchingOrderItems &&
        (!fetchOrderItemsData?.data?.data ||
          fetchOrderItemsData?.data?.data.length === 0) && (
          <View style={tw`items-center justify-center py-20`}>
            <Text
              style={tw`text-xl text-gray-600 font-DegularDisplayDemoMedium`}
            >
              No {bookingProcess} {status.toLowerCase()} orders found.
            </Text>
          </View>
        )}
      {!isLoadingfetchOrderItems &&
        !isFetchingOrderItems &&
        fetchOrderItemsData?.data?.data?.length > 0 &&
        <View style={tw`gap-3 mt-4`}>
          {fetchOrderItemsData?.data?.data.length > 0 && (fetchOrderItemsData?.data?.data.map((item: any, index: any) => (

            <UserCard
              key={index}
              ProfileName={item.user.name}
              isProfileBadge={item.user.kyc_status === "Verified" ? true : false}
              Date={formateDate(item.created_at)}
              Description={descriptions[item.id]}
              ImgProfileImg={item.user.avatar}
              onPress={() => router.push({
                pathname: "/service_provider/individual/order_details_profile",
                params: {
                  id: item.id
                }
              })}
            />


          )))


          }
          {/* {[1, 2, 3, 4].map((index) => {
          return (
            <UserCard
              key={index}
              ProfileName="John Doe"
              isProfileBadge
              Date="Mon, 12 Des 2025"
              Description="Service title goes here"
            // onPress={() => router.push("")}
            />
          );
        })} */}
        </View>
      }

    </ScrollView>
  );
};

export default Order;
