import tw from "@/src/lib/tailwind";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
  const [backPhoto, setBackPhoto] = useState<string | null>(null);
  const [stage, setStage] = useState<"front" | "back">("front");
  const cameraRef = useRef(null);

  // 📸 যদি permission এখনো না নেয়া হয়
  if (!permission) {
    return <View />;
  }

  //  if permission denied  =======
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
  // ---------------------- Preview (Front / Back) --------------------------
  if ((stage === "front" && frontPhoto) || (stage === "back" && backPhoto)) {
    const currentPhoto = stage === "front" ? frontPhoto : backPhoto;

    return (
      <View style={tw`flex-1 bg-black items-center justify-center`}>
        <Image
          source={currentPhoto}
          style={tw`w-11/12 h-3/4 rounded-lg`}
          contentFit="cover"
        />

        <View style={tw`flex-row mt-5`}>
          <TouchableOpacity
            onPress={() => {
              if (stage === "front") setFrontPhoto(null);
              else setBackPhoto(null);
            }}
            style={tw`bg-gray-600 px-6 py-3 rounded-lg mr-4`}
          >
            <Text style={tw`text-white text-base`}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (stage === "front") {
                // move to next step: capture back side
                setStage("back");
                setFrontPhoto(currentPhoto);
                setBackPhoto(null);
              } else {
                // done: go back with both photos
                router.push({
                  pathname: "/KYC_auth/id_card",
                  params: {
                    fastPhotoUri: JSON.stringify(frontPhoto),
                    secondPhotoUri: JSON.stringify(backPhoto),
                  },
                });
              }
            }}
            style={tw`bg-green-600 px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white text-base`}>
              {stage === "front" ? "Next for Back Side" : "Use Both Photos"}
            </Text>
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
      {/* Label on top */}
      <View style={tw`absolute top-10 w-full items-center`}>
        <Text style={tw`text-white text-xl font-semibold`}>
          {stage === "front" ? "Capture Front Side" : "Capture Back Side"}
        </Text>
      </View>

      {/* Capture Button */}
      <View style={tw`absolute bottom-10 w-full items-center`}>
        <TouchableOpacity
          onPress={async () => {
            if (cameraRef.current) {
              const photo = await cameraRef.current.takePictureAsync();
              if (photo.uri) {
                if (stage === "front") setFrontPhoto(photo.uri);
                else setBackPhoto(photo.uri);
              }
            }
          }}
          style={tw`w-20 h-20 rounded-full bg-white border-4 border-gray-300`}
        />
      </View>
    </View>
  );
};

export default Camera;
