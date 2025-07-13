import {
  IconCardProfile,
  IconEditPen,
  IconLocation,
  IconMailYellow,
  IconPhoneYellow,
  IconRightArrow,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Booking_Confirmation = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
      contentContainerStyle={tw`pb-8 justify-between flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Booking confirmation"}
          onPress={() => router.back()}
        />

        {/*  ---------- single item  ------------  */}

        <Pressable
          //   onPress={() => router.push("/company/serviceDetails")}
          style={tw`flex-row justify-between items-center rounded-xl bg-white p-1.5`}
        >
          <View style={tw`flex-row gap-3 items-center`}>
            <Image style={tw`w-20 h-20 rounded-2xl`} source={ImgProfileImg} />
            <View>
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Room cleaning
              </Text>

              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
              >
                Est. time : 30 mins
              </Text>
            </View>
          </View>

          <View style={tw`justify-between gap-3`}>
            <Text
              style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}
            >
              ₦ 49.00
            </Text>
            <View
              style={[
                tw`bg-primary -mr-2 -mb-4 w-20 h-9 justify-center items-center`,
                { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
              ]}
            >
              <Text
                style={tw`font-DegularDisplayDemoMedium text-base text-white`}
              >
                Cleaning
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={tw`flex-row items-center justify-end my-4`}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-xl text-secondary `}
          >
            See package details
          </Text>
        </View>

        {/* ============== personal info ---------------------------------------- */}

        <View style={tw`bg-white rounded-2xl px-7 py-5`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
            >
              Personal details
            </Text>
            <TouchableOpacity>
              <SvgXml xml={IconEditPen} />
            </TouchableOpacity>
          </View>

          <View style={tw` mt-7 gap-3`}>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconCardProfile} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                Madhob Mozumder
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconMailYellow} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                example@gmail.com
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconPhoneYellow} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                +65982365458
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconLocation} />
              <Text style={tw`font-DegularDisplayDemoRegular text-xl `}>
                Location 1
              </Text>
            </View>
          </View>
        </View>

        {/*  -------------- booking details -------------------  */}

        <View style={tw`bg-white rounded-2xl px-7 py-5 mt-3`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`font-DegularDisplayDemoMedium text-2xl text-black `}
            >
              Personal details
            </Text>
            <TouchableOpacity>
              <SvgXml xml={IconEditPen} />
            </TouchableOpacity>
          </View>

          <View style={tw`mt-7 gap-3`}>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Time selection:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                Scheduled
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Booking Type:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                Scheduled
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Date:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                05-02-2025
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-black`}
              >
                Time slot:
              </Text>
              <Text style={tw`font-DegularDisplayDemoLight text-xl `}>
                02:00 PM - 04:00 PM
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/*  ------------- next button -------------------- */}
      <PrimaryButton
        // onPress={() => router.push("/company/serviceBookings/billing_details")}
        titleProps="Next  3/4"
        IconProps={IconRightArrow}
        contentStyle={tw`mt-4`}
      />
    </ScrollView>
  );
};

export default Booking_Confirmation;
