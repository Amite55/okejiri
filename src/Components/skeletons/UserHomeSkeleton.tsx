import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";
const UserHomeSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-base_color px-4 gap-2`}>
      <View style={tw`my-6 flex-row items-center gap-2 `}>
        <Skeleton
          height={70}
          width={"70%"}
          colorMode="light"
          transition={{
            type: "timing",
          }}
        />
        <Skeleton
          height={70}
          width={"30%"}
          colorMode="light"
          transition={{
            type: "timing",
          }}
        />
      </View>
      <Skeleton
        height={40}
        width={"100%"}
        colorMode="light"
        radius={"round"}
        transition={{
          type: "timing",
        }}
      />
      <Skeleton
        height={200}
        width={"100%"}
        colorMode="light"
        transition={{
          type: "timing",
        }}
      />
      <View style={tw`my-6 flex-row items-center `}>
        <Skeleton
          height={70}
          width={"65%"}
          colorMode="light"
          transition={{
            type: "timing",
          }}
        />
        <Skeleton
          height={70}
          width={"40%"}
          colorMode="light"
          transition={{
            type: "timing",
          }}
        />
      </View>
      <View style={tw`my-6 flex-row items-center `}>
        <Skeleton
          height={70}
          width={"50%"}
          colorMode="light"
          transition={{
            type: "timing",
          }}
        />
        <Skeleton
          height={70}
          width={"50%"}
          colorMode="light"
          transition={{
            type: "timing",
          }}
        />
      </View>
    </View>
  );
};

export default UserHomeSkeleton;
