import tw from "@/src/lib/tailwind";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TakeSelfieCamera = () => {
  const { fastPhotoUri, secondPhotoUri } = useLocalSearchParams();
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [selfiePhotoUri, setSelfiePhotoUri] = useState<string | null>(null);
  const cameraRef = useRef(null);

  // 📸 যদি permission এখনো না নেয়া হয়
  if (!permission) {
    return <View />;
  }

  // if permission denied =========
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center ">
        <Text style={tw`text-center`}>
          Camera permission is required to continue sss
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={requestPermission}
          style={[
            tw`mx-4`,
            {
              backgroundColor: "#007bff",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            },
          ]}
        >
          <Text style={tw`text-white text-base text-center`}>
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (selfiePhotoUri) {
    return (
      <View style={tw`flex-1 bg-black items-center justify-center`}>
        <Image
          source={selfiePhotoUri}
          style={tw`w-11/12 h-3/4 rounded-lg`}
          contentFit="cover"
        />

        <View style={tw`flex-row mt-5`}>
          <TouchableOpacity
            onPress={() => {
              setSelfiePhotoUri(null);
            }}
            style={tw`bg-gray-600 px-6 py-3 rounded-lg mr-4`}
          >
            <Text style={tw`text-white text-base`}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/KYC_auth/take_selfie",
                params: {
                  selfiePhotoUri: JSON.stringify(selfiePhotoUri),
                  fastPhotoUri,
                  secondPhotoUri,
                },
              });
            }}
            style={tw`bg-green-600 px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white text-base`}>Use this photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={tw`flex-1 bg-black`}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        ratio="4:3"
        zoom={0}
      />

      {/* Capture Button */}
      <View style={tw`absolute bottom-10 w-full items-center`}>
        <TouchableOpacity
          onPress={async () => {
            if (cameraRef.current) {
              const photo = await cameraRef.current.takePictureAsync();
              setSelfiePhotoUri(photo.uri);
            }
          }}
          style={tw`w-20 h-20 rounded-full bg-white border-4 border-gray-300`}
        />
      </View>
    </View>
  );
};

export default TakeSelfieCamera;
