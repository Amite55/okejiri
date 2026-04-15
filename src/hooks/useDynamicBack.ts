import { router } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useDynamicBack = (role: string, providerType?: string) => {
  // =============== dynamic routing
  const routing = () => {
    if (role === "USER") {
      router.replace("/company/(Tabs)");
    } else if (role === "PROVIDER") {
      if (providerType === "Individual") {
        router.replace("/service_provider/individual/(Tabs)/home");
      } else {
        router.replace("/service_provider/company/(Tabs)/home");
      }
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      routing();
    }
    return true;
  };
  // =========== when user click to system back button ===========
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack,
    );
    return () => subscription.remove(); // cleanup
  }, [role, providerType]);

  return handleBack;
};
