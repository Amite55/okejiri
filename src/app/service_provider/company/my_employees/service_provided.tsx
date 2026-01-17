import { IconStar } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useEmployeeDetailsQuery } from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const providedServicesData = [
  {
    id: 1,
    status: "Pending",
  },
  {
    id: 2,
    status: "Completed",
  },
  {
    id: 3,
    status: "Pending",
  },
  {
    id: 4,
    status: "Completed",
  },
  {
    id: 5,
    status: "Completed",
  },
  {
    id: 6,
    status: "Completed",
  },
  {
    id: 7,
    status: "Pending",
  },
];

const renderServiceProvided = ({ item, name }: { item: any; name: string }) => {
  let statusStyle = "";

  if (item.status === "Pending") {
    statusStyle = "bg-blue-500";
  } else if (item.status === "Completed") {
    statusStyle = "bg-green-600";
  } else if (item.status === "Cancelled") {
    statusStyle = "bg-red-600 ";
  }

  return (
    <TouchableOpacity
      disabled={true}
      // key={item?.booking_items.id}
      style={tw`flex-row justify-between bg-white px-2 py-3 rounded-xl`}
    >
      <View style={tw`flex-1 flex-row gap-3`}>
        <Image style={tw`w-20 h-20 rounded-xl`} source={ImgProfileImg} />
        <View style={tw`w-[65%]`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
          >
            {item?.booking_items[0].package?.title}
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-regularText text-xl`}
            >
              {name}
            </Text>
            {/* <SvgXml xml={IconProfileBadge} /> */}
          </View>
          <View style={tw`flex-row items-center`}>
            <SvgXml xml={IconStar} />
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-primary`}
            >
              {item?.review?.rating === 0 || item?.review === null
                ? "0.0"
                : Number(item?.review?.rating).toFixed(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw`items-end gap-2`}>
        <Text
          style={tw`flex-1 font-DegularDisplayDemoMedium text-xl text-primary`}
        >
          ₦ {item?.booking_items[0].package?.price}
        </Text>
        <View
          style={[
            tw`flex-1 px-2 py-0.5 rounded-lg justify-center items-center  ${statusStyle}`,
          ]}
        >
          <Text style={tw`font-DegularDisplayDemoRegular text-base text-white`}>
            {item?.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Service_Provided = () => {
  const { id } = useLocalSearchParams();
  const {
    data: employeeDetailsData,
    isLoading: isLoadingEmployeeDetails,
    isError: isErrorEmployeeDetails,
  } = useEmployeeDetailsQuery(id);
  const employee = employeeDetailsData?.data;
  console.log(" ============= employee id ============== ", id);
  console.log(
    " =========================== employee id ===================== ",
    JSON.stringify(employee, null, 2)
  );

  return (
    <FlatList
      style={tw`flex-1 bg-base_color`}
      contentContainerStyle={tw`px-5 gap-3 pb-4`}
      data={employee?.services_provided ?? []}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) =>
        renderServiceProvided({ item, name: employee?.name })
      }
      ListHeaderComponent={() => (
        <View>
          <BackTitleButton
            pageName={"Service provided"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
            // contentStyle={tw`px-5`}
          />
        </View>
      )}
      ListFooterComponent={
        employee?.services_provided?.length > 0 ? (
          <View style={tw`mt-4 mb-8 justify-center items-center`}>
            <Text style={tw`text-gray-500 text-lg`}>
              No more services in the list
            </Text>
          </View>
        ) : null
      }
      ListEmptyComponent={() => (
        <View style={tw`flex-1 justify-center items-center  gap-3`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-gray-500`}
          >
            Nothing to show here
          </Text>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-base text-gray-400`}
          >
            Please add a service for provider to see them here.
          </Text>
        </View>
      )}
    />
  );
};

export default Service_Provided;
