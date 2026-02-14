import {
  IconRightCornerArrow,
  IconServiceProvider,
  IconUser,
} from "@/assets/icons";
import { ImgChoseRoll, ImgLogo } from "@/assets/images/image";
import { useNotification } from "@/context/NotificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

const Chose_roll = () => {
  const { notification, deviceDetails, expoPushToken, error } =
    useNotification();

  if (deviceDetails) {
    console.log(deviceDetails, "device details from role screen");
  }
  if (notification) {
    console.log("Notification:________ role screen", notification);
  }

  async function handleSendPushNotification(expoPushToken: string) {
    // console.log(expoPushToken, "this is expo push token jj------------>");
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    // Check the response status
    const data = await response.json();
    console.log("🔔 Expo Server Response Data:", JSON.stringify(data, null, 2));
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color`}
    >
      <View style={tw`flex-1 justify-center items-center mt-4`}>
        <Image style={tw`w-44 h-12`} source={ImgLogo} contentFit="contain" />
        <Image
          contentFit="cover"
          style={tw`w-full h-80 px-11 mt-3`}
          source={ImgChoseRoll}
        />
        <View style={tw`flex-1 justify-center items-center gap-3 my-3`}>
          <Text
            style={tw`flex-1 font-PoppinsMedium text-3xl text-black text-center`}
          >
            Choose your role
          </Text>
          <Text
            style={tw` flex-1 font-PoppinsRegular text-lg text-black text-center`}
          >
            Book trusted services as a User, or list and manage your offerings
            as a Service Provider on Okejiri.
          </Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await handleSendPushNotification(expoPushToken);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem("roll", "USER");
            AsyncStorage.removeItem("providerTypes");
            router.push("/auth/login");
          }}
          style={tw`bg-white w-full rounded-3xl mt-4 p-2 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row items-center gap-5`}>
            <View
              style={tw`bg-primary rounded-3xl w-16 h-16 justify-center items-center`}
            >
              <SvgXml xml={IconUser} />
            </View>
            <Text style={tw`font-medium text-xl text-black`}>Service User</Text>
          </View>
          <View style={tw`pr-4`}>
            <SvgXml xml={IconRightCornerArrow} />
          </View>
        </TouchableOpacity>
        {/* ------------------------------ service provider ---------------------------- */}
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem("roll", "PROVIDER");
            router.push("/service_provider/service_provider_roll");
          }}
          style={tw`bg-white w-full rounded-3xl p-2 flex-row justify-between items-center mt-3`}
        >
          <View style={tw`flex-row items-center gap-5`}>
            <View
              style={tw`bg-primary rounded-3xl w-16 h-16 justify-center items-center`}
            >
              <SvgXml xml={IconServiceProvider} />
            </View>
            <Text style={tw`font-medium text-xl text-black`}>
              Service provider
            </Text>
          </View>
          <View style={tw`pr-4`}>
            <SvgXml xml={IconRightCornerArrow} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Chose_roll;
