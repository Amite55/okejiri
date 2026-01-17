import * as Location from "expo-location";
import { router } from "expo-router";

import { useCallback, useState } from "react";

interface ILocation {
  longitude: number;
  latitude: number;
}

export const useCheckLocation = (): {
  location: ILocation | null;
  loading: boolean;
  getLocation: () => Promise<ILocation | null>;
  setLoading: (loading: boolean) => void;
  setLocation: (location: ILocation | null) => void;
} => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [loading, setLoading] = useState(false);
  const getLocation = useCallback(async (): Promise<ILocation | null> => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoading(false);
      router.push({
        pathname: "/Toaster",
        params: { res: "Location permission not granted" },
      });
      return null;
    }
    const newLocation = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = newLocation.coords;
    const loc = { latitude, longitude };
    setLocation(loc);
    setLoading(false);
    return loc;
  }, []);

  return { location, loading, getLocation, setLoading, setLocation };
};
