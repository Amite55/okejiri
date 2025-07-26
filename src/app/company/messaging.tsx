import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";

import { IconBackLeftArrow } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import tw from "@/src/lib/tailwind";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

const Message = () => {
  const router = useRouter();
  const [message, setMessage] = React.useState("");
  const [allMessages, setAllMessages] = React.useState([
    {
      id: 1,
      user: true,
      name: "Emma Johnson",
      time: "09:15",
      message:
        "Hey, how's the project coming along? Need any help with the design?",
    },
    {
      id: 2,
      user: false,
      name: "Michael Chen",
      time: "09:22",
      message:
        "Almost done! Just finishing up the last section. Should be ready by EOD.",
    },
    {
      id: 3,
      user: true,
      name: "Emma Johnson",
      time: "09:25",
      message: "Great! Let me know if you want me to review anything.",
    },
    {
      id: 4,
      user: false,
      name: "Sarah Williams",
      time: "11:40",
      message:
        "Team meeting moved to 2pm. Don't forget to bring your progress reports!",
    },
    {
      id: 5,
      user: true,
      name: "David Kim",
      time: "12:05",
      message: "Lunch today? I'm craving some sushi.",
    },
    {
      id: 6,
      user: false,
      name: "Alex Rodriguez",
      time: "12:10",
      message: "Can't today - got a deadline. Maybe tomorrow?",
    },
    {
      id: 7,
      user: true,
      name: "Olivia Martin",
      time: "14:30",
      message:
        "Has anyone seen the client feedback from last week's presentation?",
    },
    {
      id: 8,
      user: false,
      name: "James Wilson",
      time: "14:35",
      message: "It's in the shared drive under Client > Feedback > June",
    },
    {
      id: 9,
      user: true,
      name: "Sophia Lee",
      time: "16:45",
      message:
        "Reminder: Office closes early tomorrow for the holiday weekend.",
    },
    {
      id: 10,
      user: false,
      name: "Daniel Brown",
      time: "16:50",
      message: "Thanks for the reminder! Almost forgot about that.",
    },
  ]);

  return (
    <View style={tw`bg-base_color flex-1`}>
      <View style={tw`px-4 py-3 flex-row items-center gap-2`}>
        <View style={tw`flex-row items-center gap-2`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`pr-3`}>
            <SvgXml xml={IconBackLeftArrow} />
          </TouchableOpacity>
          <Image style={tw`w-11 h-11 rounded-full `} source={ImgProfileImg} />
        </View>
        <Text style={tw`text-xl text-deepBlue400 font-DegularDisplayDemoBold`}>
          Larry Smith
        </Text>
      </View>

      <FlatList
        keyboardShouldPersistTaps="always"
        invertStickyHeaders
        inverted
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`gap-3  py-10`}
        data={allMessages?.sort((a, b) => b.id - a.id)}
        renderItem={({ item }) => (
          <>
            {item.user && (
              <View style={tw` flex-row items-start gap-2 px-4`}>
                <View style={tw`flex-1 flex-row items-end gap-2`}>
                  <Text
                    style={tw`text-xs text-deepBlue75 font-DegularDisplayDemoRegular`}
                  >
                    {item.time}
                  </Text>
                  <View
                    style={tw`flex-1 bg-primary p-3 rounded-l-md rounded-b-md`}
                  >
                    <Text
                      style={tw`text-base text-white font-DegularDisplayDemoMedium`}
                    >
                      {item.message}
                    </Text>
                  </View>
                </View>
                <Image
                  style={tw`w-11 h-11 rounded-full `}
                  source={ImgProfileImg}
                />
              </View>
            )}
            {item.user || (
              <View style={tw` flex-row items-start gap-2 px-4`}>
                <Image
                  style={tw`w-11 h-11 rounded-full `}
                  source={ImgProfileImg}
                />
                <View style={tw`flex-1 flex-row items-end gap-2`}>
                  <View
                    style={tw`flex-1 bg-white p-3 rounded-r-md rounded-b-md`}
                  >
                    <Text
                      style={tw`text-base text-deepBlue400 font-DegularDisplayDemoMedium`}
                    >
                      {item.message}
                    </Text>
                  </View>
                  <Text
                    style={tw`text-xs text-deepBlue75 font-DegularDisplayDemoRegular`}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      />
      <View
        style={tw`flex-row items-center border border-gray-200 mx-3 m-3 rounded-full  gap-2`}
      >
        <TextInput
          style={tw`flex-1 bg-white px-4 rounded-md`}
          placeholder="Type a message"
          placeholderTextColor={"#535353"}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />

        <TouchableOpacity
          style={[
            tw`h-12 bg-secondary w-18 justify-center items-center `,
            { borderTopRightRadius: 30, borderBottomRightRadius: 30 },
          ]}
        >
          <Text style={tw`text-white font-DegularDisplayDemoSemibold text-xl`}>
            Send
          </Text>
        </TouchableOpacity>
        {/* <TButton
          title="Send"
          onPress={() => {
            // Send message
            setAllMessages((pre) => {
              return [
                ...pre,
                {
                  id: pre.length + 1,
                  user: true,
                  name: "You",
                  time: new Date().toLocaleTimeString(),
                  message: message,
                },
              ];
            });
          }}
          containerStyle={tw` bg-transparent px-4`}
          titleStyle={tw`text-deepBlue400 text-base font-NunitoSansBold`}
        /> */}
      </View>
    </View>
  );
};

export default Message;
