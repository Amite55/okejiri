import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      if (coords) {
        setLongitude(coords.longitude);
        setLatitude(coords.latitude);
      }
    } catch (error: any) {
      setErrorMsg(error?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return {
    longitude,
    latitude,
    errorMsg,
  };
};

export default useLocation;
