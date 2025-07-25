import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IModalProps {
  modalTitle?: string;
  onPress?: () => void;
  logoutIcon?: any;
  subTitle?: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  buttonTitle?: string;
  children?: React.ReactNode;
}

const LogoutModal = ({
  modalTitle,
  onPress,
  logoutIcon,
  modalVisible,
  setModalVisible,
  buttonTitle,
  subTitle,
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
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-40`}
      >
        <View style={tw`bg-white w-[85%] rounded-xl py-4 px-6`}>
          <View style={tw`justify-center items-center mb-4`}>
            {logoutIcon && <SvgXml xml={logoutIcon} />}
            <Text
              style={tw`text-center font-DegularDisplayDemoMedium  text-lg my-1 mt-8`}
            >
              {modalTitle}
            </Text>
            {subTitle && (
              <Text
                style={tw`text-center font-DegularDisplayDemoRegular  text-base text-regularText my-2`}
              >
                {subTitle}
              </Text>
            )}
          </View>

          <View style={tw`flex-row  justify-between items-center gap-3`}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={tw`flex-1 rounded-full bg-black`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-center p-3 text-white`}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-1 rounded-full bg-redDeep`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-center p-3 text-white`}
              >
                {buttonTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
