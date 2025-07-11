import {
  IconBackLeftArrow,
  IconChatsYellow,
  IconCross,
  IconFavouriteWhite,
  IconLocation,
  IconPlus,
  IconProfileBadge,
  IconTick,
} from "@/assets/icons";
import {
  ImgCleaning,
  ImgProfileImg,
  ImgServiceProviderRoll,
} from "@/assets/images/image";
import tw from "@/src/lib/tailwind";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const ServiceDetails = () => {
  const [tickmark, setTickMark] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const RenderRankingItem = () => {
    return (
      <View style={tw`bg-white w-80 h-72 rounded-lg`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Image style={tw`w-16 h-16 rounded-full `} source={ImgProfileImg} />
          <View>
            <Text>Profile name</Text>
            <Text>Company CEO</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-28`}
    >
      <View style={tw`relative`}>
        <Image
          resizeMode="contain"
          style={tw`w-full h-60 `}
          source={ImgServiceProviderRoll}
        />

        {/* ============ back button =-================ */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`absolute top-2 left-2 w-14 h-14 bg-white rounded-full justify-center items-center`}
        >
          <SvgXml xml={IconBackLeftArrow} />
        </TouchableOpacity>

        {/*  ================= add wish list fvt icon =========================== */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`absolute bottom-4 right-2 w-14 h-14 bg-black opacity-60 rounded-full justify-center items-center`}
        >
          <SvgXml xml={IconFavouriteWhite} />
        </TouchableOpacity>
      </View>

      <Text style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}>
        Chats
      </Text>

      <View style={tw`gap-3`}>
        <Pressable
          style={tw`flex-row justify-between items-center  px-4 py-3 rounded-3xl bg-white`}
        >
          <View>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              Room cleaning
            </Text>
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
              ₦ 49.00
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-lg text-regularText`}
            >
              Est. time : 30 mins
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-4`}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
            >
              <Text style={tw``}>See details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTickMark(!tickmark)}
              style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
            >
              <SvgXml xml={tickmark ? IconTick : IconPlus} />
            </TouchableOpacity>
          </View>
        </Pressable>

        <Pressable
          style={tw`flex-row justify-between items-center px-4 py-3 rounded-3xl bg-white`}
        >
          <View>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              Room cleaning
            </Text>
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
              ₦ 49.00
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-lg text-regularText`}
            >
              Est. time : 30 mins
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-4`}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
            >
              <Text style={tw``}>See details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTickMark(!tickmark)}
              style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
            >
              <SvgXml xml={tickmark ? IconTick : IconPlus} />
            </TouchableOpacity>
          </View>
        </Pressable>

        <Pressable
          style={tw`flex-row justify-between items-center px-4 py-3 rounded-3xl bg-white`}
        >
          <View>
            <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
              Room cleaning
            </Text>
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
              ₦ 49.00
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-lg text-regularText`}
            >
              Est. time : 30 mins
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-4`}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
            >
              <Text style={tw``}>See details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTickMark(!tickmark)}
              style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
            >
              <SvgXml xml={tickmark ? IconTick : IconPlus} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>

      <View
        style={tw`border border-gray-400 rounded-full flex-row justify-center h-14 items-center gap-3 my-6`}
      >
        <SvgXml xml={IconLocation} />
        <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
          2 km away
        </Text>
      </View>

      <View style={tw`flex-row`}>
        <TouchableOpacity style={tw`flex-1 flex-row items-center gap-3`}>
          <Image style={tw`w-11 h-11 rounded-full`} source={ImgProfileImg} />
          <View>
            <View style={tw`flex-row gap-2 items-center`}>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Profile name
              </Text>
              <SvgXml xml={IconProfileBadge} />
            </View>
            <View style={tw`flex-row items-center`}>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-primary text-xl`}
              >
                5.0
              </Text>
              <StarRating
                starSize={20}
                rating={4}
                color="#FF6600"
                onChange={() => {}}
              />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-lg text-black`}
              >
                (500)
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`border border-gray-300 flex-row items-center rounded-2xl gap-2 p-2`}
        >
          <SvgXml xml={IconChatsYellow} />
          <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
            Message
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={RenderRankingItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`mt-4 pl-4 gap-3 `}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      {/* =================== see service details modal ===================== */}

      {/* ============= booking modal ====================== */}
      <Modal
        animationType="slide"
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
              <Text>{""}</Text>
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
                Room cleaning
              </Text>

              <View style={tw`px-4 justify-center items-center`}>
                <Image
                  resizeMode="cover"
                  style={tw`w-full h-52 rounded-2xl`}
                  source={ImgCleaning}
                />
              </View>

              <View style={tw`px-4 ml-3 my-6 gap-3`}>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
                <View style={tw`flex-row items-center  gap-3`}>
                  <View style={tw`w-2 h-2 bg-black`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                  >
                    Dusting of all surfaces
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row items-center gap-3 px-4`}>
                <TouchableOpacity
                  style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
                >
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
                  >
                    ₦ 49.00
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTickMark(!tickmark)}
                  style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
                >
                  <SvgXml xml={tickmark ? IconTick : IconPlus} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default ServiceDetails;
