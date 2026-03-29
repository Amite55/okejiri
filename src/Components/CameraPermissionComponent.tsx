import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";

interface Props {
  requestPermission: () => void;
}

const CameraPermissionComponent = ({ requestPermission }: Props) => {
  return (
    <View style={tw`flex-1 justify-center items-center px-5`}>
      <Text style={tw`text-center text-base text-regularText mb-4`}>
        Camera permission is required to continue
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => requestPermission()}
        style={tw`bg-primary px-6 py-3 rounded-full`}
      >
        <Text style={tw`text-white text-base text-center font-PoppinsMedium`}>
          Grant Permission
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraPermissionComponent;
