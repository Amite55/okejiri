

import { IconCheckBoxChecked, IconCheckBoxUnChecked } from '@/assets/icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { useAddNewServicesMutation, useGetServicesQuery } from '../redux/apiSlices/companyProvider/account/services/servicesSlice';

export default function AddServicesModal({ ref, exsiting_service = [] }: any) {
    // const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ["50%", "80%"], [])
    const [selectedServices, setSelectedServices] = useState<number[]>([]);




    const { data: servicesData, isLoading: isLoadingServices, isError: isErrorServices } = useGetServicesQuery({});
    const [addNewService, { isLoading: isAddNewService, isError: isErrorAddNewService }] = useAddNewServicesMutation();
    const [screenLoading, setScreenLoading] = useState<boolean>(false);
    // checkbox with icon. 


    const services = servicesData?.data?.services || [];

    const serviceToAdd = services.filter(
        (s: any) => !exsiting_service.some((es: any) => es.service.id === s.id)
    )
    // useEffect(()=>{
    //     bottomSheetRef.current?.expand();
    // },[])

    const closeSheet = useCallback(() => {
        ref?.current?.close();
    }, [])

    const toggleService = (id: number) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const handleSubmit = async () => {
        setScreenLoading(true);
        if (selectedServices.length === 0) {
            setScreenLoading(false);
            router.push({
                pathname: "/Toaster",
                params: {
                    res: "Nothing to add"
                }
            })
            return;
        }
        try {
            await Promise.all(
                selectedServices.map(serviceId =>
                    addNewService({ service_id: serviceId }).unwrap()
                )
            );

            setScreenLoading(false);
            router.push({ pathname: "/Toaster", params: { res: "Services added successfully" } });

            setTimeout(() => {
                closeSheet();
            }, 200);

        } catch (err) {
            setScreenLoading(false)
            console.log("error add services modal", err)
        }
    }

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
                // handleHeight={0}
                handleIndicatorStyle={{ display: "none" }}
                handleStyle={{ display: "none" }}
            // handleStyle={{height: 0}}
            // ind
            >
                {/* Header */}
                <View style={tw`flex-row items-center justify-between bg-primary px-4 py-3 rounded-t-xl`}>
                    <View style={tw`absolute w-full items-center`}>
                        <Text style={tw`text-white text-lg font-bold`}>Add Service</Text>
                    </View>

                    <TouchableOpacity onPress={() => ref?.current?.close()}
                        style={tw`items-end w-full z-10`}
                    >
                        <Text style={tw`text-white text-xl font-bold`}>✕</Text>
                    </TouchableOpacity>
                </View>
                <BottomSheetScrollView contentContainerStyle={tw`flex-1 bg-base_color p-4 `}>
                    {isLoadingServices ? (
                        <Text>Loading...</Text>
                    ) : (
                        serviceToAdd.map((item: any) => (
                            <TouchableOpacity
                                key={item.id}
                                style={tw`flex-row items-center py-2 gap-3`}
                                onPress={() => toggleService(item.id)}
                            >
                                {selectedServices.includes(item.id) ? <SvgXml xml={IconCheckBoxChecked} width={20} height={20} /> : <SvgXml xml={IconCheckBoxUnChecked} width={20} height={20} />

                                }
                                <Text style={tw`text-black text-lg font-PoppinsRegular`}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    )}

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={tw`mt-4 bg-primary py-3 rounded-full items-center  w-full `}
                    >

                        <View style={tw`flex-row gap-2`}>
                            {screenLoading && <ActivityIndicator size={"large"} />}
                            <Text style={tw`text-white text-lg font-bold`}>Add</Text>
                        </View>


                    </TouchableOpacity>


                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}