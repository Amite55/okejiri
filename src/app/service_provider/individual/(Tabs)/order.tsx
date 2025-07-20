import {
  IconDate,
  IconProfileBadge,
  IconRightArrowCornerPrimaryColor,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Order = () => {
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isPending, setIspending] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [isOnTime, setIsOnTime] = useState<boolean>(true);
  const [isInstant, setInstant] = useState<boolean>(false);

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
            setIsNew(true);
            setIspending(false);
            setIsCompleted(false);
          }}
          style={[
            tw`flex-1 justify-center items-center h-12  rounded-xl ${
              isNew ? `bg-primary` : `bg-transparent`
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoMedium text-xl ${
                isNew ? `text-white` : `text-black`
              } `,
            ]}
          >
            New
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setIspending(true);
            setIsCompleted(false);
            setIsNew(false);
          }}
          style={[
            tw`flex-1 justify-center h-12 items-center   rounded-xl ${
              isPending ? `bg-violet` : `bg-transparent`
            }`,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoMedium text-xl  ${
                isPending ? `text-white` : `text-black`
              } `,
            ]}
          >
            Pending
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setIsCompleted(true);
            setIsNew(false);
            setIspending(false);
          }}
          style={[
            tw`flex-1 justify-center h-12 items-center   rounded-xl ${
              isCompleted ? `bg-success600` : `bg-transparent`
            } `,
          ]}
        >
          <Text
            style={[
              tw`font-DegularDisplayDemoMedium text-xl ${
                isCompleted ? `text-white` : `text-black`
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
            setIsOnTime(true);
            setInstant(false);
          }}
          style={[tw`gap-1`]}
        >
          <Text style={[tw`font-DegularDisplayDemoMedium text-xl text-black`]}>
            On time (10)
          </Text>
          {isOnTime ? (
            <View style={tw`border-b-4 border-primary shadow-2xl `} />
          ) : null}
        </Pressable>

        <Pressable
          onPress={() => {
            setInstant(true);
            setIsOnTime(false);
          }}
          style={[tw`gap-1`]}
        >
          <Text style={[tw`font-DegularDisplayDemoMedium text-xl text-black`]}>
            Instant (20)
          </Text>
          {isInstant ? (
            <View style={tw`border-b-4 border-primary shadow-2xl `} />
          ) : null}
        </Pressable>
      </View>

      {/* -------------- order content ---------------- */}

      <View style={tw`gap-3 mt-4`}>
        {[1, 2, 3, 4].map((index) => {
          return (
            <Pressable
              onPress={() =>
                router.push(
                  "/service_provider/individual/order_details_profile"
                )
              }
              style={tw`h-32 px-5 rounded-2xl bg-white flex-row justify-between items-center`}
              key={index}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Image
                  style={tw`w-16 h-16 rounded-full `}
                  source={ImgProfileImg}
                />
                <View style={tw`gap-1.5`}>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Text>Profile Name</Text>
                    <SvgXml xml={IconProfileBadge} />
                  </View>
                  <Text>Service title goes here</Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconDate} />
                    <Text>Mon, June 2</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={tw`w-12 h-12 rounded-2xl border border-primary justify-center items-center `}
              >
                <SvgXml xml={IconRightArrowCornerPrimaryColor} />
              </TouchableOpacity>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Order;
