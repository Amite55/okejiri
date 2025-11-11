

import { IconSuccess } from '@/assets/icons';
import React from 'react';
import { Modal, Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';

interface AcceptedModalProps {
    visible: boolean,
    title?: string
    titleStyle?: any;
    subtitle?: string;
    subTitleStyle?: any,
    btnText?: string;
    btnTextStyle?: any;
    btnStyle?: any;
    onPress?: () => void;
    onClose?: () => void
}


export default function AcceptedModal({
    visible,
    title,
    titleStyle,
    subtitle,
    subTitleStyle,
    btnText,
    btnTextStyle,
    btnStyle,
    onPress,
    onClose
}: AcceptedModalProps) {
    return (
        <Modal transparent visible={visible} animationType='fade'>
            <Pressable
                onPress={onClose}
                style={[tw`flex-1 bg-black/50 justify-center items-center`]}
            >
                <Animated.View
                    // entering={FadeIn.duration(300)}
                    // exiting={FadeOut.duration(300)}
                    onStartShouldSetResponder={() => true}
                    style={tw`w-[90%] bg-white rounded-3xl items-center py-8 gap-3`}
                >
                   
                        <SvgXml xml={IconSuccess} style={tw`w-15 h-15`} />
                        <Text style={[tw`font-DegularDisplayDemoMedium text-center text-2xl text-black`, titleStyle]}>{title}</Text>
                        <Text style={[tw`font-DegularDisplayDemoRegular text-center text-xl text-black`, subTitleStyle]}>{subtitle}</Text>
                        <Pressable
                            style={[tw`bg-primary py-4 px-12 rounded-full`, btnStyle]}
                            onPress={onPress}
                        >
                            <Text style={[tw`text-center font-DegularDisplayDemoMedium text-white text-xl`, btnTextStyle]}

                            >{btnText}</Text>
                        </Pressable>
                    
                </Animated.View>
            </Pressable>


        </Modal>
    )
}