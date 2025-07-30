import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";

interface IAuthTitle {
  title: any;
  subTitle: any;
}

const AuthComponents = ({ title, subTitle }: IAuthTitle) => {
  return (
    <View style={tw`justify-center items-center `}>
      <Text
        style={tw`font-DegularDisplayDemoSemibold text-3xl text-primary text-center`}
      >
        {title}
      </Text>
      <Text style={tw`font-PoppinsRegular text-lg text-black text-center`}>
        {subTitle}
      </Text>
    </View>
  );
};

export default AuthComponents;
