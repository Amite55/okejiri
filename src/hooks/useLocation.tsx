import * as Location from "expo-location";
import { router } from "expo-router";

import { useState } from "react";

interface ILocation {
  longitude: number;
  latitude: number;
}

export const useCheckLocation = () => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // router?.dismiss();
      setLoading(false);
      router?.push({
        pathname: "/Toaster",
        params: { res: "Location permission not granted" },
      });

      await Location.requestBackgroundPermissionsAsync();
    }

    let location = await Location.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    if (latitude && longitude) {
      setLocation({
        latitude,
        longitude,
      });
      setLoading(false);
    }
  };

  return { location, loading, getLocation, setLoading };
};
