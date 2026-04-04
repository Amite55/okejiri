import React from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface IModalProps {
  modalTitle?: string;
  onPress?: () => void;
  deleteIcon?: any;
  subTitle?: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  buttonTitle?: string;
  children?: React.ReactNode;
  isLoadingDelete?: boolean;
}

const DeleteModal = ({
  modalTitle,
  onPress,
  deleteIcon,
  modalVisible,
  setModalVisible,
  subTitle,
  isLoadingDelete,
}: IModalProps) => {
  return (
    <Modal
      animationType="fade"
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
            {deleteIcon && <SvgXml xml={deleteIcon} />}
            <Text
              style={tw`text-center font-DegularDisplayDemoMedium  text-lg my-1 mt-8`}
            >
              {modalTitle}
            </Text>
            {subTitle && (
              <Text
                style={tw`text-center font-DegularDisplayDemoRegular text-base text-regularText my-2`}
              >
                {subTitle}
              </Text>
            )}
          </View>

          <View style={tw`flex-row  justify-between items-center gap-3`}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setModalVisible(!modalVisible)}
              style={tw`flex-1 rounded-full bg-black h-10 justify-center items-center`}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-center text-white`}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isLoadingDelete}
              activeOpacity={0.6}
              onPress={onPress}
              style={tw`flex-1 rounded-full bg-redDeep h-10 justify-center items-center`}
            >
              {isLoadingDelete ? (
                <ActivityIndicator color={"#fff"} />
              ) : (
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-xl text-center text-white`}
                >
                  Yes
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
