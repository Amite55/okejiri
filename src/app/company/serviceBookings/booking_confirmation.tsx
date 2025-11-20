import {
  IconCardProfile,
  IconLocation,
  IconMailYellow,
  IconPhoneYellow,
  IconRightArrow,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetCartItemQuery } from "@/src/redux/apiSlices/userProvider/cartSlices";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Booking_Confirmation = () => {
  const { bookingInfoDetails } = useLocalSearchParams();
  const perseBookingInfoDetails = JSON.parse(bookingInfoDetails as any);

  // ====================== api end point ==================================
  const { data: getCartData, isLoading: isCartDataLoading } =
    useGetCartItemQuery({});

  const itemAmount = getCartData?.data.reduce((total: number, item: any) => {
    return total + Number(item.package.price);
  }, 0);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
      contentContainerStyle={tw`pb-1 justify-between flex-grow`}
    >
      <View style={tw``}>
        <BackTitleButton
          pageName={"Booking confirmation"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />

        {/*  ---------- booking  item  ------------  */}
        {getCartData?.data.map((item: any) => {
          return (
            <Pressable
              key={item?.id}
              disabled
              //   onPress={() => router.push("/company/serviceDetails")}
              style={tw`flex-row justify-between items-center rounded-xl bg-white mt-2 p-1.5`}
            >
              <View style={tw`flex-row gap-3 items-center`}>
                <Image
                  contentFit="cover"
                  style={tw`w-20 h-20 rounded-2xl`}
                  source={item?.package?.image}
                />
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    {item?.package?.title?.length > 17
                      ? item?.package?.title.slice(0, 17) + "..."
                      : item?.package?.title}
                  </Text>

                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
                  >
                    Est. time : {item?.package?.delivery_time} hours
                  </Text>
                </View>
              </View>

              <View style={tw`justify-between gap-3`}>
                <Text
                  style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
                >
                  ₦ {item?.package?.price}
                </Text>
                <View
                  style={[
                    tw`bg-primary -mr-2 -mb-4 w-20 h-9 justify-center items-center`,
                    { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
                  ]}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-sm text-white`}
                  >
                    {item?.package?.service?.name?.length > 10
                      ? `${item?.package?.service?.name.slice(0, 10)}...`
                      : item?.package?.service?.name}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}

        {/* ============== personal info ---------------------------------------- */}

        <View style={tw`bg-white rounded-2xl px-7 py-5 mt-6`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
            >
              Personal details
            </Text>
          </View>

          <View style={tw` mt-7 gap-3`}>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconCardProfile} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                {perseBookingInfoDetails?.billing_name}
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconMailYellow} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                {perseBookingInfoDetails?.billing_email}
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={IconPhoneYellow} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                {perseBookingInfoDetails?.billing_contact}
              </Text>
            </View>
            <View style={tw`flex-row items-start gap-2`}>
              <SvgXml style={tw`mt-1`} xml={IconLocation} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                {perseBookingInfoDetails?.billing_address}
              </Text>
            </View>
          </View>
        </View>

        {/*  -------------- booking details -------------------  */}

        <View style={tw`bg-white rounded-2xl px-7 py-5 mt-3`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
            >
              Booking details
            </Text>
            {/* <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/company/serviceBookings/serviceBooking",
                  params: {
                    cameFromEditData: JSON.stringify(perseBookingInfoDetails),
                  },
                })
              }
            >
              <SvgXml xml={IconEditPen} />
            </TouchableOpacity> */}
          </View>

          <View style={tw`mt-7 gap-3`}>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Booking Process:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                {perseBookingInfoDetails?.booking_process}
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Booking Type:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                {perseBookingInfoDetails?.booking_type}
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Date:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                {perseBookingInfoDetails?.schedule_date || "N/A"}
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Time slot:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                {perseBookingInfoDetails?.schedule_time_slot || "N/A"}
              </Text>
            </View>

            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Total amount:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                ₦ {itemAmount}
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                After Discount amount:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                ₦ {perseBookingInfoDetails?.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        onPress={() =>
          router.push({
            pathname: "/company/serviceBookings/make_payment",
            params: {
              bookingInfoDetails: JSON.stringify(perseBookingInfoDetails),
            },
          })
        }
        titleProps="Next  3/4"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />
    </ScrollView>
  );
};

export default Booking_Confirmation;
