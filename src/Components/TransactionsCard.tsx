import { IconProfileBadge } from "@/assets/icons";
import React from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface ITransactionProps {
  title?: string;
  transactionIcon?: any;
  userName?: string;
  price?: any;
  profileBadge?: boolean;
}

const TransactionsCard = ({
  title,
  transactionIcon,
  userName,
  price,
  profileBadge,
}: ITransactionProps) => {
  return (
    <View style={tw`flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center gap-4`}>
        <SvgXml xml={transactionIcon || null} />
        <View>
          <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
            {title}
          </Text>
          <View style={tw`flex-row gap-2 items-center `}>
            <Text
              style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
            >
              {userName}
            </Text>
            {profileBadge ? <SvgXml xml={IconProfileBadge} /> : null}
          </View>
        </View>
      </View>

      <Text style={tw`font-DegularDisplayDemoMedium text-primary  text-2xl `}>
        ₦{price}
      </Text>
    </View>
  );
};

export default TransactionsCard;
