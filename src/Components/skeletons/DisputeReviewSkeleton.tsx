import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "@/src/lib/CustomSkeleton/SkeletonCircle";
import SkeletonTextMultiLine from "@/src/lib/CustomSkeleton/SkeletonTextMultiLine";
import tw from "@/src/lib/tailwind";
import { View } from "react-native";

const DisputeReviewSkeleton = () => {
  return (
    <View style={tw`flex-1 px-5 bg-base_color`}>
      {/* -------- Header -------- */}
      <View style={tw`mt-2`}>
        <SkeletonBox width={160} height={24} />
      </View>

      {/* -------- User Section -------- */}
      <View style={tw`mt-6`}>
        <SkeletonBox width={100} height={24} style={{ marginBottom: 10 }} />

        <View style={tw`flex-row items-center gap-3`}>
          <SkeletonCircle size={48} />
          <SkeletonBox width={140} height={20} />
        </View>
      </View>

      {/* -------- Reason -------- */}
      <View style={tw`mt-6`}>
        <SkeletonBox width={120} height={24} style={{ marginBottom: 8 }} />
        <SkeletonTextMultiLine lines={2} />
      </View>

      {/* -------- Explanation -------- */}
      <View style={tw`mt-6`}>
        <SkeletonBox width={150} height={24} style={{ marginBottom: 8 }} />
        <SkeletonTextMultiLine lines={4} />
      </View>

      {/* -------- Files -------- */}
      <View style={tw`mt-6`}>
        <SkeletonBox width={80} height={24} style={{ marginBottom: 10 }} />

        <View style={tw`flex-row gap-2`}>
          <SkeletonBox width={100} height={100} radius={16} />
          <SkeletonBox width={100} height={100} radius={16} />
          <SkeletonBox width={100} height={100} radius={16} />
        </View>
      </View>

      {/* -------- Button -------- */}
      <View style={tw`mt-8`}>
        <SkeletonBox width="100%" height={48} radius={12} />
      </View>
    </View>
  );
};

export default DisputeReviewSkeleton;
