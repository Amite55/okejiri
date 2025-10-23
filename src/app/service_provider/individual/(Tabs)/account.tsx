import {
  IconBalance,
  IconBoostBlack,
  IconDisputes,
  IconLogout,
  IconLogoutModal,
  IconManageDispute,
  IconMyPortfolio,
  IconMyService,
  IconRightCornerArrow,
  IconSettings,
  IconShare,
  IconSwitch,
} from "@/assets/icons";
import LogoutModal from "@/src/Components/LogoutModal";
import SettingsCard from "@/src/Components/SettingsCard";
import tw from "@/src/lib/tailwind";
import { useLogoutMutation } from "@/src/redux/apiSlices/authSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const Account = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // ============================ api end point ==============================
  const [logout] = useLogoutMutation({});

  // -------------- handle logout --------------
  const handleLogoutUser = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setModalVisible(false);
      await logout(token).unwrap();
      await AsyncStorage.removeItem("roll");
      await AsyncStorage.removeItem("providerTypes");
      await AsyncStorage.removeItem("token");
      router.replace("/chose_roll");
    } catch (e) {
      console.log("Error reading role from AsyncStorage", e);
      router.push({
        pathname: "/Toaster",
        params: { res: e?.message || e },
      });
    }
  };

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
          onPress={() => router.push("/company/(Tabs)")}
          fastIcon={IconSwitch}
        />
        <SettingsCard
          title=" My services"
          onPress={() =>
            router.push("/service_provider/individual/my_services/my_service")
          }
          fastIcon={IconMyService}
        />
        <SettingsCard
          title=" Manage discounts"
          onPress={() =>
            router.push("/service_provider/individual/manage_discounts")
          }
          fastIcon={IconManageDispute}
        />
        <SettingsCard
          title="Portfolio"
          onPress={() => router.push("/service_provider/individual/portfolio")}
          fastIcon={IconMyPortfolio}
        />
        <SettingsCard
          title=" Boost profile"
          onPress={() =>
            router.push(
              "/service_provider/individual/boost_profiles/boost_profile"
            )
          }
          fastIcon={IconBoostBlack}
        />
        <SettingsCard
          title="My disputes"
          onPress={() =>
            router.push("/service_provider/individual/disputes/my_disputes")
          }
          fastIcon={IconDisputes}
        />
        <SettingsCard
          title="Refer a friend"
          onPress={() => router.push("/company/refer_friend")}
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
        onPress={() => setModalVisible(true)}
        fastIcon={IconLogout}
        textStyle={tw`text-primary`}
        contentStyle={tw`mb-4`}
      />

      <LogoutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        logoutIcon={IconLogoutModal}
        buttonTitle="Yes, Log out"
        modalTitle="Are you sure you want to log out?"
        subTitle="You will need to log in again to access your account."
        onPress={() => {
          handleLogoutUser();
        }}
      />
    </ScrollView>
  );
};

export default Account;
