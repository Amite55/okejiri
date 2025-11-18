

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../lib/tailwind';

export default function DeliveryTimeModal({ ref, onClose, onSelect }: any) {
    // const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ["50%", "80%"], [])
    






    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={ref}
                snapPoints={snapPoint}
                containerStyle={tw`bg-black/10 flex-1`}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
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
                        <Text style={tw`text-white text-lg font-bold`}>Delivery time</Text>
                    </View>

                    <TouchableOpacity onPress={onClose}
                        style={tw`items-end w-full z-10`}
                    >
                        <Text style={tw`text-white text-xl font-bold`}>✕</Text>
                    </TouchableOpacity>
                </View>
                <BottomSheetScrollView contentContainerStyle={tw`flex-1 bg-base_color  `}>

                    {
                        [1, 2, 3, 6, 12, "custom"].map((item: any, index) => (
                            <TouchableOpacity
                                key={index}
                                style={tw`flex-row items-center py-2 gap-3 border-b border-b-gray-400`}
                                onPress={() => onSelect(item)}
                            >
                                <View style={tw`px-4 py-2`}>
                                     <Text style={tw`font-DegularDisplayDemoRegular text-lg text-black`}>{item === "custom" ? "Custom Time" : `${item} ${item > 1 ? "hours" : "hour"}`}</Text>
                                </View>
                               
                            </TouchableOpacity>
                        ))
                    }


                    


                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}