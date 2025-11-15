import {
  IconEditPenBlack,
  IconLocationGray,
  IconMyService,
  IconPhoneGray,
} from "@/assets/icons";
import SettingsCard from "@/src/Components/SettingsCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useEmployeeDetailsQuery } from "@/src/redux/apiSlices/companyProvider/account/employeesSlice";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Employees_Details = () => {
  const { id } = useLocalSearchParams();
  // console.log(" ============= id ", id)
  const { data: employeeDetailsData, isLoading: isLoadingEmployeeDetails, isError: isErrorEmployeeDetails } = useEmployeeDetailsQuery(id)
  const employee = employeeDetailsData?.data;

  // console.log(" ==================== employee details =============== ", JSON.stringify(employeeDetailsData, null, 2))

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-6`}
    >
      <BackTitleButton
        pageName={"Employee details"}
        onPress={() => router.back()}
        titleTextStyle={tw`text-xl`}
      // contentStyle={tw`px-5`}
      />
      {isLoadingEmployeeDetails ? <ActivityIndicator size={"large"} color="#FF6600" /> :
        <View style={tw`gap-3`}>
          <View
            style={tw`px-4 py-5 bg-white rounded-2xl justify-center items-center gap-3`}
          >
            <Image
              style={tw`w-24 h-24 rounded-full  `}
              source={{
                uri: employee?.image,
              }}
            />
            <Text
              style={tw`font-DegularDisplayDemoRegular text-2xl text-black text-center`}
            >
              {employee?.name}
            </Text>
            {/* <View
            style={tw`w-32 h-8 rounded-xl border border-gray-300 flex-row justify-center gap-2 items-center`}
          >
            <View style={tw`w-2 h-2 rounded-full bg-success600`} />
            <Text
              style={tw`font-DegularDisplayDemoMedium text-base text-black`}
            >
              Cleaner
            </Text>
          </View> */}
          </View>

          {/* ------------------- contact info -------------- */}
          <View
            style={tw`px-4 py-5 bg-white rounded-2xl justify-center items-center gap-1`}
          >
            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconPhoneGray} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
                {employee?.phone}
              </Text>
            </View>

            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconLocationGray} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
                {employee?.location}
              </Text>
            </View>
          </View>

          <SettingsCard
            onPress={() =>
              router.push({
                pathname: "/service_provider/company/my_employees/employee_profile_edit",
                params: {
                  id: id
                }
              }

              )
            }
            fastIcon={IconEditPenBlack}
            title="Edit profile"
          />
          <SettingsCard
            onPress={() =>
              router.push({
                pathname: "/service_provider/company/my_employees/service_provided",
                params: {
                  id: id
                }
              })
            }
            fastIcon={IconMyService}
            title="Service provided"
          />
        </View>
      }

    </ScrollView>
  );
};

export default Employees_Details;
