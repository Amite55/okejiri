import {
  IconBackLeftArrow,
  IconChatsYellow,
  IconCross,
  IconFavouriteWhite,
  IconLocation,
  IconPlus,
  IconProfileBadge,
  IconStar,
  IconTick,
  IconWhishListSelected,
} from "@/assets/icons";
import ServiceCard from "@/src/Components/ServiceCard";
import tw from "@/src/lib/tailwind";
import { usePackageDetailsQuery } from "@/src/redux/apiSlices/userProvider/servicesSlices";
import { _HEIGHT } from "@/utils/utils";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const ServiceDetails = () => {
  const { service_id } = useLocalSearchParams();
  const [tickmark, setTickMark] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addWishlist, setAddWishList] = useState<boolean>(false);
  const [itemDetails, setItemDetails] = useState<any>({});
  const [addToCartState, setAddToCartState] = useState([]);

  console.log(addToCartState, "this is add to cart state");

  const filtered = addToCartState.filter(
    (item) => item.package_id === service_id
  );

  // ================== api end point ==================
  const { data: packageDetails, isLoading } =
    usePackageDetailsQuery(service_id);

  //  ranking profile item render  -------------------------------
  const RenderRankingItem = ({ item }) => {
    return (
      <View style={tw`bg-white shadow-md w-80 h-72 rounded-2xl p-4`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Image
            contentFit="contain"
            style={tw`w-16 h-16 rounded-full `}
            source={item?.user?.avatar}
          />
          <View>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-lg text-black`}
            >
              {item?.user?.name}
            </Text>
            {/* rating */}
            <View style={tw`flex-row items-center gap-1`}>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconStar} />
              </View>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-base text-black`}
              >
                ({item?.rating})
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`mt-2 gap-2`}>
          <Text style={tw`font-DegularDisplayDemoRegular text-base text-black`}>
            {item?.review?.length > 190
              ? `${item?.review?.slice(0, 190)}...`
              : item?.review}
          </Text>
        </View>
      </View>
    );
  };

  //  ----------- portfolio item render ----------------------------------
  const RenderPortfolioRenderItem = ({ item }) => {
    return (
      <View>
        <Image
          contentFit="cover"
          style={tw`w-80 h-40 rounded-xl`}
          source={item?.image}
        />
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-base_color `}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 px-5 `}
        contentContainerStyle={tw`pb-6`}
      >
        {/* -------------------- banner part ---------------- */}
        <View style={tw`relative`}>
          <Image
            contentFit="contain"
            style={tw`w-full h-60 rounded-2xl`}
            source={packageDetails?.data?.package_details?.image}
          />

          {/* ============ back button =-================ */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`absolute top-2 left-2 w-14 h-14 bg-white rounded-full justify-center items-center`}
          >
            <SvgXml xml={IconBackLeftArrow} />
          </TouchableOpacity>

          {/*  ================= add wish list fvt icon =========================== */}
          <Pressable
            onPress={() => setAddWishList(!addWishlist)}
            style={tw`absolute bottom-4 right-2 w-14 h-14 bg-black bg-opacity-50 border border-white rounded-full justify-center items-center`}
          >
            <SvgXml
              xml={addWishlist ? IconWhishListSelected : IconFavouriteWhite}
            />
          </Pressable>
        </View>

        {/* --------------------- services details part ---------------- */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}
        >
          Services details
        </Text>
        {/* -------------------package_detail_items part ---------------- */}
        <View style={tw`pl-2 gap-2 pb-3`}>
          {packageDetails?.data?.package_details?.package_detail_items?.length >
          0
            ? packageDetails?.data?.package_details?.package_detail_items.map(
                (item) => {
                  return (
                    <View
                      key={item?.id}
                      style={tw`flex-row items-center  gap-3`}
                    >
                      <View style={tw`w-1.5 h-1.5 bg-black rounded-full`} />
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                      >
                        {item?.item}
                      </Text>
                    </View>
                  );
                }
              )
            : null}
        </View>
        {/* ----------------- price and add to cart part ---------------- */}
        <View style={tw`flex-row items-center gap-3 `}>
          <TouchableOpacity
            style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
          >
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
              ₦ {packageDetails?.data?.package_details?.price}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // setTickMark(!tickmark);
              if (
                addToCartState?.some(
                  (cartItem: { package_id: number }) =>
                    cartItem?.package_id ==
                    packageDetails?.data?.package_details?.id
                )
              ) {
                setAddToCartState(
                  addToCartState.filter(
                    (cartItem: { package_id: number }) =>
                      cartItem?.package_id !==
                      packageDetails?.data?.package_details?.id
                  )
                );
              } else {
                setAddToCartState([
                  ...addToCartState,
                  { package_id: packageDetails?.data?.package_details?.id },
                ]);
              }
            }}
            style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
          >
            <SvgXml
              xml={
                addToCartState?.some(
                  (cartItem: { package_id: number }) =>
                    cartItem?.package_id ===
                    packageDetails?.data?.package_details?.id
                )
                  ? IconTick
                  : IconPlus
              }
            />
          </TouchableOpacity>
        </View>
        {/* ---------------- distance part ---------------- */}
        <View
          style={tw`border border-gray-400 rounded-full flex-row justify-center h-14 items-center gap-3 my-6`}
        >
          <SvgXml xml={IconLocation} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            {packageDetails?.data?.distance}
          </Text>
        </View>
        {/* ------------------- prover der profile =--------------------- */}
        <View style={tw`flex-row flex-1 pb-3`}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/company/provider_profile")}
            style={tw`flex-1 flex-row items-center gap-3`}
          >
            <Image
              style={tw`w-11 h-11 rounded-full`}
              source={packageDetails?.data?.package_details?.provider?.avatar}
              contentFit="contain"
            />
            <View>
              <View style={tw`flex-row gap-1 items-center`}>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                >
                  {packageDetails?.data?.package_details?.provider?.name}
                </Text>
                <SvgXml width={15} height={15} xml={IconProfileBadge} />
              </View>
              <View style={tw`flex-row items-center gap-1`}>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-primary text-lg `}
                >
                  {
                    packageDetails?.data?.package_details?.provider
                      ?.ratings_avg_rating
                  }
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconStar} />
                </View>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
                >
                  (
                  {
                    packageDetails?.data?.package_details?.provider
                      ?.ratings_count
                  }
                  )
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* --------------  message button ---------------- */}
          <TouchableOpacity
            style={tw`border border-gray-300 flex-row items-center rounded-2xl gap-2 px-2 h-11`}
          >
            <SvgXml xml={IconChatsYellow} />
            <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          Reviews
        </Text>
        {/* ============================== review profile =================================  */}
        <FlatList
          data={packageDetails?.data?.reviews}
          renderItem={RenderRankingItem}
          keyExtractor={(item, index) => item?.id.toString()}
          contentContainerStyle={tw`py-2 px-2 gap-3 `}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        {/* ============== portfolio section ================ */}
        {/* <ShortDataTitle
          FastTitle="Service"
          IconTitle="See all"
          Icon={IconRightArrowCornerPrimaryColor}
          SeeMorePathPress={() => router.push("/company/bookingsHistory")}
        /> */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl mt-2 text-black`}
        >
          Portfolio
        </Text>
        <FlatList
          data={packageDetails?.data?.portfolio}
          renderItem={RenderPortfolioRenderItem}
          keyExtractor={(item) => item?.id.toString()}
          contentContainerStyle={tw`p-2 gap-3 `}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        {/* ======================= more_services_from_this_provider ================ */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-black my-2 `}
        >
          More services from this provider
        </Text>
        <View style={tw`gap-3`}>
          {packageDetails?.data?.more_services_from_this_provider?.length ===
          0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              No more services from this provider
            </Text>
          ) : (
            packageDetails?.data?.more_services_from_this_provider?.map(
              (item) => {
                // console.log(
                //   item,
                //   "this is service from this provider ---------->"
                // );
                console.log(item?.package_id, item?.id);
                return (
                  <Pressable
                    key={item?.id}
                    style={tw`flex-row justify-between items-center  px-4 py-3 rounded-3xl bg-white`}
                  >
                    <View style={tw`flex-1`}>
                      <Text
                        numberOfLines={1}
                        style={tw`font-DegularDisplayDemoMedium text-lg text-black`}
                      >
                        {item?.title}
                      </Text>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                      >
                        ₦ {item?.price}
                      </Text>
                      <Text
                        style={tw`font-DegularDisplayDemoMedium text-base text-regularText`}
                      >
                        Est. time : {item?.delivery_time} hours
                      </Text>
                    </View>

                    <View style={tw`flex-row flex-none items-center gap-2`}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setModalVisible(true);
                          setItemDetails(item);
                        }}
                        style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
                      >
                        <Text>See details</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          if (
                            addToCartState?.some(
                              (cartItem: { package_id: number }) =>
                                cartItem?.package_id == item?.id
                            )
                          ) {
                            setAddToCartState(
                              addToCartState.filter(
                                (cartItem: { package_id: number }) =>
                                  cartItem?.package_id !== item?.id
                              )
                            );
                          } else {
                            setAddToCartState([
                              ...addToCartState,
                              { package_id: item?.id },
                            ]);
                          }
                          // setTickMark(!tickmark);
                        }}
                        style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
                      >
                        <SvgXml
                          xml={
                            addToCartState?.some(
                              (cartItem: { package_id: number }) =>
                                cartItem?.package_id === item?.id
                            )
                              ? IconTick
                              : IconPlus
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                );
              }
            )
          )}
        </View>

        {/* ---------------- You might also like ---------- */}
        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-6 `}
        >
          You might also like
        </Text>
        <View style={tw`gap-3 mt-4`}>
          {packageDetails?.data?.you_might_also_like?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            packageDetails?.data?.you_might_also_like?.map(
              (item: any, index: number) => (
                <ServiceCard
                  key={item?.id}
                  item={item}
                  index={index}
                  onPress={() => router.push("/company/serviceDetails")}
                />
              )
            )
          )}
        </View>
      </ScrollView>

      {/*  ================= Static bottom tab =================== */}
      {tickmark && (
        <View
          style={[
            tw`absolute bottom-0 left-0 right-0 bg-white px-5`,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 10, // For Android
              overflow: "visible", // Important for iOS shadow visibility
            },
          ]}
        >
          <View style={tw`flex-row justify-between items-center h-28 px-5`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
              >
                ₦ 49.00
              </Text>
              <View style={tw`flex-row items-center gap-3`}>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                >
                  1 service
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <View style={tw`w-2 h-2 rounded-full bg-regularText`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                  >
                    Est. 30 mins
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push("/company/serviceBookings/serviceBooking")
              }
              style={tw`w-28 h-12 justify-center items-center bg-primary rounded-lg`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-white`}
              >
                Book now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* =================== see service details modal ===================== */}
      <Modal
        animationType="fade"
        transparent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
          style={[
            {
              height: _HEIGHT,
            },
            tw`justify-end items-end bg-black bg-opacity-15  `,
          ]}
        >
          <Pressable
            style={[
              {
                height: _HEIGHT * 0.65,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
              tw`bg-gray-50 `,
            ]}
          >
            <View
              style={[
                tw`w-full flex-row justify-between items-center h-14  bg-primary px-4`,
                { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
              ]}
            >
              <Text></Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
              >
                Service details
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
              >
                <SvgXml xml={IconCross} />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-20 `}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black text-center my-4`}
              >
                {itemDetails?.title}
              </Text>

              <View style={tw`px-4 justify-center items-center`}>
                <Image
                  contentFit="cover"
                  style={tw`w-full h-52 rounded-2xl`}
                  source={itemDetails?.image}
                />
              </View>

              <View style={tw`p-4 gap-2`}>
                {itemDetails?.package_detail_items?.map((item) => (
                  <View key={item?.id} style={tw`flex-row items-center gap-2`}>
                    <View style={tw`w-1.5 h-1.5 bg-black rounded-full`} />
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                    >
                      {item?.item}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={tw`flex-row items-center gap-3 px-4`}>
                <TouchableOpacity
                  disabled
                  style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                  >
                    ₦ {itemDetails?.price}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  // onPress={() => setTickMark(!tickmark)}
                  style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
                >
                  <SvgXml xml={tickmark ? IconTick : IconPlus} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ServiceDetails;
