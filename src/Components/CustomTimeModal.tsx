import { IconLeftArrowWhite } from "@/assets/icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

export default function CustomTimeModal({ ref, onBack, onSave, onClose }: any) {
  // const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoint = useMemo(() => ["50%", "80%"], []);

  const [deliveryTime, setDeliveryTime] = useState("");

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoint}
        containerStyle={tw`bg-black/10 flex-1`}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
        // handleHeight={0}
        handleIndicatorStyle={{ display: "none" }}
        handleStyle={{ display: "none" }}
        // handleStyle={{height: 0}}
        // ind
      >
        <View
          style={tw`flex-row items-center justify-between bg-primary px-4 py-1 rounded-t-xl`}
        >
          {/* Left back button */}
          <TouchableOpacity onPress={onBack} style={tw`p-2`}>
            <SvgXml xml={IconLeftArrowWhite} />
          </TouchableOpacity>

          {/* Centered title */}
          <Text style={tw`text-white text-lg font-bold flex-1 text-center`}>
            Custom delivery time
          </Text>

          {/* Right close button */}
          <TouchableOpacity onPress={onClose} style={tw`p-2`}>
            <Text style={tw`text-white text-xl font-bold`}>✕</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView
          contentContainerStyle={tw`flex-1 bg-base_color  `}
        >
          <View style={tw`py-6 px-8`}>
            <Text
              style={tw`text-center text-lg text-black font-PoppinsRegular`}
            >
              How may times you need to deliver this package ?
            </Text>
          </View>
          <View style={tw`px-6`}>
            <Text style={tw`text-black font-PoppinsMedium mb-2 px-4`}>
              Time
            </Text>
            <View
              style={tw`border border-gray-300 rounded-full px-4 py-2 -z-10`}
            >
              <TextInput
                placeholder="Type hare..."
                placeholderTextColor={"#535353"}
                value={deliveryTime}
                onChangeText={(text) => setDeliveryTime(text)}
                style={tw`text-black`}
                keyboardType="numeric"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              onSave(deliveryTime);
              setDeliveryTime("");
            }}
            style={tw`px-4 py-6`}
          >
            <View style={tw`bg-primary py-4 rounded-full`}>
              <Text
                style={tw`text-center font-DegularDisplayDemoMedium text-xl text-white`}
              >
                Set time
              </Text>
            </View>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
