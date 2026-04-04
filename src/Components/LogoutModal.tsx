import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
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
  logoutIcon?: any;
  subTitle?: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  buttonTitle?: string;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const LogoutModal = ({
  modalTitle,
  onPress,
  logoutIcon,
  modalVisible,
  setModalVisible,
  buttonTitle,
  subTitle,
  disabled,
  loading,
}: IModalProps) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      setInternalVisible(true);
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 65,
            friction: 8,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setInternalVisible(false);
        scaleAnim.setValue(0.85);
        opacityAnim.setValue(0);
      });
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="none"
      transparent
      visible={internalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
      statusBarTranslucent
    >
      <Animated.View
        style={[
          tw`flex-1 justify-center items-center bg-black bg-opacity-40`,
          { opacity: opacityAnim },
        ]}
      >
        <Animated.View
          style={[
            tw`bg-white w-[85%] rounded-xl py-4 px-6`,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          <View style={tw`justify-center items-center mb-4`}>
            {logoutIcon && <SvgXml xml={logoutIcon} />}
            <Text style={tw`text-center font-medium text-base my-1 mt-8`}>
              {modalTitle}
            </Text>
            {subTitle && (
              <Text
                style={tw`text-center font-medium text-sm text-gray-600 pb-4`}
              >
                {subTitle}
              </Text>
            )}
          </View>

          <View style={tw`flex-row justify-between items-center gap-3`}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModalVisible(!modalVisible)}
              style={tw`flex-1 rounded-full bg-black`}
            >
              <Text
                style={tw`font-medium text-base text-center p-2 text-white`}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loading || disabled}
              activeOpacity={0.8}
              onPress={onPress}
              style={tw`flex-1 rounded-full bg-red-600`}
            >
              {loading ? (
                <ActivityIndicator
                  style={tw`p-2`}
                  size="small"
                  color="#ffffff"
                />
              ) : (
                <Text
                  style={tw`font-medium text-base text-center p-2 text-white`}
                >
                  {buttonTitle}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default LogoutModal;
