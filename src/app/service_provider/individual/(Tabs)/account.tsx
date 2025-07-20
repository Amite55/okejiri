import {
  IconBalance,
  IconBoostBlack,
  IconDisputes,
  IconGetterThen,
  IconLogout,
  IconManageDispute,
  IconMyPortfolio,
  IconMyService,
  IconRightCornerArrow,
  IconSettings,
  IconShare,
  IconSwitch,
} from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Account = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={tw`flex-1 bg-base_color px-5 `}
      contentContainerStyle={tw`pb-24`}
    >
      <Text style={tw`font-DegularDisplayDemoMedium text-center text-3xl my-4`}>
        Account
      </Text>
      {/* ============================ profile info ============================== */}
      <View
        style={tw`px-4 py-5 bg-white rounded-2xl justify-center items-center gap-3`}
      >
        <Image
          style={tw`w-28 h-28 rounded-full  `}
          source={{
            uri: "https://i.ibb.co/H65jtCN/slava-jamm-r-Aa-N15-Wb-E9-Q-unsplash.jpg",
          }}
        />
        <Text
          style={tw`font-DegularDisplayDemoRegular text-2xl text-black text-center`}
        >
          Profile Name
        </Text>
        <View
          style={tw`w-32 h-8 rounded-2xl bg-blue100 justify-center items-center`}
        >
          <Text style={tw`font-DegularDisplayDemoMedium text-base text-white`}>
            Unverified
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() =>
          router.push(
            "/service_provider/individual/individual_user_wallet/wallet"
          )
        }
        style={tw`flex-row justify-between items-center my-4 bg-white p-4 rounded-2xl`}
      >
        <View style={tw`flex-row items-center gap-3`}>
          <View
            style={tw`w-14 h-14  rounded-full border border-primary justify-center items-center`}
          >
            <SvgXml xml={IconBalance} />
          </View>

          <View>
            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
              Available balance
            </Text>
            <Text style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}>
              ₦1000.50
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push(
              "/service_provider/individual/individual_user_wallet/wallet"
            )
          }
          style={tw`w-14 h-14 rounded-full border border-gray-500 justify-center items-center`}
        >
          <SvgXml xml={IconRightCornerArrow} />
        </TouchableOpacity>
      </Pressable>

      <View style={tw`gap-3`}>
        <Pressable
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconSwitch} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Switch to User
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        <Pressable
          // onPress={() => router.push("/company/bookingsHistory")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconMyService} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              My services
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        <Pressable
          // onPress={() => router.push("/company/favorites_item")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconManageDispute} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Manage discounts
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        <Pressable
          // onPress={() => router.push("/company/serviceNearbyHistory")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconMyPortfolio} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Portfolio
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        <Pressable
          // onPress={() => router.push("/company/settings/setting")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconBoostBlack} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Boost profile
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        <Pressable
          // onPress={() => router.push("/company/disputes/my_disputes")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconDisputes} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              My disputes
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        <Pressable
          // onPress={() => router.push("/company/refer_friend")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconShare} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Refer a friend
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>

        <Pressable
          // onPress={() => router.push("/company/refer_friend")}
          style={tw`flex-row justify-between bg-white rounded-full items-center w-full h-14 px-4`}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconSettings} />
            <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
              Settings
            </Text>
          </View>
          <SvgXml xml={IconGetterThen} />
        </Pressable>
      </View>

      <Pressable
        style={tw`flex-row justify-between bg-white rounded-full items-center w-full my-6 h-14 px-4`}
      >
        <View style={tw`flex-row items-center gap-3`}>
          <SvgXml xml={IconLogout} />
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-primary `}
          >
            Logout
          </Text>
        </View>
        <SvgXml xml={IconGetterThen} />
      </Pressable>
    </ScrollView>
  );
};

export default Account;
