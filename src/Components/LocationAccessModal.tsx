import { ImgLocationView } from "@/assets/images/image";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";

interface ILocationAccessModalProps {
  setLocationModalVisible?: (visible: boolean) => void;
  locationModalVisible?: boolean;
  modalImage?: any;
  title?: string;
  onAllowPress?: () => void;
  onDenyPress?: () => void;
}

const LocationAccessModal = ({
  setLocationModalVisible,
  locationModalVisible,
  modalImage,
  title,
  onDenyPress,
  onAllowPress,
}: ILocationAccessModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={locationModalVisible}
      onRequestClose={() => {
        setLocationModalVisible?.(!locationModalVisible);
      }}
    >
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`bg-white w-[85%] rounded-xl py-4 px-6`}>
          <View style={tw`justify-center items-center mb-4`}>
            <Image
              style={tw`w-56 h-56`}
              source={modalImage || ImgLocationView}
            />
            <Text
              style={tw`text-center font-DegularDisplayDemoRegular text-black text-xl my-2`}
            >
              {title ?? "Allow Okejiri to access your location"}
            </Text>
          </View>

          <View style={tw`gap-3`}>
            <TouchableOpacity
              onPress={onAllowPress}
              style={tw`w-full  rounded-full  border border-success600`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-center p-3 text-success600`}
              >
                Allow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDenyPress}
              style={tw`w-full  rounded-full  border border-redDeep`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-center p-3 text-redDeep`}
              >
                Deny
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationAccessModal;
