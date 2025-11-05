import {
  IconCross,
  IconDisputeRequest,
  IconPlus,
  IconTick,
} from "@/assets/icons";
import { ImgCleaning } from "@/assets/images/image";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useOrderDetailsQuery } from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import { _HEIGHT } from "@/utils/utils";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
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

const Booking_Service_Details = () => {
  const [tickmark, setTickMark] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { id } = useLocalSearchParams();
  const { data: OrderDetailsData } = useOrderDetailsQuery(id);

  const services = [
    {
      id: 1,
      title: "House cleaning",
      price: 49.0,
      estTime: "30 mins",
      image: ImgCleaning,
    },
    {
      id: 2,
      title: "Yard cleaning",
      price: 49.0,
      estTime: "30 mins",
      image: ImgCleaning,
    },
    {
      id: 3,
      title: "Bathroom cleaning",
      price: 59.0,
      estTime: "45 mins",
      image: ImgCleaning,
    },
  ];

  const renderServiceCard = ({ item }: any) => (
    <Pressable
      style={tw`flex-row justify-between items-center px-4 py-3 rounded-3xl bg-white mb-2`}
    >
      <View>
        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
          {item.title}
        </Text>
        <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
          ₦ {item.price.toFixed(2)}
        </Text>
        <Text
          style={tw`font-DegularDisplayDemoMedium text-lg text-regularText`}
        >
          Est. time : {item.estTime}
        </Text>
      </View>

      <View style={tw`flex-row items-center gap-4`}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
        >
          <Text>See details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTickMark(!tickmark)}
          style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
        >
          <SvgXml xml={tickmark ? IconTick : IconPlus} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <View style={tw`flex-1 bg-base_color`}>
      <View style={tw`px-5`}>
        <BackTitleButton
          pageName={"Previous services"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />

        <Text
          style={tw`font-DegularDisplayDemoRegular text-xl text-regularText text-center px-10 my-2`}
        >
          Your previous services with this provider will be shown here.
        </Text>

        {/* FlatList Added */}
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-10`}
        />

        <TouchableOpacity
          onPress={() => router.push("/company/dispute_process")}
          style={tw`flex-row justify-center items-center gap-3 py-4 my-10`}
        >
          <SvgXml xml={IconDisputeRequest} />
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            Request for dispute
          </Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Bottom Tab */}
      {tickmark && (
        <View
          style={[
            tw`absolute bottom-0 left-0 right-0 bg-white px-5`,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 10,
            },
          ]}
        >
          <View style={tw`flex-row justify-between items-center h-28 px-5`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
              >
                ₦ 49.00
              </Text>
              <View style={tw`flex-row items-center gap-3`}>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                >
                  1 service
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <View style={tw`w-2 h-2 rounded-full bg-regularText`} />
                  <Text
                    style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
                  >
                    Est. 30 mins
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push(
                  "/company/previous_item_Book/previous_booking_confirmation"
                )
              }
              style={tw`w-28 h-12 justify-center items-center bg-primary rounded-lg`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-white`}
              >
                Reorder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ✅ Service Details Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={tw`flex-1 justify-end bg-black bg-opacity-15`}
        >
          <Pressable
            style={[
              tw`bg-gray-50`,
              {
                height: _HEIGHT * 0.65,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            ]}
          >
            <View
              style={[
                tw`w-full flex-row justify-between items-center h-14 bg-primary px-4`,
                { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
              ]}
            >
              <Text></Text>
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
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-20`}
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
                {Array(5)
                  .fill("Dusting of all surfaces")
                  .map((text, index) => (
                    <View key={index} style={tw`flex-row items-center gap-3`}>
                      <View style={tw`w-2 h-2 bg-black`} />
                      <Text
                        style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                      >
                        {text}
                      </Text>
                    </View>
                  ))}
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
    </View>
  );
};

export default Booking_Service_Details;

// import React from "react";

// const Booking_Service_Details = () => {
//   const [tickmark, setTickMark] = useState<boolean>(false);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const { id } = useLocalSearchParams();
//   const { data: OrderDetailsData, isLoading } = useOrderDetailsQuery(id);
//   console.log(
//     "Booking_Service_Details",
//     OrderDetailsData,
//     "Booking_Service_Details"
//   );

//   return (
//     <View style={tw`flex-1 bg-base_color`}>
//       <View style={tw`px-5`}>
//         <BackTitleButton
//           pageName={"Previous services"}
//           onPress={() => router.back()}
//           titleTextStyle={tw`text-xl`}
//         />

//         <Text
//           style={tw`font-DegularDisplayDemoRegular text-xl text-regularText text-center px-10 my-2`}
//         >
//           Your previous services with this provider will shown here.
//         </Text>

//         <View style={tw`gap-2`}>
//           <Pressable
//             style={tw`flex-row justify-between items-center  px-4 py-3 rounded-3xl bg-white`}
//           >
//             <View>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
//               >
//                 House cleaning
//               </Text>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
//               >
//                 ₦ 49.00
//               </Text>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-lg text-regularText`}
//               >
//                 Est. time : 30 mins
//               </Text>
//             </View>

//             <View style={tw`flex-row items-center gap-4`}>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(true)}
//                 style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
//               >
//                 <Text style={tw``}>See details</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => setTickMark(!tickmark)}
//                 style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
//               >
//                 <SvgXml xml={tickmark ? IconTick : IconPlus} />
//               </TouchableOpacity>
//             </View>
//           </Pressable>
//           <Pressable
//             style={tw`flex-row justify-between items-center  px-4 py-3 rounded-3xl bg-white`}
//           >
//             <View>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
//               >
//                 Yard cleaning
//               </Text>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
//               >
//                 ₦ 49.00
//               </Text>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-lg text-regularText`}
//               >
//                 Est. time : 30 mins
//               </Text>
//             </View>

//             <View style={tw`flex-row items-center gap-4`}>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(true)}
//                 style={tw`w-24 h-9 rounded-lg justify-center items-center bg-redWhite100`}
//               >
//                 <Text style={tw``}>See details</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => setTickMark(!tickmark)}
//                 style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
//               >
//                 <SvgXml xml={tickmark ? IconTick : IconPlus} />
//               </TouchableOpacity>
//             </View>
//           </Pressable>
//         </View>

//         <TouchableOpacity
//           onPress={() => router.push("/company/dispute_process")}
//           style={tw`flex-row justify-center items-center gap-3 py-4 my-10`}
//         >
//           <SvgXml xml={IconDisputeRequest} />
//           <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
//             Request for dispute
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {/*  ================= Static bottom tab =================== */}

//       {tickmark && (
//         <View
//           style={[
//             tw`absolute bottom-0 left-0 right-0 bg-white px-5`,
//             {
//               borderTopLeftRadius: 20,
//               borderTopRightRadius: 20,
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: -4 },
//               shadowOpacity: 0.1,
//               shadowRadius: 16,
//               elevation: 10, // For Android
//               overflow: "visible", // Important for iOS shadow visibility
//             },
//           ]}
//         >
//           <View style={tw`flex-row justify-between items-center h-28 px-5`}>
//             <View style={tw`flex-1`}>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
//               >
//                 ₦ 49.00
//               </Text>
//               <View style={tw`flex-row items-center gap-3`}>
//                 <Text
//                   style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
//                 >
//                   1 service
//                 </Text>
//                 <View style={tw`flex-row items-center gap-2`}>
//                   <View style={tw`w-2 h-2 rounded-full bg-regularText`} />
//                   <Text
//                     style={tw`font-DegularDisplayDemoRegular text-xl text-regularText`}
//                   >
//                     Est. 30 mins
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             <TouchableOpacity
//               onPress={() =>
//                 router.push(
//                   "/company/previous_item_Book/previous_booking_confirmation"
//                 )
//               }
//               style={tw`w-28 h-12 justify-center items-center bg-primary rounded-lg`}
//             >
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-base text-white`}
//               >
//                 {" "}
//                 Reorder
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* =================== see service details modal ===================== */}
//       <Modal
//         animationType="slide"
//         transparent
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//         visible={modalVisible}
//         onDismiss={() => setModalVisible(false)}
//       >
//         <Pressable
//           onPress={() => {
//             setModalVisible(false);
//           }}
//           style={[
//             {
//               height: _HEIGHT,
//             },
//             tw`justify-end items-end bg-black bg-opacity-15  `,
//           ]}
//         >
//           <Pressable
//             style={[
//               {
//                 height: _HEIGHT * 0.65,
//                 borderTopLeftRadius: 10,
//                 borderTopRightRadius: 10,
//               },
//               tw`bg-gray-50 `,
//             ]}
//           >
//             <View
//               style={[
//                 tw`w-full flex-row justify-between items-center h-14  bg-primary px-4`,
//                 { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
//               ]}
//             >
//               <Text></Text>
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-xl text-white`}
//               >
//                 Service details
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={tw`border-2 border-white bg-white rounded-full shadow-lg`}
//               >
//                 <SvgXml xml={IconCross} />
//               </TouchableOpacity>
//             </View>
//             <ScrollView
//               keyboardShouldPersistTaps="always"
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={tw`pb-20 `}
//             >
//               <Text
//                 style={tw`font-DegularDisplayDemoMedium text-xl text-black text-center my-4`}
//               >
//                 Room cleaning
//               </Text>

