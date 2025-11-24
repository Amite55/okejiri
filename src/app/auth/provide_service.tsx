import {
  IconCrossWhite,
  IconQunsMark,
  IconRightArrow,
  IconSettingsPrimary,
} from "@/assets/icons";
import { ImgLogo } from "@/assets/images/image";
import AuthComponents from "@/src/Components/AuthComponents";
import PrimaryButton from "@/src/Components/PrimaryButton";
import { useProviderTypes } from "@/src/hooks/useProviderTypes";
import { useRoll } from "@/src/hooks/useRollHooks";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { useCompletePersonalizationMutation } from "@/src/redux/apiSlices/personalizationSlice";
import { useServicesQuery } from "@/src/redux/apiSlices/userProvider/homeSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

const Provide_Service = () => {
  const { jsonContactInfo, from } = useLocalSearchParams();
  const contactInfo = JSON.parse(jsonContactInfo || "{}");
  const [value, setValue] = useState([]);
  const [error, setError] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sendRequest, setSendRequest] = useState("");
  const roll = useRoll();
  const providerTypes = useProviderTypes();
  const [about, setAbout] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  // -------------------- api end point ---------------------
  const [information, { isLoading: isLoadingPersonalization }] =
    useCompletePersonalizationMutation({});
  const { data: getServiceData } = useServicesQuery({});
  const { data: getProfileData, isLoading: isLoadingProfile } = useProfileQuery(
    {}
  );
  const handleScreenInfo = async () => {
    try {
      if (value.length === 0) {
        setError("Please select your service");
        return;
      } else {
        setError("");
        const payload = {
          ...(from !== "role_switch" && contactInfo ? contactInfo : {}),
          ...(from === "role_switch" && {
            role: roll,
            provider_type: providerTypes,
            address: getProfileData?.data?.address,
            phone: getProfileData?.data?.phone,
            about,
            id: getProfileData?.data?.id,
            latitude: getProfileData?.data?.latitude,
            longitude: getProfileData?.data?.longitude,
          }),
          service_id: [value],
        };
        const res = await information(payload).unwrap();
        if (res) {
          router.replace("/service_provider/individual/(Tabs)/home");
          if (res?.data?.kyc_status === "Unverified") {
            setTimeout(() => {
              router.push("/kyc_completed_modal");
            }, 500);
          }
        }
      }
    } catch (error) {
      console.log(error, "form indivitual -------------s>");
      router.push({
        pathname: `/Toaster`,
        params: {
          res: error?.message || "Something went wrong please try again",
        },
      });
    }
  };

  // ============================ request for new service ============================
  const handleRequestService = () => {
    try {
      if (!sendRequest) {
        setError("Please Enter your Service");
        return;
      } else {
        setError("");
        setModalVisible(false);
        console.log(sendRequest, "this is value");
      }
    } catch (error) {
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
    }
  };

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={tw`flex-1 bg-base_color px-5`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              tw` justify-between  flex-grow`,
              isKeyboardVisible ? tw`pb-16` : tw`pb-1`,
            ]}
          >
            <View>
              <BackTitleButton
                onPress={() => router.back()}
                pageName={"Sign up as a service provider"}
                titleTextStyle={tw`text-lg`}
              />
              <View style={tw`justify-center items-center mb-12`}>
                <Image style={tw`w-44 h-12 mt-12 mb-12`} source={ImgLogo} />
                <AuthComponents
                  title="What kind of service you provide ?"
                  subTitle="Please select a service that suits best with your work."
                />
              </View>

              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={getServiceData?.data?.services}
                maxHeight={300}
                labelField="name"
                valueField="id"
                dropdownPosition="top"
                placeholder={!isFocus ? "Select service" : "..."}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.id);
                  setIsFocus(false);
                }}
              />
              {error && (
                <Text
                  style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm pt-4`}
                >
                  {error}
                </Text>
              )}

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={tw`flex-row items-center gap-2 my-4 justify-center`}
              >
                <SvgXml xml={IconQunsMark} />
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-lg text-primary`}
                >
                  Request to add service
                </Text>
              </TouchableOpacity>

              {from === "role_switch" && (
                <View>
                  <Text style={tw`text-black font-medium text-base ml-3 my-1`}>
                    About you
                  </Text>
                  <View
                    style={tw`flex-row  gap-2 border border-gray-500 h-52 rounded-3xl px-3 mb-4`}
                  >
                    <TextInput
                      placeholderTextColor="#777777"
                      textAlignVertical="top"
                      style={tw`flex-1  text-black text-base font-PoppinsMedium `}
                      placeholder="Write a bio about you"
                      onChangeText={(value) => setAbout(value)}
                      multiline
                      value={about}
                    />
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={tw`bg-primary rounded-full my-4`}
              activeOpacity={0.8}
              onPress={handleScreenInfo}
              disabled={isLoadingPersonalization}
            >
              {isLoadingPersonalization ? (
                <View style={tw`flex-row justify-center items-center gap-3`}>
                  <ActivityIndicator size={"small"} color={tw.color("white")} />
                  <Text
                    style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                  >
                    {from === "role_switch" ? "Updating" : "Sign up"}
                  </Text>
                </View>
              ) : (
                <View style={tw`flex-row justify-center items-center gap-4`}>
                  <Text
                    style={tw` text-center text-white text-base py-4  font-PoppinsBold`}
                  >
                    {from === "role_switch" ? "Update" : "Sign up"}
                  </Text>
                  <SvgXml xml={IconRightArrow} />
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
          {/* ------------------------------- cancel modal ---------------------------------- */}
          <Modal
            animationType="fade"
            transparent
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          >
            <View
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-40`}
            >
              <View
                style={tw`bg-white w-[90%] self-center rounded-2xl h-6/12 `}
              >
                <View
                  style={[
                    tw`flex-row items-center justify-between px-5 bg-primary h-12 `,
                    { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
                  ]}
                >
                  <View />
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
                  >
                    Request to add service
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={tw`p-2`}
                  >
                    <SvgXml xml={IconCrossWhite} />
                  </TouchableOpacity>
                </View>

                <View style={tw`flex-grow justify-between `}>
                  <View>
                    <View style={tw`justify-center items-center mt-4`}>
                      <SvgXml xml={IconSettingsPrimary} />
                    </View>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black text-center mt-4`}
                    >
                      What kind of service you want to add ?
                    </Text>

                    <TextInput
                      style={tw`border border-gray-400 h-14 text-black px-4 rounded-full mt-2 mx-4`}
                      placeholder="Type here..."
                      placeholderTextColor="#535353"
                      onChangeText={(i) => setSendRequest(i)}
                    />
                    {error && (
                      <Text
                        style={tw`text-red-500 ml-3 mt-[-12px] mb-4 text-sm pt-4`}
                      >
                        {error}
                      </Text>
                    )}
                  </View>

                  <View style={tw`px-4 pb-6`}>
                    <PrimaryButton
                      onPress={() => {
                        handleRequestService();
                      }}
                      titleProps="Send request"
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Provide_Service;

// ------------ dropdown Style --------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 350,
    maxHeight: 400,
    borderRadius: 30,
  },
});
