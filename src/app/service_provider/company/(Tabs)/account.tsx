import {
  IconBalance,
  IconBoostBlack,
  IconDisputes,
  IconLogout,
  IconManageDispute,
  IconMyPortfolio,
  IconMyService,
  IconRightCornerArrow,
  IconSettings,
  IconShare,
  IconSmallMultiple,
  IconSwitch,
} from "@/assets/icons";
import SettingsCard from "@/src/Components/SettingsCard";
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

      {/* ------------ settings menu ---------------- */}

      <View style={tw`gap-3 mb-6`}>
        <SettingsCard
          title=" Switch to User"
          // onPress={() => router.push("/company/(Tabs)")}
          fastIcon={IconSwitch}
        />
        <SettingsCard
          title="services"
          // onPress={() =>
          //   router.push("/service_provider/individual/my_services/my_service")
          // }
          fastIcon={IconMyService}
        />
        <SettingsCard
          title=" Manage discounts"
          // onPress={() =>
          //   router.push("/service_provider/individual/manage_discounts")
          // }
          fastIcon={IconManageDispute}
        />
        <SettingsCard
          title="Employees"
          // onPress={() => router.push("/service_provider/individual/portfolio")}
          fastIcon={IconSmallMultiple}
        />
        <SettingsCard
          title="Portfolio"
          // onPress={() =>
          //   router.push(
          //     "/service_provider/individual/boost_profiles/boost_profile"
          //   )
          // }
          fastIcon={IconMyPortfolio}
        />
        <SettingsCard
          title="My disputes"
          // onPress={() => router.push("/company/refer_friend")}
          fastIcon={IconDisputes}
        />
        <SettingsCard
          title=" Boost profile"
          // onPress={() =>
          //   router.push(
          //     "/service_provider/individual/boost_profiles/boost_profile"
          //   )
          // }
          fastIcon={IconBoostBlack}
        />
        <SettingsCard
          title="Refer a friend"
          // onPress={() => router.push("/company/refer_friend")}
          fastIcon={IconShare}
        />
        <SettingsCard
          title="Settings"
          onPress={() =>
            router.push("/service_provider/individual/settings/setting")
          }
          fastIcon={IconSettings}
        />
      </View>
      <SettingsCard
        title="Logout"
        // onPress={() => setModalVisible(true)}
        fastIcon={IconLogout}
        textStyle={tw`text-primary`}
        contentStyle={tw`mb-4`}
      />
    </ScrollView>
  );
};

export default Account;
