import {
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
  IconSearch,
} from "@/assets/icons";
import { ImgBanner } from "@/assets/images/image";
import ServiceProfileHeaderInfo from "@/src/Components/ServiceProfileHeaderInfo";
import CleaningData from "@/src/json/CleaningData.json";
import ServicesData from "@/src/json/ServiceData.json";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const Company_Home_Index = () => {
  const serviceItemRender = ({ item }) => {
    return (
      <View style={tw`relative justify-center items-center`} key={item?.id}>
        <Image
          resizeMode="cover"
          style={tw`w-44 h-48 rounded-lg `}
          source={{ uri: item?.image }}
        />

        <View
          style={tw`absolute bottom-2 justify-center items-center w-38 h-10 rounded-xl border border-white60 overflow-hidden`}
        >
          {/* Background Blur */}
          {/* <BlurView
            style={tw`absolute inset-0`}
            blurType="dark"
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          /> */}

          {/* Foreground content (Text) */}
          <TouchableOpacity
            style={tw`flex-1 justify-center items-center`}
            activeOpacity={0.7}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-center text-xl text-white`}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      {/* header parts  */}
      <ServiceProfileHeaderInfo />

      {/* ======================= search bar -=-o--------------------------- */}
      <View
        style={tw`w-full h-14 flex-row justify-start items-center px-4 gap-2 bg-white rounded-full my-3`}
      >
        <SvgXml xml={IconSearch} />
        <TextInput placeholder="Search service" />
      </View>

      {/* ======================== benner section start hare ==================== */}
      <View style={tw`flex-1 justify-center items-center `}>
        <Image
          style={tw`w-[97%] h-36 rounded-xl`}
          resizeMode="cover"
          source={ImgBanner}
        />
      </View>

      {/* ================== services =================== */}
      <View style={tw``}>
        <View style={tw`flex-row justify-between items-center mt-6 `}>
          <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}>
            Service
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/company/(Tabs)/services")}
            style={tw`border border-primary rounded-full w-28 h-11 flex-row justify-between items-center px-4`}
          >
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}
            >
              See all
            </Text>
            <SvgXml xml={IconRightArrowCornerPrimaryColor} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={ServicesData}
          renderItem={serviceItemRender}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={tw`mt-4 pl-4 gap-3 `}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* ===================== service nearby you ===================== */}

      <View>
        <View style={tw`flex-row justify-between items-center mt-6 `}>
          <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}>
            Services nearby you
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/company/serviceNearbyHistory")}
            style={tw`border border-primary rounded-full w-28 h-11 flex-row justify-between items-center px-4`}
          >
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}
            >
              See all
            </Text>
            <SvgXml xml={IconRightArrowCornerPrimaryColor} />
          </TouchableOpacity>
        </View>

        <View style={tw`gap-3 mt-3`}>
          {CleaningData?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            CleaningData.slice(0, 3).map((item) => (
              <Pressable
                onPress={() => router.push("/company/serviceDetails")}
                style={tw`flex-row justify-between items-center rounded-xl bg-white p-1.5`}
                key={item?.Id}
              >
                <Image
                  style={tw`w-20 h-20 rounded-2xl`}
                  source={{ uri: item?.image }}
                />
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    {item?.title}
                  </Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
                    >
                      {item?.profile_name}
                    </Text>

                    {item.badge ? <SvgXml xml={IconProfileBadge} /> : null}
                  </View>
                  <StarRating
                    color="#FF6600"
                    starSize={24}
                    rating={item?.rating || 0}
                    onChange={() => {}}
                  />
                </View>
                <View style={tw`justify-between gap-3`}>
                  <Text
                    style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
                  >
                    ₦{item?.price}
                  </Text>
                  <View
                    style={[
                      tw`bg-primary -mr-1 -mb-4 w-20 h-9 justify-center items-center`,
                      { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
                    ]}
                  >
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-base text-white`}
                    >
                      {item?.type}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </View>

      {/* ------------------ order history -------------------------- */}

      <View>
        <View style={tw`flex-row justify-between items-center mt-6 `}>
          <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}>
            Order history
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/company/bookingsHistory")}
            style={tw`border border-primary rounded-full w-28 h-11 flex-row justify-between items-center px-4`}
          >
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-primary`}
            >
              See all
            </Text>
            <SvgXml xml={IconRightArrowCornerPrimaryColor} />
          </TouchableOpacity>
        </View>

        <View style={tw`gap-3 mt-3`}>
          {CleaningData?.length === 0 ? (
            <Text
              style={tw`font-DegularDisplayDemoMedium text-xl text-deepBlue100 text-center`}
            >
              Your ServiCe No Data
            </Text>
          ) : (
            CleaningData.slice(0, 2).map((item) => (
              <Pressable
                onPress={() => router.push("/company/serviceDetails")}
                style={tw`flex-row justify-between items-center rounded-xl bg-white p-1.5`}
                key={item?.Id}
              >
                <Image
                  style={tw`w-20 h-20 rounded-2xl`}
                  source={{ uri: item?.image }}
                />
                <View>
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    {item?.title}
                  </Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
                    >
                      {item?.profile_name}
                    </Text>

                    {item.badge ? <SvgXml xml={IconProfileBadge} /> : null}
                  </View>
                  <StarRating
                    color="#FF6600"
                    starSize={24}
                    rating={item?.rating || 0}
                    onChange={() => {}}
                  />
                </View>
                <View style={tw`justify-between gap-3`}>
                  <Text
                    style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
                  >
                    ₦{item?.price}
                  </Text>
                  <View
                    style={[
                      tw`bg-primary -mr-1 -mb-4 w-20 h-9 justify-center items-center`,
                      { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
                    ]}
                  >
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-base text-white`}
                    >
                      {item?.type}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Company_Home_Index;
