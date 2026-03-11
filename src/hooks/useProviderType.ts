import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useProviderType = () => {
  const [providerType, setProviderType] = useState();

  useEffect(() => {
    const getProviderType = async () => {
      try {
        const value = await AsyncStorage.getItem("providerTypes");
        // const newRole = value ? JSON.parse(value) : null;
        setProviderType(value);
      } catch (error) {
        console.error("Failed to load roll from AsyncStorage:", error);
      }
    };

    getProviderType();
  }, []);

  return providerType;
};
