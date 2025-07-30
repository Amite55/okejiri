import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useRoll = () => {
  const [roll, setRoll] = useState();

  useEffect(() => {
    const getRoll = async () => {
      try {
        const value = await AsyncStorage.getItem("roll");
        // const newRole = value ? JSON.parse(value) : null;
        setRoll(value);
      } catch (error) {
        console.error("Failed to load roll from AsyncStorage:", error);
      }
    };

    getRoll();
  }, []);

  return roll;
};
