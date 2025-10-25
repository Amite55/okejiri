import tw from "@/src/lib/tailwind";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [openCameraFast, setOpenCameraFast] = useState<boolean>(false);
  const [openCameraSecond, setOpenCameraSecond] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  // 📸 যদি permission এখনো না নেয়া হয়
  if (!permission) {
    return <View />;
  }

  // 📸 যদি permission denied হয়
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Camera permission is required to continue</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (photoUri) {
    return (
      <View style={tw`flex-1 bg-black items-center justify-center`}>
        <Image
          source={{ uri: photoUri }}
          style={tw`w-11/12 h-3/4 rounded-lg`}
          contentFit="cover"
        />

        <View style={tw`flex-row mt-5`}>
          <TouchableOpacity
            onPress={() => setPhotoUri(null)} // Retake
            style={tw`bg-gray-600 px-6 py-3 rounded-lg mr-4`}
          >
            <Text style={tw`text-white text-base`}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("✅ Upload this:", photoUri)}
            style={tw`bg-green-600 px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white text-base`}>Use Photo</Text>
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
      >
        {/* Capture Button */}
        <View style={tw`absolute bottom-10 w-full items-center`}>
          <TouchableOpacity
            onPress={async () => {
              if (cameraRef.current) {
                // console.log("📸 Capturing...");
                const photo = await cameraRef.current.takePictureAsync();
                // const ratio =
                //   await cameraRef.current.getAvailablePictureSizesAsync();
                // console.log(ratio, "ratio");
                console.log(photo.uri);
                setPhotoUri(photo.uri);
              }
            }}
            style={tw`w-20 h-20 rounded-full bg-white border-4 border-gray-300`}
          />
        </View>
      </CameraView>
    </View>
  );
};

export default Camera;
