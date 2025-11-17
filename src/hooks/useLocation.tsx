import * as Location from "expo-location";
import { useState } from "react";

const useLocation = () => {
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission Status:", status);
      if (status !== "granted") {
        setErrorMsg("Permission denied");
        return null;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      console.log("Coords:", coords);

      if (coords) {
        setLongitude(coords.longitude);
        setLatitude(coords.latitude);

        return {
          longitude: coords.longitude,
          latitude: coords.latitude,
        };
      }

      return null;
    } catch (error: any) {
      console.log("Location error:", error);
      setErrorMsg(error?.message || "Something went wrong");
      return null;
    }
  };

  return {
    longitude,
    latitude,
    errorMsg,
    getUserLocation,
  };
};

export default useLocation;
