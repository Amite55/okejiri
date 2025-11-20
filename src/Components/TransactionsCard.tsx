import { IconProfileBadge, IconTransactionCredit, IconTransactionDebit } from "@/assets/icons";
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

  type: "credit" | "debit",
  varient: "transfer" | "purchase" | "withdraw",
  transactionCode?: string
  created_at?: string,
  transaction_id?: string,
}
const maskTransactionId = (transactionId?: string) => {
  if (!transactionId) return "";
  const last4 = transactionId.slice(-4);
  const masked = "*".repeat(transactionId.length - 4) + last4;
  return masked;
};

const TransactionsCard = ({
  title,
  transactionIcon,
  userName,
  price,
  profileBadge = false,
  type = "credit",
  varient = "purchase",
  transactionCode,
  created_at,
  transaction_id
}: ITransactionProps) => {

  // console.log(" ========== profile badge ========  ", created_at, " ======  ", transaction_id)


  return (
    <View style={tw`flex-row items-center justify-between `}>
      <View style={tw`flex-row items-center gap-4`}>
        <SvgXml xml={type === "credit" ? IconTransactionCredit : IconTransactionDebit} />
        <View style={tw`gap-1`}>
          {varient === "withdraw" &&
            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-[#FF3A00]`}>
              {title}
            </Text>
          }
          {varient === "transfer" &&
            <View style={tw`flex-row gap-2 items-center`}>
              <Text style={tw`font-DegularDisplayDemoMedium text-xl text-[#FF3A00]`}>
                {userName}
              </Text>
              {profileBadge === true ? <SvgXml xml={IconProfileBadge} /> : null}
            </View>
          }

          {varient === "purchase" &&
            <View style={tw`flex-row gap-2 items-center `}>
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
              >
                {userName}
              </Text>
              {profileBadge === true ? <SvgXml xml={IconProfileBadge} /> : null}
            </View>
          }

          {varient === "withdraw" && transactionCode && transactionCode?.length > 0 &&
            <View style={tw`flex-row gap-2 items-center `}>
              <Text
                style={tw`font-DegularDisplayDemoSemibold text-xl text-black`}
              >
                {maskTransactionId(transactionCode)}
              </Text>

            </View>
          }

          <View style={tw``}>
            <View style={tw`flex-row gap-2`}>
              {/* <SvgXml xml={IconDate} width={20} height={20}/> */}
               <Text  style={tw`text-gray-600`}>Date: {created_at}</Text>
            </View>
           
            <View style={tw`flex-row gap-2 w-[70%] items-center`}>
              {/* <SvgXml xml={IconTransactionId}/> */}
              <View style={tw`flex-row items-center w-[85%]`}>
                <Text style={tw`text-gray-600`}>TrxID : </Text>
                <Text numberOfLines={1} ellipsizeMode="clip" style={tw`text-gray-500`}>{transaction_id}</Text>
              </View>
              
            </View>
            
          </View>
        </View>
      </View>

      <Text style={tw`font-DegularDisplayDemoMedium ${type === "credit" ? "text-[#00B230]" : "text-[#FF3A00]"}  text-2xl `}>
        ₦ {price}
      </Text>
    </View>
  );
};

export default TransactionsCard;
