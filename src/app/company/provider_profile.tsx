import {
  IconCleaner,
  IconCross,
  IconEmailGray,
  IconFileUpload,
  IconLocationGray,
  IconMessageWhite,
  IconPhoneGray,
  IconProfileBadge,
  IconReportBlack,
} from "@/assets/icons";
import { ImgCleaning, ImgProfileImg } from "@/assets/images/image";
import CleaningData from "@/src/json/CleaningData.json";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const Provider_Profile = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<boolean>(false);

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
  };

  //  review profile item render  -------------------------------
  const RenderRankingItem = () => {
    return (
      <View style={tw`bg-white shadow-lg  w-80 h-72 rounded-lg p-6`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Image style={tw`w-16 h-16 rounded-full `} source={ImgProfileImg} />
          <View>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
            >
              Profile name
            </Text>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-sm text-regularText`}
            >
              Company CEO
            </Text>
          </View>
        </View>

        <View style={tw`mt-4 gap-2`}>
          <StarRating
            style={tw`-ml-2`}
            starSize={20}
            rating={4}
            onChange={() => {}}
          />
          <Text style={tw`font-DegularDisplayDemoRegular text-base text-black`}>
            I've been consistently impressed with the quality of service
            provided by this website. They have exceeded my expectations and
            delivered exceptional results. Highly recommended!
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1  `}
        contentContainerStyle={tw`pb-6  bg-base_color`}
      >
        <BackTitleButton
          pageName={"Provider profile"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
          contentStyle={tw`px-5`}
        />

        <View style={tw`relative justify-center items-center mt-2`}>
          <Image style={tw`w-full h-52 `} source={ImgCleaning} />
          <View style={tw`justify-center items-center absolute -bottom-28 `}>
            <Image
              style={tw`w-24 h-24 rounded-full   border-2 border-white`}
              source={ImgProfileImg}
            />
            {/*  profile name ----------- */}
            <View style={tw`justify-center items-center my-1`}>
              <View style={tw`flex-row items-center gap-2`}>
                <Text style={tw`font-DegularDisplayDemoRegular text-2xl`}>
                  Profile name
                </Text>
                <SvgXml xml={IconProfileBadge} />
              </View>
              <View style={tw`flex-row items-center `}>
                <StarRating
                  starSize={18}
                  color="#FF6600"
                  rating={5}
                  onChange={() => {}}
                />
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-base text-regularText`}
                >
                  (100)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ----------------------------- report and message =---------------------- */}

        <View style={tw`flex-row items-center gap-3 justify-center mt-32`}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`border border-gray-400 w-48 rounded-2xl h-14 flex-row justify-center items-center gap-3`}
          >
            <SvgXml xml={IconReportBlack} />
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black `}>
              Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/company/messaging")}
            style={tw`bg-primary w-48 rounded-2xl h-14 flex-row justify-center items-center gap-3`}
          >
            <SvgXml xml={IconMessageWhite} />
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white `}>
              Message
            </Text>
          </TouchableOpacity>
        </View>

        {/*  ---------- provider details info  ----------------- */}
        <View style={tw`px-5 flex-row justify-between my-6`}>
          <View
            style={tw`border border-gray-300 w-[60%] h-40 rounded-xl gap-3 p-6`}
          >
            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconEmailGray} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                example@gmail.com
              </Text>
            </View>
            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconPhoneGray} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                +65896585232
              </Text>
            </View>
            <View style={tw`flex-row gap-3 items-center`}>
              <SvgXml xml={IconLocationGray} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                New work, USA
              </Text>
            </View>
          </View>

          {/*  ------------- Cleaner ---------------------- */}
          <View
            style={tw`border border-gray-300 w-[35%] h-40 rounded-xl justify-center items-center gap-3 p-6`}
          >
            <SvgXml xml={IconCleaner} />
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
              Cleaner
            </Text>
          </View>
        </View>

        {/* --------------------- about us --------------------- */}
        <View style={tw`px-5`}>
          <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
            About{" "}
          </Text>

          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Lorem ipsum dolor sit amet consectetur. In neque tincidunt urna enim
            vulputate cum elementum. Eu at massa velit nibh sit tristique odio.
            At tortor nec posuere urna. Erat morbi venenatis ut nullam.
            Fermentum iaculis pellentesque dictum quis.
          </Text>

          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-black mt-3`}
          >
            Lorem ipsum dolor sit amet consectetur. In neque tincidunt urna enim
            vulputate cum elementum. Eu at massa velit nibh sit tristique odio.
            At tortor nec posuere urna. Erat morbi venenatis ut nullam.
            Fermentum iaculis pellentesque dictum quis.
          </Text>
        </View>

        {/* ---------------- provider Services =-=---------- */}

        <Text
          style={tw`font-DegularDisplayDemoMedium text-2xl text-black mt-6 px-5`}
        >
          Services
        </Text>

        <View style={tw`gap-3 mt-4 px-5`}>
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

        {/* -----------------Reviews profile  ----------------------------- */}

        {/* ============================== review profile j================================= */}
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={RenderRankingItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`mt-4 pl-4 gap-3 `}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      {/* =================== see service details modal ===================== */}
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
              contentContainerStyle={tw`pb-20 flex-1 bg-base_color`}
            >
              {reportReason ? (
                <View style={tw`px-6 mt-6 flex-1`}>
                  {/*  issue details ----------------- */}
                  <View style={tw``}>
                    <TextInput
                      style={[
                        tw``,
                        {
                          borderWidth: 1,
                          borderColor: "gray",
                          paddingVertical: 18,
                          paddingHorizontal: 20,

                          minHeight: 280,
                          maxHeight: 400,
                          borderRadius: 30,
                        },
                      ]}
                      multiline={true}
                      numberOfLines={4}
                      placeholder="Describe your issue..."
                      onChangeText={(newText) => console.log(newText)}
                      // value={}
                      textAlignVertical="top"
                    />

                    <View style={tw`flex-row justify-end items-center my-1`}>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                      >
                        1/1000
                      </Text>
                    </View>

                    {/*  ------------ file uplod ----------------- */}
                    <View
                      style={tw`h-12 rounded-xl border justify-center items-center border-gray-300`}
                    >
                      <TouchableOpacity
                        style={tw`flex-row items-center justify-center gap-3`}
                      >
                        <SvgXml xml={IconFileUpload} />
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                        >
                          Upload files
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/*  ----------- next button -------------- */}

                    <View
                      style={tw`flex-row justify-end items-center gap-6 mt-6`}
                    >
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text
                          style={tw`font-DegularDisplayDemoRegular text-2xl text-black p-2`}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={tw`p-2`}
                        // onPress={() => setReportReason(true)}
                      >
                        <Text
                          style={tw`font-DegularDisplayDemoMedium text-primary text-2xl `}
                        >
                          Report
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                // --------------------------------  selected reason text-----------------
                <View style={tw`px-6 gap-3 mt-6`}>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Sexual content
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Violent or repulsive content
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Hateful or abusive content
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Harassment or bullying
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Harmful or dangerous acts
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Misinformation
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Child abuse
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Promotes terrorism
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Spam or misleading
                    </Text>
                  </View>

                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Legal issue
                    </Text>
                  </View>

                  <View style={tw`flex-row gap-3 items-center rounded-none`}>
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border w-5 h-5  justify-center items-center rounded-full`,
                        isChecked ? `bg-primary border-white` : `bg-transparent`
                      )}
                    ></TouchableOpacity>
                    <Text
                      style={tw`font-DegularDisplayDemoRegular text-base text-black`}
                    >
                      Captions issue
                    </Text>
                  </View>

                  {/*  ----------- next button -------------- */}

                  <View style={tw`flex-row justify-end items-center gap-6`}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-2xl text-black p-2`}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    {isChecked ? (
                      <TouchableOpacity
                        style={tw`p-2`}
                        onPress={() => setReportReason(true)}
                      >
                        <Text
                          style={tw`font-DegularDisplayDemoMedium text-primary text-2xl `}
                        >
                          Next
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text
                        style={tw`font-DegularDisplayDemoMedium text-regularText text-2xl p-2`}
                      >
                        Next
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Provider_Profile;
