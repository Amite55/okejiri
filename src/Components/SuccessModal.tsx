import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IModalProps {
  modalTitle?: string;
  onPress?: () => void;
  successIcon?: any;
  successImage?: any;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  buttonTitle?: string;
  successImgStyle?: any;
  children?: React.ReactNode;
}

const SuccessModal = ({
  successImage,
  modalTitle,
  onPress,
  successIcon,
  modalVisible,
  setModalVisible,
  buttonTitle,
  successImgStyle,
  children,
}: IModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`bg-white w-[85%] rounded-xl py-4 px-6`}>
          <View style={tw`justify-center items-center mb-4`}>
            {successImage && (
              <Image
                style={[tw`w-24 h-24`, successImgStyle]}
                source={successImage}
              />
            )}
            {successIcon && <SvgXml xml={successIcon} />}
            <Text
              style={tw`text-center font-DegularDisplayDemoRegular  text-xl my-2`}
            >
              {modalTitle}
            </Text>
          </View>

          <View style={tw`gap-3`}>
            {buttonTitle && (
              <TouchableOpacity
                onPress={onPress}
                style={tw`w-full  rounded-full bg-black`}
              >
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-center p-3 text-white`}
                >
                  {buttonTitle}
                </Text>
              </TouchableOpacity>
            )}

            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
