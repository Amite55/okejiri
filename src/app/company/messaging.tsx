import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useCallback } from "react";

import { IconBackLeftArrow } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import {
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} from "@/src/redux/apiSlices/messagingSlices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

import NotificationSkeleton from "@/src/Components/skeletons/NotificationSkeleton";
import {
  disconnectSocket,
  getSocket,
  initiateSocket,
} from "@/src/redux/service/socket";
import { Image } from "expo-image";

const Message = () => {
  const { receiverId, receiverName, receiverImage } = useLocalSearchParams();
  const receiverIdNumber = Number(receiverId);
  const socket = getSocket();
  const router = useRouter();
  const [message, setMessage] = React.useState("");
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [allMessages, setAllMessages] = React.useState([]);

  // ------------------ api end point ---------------------
  const { data: ProfilerData, isLoading: isProfilerLoading } = useProfileQuery(
    {}
  );
  const [getMessages, messageResults] = useLazyGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();

  //  8******************* get messages function ***********************
  const handleGetMessages = async () => {
    const res = await getMessages({
      receiver_id: receiverIdNumber,
      page: 1,
      per_page: 500,
    });
    const messageList = res?.data?.data?.data || [];
    if (res?.data) {
      setAllMessages(messageList);
      // setAllMessages([...messageList].reverse());
    }
  };

  // ------------- fast render this screen connect to socket -----------------------------
  React.useLayoutEffect(() => {
    handleGetMessages();
    if (!ProfilerData?.data?.id) return; // wait for user data
    // connect only once
    if (!socket && ProfilerData?.data?.id) {
      initiateSocket(ProfilerData?.data?.id);
    }
    return () => {
      disconnectSocket();
    };
  }, [ProfilerData?.data?.id]);

  // [$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ send message $$$$$$$$$$$$$$$$$$$$$$$$$$]
  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;
    try {
      const response = await sendMessage({
        receiver_id: receiverIdNumber,
        message: message,
      }).unwrap();
      if (socket) {
        socket.emit("private-message", {
          receiverId: receiverIdNumber,
          message: message,
        });
      }
      if (response?.status === "success") {
        handleGetMessages();
      }
      // input clear
      setMessage("");
      // instantly fetch messages again
    } catch (error) {
      console.log("Send Error:", error);
    }
  }, [message, receiverIdNumber, sendMessage, handleGetMessages]);

  React.useLayoutEffect(() => {
    socket?.on("private-message", (data) => {
      handleGetMessages();
    });
  }, [socket]);

  // [--------------------- dynamic keyboard avoiding view useEffect -------------------]
  React.useLayoutEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  if (messageResults.isLoading || isProfilerLoading) {
    return <NotificationSkeleton dummyArray={8} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={tw`bg-base_color flex-1`}>
        <View style={tw`pr-4 py-2.5 flex-row items-center  shadow`}>
          <View style={tw`flex-row items-center gap-2`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`p-4 justify-center items-center rounded-full `}
            >
              <SvgXml width={25} xml={IconBackLeftArrow} />
            </TouchableOpacity>
            <Image
              style={tw`w-12 h-12 rounded-full `}
              source={receiverImage}
              contentFit="cover"
            />
          </View>
          <Text
            style={tw`text-xl pl-2  text-deepBlue400 font-DegularDisplayDemoBold`}
          >
            {receiverName}
          </Text>
        </View>

        <FlatList
          inverted
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.id.toString()}
          contentContainerStyle={tw`gap-5 py-6`}
          data={Array.isArray(allMessages) ? [...allMessages]?.reverse() : []}
          // data={allMessages}
          renderItem={({ item }) => {
            const isAuthUser =
              ProfilerData?.data?.id === item?.sender_id ? true : false;
            return (
              <>
                {isAuthUser && (
                  <View style={tw` flex-row items-start gap-2 px-4`}>
                    <View style={tw`flex-1 flex-row items-end gap-3`}>
                      <Text
                        style={tw`text-xs text-deepBlue75 font-DegularDisplayDemoRegular`}
                      >
                        {item?.time_ago}
                      </Text>
                      <View
                        style={tw`flex-1 bg-primary p-3 rounded-l-2xl rounded-b-2xl`}
                      >
                        <Text
                          style={tw`text-base text-white font-DegularDisplayDemoMedium`}
                        >
                          {item?.message}
                        </Text>
                      </View>
                    </View>
                    <Image
                      style={tw`w-6 h-6 -mt-1.5 rounded-full `}
                      source={{ uri: item?.sender?.avatar }}
                      contentFit="cover"
                    />
                  </View>
                )}
                {!isAuthUser && (
                  <View style={tw` flex-row items-start gap-2 px-4`}>
                    <Image
                      style={tw`w-6 h-6 rounded-full -mt-1.5`}
                      source={{ uri: item?.sender?.avatar }}
                      contentFit="cover"
                    />
                    <View style={tw`flex-1 flex-row items-end gap-3`}>
                      <View
                        style={tw`flex-1 bg-gray-300 p-3 rounded-r-2xl rounded-b-2xl`}
                      >
                        <Text
                          style={tw`text-base text-deepBlue400 font-DegularDisplayDemoMedium`}
                        >
                          {item?.message}
                        </Text>
                      </View>
                      <Text
                        style={tw`text-xs text-deepBlue75 font-DegularDisplayDemoRegular`}
                      >
                        {item?.time}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            );
          }}
        />

        {/* INPUT BOX */}
        <View
          style={[
            tw`flex-row items-center border border-gray-200 mx-3 m-3 rounded-full gap-2 `,
            isKeyboardVisible ? tw`mb-14` : tw`mb-0`,
          ]}
        >
          <TextInput
            style={tw`flex-1 text-black px-4 rounded-md max-h-14`}
            placeholder="Type a message"
            multiline
            placeholderTextColor={"#535353"}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />

          <TouchableOpacity
            onPress={handleSendMessage}
            style={[
              tw`h-12 bg-secondary w-18 justify-center items-center`,
              { borderTopRightRadius: 30, borderBottomRightRadius: 30 },
            ]}
          >
            <Text
              style={tw`text-white font-DegularDisplayDemoSemibold text-xl`}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Message;
