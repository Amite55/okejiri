import { IconCross, IconDeleteRed, IconPlusYellow } from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import ServicesData from "@/src/json/ServiceData.json";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import React, { JSX, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const My_Services = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [deleteModalVisibla, setDeleteModalVisible] = useState<boolean>(false);

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
  };

  const setviceItem = [
    {
      id: 1,
      name: "Barbing",
    },
    {
      id: 2,
      name: "Cleaning",
    },
    {
      id: 3,
      name: "Cooking",
    },
    {
      id: 4,
      name: "Painting",
    },
    {
      id: 5,
      name: "Spa",
    },
    {
      id: 6,
      name: "Manicure",
    },
  ];
  const serviceItemRender = ({ item }) => {
    return (
      <View
        style={tw`relative justify-center items-center px-2`}
        key={item?.id}
      >
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
            onPress={() =>
              router.push("/service_provider/individual/my_services/my_service")
            }
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

        <TouchableOpacity
          onPress={() => setDeleteModalVisible(true)}
          style={tw`absolute top-3 right-5 h-9 w-8 rounded-lg border border-white justify-center items-center`}
        >
          <SvgXml xml={IconDeleteRed} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={ServicesData}
        renderItem={serviceItemRender}
        ListHeaderComponent={() => (
          <View>
            <BackTitleButton
              pageName={"My services"}
              onPress={() => router.back()}
              titleTextStyle={tw`text-xl`}
            />

            <View style={tw`items-end mb-2`}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={tw`w-12 h-11 rounded-lg bg-white justify-center items-center`}
              >
                <SvgXml xml={IconPlusYellow} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponentStyle={tw`w-full`}
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-1  items-center bg-base_color px-5 gap-3 `}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      {/* ============= add new service  modal ====================== */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
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
                height: _HEIGHT * 0.55,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
              tw`bg-gray-50 `,
            ]}
          >
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-14 flex-grow justify-between `}
            >
              <View>
                <View
                  style={[
                    tw`w-full flex-1 flex-row justify-between items-center h-14  bg-primary px-4`,
                    { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                  ]}
                >
                  <View
                    style={tw`flex-row w-full justify-between items-center my-2 `}
                  >
                    <Text> </Text>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium  text-white text-xl mt-2`}
                    >
                      Add more services
                    </Text>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={tw`w-8 h-8 rounded-full bg-slate-200 justify-center items-center`}
                    >
                      <SvgXml xml={IconCross} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={tw`mt-5 gap-2`}>
                  {setviceItem.map(
                    (item, index): JSX.Element => (
                      <View key={item.id}>
                        <Pressable
                          onPress={() => {
                            setSelectedIndex(index), handleCheckBox();
                          }}
                          style={tw`flex-row items-center gap-2 px-5`}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedIndex(index), handleCheckBox();
                            }}
                            style={tw.style(
                              `border w-5 h-5  justify-center items-center rounded-sm`,
                              selectedIndex === index
                                ? `bg-primary border-0`
                                : `bg-transparent`
                            )}
                          >
                            {selectedIndex === index ? (
                              <Text style={tw`text-white text-sm`}>✔</Text>
                            ) : null}
                          </TouchableOpacity>
                          <Text
                            style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                          >
                            {item.name}
                          </Text>
                        </Pressable>

                        <View style={tw` border-b border-gray-500 mt-2`} />
                      </View>
                    )
                  )}
                </View>
              </View>

              <View style={tw`px-4 `}>
                <PrimaryButton titleProps="Add" />
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ========= selected modal ============= */}
      <Modal
        animationType="none"
        transparent={true}
        visible={deleteModalVisibla}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            <View style={tw`w-full m-4`}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                style={tw`flex-row justify-center items-center border border-black w-full p-1 rounded-lg gap-2 mb-2`}
              >
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-lg text-black`}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={handlePhotoDelete}
                style={tw`flex-row justify-center items-center border border-redDeep w-full p-1 rounded-lg gap-2`}
              >
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-lg text-redDeep`}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default My_Services;
