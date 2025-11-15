

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import tw from '../lib/tailwind';

export default function AddServicesModal({ bottomSheetRef }: any) {
    // const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ["70%"], [])

    // useEffect(()=>{
    //     bottomSheetRef.current?.expand();
    // },[])

    const closeSheet = useCallback(() => {
        bottomSheetRef?.current?.close();
    }, [])

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={["95%"]}
                containerStyle={tw`bg-gray-500 bg-opacity-20`}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        pressBehavior="close"
                    />
                )}
            >
                <BottomSheetScrollView
                    style={tw``}
                    contentContainerStyle={tw`flex-1  bg-white flex-grow justify-between`}
                >
                   <View>
                    <Text>hi</Text>
                   </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}