//               <View style={tw`px-4 justify-center items-center`}>
//                 <Image
//                   resizeMode="cover"
//                   style={tw`w-full h-52 rounded-2xl`}
//                   source={ImgCleaning}
//                 />
//               </View>

//               <View style={tw`px-4 ml-3 my-6 gap-3`}>
//                 <View style={tw`flex-row items-center  gap-3`}>
//                   <View style={tw`w-2 h-2 bg-black`} />
//                   <Text
//                     style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
//                   >
//                     Dusting of all surfaces
//                   </Text>
//                 </View>
//                 <View style={tw`flex-row items-center  gap-3`}>
//                   <View style={tw`w-2 h-2 bg-black`} />
//                   <Text
//                     style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
//                   >
//                     Dusting of all surfaces
//                   </Text>
//                 </View>
//                 <View style={tw`flex-row items-center  gap-3`}>
//                   <View style={tw`w-2 h-2 bg-black`} />
//                   <Text
//                     style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
//                   >
//                     Dusting of all surfaces
//                   </Text>
//                 </View>
//                 <View style={tw`flex-row items-center  gap-3`}>
//                   <View style={tw`w-2 h-2 bg-black`} />
//                   <Text
//                     style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
//                   >
//                     Dusting of all surfaces
//                   </Text>
//                 </View>
//                 <View style={tw`flex-row items-center  gap-3`}>
//                   <View style={tw`w-2 h-2 bg-black`} />
//                   <Text
//                     style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
//                   >
//                     Dusting of all surfaces
//                   </Text>
//                 </View>
//               </View>

//               <View style={tw`flex-row items-center gap-3 px-4`}>
//                 <TouchableOpacity
//                   style={tw`border flex-1 h-14 rounded-full justify-center items-center`}
//                 >
//                   <Text
//                     style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
//                   >
//                     ₦ 49.00
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => setTickMark(!tickmark)}
//                   style={tw`justify-center items-center w-14 h-14 rounded-full bg-redDeep`}
//                 >
//                   <SvgXml xml={tickmark ? IconTick : IconPlus} />
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </Pressable>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// };

// export default Booking_Service_Details;
