import { IconBackLeftArrow, IconFileUpload } from "@/assets/icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

export type ReportItem = {
  id: string | number;
  reportName: string;
};

type ReportBottomSheetProps = {
  ref: React.RefObject<BottomSheetModal>;
  reportData: ReportItem[];
  onClose: () => void;
  handleReportPress: () => void;
  isLoading?: boolean;
  pickImages: () => Promise<void>;
  images: any[] | null;
  selectedReport: string;
  setSelectedReport: (value: string) => void;
  reportDetails: string;
  setReportDetails: (value: string) => void;
  reportReason: boolean;
  setReportReason: (value: boolean) => void;
};

export const ReportBottomSheet = ({
  ref,
  reportData,
  onClose,
  handleReportPress,
  isLoading = false,
  pickImages,
  images,
  selectedReport,
  setSelectedReport,
  reportDetails,
  setReportDetails,
  reportReason,
  setReportReason,
}: ReportBottomSheetProps) => {
  const handleClose = () => {
    setReportReason(false);
    setSelectedReport("");
    setReportDetails("");
    onClose();
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["70%", "100%"]}
      enableDynamicSizing={false}
      index={0}
      containerStyle={tw`bg-gray-500 bg-opacity-20`}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      {/* header */}
      <View
        style={[
          tw`flex-row justify-center items-center h-14 bg-primary px-4`,
          { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
        ]}
      >
        <Text style={tw`font-DegularDisplayDemoMedium text-xl text-white`}>
          Report
        </Text>
      </View>

      {/* scrollable content */}
      <BottomSheetScrollView
        contentContainerStyle={tw`px-6 pt-4 pb-6`}
        keyboardShouldPersistTaps="handled"
      >
        {reportReason ? (
          // step 2 — details
          <View style={tw`gap-4`}>
            <TouchableOpacity
              onPress={() => setReportReason(false)}
              style={tw`w-10 h-10 border justify-center items-center rounded-full`}
            >
              <SvgXml xml={IconBackLeftArrow} />
            </TouchableOpacity>

            <BottomSheetTextInput
              style={[
                tw`text-black`,
                {
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  minHeight: 200,
                  borderRadius: 30,
                },
              ]}
              multiline
              numberOfLines={4}
              placeholder="Describe your issue..."
              onChangeText={setReportDetails}
              textAlignVertical="top"
            />

            <Text
              style={tw`font-DegularDisplayDemoRegular text-xl text-regularText text-right`}
            >
              {reportDetails.length}/1000
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={pickImages}
              style={tw`h-12 rounded-xl border border-gray-300 flex-row justify-center items-center gap-3`}
            >
              <SvgXml xml={IconFileUpload} />
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                {images ? `${images.length} files selected` : "Upload files"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // step 1 — select reason
          <View style={tw`gap-3`}>
            {reportData.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedReport(item.reportName)}
                style={tw`flex-row gap-3 items-center`}
              >
                <View
                  style={tw.style(
                    `border w-5 h-5 justify-center items-center rounded-full`,
                    selectedReport === item.reportName
                      ? `bg-primary border-primary`
                      : `bg-transparent border-gray-400`,
                  )}
                >
                  {selectedReport === item.reportName && (
                    <View style={tw`w-2 h-2 rounded-full bg-white`} />
                  )}
                </View>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-base text-black flex-1`}
                >
                  {item.reportName}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </BottomSheetScrollView>

      {/* fixed bottom buttons */}
      <View
        style={tw`flex-row justify-end items-center gap-6 px-6 py-4 border-t border-gray-100`}
      >
        <TouchableOpacity onPress={handleClose}>
          <Text
            style={tw`font-DegularDisplayDemoRegular text-2xl text-black p-2`}
          >
            Cancel
          </Text>
        </TouchableOpacity>

        {reportReason ? (
          isLoading ? (
            <ActivityIndicator size="small" color="blue" />
          ) : (
            <TouchableOpacity style={tw`p-2`} onPress={handleReportPress}>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-primary text-2xl`}
              >
                Report
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            style={tw`p-2`}
            disabled={!selectedReport}
            onPress={() => setReportReason(true)}
          >
            <Text
              style={tw.style(
                `font-DegularDisplayDemoMedium text-2xl`,
                selectedReport ? `text-primary` : `text-regularText`,
              )}
            >
              Next
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </BottomSheetModal>
  );
};
