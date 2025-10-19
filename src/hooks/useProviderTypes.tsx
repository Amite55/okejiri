import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useProviderTypes = () => {
  const [providerTypes, setProviderTypes] = useState();

  useEffect(() => {
    const getProviderTypes = async () => {
      try {
        const value = await AsyncStorage.getItem("providerTypes");
        // const newRole = value ? JSON.parse(value) : null;
        setProviderTypes(value);
      } catch (error) {
        console.error("Failed to load roll from AsyncStorage:", error);
      }
    };

    getProviderTypes();
  }, []);

  return providerTypes;
};
