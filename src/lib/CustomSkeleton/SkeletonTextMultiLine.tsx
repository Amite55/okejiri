import SkeletonBox from "./SkeletonBox";

export default function SkeletonTextMultiLine({
  lines = 3,
}: {
  lines?: number;
}) {
  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBox
          key={index}
          height={14}
          width={index === lines - 1 ? "60%" : "100%"}
          style={{ marginBottom: 8 }}
        />
      ))}
    </>
  );
}
