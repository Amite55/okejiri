import { IconProfileBadge } from "@/assets/icons";
import CleaningData from "@/src/json/CleaningData.json";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const Favorites_Item = () => {
  const serviceItemRender = ({ item }: any) => {
    return (
      <Pressable
        onPress={() =>
          router.push(
            "/company/previous_item_Book/previous_booking_confirmation"
          )
        }
        style={tw`flex-row justify-between items-center rounded-xl bg-white p-1.5 `}
        key={item?.Id}
      >
        <Image
          style={tw`w-20 h-20 rounded-2xl`}
          source={{ uri: item?.image }}
        />
        <View>
          <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
            {item?.title}
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-darkWhite`}
            >
              {item?.profile_name}
            </Text>

            {item.badge ? <SvgXml xml={IconProfileBadge} /> : null}
          </View>
          <StarRating
            starSize={24}
            color="#FF6600"
            rating={item?.rating || 0}
            onChange={() => {}}
          />
        </View>
        <View style={tw`justify-between gap-3`}>
          <Text style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}>
            ₦{item?.price}
          </Text>
          <View
            style={[
              tw`bg-primary -mr-1 -mb-4 w-20 h-9 justify-center items-center`,
              { borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
            ]}
          >
            <Text
              style={tw`font-DegularDisplayDemoMedium text-base text-white`}
            >
              {item?.type}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={CleaningData}
      renderItem={serviceItemRender}
      ListHeaderComponent={() => (
        <BackTitleButton
          pageName={"Favorites"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-2xl`}
        />
      )}
      keyExtractor={(item) => item.Id.toString()}
      contentContainerStyle={tw` bg-base_color px-5  gap-3 pb-10`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Favorites_Item;
