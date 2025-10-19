import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";

const Toaster = () => {
  const { res } = useLocalSearchParams();
  const params = useGlobalSearchParams();
  const pathname = usePathname();

  React.useEffect(() => {
    const currentPath = pathname; // save the path when modal loads

    const timer = setTimeout(() => {
      // check if user still on this modal page
      if (router.canGoBack() && pathname === currentPath) {
        router.back();
      }
    }, Number(params?.time) || 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={tw`px-2 rounded-2xl`}>
      <View style={tw`bg-slate-700 justify-center items-center p-4 rounded-xl`}>
        <Text style={tw`text-sm font-PoppinsMedium text-white`}>{res}</Text>
      </View>
    </View>
  );
};

export default Toaster;
