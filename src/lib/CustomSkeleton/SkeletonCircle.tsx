import SkeletonBox from "./SkeletonBox";

export default function SkeletonCircle({ size = 40 }: { size?: number }) {
  return <SkeletonBox width={size} height={size} radius={size / 2} />;
}
