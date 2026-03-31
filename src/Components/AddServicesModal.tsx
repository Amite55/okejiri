import { IconCheckBoxChecked, IconCheckBoxUnChecked } from "@/assets/icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import {
  useAddNewServicesMutation,
  useGetServicesQuery,
} from "../redux/apiSlices/companyProvider/account/services/servicesSlice";
import PrimaryButton from "./PrimaryButton";

export default function AddServicesModal({
  ref,
  exsiting_service = [],
  onSuccess,
}: any) {
  const snapPoint = useMemo(() => ["50%", "100%"], []);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const { data: servicesData, isLoading: isLoadingServices } =
    useGetServicesQuery({});
  const [addNewService] = useAddNewServicesMutation();
  const [screenLoading, setScreenLoading] = useState<boolean>(false);
  // checkbox with icon.
  const services = servicesData?.data?.services || [];
  const serviceToAdd = services.filter(
    (s: any) => !exsiting_service.some((es: any) => es.service.id === s.id),
  );

  const closeSheet = useCallback(() => {
    ref?.current?.close();
  }, []);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    setScreenLoading(true);
    if (selectedServices.length === 0) {
      setScreenLoading(false);
      router.push({
        pathname: "/Toaster",
        params: {
          res: "Nothing to add",
        },
      });
      return;
    }
    try {
      await Promise.all(
        selectedServices.map((serviceId) =>
          addNewService({ service_id: serviceId }).unwrap(),
        ),
      );

      setSelectedServices([]);
      setScreenLoading(false);
      onSuccess?.();
      router.push({
        pathname: "/Toaster",
        params: { res: "Services added successfully" },
      });

      setTimeout(() => {
        closeSheet();
      }, 200);
    } catch (err) {
      setScreenLoading(false);
      console.log("error add services modal", err);
      router.push({
        pathname: "/Toaster",
        params: {
          res: "Failed Add more service",
        },
      });
      return;
    }
  };
  useEffect(() => {
    setSelectedServices([]);
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoint}
        containerStyle={tw`bg-black/10 `}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-10}
            pressBehavior="close"
          />
        )}
        handleIndicatorStyle={{ display: "none" }}
        handleStyle={{ display: "none" }}
      >
        {/* Header */}
        <View
          style={tw`flex-row items-center justify-between bg-primary px-4 py-3 rounded-t-xl`}
        >
          <View style={tw`absolute w-full items-center`}>
            <Text style={tw`text-white text-lg font-bold`}>Add Service</Text>
          </View>

          <TouchableOpacity
            onPress={() => ref?.current?.close()}
            style={tw`items-end w-full z-10`}
          >
            <Text style={tw`text-white text-xl font-bold`}>✕</Text>
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView
          contentContainerStyle={tw`flex-1 bg-base_color p-4 `}
        >
          {serviceToAdd.length === 0 ? (
            <View style={tw`flex-1 justify-center items-center`}>
              <Text style={tw`text-slate-400 text-lg font-PoppinsRegular`}>
                No more services to add
              </Text>
            </View>
          ) : isLoadingServices ? (
            <Text>Loading...</Text>
          ) : (
            serviceToAdd.map((item: any) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item?.id}
                style={tw`flex-row items-center py-2 gap-3`}
                onPress={() => toggleService(item?.id)}
              >
                {selectedServices.includes(item.id) ? (
                  <SvgXml xml={IconCheckBoxChecked} width={20} height={20} />
                ) : (
                  <SvgXml xml={IconCheckBoxUnChecked} width={20} height={20} />
                )}
                <Text style={tw`text-black text-lg font-PoppinsRegular`}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
          <PrimaryButton
            titleProps="Add"
            onPress={handleSubmit}
            contentStyle={tw`h-10 mt-4`}
            loading={screenLoading}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
