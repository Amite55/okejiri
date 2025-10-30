import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";
import tw from "../../lib/tailwind";

const PackageDetailsSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-base_color px-4 gap-4`}>
      <Skeleton
        height={240}
        width={"100%"}
        colorMode="light"
        transition={{
          type: "timing",
        }}
      />
      <Skeleton
        height={20}
        width={"80%"}
        colorMode="light"
        transition={{
          type: "timing",
        }}
      />
      <Skeleton
        height={10}
        width={"100%"}
        colorMode="light"
        transition={{
          type: "timing",
        }}
      />
      <Skeleton
        height={10}
        width={"70%"}
        colorMode="light"
        transition={{
          type: "timing",
        }}
      />
      <Skeleton
        height={10}
        width={"50%"}
        colorMode="light"
        transition={{
          type: "timing",
        }}
      />
      <Skeleton
        height={10}
        width={"100%"}
        colorMode="light"
        transition={{
          type: "timing",
        }}
      />
      <Skeleton
        height={40}
        width={"100%"}
        colorMode="light"
        radius={"round"}
        transition={{
          type: "timing",
        }}
      />

      <View style={tw`mt-10`}>
        <Skeleton
          height={60}
          width={"100%"}
          colorMode="light"
          radius={"round"}
          transition={{
            type: "timing",
          }}
        />
      </View>
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
    </View>
  );
};

export default PackageDetailsSkeleton;
